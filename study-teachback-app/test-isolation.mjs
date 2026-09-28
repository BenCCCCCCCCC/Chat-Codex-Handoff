// Test-only preload. Never imported by the product.
import net from 'node:net';
import tls from 'node:tls';
import { syncBuiltinESMExports } from 'node:module';
import { resolve, relative, isAbsolute } from 'node:path';
import { Ledger } from './ledger.mjs';

if (!process.env.STUDY_TEST_OUTPUT || process.env.OPENAI_API_KEY !== 'synthetic-offline-test-only') throw Error('TEST_ISOLATION_REQUIRED');
const loopback = host => ['127.0.0.1', '::1', '[::1]'].includes(host);
let blocked = 0;
const deny = () => { blocked++; throw Error('TEST_OUTBOUND_BLOCKED'); };
const originalFetch = globalThis.fetch;
globalThis.fetch = (input, options) => {
  const url = new URL(typeof input === 'string' || input instanceof URL ? input : input.url);
  if (url.protocol !== 'http:' || !loopback(url.hostname)) return deny();
  return originalFetch(input, options);
};
const connect = net.Socket.prototype.connect;
net.Socket.prototype.connect = function (...args) {
  const options = Array.isArray(args[0]) ? args[0][0] : args[0];
  const host = typeof options === 'object' ? options.host : args[1];
  if (!loopback(host)) return deny();
  return connect.apply(this, args);
};
tls.connect = deny;
syncBuiltinESMExports();
const testRoot = resolve(process.env.STUDY_TEST_OUTPUT);
for (const method of ['read', 'transaction']) {
  const original = Ledger.prototype[method];
  Ledger.prototype[method] = function (...args) {
    const path = relative(testRoot, resolve(this.path));
    if (path.startsWith('..') || isAbsolute(path)) throw Error('TEST_OWNER_LEDGER_BLOCKED');
    return original.apply(this, args);
  };
}
process.on('exit', () => console.log(`ISOLATION: synthetic credential; loopback only; test ledgers only; blocked outbound attempts=${blocked}`));
