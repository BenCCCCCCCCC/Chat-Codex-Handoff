// Explicit clean-environment entry for the existing suites. No credentials copied.
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, writeFileSync, readFileSync, existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { tmpdir } from 'node:os';
const repo = fileURLToPath(new URL('../', import.meta.url));
const mode = process.argv[2];
if (!['node', 'browser', 'focused', 'provenance-baseline'].includes(mode)) throw Error('Use node, browser, focused or provenance-baseline');
const parent = join(repo, 'artifacts/study-teachback/correctness-hygiene-01');
mkdirSync(parent, { recursive: true });
const output = mkdtempSync(join(parent, `${mode}-${Date.now()}-`));
mkdirSync(join(output, 'tmp'));
const env = {};
for (const key of ['SystemRoot', 'WINDIR', 'PATH', 'PATHEXT', 'COMSPEC', 'USERPROFILE', 'LOCALAPPDATA', 'APPDATA']) if (process.env[key]) env[key] = process.env[key];
Object.assign(env, { OPENAI_API_KEY: 'synthetic-offline-test-only', STUDY_TEST_OUTPUT: output, TEMP: join(output, 'tmp'), TMP: join(output, 'tmp') });
if(mode==='browser'){
  // Chromium's deep profile paths can exceed Windows MAX_PATH under artifacts.
  env.STUDY_TEST_PROFILE=mkdtempSync(join(tmpdir(),'study-edge-'));
  for(const key of ['TEMP','TMP']){env[key]=join(env.STUDY_TEST_PROFILE,key.toLowerCase());mkdirSync(env[key]);}
}
const guard = new URL('./test-isolation.mjs', import.meta.url).href;
if(mode==='provenance-baseline'){
  const base=spawnSync('git',['-c',`safe.directory=${repo.replaceAll('\\','/').replace(/\/$/,'')}`,'show','f6a000ca96fedfbeb9eaa803dfcd990a13d90c53:study-teachback-app/app.mjs'],{cwd:repo,env,windowsHide:true,encoding:'utf8'});
  if(base.status!==0){writeFileSync(join(output,'baseline-source-error.log'),`${base.error?.code??''}\n${base.stderr??''}`);throw Error('BASELINE_SOURCE_UNAVAILABLE: '+output);}
  env.STUDY_TEST_APP_SOURCE=join(output,'accepted-base-app.mjs');writeFileSync(env.STUDY_TEST_APP_SOURCE,base.stdout);
}
const files = mode === 'browser' ? ['study-teachback-app/browser-tests-r4.mjs'] : mode === 'provenance-baseline' ? ['--test','study-teachback-app/provenance.test.mjs'] : mode === 'focused' ? ['--test', 'study-teachback-app/correctness-hygiene.test.mjs'] : ['--test', 'study-teachback-app/tests.mjs', ...readdirSync(new URL('./', import.meta.url)).filter(f => f.endsWith('.test.mjs')).sort().map(f => `study-teachback-app/${f}`)];
const args = ['--import', guard, ...files];
const ledger = join(repo, 'study-teachback-app/runtime/usage.json');
const hash = () => existsSync(ledger) ? createHash('sha256').update(readFileSync(ledger)).digest('hex') : 'ABSENT';
const before = hash();
const sourceSHA256=Object.fromEntries(['README.md','docs/master/CURRENT_STATE.md','docs/master/HANDOFF.md',...readdirSync(new URL('./',import.meta.url)).filter(f=>f.endsWith('.mjs')||f==='README.md').map(f=>'study-teachback-app/'+f)].map(path=>[path,createHash('sha256').update(readFileSync(join(repo,path))).digest('hex')]));
console.log(`OUTPUT ${output}`);
const result = spawnSync(process.execPath, args, { cwd: repo, env, windowsHide: true, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 });
const after = hash();
writeFileSync(join(output, 'tests.log'), (result.stdout ?? '') + (result.stderr ?? ''));
const receipt = { command: [process.execPath, ...args], cwd: repo, mode, exit: result.status, error: result.error?.code ?? null, node: process.version, output, credential: 'synthetic-offline-test-only', inheritedEnvironment: Object.keys(env), sourceSHA256, productionLedgerSHA256: { before, after, unchanged: before === after } };
writeFileSync(join(output, 'receipt.json'), JSON.stringify(receipt, null, 2));
console.log(result.stdout ?? '');
console.error(result.stderr ?? '');
console.log(JSON.stringify({...receipt,sourceSHA256:'See receipt.json'}));
process.exitCode = result.status === 0 && before === after ? 0 : 1;
