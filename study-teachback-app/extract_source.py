"""Bounded, local-only text extraction. No input files or document logs are written."""
import io, json, re, sys, zipfile, posixpath
import xml.etree.ElementTree as ET

def xml(raw):
    # XML declaration encoding must not bypass the DTD/entity prohibition.
    check = raw.replace(b'\x00', b'').upper()
    if b'<!DOCTYPE' in check or b'<!ENTITY' in check:
        raise ValueError('INVALID_DOCUMENT')
    return ET.fromstring(raw)

def extract(data, kind):
    if len(data) > 10 * 1024 * 1024:
        raise ValueError('FILE_TOO_LARGE')
    blocks = []
    if kind in ('txt', 'md'):
        encoding = 'utf-16' if data[:2] in (b'\xff\xfe', b'\xfe\xff') else 'utf-8-sig'
        try:
            value = data.decode(encoding)
        except UnicodeError:
            raise ValueError('TEXT_ENCODING_UNSUPPORTED')
        if '\x00' in value:
            raise ValueError('INVALID_DOCUMENT')
        blocks = [{'label': '全文', 'text': value}]
    elif kind == 'pdf':
        from pypdf import PdfReader
        pdf = PdfReader(io.BytesIO(data), strict=True)
        if pdf.is_encrypted:
            raise ValueError('ENCRYPTED_DOCUMENT')
        if len(pdf.pages) > 100:
            raise ValueError('DOCUMENT_LIMIT')
        blocks = [{'label': f'第 {i+1} 页', 'text': p.extract_text() or ''} for i, p in enumerate(pdf.pages)]
    elif kind in ('docx', 'pptx'):
        with zipfile.ZipFile(io.BytesIO(data)) as z:
            infos = z.infolist()
            if len(infos) > 2000 or sum(i.file_size for i in infos) > 30 * 1024 * 1024:
                raise ValueError('DOCUMENT_LIMIT')
            if any(i.flag_bits & 1 for i in infos):
                raise ValueError('ENCRYPTED_DOCUMENT')
            names = z.namelist()
            if len(set(names)) != len(names):
                raise ValueError('INVALID_DOCUMENT')
            paths = ['word/document.xml'] if kind == 'docx' else sorted(
                (n for n in names if re.fullmatch(r'ppt/slides/slide[0-9]+\.xml', n)),
                key=lambda n: int(re.search(r'([0-9]+)\.xml', n).group(1)))
            if kind == 'pptx' and 'ppt/presentation.xml' in names:
                rels = xml(z.read('ppt/_rels/presentation.xml.rels'))
                targets = {r.get('Id'): posixpath.normpath('ppt/' + r.get('Target', '')) for r in rels if r.get('TargetMode') != 'External'}
                presentation = xml(z.read('ppt/presentation.xml'))
                paths = [targets.get(n.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id'), '') for n in presentation.iter('{http://schemas.openxmlformats.org/presentationml/2006/main}sldId')]
                if any(not re.fullmatch(r'ppt/slides/slide[0-9]+\.xml', n) for n in paths):
                    raise ValueError('INVALID_DOCUMENT')
            if not paths or len(paths) > 100:
                raise ValueError('DOCUMENT_LIMIT')
            ns = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main' if kind == 'docx' else 'http://schemas.openxmlformats.org/drawingml/2006/main'
            for i, path in enumerate(paths):
                raw = z.read(path)
                if b'<!DOCTYPE' in raw.upper() or b'<!ENTITY' in raw.upper():
                    raise ValueError('INVALID_DOCUMENT')
                root = xml(raw)
                paragraphs = []
                for p in root.iter('{'+ns+'}p'):
                    paragraphs.append(''.join(n.text or '' if n.tag == '{'+ns+'}t' else '\t' if n.tag == '{'+ns+'}tab' else '\n' if n.tag in ('{'+ns+'}br', '{'+ns+'}cr') else '' for n in p.iter()))
                blocks.append({'label': '正文' if kind == 'docx' else f'幻灯片 {i+1}', 'text': '\n'.join(paragraphs)})
    else:
        raise ValueError('FORMAT_UNSUPPORTED')
    if sum(len(b['text']) for b in blocks) > 200000:
        raise ValueError('DOCUMENT_LIMIT')
    if not any(b['text'].strip() for b in blocks):
        raise ValueError('NO_EXTRACTABLE_TEXT')
    return {'blocks': blocks}

if __name__ == '__main__':
    try:
        try:
            import pypdf
            if pypdf.__version__ != '6.18.0':
                raise ImportError()
        except ImportError:
            raise ValueError('EXTRACTOR_DEPENDENCY_REQUIRED')
        result = extract(sys.stdin.buffer.read(10 * 1024 * 1024 + 1), sys.argv[1])
    except Exception as error:
        code = str(error)
        result = {'error': code if code in ('EXTRACTOR_DEPENDENCY_REQUIRED', 'FILE_TOO_LARGE', 'TEXT_ENCODING_UNSUPPORTED', 'INVALID_DOCUMENT', 'ENCRYPTED_DOCUMENT', 'DOCUMENT_LIMIT', 'FORMAT_UNSUPPORTED', 'NO_EXTRACTABLE_TEXT') else 'INVALID_DOCUMENT'}
    sys.stdout.buffer.write(json.dumps(result, ensure_ascii=True).encode('ascii'))
