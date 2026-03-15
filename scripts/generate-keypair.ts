import * as ed from '@noble/ed25519';
import { sha512 } from '@noble/hashes/sha2.js';

// v3 requires explicit hash setup
ed.hashes.sha512 = sha512;

const privateKey = ed.utils.randomSecretKey();
const publicKey = ed.getPublicKey(privateKey);

function toBase64(bytes: Uint8Array): string {
  return Buffer.from(bytes).toString('base64');
}

console.log('=== Ed25519 Keypair ===\n');
console.log('PRIVATE KEY (add to Vercel env as SPEECY_SIGNING_KEY):');
console.log(toBase64(privateKey));
console.log('\nPUBLIC KEY (embed in Speecy Rust binary):');
console.log(toBase64(publicKey));
console.log('\nPUBLIC KEY (hex, for reference):');
console.log(Buffer.from(publicKey).toString('hex'));
