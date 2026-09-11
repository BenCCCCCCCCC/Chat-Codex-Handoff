import io, unittest, zipfile
from extract_source import extract
class ExtractionTests(unittest.TestCase):
    def test_text(self):
        for kind in ('md','txt'):
            self.assertEqual(extract('只有持票者才可以入场。'.encode(),kind)['blocks'][0]['text'],'只有持票者才可以入场。')
    def test_office(self):
        for kind,path,ns in [('docx','word/document.xml','http://schemas.openxmlformats.org/wordprocessingml/2006/main'),('pptx','ppt/slides/slide1.xml','http://schemas.openxmlformats.org/drawingml/2006/main')]:
            b=io.BytesIO()
            with zipfile.ZipFile(b,'w') as z:z.writestr(path,f'<root xmlns:a="{ns}"><a:p><a:r><a:t>只有A才B</a:t></a:r></a:p></root>')
            self.assertEqual(extract(b.getvalue(),kind)['blocks'][0]['text'],'只有A才B')
    def test_pdf(self):
        from pypdf import PdfWriter
        from pypdf.generic import DictionaryObject,NameObject,DecodedStreamObject
        w=PdfWriter();p=w.add_blank_page(300,300)
        font=DictionaryObject({NameObject('/Type'):NameObject('/Font'),NameObject('/Subtype'):NameObject('/Type1'),NameObject('/BaseFont'):NameObject('/Helvetica')})
        p[NameObject('/Resources')]=DictionaryObject({NameObject('/Font'):DictionaryObject({NameObject('/F1'):w._add_object(font)})})
        stream=DecodedStreamObject();stream.set_data(b'BT /F1 12 Tf 20 200 Td (Only A permits B.) Tj ET');p[NameObject('/Contents')]=w._add_object(stream)
        b=io.BytesIO();w.write(b);self.assertIn('Only A permits B.',extract(b.getvalue(),'pdf')['blocks'][0]['text'])
    def test_invalid(self):
        for kind in ('pdf','docx','pptx'):
            with self.assertRaises(Exception):extract(b'bad',kind)
        for data in (b'\x00',b'\xff',b' '):
            with self.assertRaises(ValueError):extract(data,'txt')
    def test_limits(self):
        for data in (b'x'*200001,b'x'*(10*1024*1024+1)):
            with self.assertRaises(ValueError):extract(data,'txt')
    def test_xml_entity(self):
        b=io.BytesIO()
        with zipfile.ZipFile(b,'w') as z:z.writestr('word/document.xml','<!DOCTYPE a [<!ENTITY x "x">]><a>&x;</a>')
        with self.assertRaises(ValueError):extract(b.getvalue(),'docx')
if __name__=='__main__':unittest.main()
