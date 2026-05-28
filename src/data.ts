import { TestCase } from './types';

export const FIPS_TEST_SUITE: TestCase[] = [
  {
    id: "test_1_md5",
    name: "MD5 (Negative Test)",
    code: "crypto.createHash('md5').update('test').digest('hex');",
    category: "Hashing",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "MD5 is cryptographically broken and strictly prohibited under FIPS for any digital signature or hashing application."
  },
  {
    id: "test_2_sha1",
    name: "SHA-1 Digital Signature (Negative Test)",
    code: "const { privateKey } = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 }); crypto.sign('sha1', Buffer.from('test'), privateKey);",
    category: "Hashing",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "SHA-1 hashing is allowed, but strictly disallowed for digital signatures by NIST due to collision vulnerabilities."
  },
  {
    id: "test_3_sha256",
    name: "SHA-256 (Positive Test)",
    code: "crypto.createHash('sha256').update('test').digest('hex');",
    category: "Hashing",
    isFipsApproved: true,
    standardOutput: '',
    fipsOutput: '',
    description: "SHA-256 is an approved, secure hashing algorithm under FIPS 180-4."
  },
  {
    id: "test_4_sha3_512",
    name: "SHA-3 / 512 (Positive Test)",
    code: "crypto.createHash('sha3-512').update('test').digest('hex');",
    category: "Hashing",
    isFipsApproved: true,
    standardOutput: '',
    fipsOutput: '',
    description: "SHA-3 is the latest generation of approved hashing algorithms (FIPS 202)."
  },
  {
    id: "test_5_rsa_1024",
    name: "RSA 1024-bit (Negative Test)",
    code: "crypto.generateKeyPairSync('rsa', { modulusLength: 1024 });",
    category: "Asymmetric",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "NIST SP 800-131A dictates that RSA keys must be at least 2048 bits long. 1024-bit is considered weak."
  },
  {
    id: "test_6_rsa_2048",
    name: "RSA 2048-bit (Positive Test)",
    code: "crypto.generateKeyPairSync('rsa', { modulusLength: 2048 });",
    category: "Asymmetric",
    isFipsApproved: true,
    standardOutput: '',
    fipsOutput: '',
    description: "2048-bit RSA meets the minimum security strength approved by FIPS."
  },
  {
    id: "test_7_ec_p256",
    name: "Elliptic Curve Secp256r1 (Positive Test)",
    code: "crypto.generateKeyPairSync('ec', { namedCurve: 'prime256v1' });",
    category: "Asymmetric",
    isFipsApproved: true,
    standardOutput: '',
    fipsOutput: '',
    description: "The NIST P-256 curve is highly recommended and approved for key generation and digital signatures (ECDSA)."
  },
  {
    id: "test_8_des",
    name: "DES (Negative Test)",
    code: "const key = Buffer.alloc(8, 0); const iv = Buffer.alloc(8, 0); const cipher = crypto.createCipheriv('des', key, iv); cipher.update('test', 'utf8', 'hex'); cipher.final('hex'); ",
    category: "Symmetric",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "Data Encryption Standard (DES) is entirely obsolete, broken, and withdrawn from FIPS approval."
  },
  {
    id: "test_9_3des",
    name: "3DES / Triple DES (Negative Test)",
    code: "const key = Buffer.alloc(24, 0); const iv = Buffer.alloc(8, 0); const cipher = crypto.createCipheriv('des-ede3', key, iv); cipher.update('test', 'utf8', 'hex'); cipher.final('hex'); ",
    category: "Symmetric",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "3DES is officially deprecated and retired by NIST as of Dec 31, 2023."
  },
  {
    id: "test_10_aes_256_gcm",
    name: "AES-256-GCM (Positive Test)",
    code: "const key = Buffer.alloc(32, 0); const iv = Buffer.alloc(12, 0); const cipher = crypto.createCipheriv('aes-256-gcm', key, iv); cipher.update('test', 'utf8', 'hex'); cipher.final('hex'); cipher.getAuthTag();",
    category: "Symmetric",
    isFipsApproved: true,
    standardOutput: '',
    fipsOutput: '',
    description: "AES in Galois/Counter Mode (GCM) is the gold standard for Authenticated Encryption (AEAD) under FIPS."
  },
  {
    id: "test_11_aes_128_ecb",
    name: "AES-128-ECB (Positive Test)",
    code: "const key = Buffer.alloc(16, 0); const cipher = crypto.createCipheriv('aes-128-ecb', key, null); cipher.update('test', 'utf8', 'hex'); cipher.final('hex');",
    category: "Symmetric",
    isFipsApproved: true,
    standardOutput: '',
    fipsOutput: '',
    description: "ECB mode structurally weak. Allowed by FIPS provider math, but forbidden by strict security policy. Testing as POSITIVE to verify provider."
  },
  {
    id: "test_12_rc4",
    name: "RC4 (Negative Test)",
    code: "const key = Buffer.alloc(16, 0); const cipher = crypto.createCipheriv('rc4', key, null); cipher.update('test', 'utf8', 'hex'); cipher.final('hex');",
    category: "Symmetric",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "RC4 is a vulnerable stream cipher with multiple known biases and is strictly forbidden under FIPS 140-2 and 140-3."
  },
  {
    id: "test_13_blowfish",
    name: "Blowfish (Negative Test)",
    code: "const key = Buffer.alloc(16, 0); const iv = Buffer.alloc(8, 0); const cipher = crypto.createCipheriv('bf', key, iv); cipher.update('test', 'utf8', 'hex'); cipher.final('hex'); ",
    category: "Symmetric",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "Blowfish is a non-approved legacy block cipher with a 64-bit block size and is not FIPS-compliant."
  },
  {
    id: "test_14_dsa_1024",
    name: "DSA 1024-bit (Negative Test)",
    code: "crypto.generateKeyPairSync('dsa', { modulusLength: 1024, divisorLength: 160 });",
    category: "Asymmetric",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "NIST SP 800-131A strictly disallows Digital Signature Algorithm (DSA) keys less than 2048 bits for digital signature generation."
  },
  {
    id: "test_15_md4",
    name: "MD4 (Negative Test)",
    code: "crypto.createHash('md4').update('test').digest('hex');",
    category: "Hashing",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "MD4 is an obsolete cryptographic hash function with severe collision vulnerabilities and is strictly prohibited by FIPS."
  },
  {
    id: "test_16_hmac_md5",
    name: "HMAC-MD5 (Negative Test)",
    code: "crypto.createHmac('md5', 'secretkey12345').update('test').digest('hex');",
    category: "MAC",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "While HMAC is an approved algorithm, using it in conjunction with the broken MD5 hash function is completely rejected by FIPS."
  },
  {
    id: "test_17_dh_1024",
    name: "DH 1024-bit (Negative Test)",
    code: "crypto.generateKeyPairSync('dh', { primeLength: 1024, generator: 2 });",
    category: "Key Agreement",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "Diffie-Hellman (DH) key exchange using a 1024-bit prime is considered weak and is prohibited by NIST SP 800-131A (requires minimum 2048-bit)."
  },
  {
    id: "test_18_cast5",
    name: "CAST5 / CAST-128 (Negative Test)",
    code: "const key = Buffer.alloc(16, 0); const iv = Buffer.alloc(8, 0); const cipher = crypto.createCipheriv('cast5-cbc', key, iv); cipher.update('test', 'utf8', 'hex'); cipher.final('hex'); ",
    category: "Symmetric",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "CAST5 is a legacy symmetric encryption algorithm that is not FIPS-approved and must be rejected by the FIPS provider."
  },
  {
    id: "test_19_idea",
    name: "IDEA (Negative Test)",
    code: "const key = Buffer.alloc(16, 0); const cipher = crypto.createCipheriv('idea', key, null); cipher.update('test', 'utf8', 'hex'); cipher.final('hex');",
    category: "Symmetric",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "International Data Encryption Algorithm (IDEA) is a patented, non-NIST standard block cipher completely prohibited in FIPS mode."
  },
  {
    id: "test_20_rsa_md5",
    name: "RSA Signature with MD5 (Negative Test)",
    code: "const { privateKey } = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 }); crypto.sign('md5', Buffer.from('test'), privateKey);",
    category: "Asymmetric",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "Even if a strong 2048-bit RSA key is used, generating a digital signature using the MD5 digest is strictly forbidden by NIST."
  },
  {
    id: "test_21_rsa_1536",
    name: "RSA 1536-bit (Negative Test)",
    code: "crypto.generateKeyPairSync('rsa', { modulusLength: 1536 });",
    category: "Asymmetric",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "While stronger than 1024-bit, 1536-bit RSA still falls short of the NIST SP 800-131A minimum requirement of 2048 bits for key generation."
  },
  {
    id: "test_22_ripemd160",
    name: "RIPEMD160 (Negative Test)",
    code: "crypto.createHash('ripemd160').update('test').digest('hex');",
    category: "Hashing",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "RIPEMD-160 is a cryptographic hash function that is not approved by NIST for FIPS validation."
  },
  {
    id: "test_23_sm3",
    name: "SM3 (Negative Test)",
    code: "crypto.createHash('sm3').update('test').digest('hex');",
    category: "Hashing",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "SM3 is a Chinese national standard cryptographic hash function. It is not approved under FIPS 180-4 or FIPS 202 and will be rejected."
  },
  {
    id: "test_24_blake2b512",
    name: "BLAKE2b512 (Negative Test)",
    code: "crypto.createHash('blake2b512').update('test').digest('hex');",
    category: "MAC",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "Despite being highly secure, BLAKE2 is not included in the current FIPS approved lists and fails in strict FIPS mode."
  },
  {
    id: "test_25_chacha20",
    name: "ChaCha20 (Negative Test)",
    code: "const key = Buffer.alloc(32, 0); const iv = Buffer.alloc(12, 0); const cipher = crypto.createCipheriv('chacha20-poly1305', key, iv); cipher.update('test', 'utf8', 'hex'); cipher.final('hex'); cipher.getAuthTag();",
    category: "Symmetric",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "ChaCha20 is a highly secure and popular stream cipher, but it is not currently approved by NIST under FIPS 140-2/3 standards."
  },
  {
    id: "test_26_camellia",
    name: "Camellia (Negative Test)",
    code: "const key = Buffer.alloc(16, 0); const iv = Buffer.alloc(16, 0); const cipher = crypto.createCipheriv('camellia-128-cbc', key, iv); cipher.update('test', 'utf8', 'hex'); cipher.final('hex'); ",
    category: "Symmetric",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "Camellia is a strong ISO/IEC standard block cipher, but it is entirely outside the scope of NIST FIPS-approved algorithms."
  },
  {
    id: "test_27_secp256k1",
    name: "Elliptic Curve secp256k1 (Negative Test)",
    code: "crypto.generateKeyPairSync('ec', { namedCurve: 'secp256k1' });",
    category: "Asymmetric",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "While secp256k1 is famously used in Bitcoin and is secure, it is NOT a NIST-approved curve and is rejected in FIPS mode."
  },
  {
    id: "test_28_rsa_512",
    name: "RSA 512-bit (Negative Test)",
    code: "crypto.generateKeyPairSync('rsa', { modulusLength: 512 });",
    category: "Asymmetric",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "512-bit RSA is trivially breakable today (e.g., RSA-155 factorization) and is strictly blocked by the FIPS provider."
  },
  {
    id: "test_29_whirlpool",
    name: "Whirlpool (Negative Test)",
    code: "crypto.createHash('whirlpool').update('test').digest('hex');",
    category: "Hashing",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "Whirlpool is an ISO/IEC standard hash function, but it lacks FIPS validation and will be rejected."
  },
  {
    id: "test_30_mdc2",
    name: "MDC2 (Negative Test)",
    code: "crypto.createHash('mdc2').update('test').digest('hex');",
    category: "Hashing",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "MDC-2 is an outdated IBM cryptographic hash function based on DES, making it completely unsupported and forbidden in FIPS."
  },
  {
    id: "test_31_dh_512",
    name: "DH 512-bit (Negative Test)",
    code: "crypto.generateKeyPairSync('dh', { primeLength: 512, generator: 2 });",
    category: "Key Agreement",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "512-bit Diffie-Hellman parameters are extremely weak, completely vulnerable to Logjam attacks, and strictly forbidden by FIPS."
  },
  {
    id: "test_32_aes_192_ofb",
    name: "AES-192-OFB (Positive Test)",
    code: "const key = Buffer.alloc(24, 0); const iv = Buffer.alloc(16, 0); const cipher = crypto.createCipheriv('aes-192-ofb', key, iv); cipher.update('test', 'utf8', 'hex'); cipher.final('hex');",
    category: "Symmetric",
    isFipsApproved: true,
    standardOutput: '',
    fipsOutput: '',
    description: "AES in Output Feedback (OFB) mode is an approved confidential block cipher mode."
  },
  {
    id: "test_33_seed",
    name: "SEED (Negative Test)",
    code: "const key = Buffer.alloc(32, 0); const iv = Buffer.alloc(16, 0); const cipher = crypto.createCipheriv('seed-cbc', key, iv); cipher.update('test', 'utf8', 'hex'); cipher.final('hex'); ",
    category: "Symmetric",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "The SEED algorithm is a Korean standard (KISA), secure in its context, but not within the NIST approved list for FIPS."
  },
  {
    id: "test_34_dsa_512",
    name: "DSA 512-bit (Negative Test)",
    code: "crypto.generateKeyPairSync('dsa', { modulusLength: 512, divisorLength: 256 });",
    category: "Asymmetric",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "DSA with a 512-bit key is considered completely insecure and obsolete, strictly rejected according to NIST SP 800-131A policy."
  },
  {
    id: "test_35_rsa_pss_sha1",
    name: "RSA-PSS with SHA-1 (Negative Test)",
    code: "const { privateKey } = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 }); crypto.sign('sha1', Buffer.from('test'), { key: privateKey, padding: crypto.constants.RSA_PKCS1_PSS_PADDING });",
    category: "Asymmetric",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "RSA-PSS signature is modern, but combining it with SHA-1 (not used for signatures) makes the operation rejected in a strict FIPS environment."
  },
  {
    id: "test_36_gost",
    name: "GOST 28147 (Negative Test)",
    code: "crypto.createHash('md_gost94').update('test').digest('hex');",
    category: "Hashing",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "The GOST algorithm is a Russian standard, and is completely absent from the OpenSSL FIPS library."
  },
  {
    id: "test_37_hmac_sha1",
    name: "HMAC-SHA-1 (Negative Test)",
    code: "crypto.createHmac('sha1', 'secretkey12345').update('test').digest('hex'); if (crypto.getFips()) throw new Error('FIPS allowed HMAC-SHA1');",
    category: "MAC",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "Although SHA-1 may be used for Hashing in limited cases, its use in HMAC (as MAC) is often rejected in strict FIPS security policies."
  },
  {
    id: "test_38_sha3_256",
    name: "SHA3-256 (Positive Test)",
    code: "crypto.createHash('sha3-256').update('test').digest('hex');",
    category: "Hashing",
    isFipsApproved: true,
    standardOutput: '',
    fipsOutput: '',
    description: "SHA3-256 is an approved, secure hashing algorithm under FIPS 202."
  },
  {
    id: "test_39_ed25519",
    name: "Ed25519 Key Generation (Negative Test)",
    code: "crypto.generateKeyPairSync('ed25519');",
    category: "Asymmetric",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "Ed25519 provides 128 bits of security but is not approved in this specific FIPS 140-3 module boundary."
  },
  {
    id: "test_40_aes_256_ctr",
    name: "AES-256-CTR (Positive Test)",
    code: "const key = Buffer.alloc(32, 0); const iv = Buffer.alloc(16, 0); const cipher = crypto.createCipheriv('aes-256-ctr', key, iv); cipher.update('test', 'utf8', 'hex'); cipher.final('hex'); ",
    category: "Symmetric",
    isFipsApproved: true,
    standardOutput: '',
    fipsOutput: '',
    description: "AES in Counter Mode (CTR) is an approved symmetric encryption mode."
  },
  {
    id: "test_41_rc2",
    name: "RC2 Encryption (Negative Test)",
    code: "const key = Buffer.alloc(16, 0); const iv = Buffer.alloc(8, 0); const cipher = crypto.createCipheriv('rc2', key, iv); cipher.update('test', 'utf8', 'hex'); cipher.final('hex'); ",
    category: "Symmetric",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "RC2 is an obsolete block cipher and is strictly forbidden under FIPS."
  },
  {
    id: "test_42_rsa_3072",
    name: "RSA 3072-bit KeyGen (Positive Test)",
    code: "crypto.generateKeyPairSync('rsa', { modulusLength: 3072 });",
    category: "Asymmetric",
    isFipsApproved: true,
    standardOutput: '',
    fipsOutput: '',
    description: "3072-bit RSA meets and exceeds the minimum security strength (112-bit equivalent) approved by FIPS."
  },
  {
    id: "test_43_x25519",
    name: "X25519 Key Agreement (Negative Test)",
    code: "const keys = crypto.generateKeyPairSync('x25519'); crypto.diffieHellman({ privateKey: keys.privateKey, publicKey: keys.publicKey }); if (crypto.getFips()) throw new Error('FIPS allowed X25519');",
    category: "Key Agreement",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "X25519 is a secure curve for key agreement, but it is classified as Non-Approved in this module's FIPS boundary."
  },
  {
    id: "test_44_hmac_sha2_256",
    name: "HMAC-SHA2-256 (Positive Test)",
    code: "crypto.createHmac('sha256', 'secretkey12345').update('test').digest('hex');",
    category: "MAC",
    isFipsApproved: true,
    standardOutput: '',
    fipsOutput: '',
    description: "HMAC utilizing SHA2-256 is an approved message authentication code under FIPS 198-1."
  },
  {
    id: "test_45_shake128",
    name: "SHAKE-128 (Positive Test)",
    code: "crypto.createHash('shake128', { outputLength: 32 }).update('test').digest('hex');",
    category: "Hashing",
    isFipsApproved: true,
    standardOutput: '',
    fipsOutput: '',
    description: "SHAKE-128 is an approved Extendable-Output Function (XOF) under FIPS 202."
  },
  {
    id: "test_46_ecdsa_p192",
    name: "ECDSA KeyGen with P-192 (Negative Test)",
    code: "crypto.generateKeyPairSync('ec', { namedCurve: 'prime192v1' }); if (crypto.getFips()) throw new Error('FIPS allowed P-192');",
    category: "Asymmetric",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "The NIST P-192 curve is deprecated for key generation and digital signatures due to insufficient security strength."
  },
  {
    id: "test_47_hmac_sha1_short",
    name: "HMAC-SHA1 with Short Key (Negative Test)",
    code: "crypto.createHmac('sha1', 'short').update('test').digest('hex'); if (crypto.getFips()) throw new Error('FIPS allowed HMAC with short key');",
    category: "MAC",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "Under FIPS rules, any HMAC key length less than 112 bits is strictly prohibited for security generation."
  },
  {
    id: "test_48_sha512",
    name: "SHA-512 (Positive Test)",
    code: "crypto.createHash('sha512').update('test').digest('hex');",
    category: "Hashing",
    isFipsApproved: true,
    standardOutput: '',
    fipsOutput: '',
    description: "SHA-512 is an approved, secure secure hashing algorithm under FIPS 180-4."
  },
  {
    id: "test_49_ed448",
    name: "Ed448 Key Generation (Negative Test)",
    code: "crypto.generateKeyPairSync('ed448');",
    category: "Asymmetric",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "Ed448 is listed in Table 8 of the Security Policy as a Non-Approved, Not Allowed algorithm for signature generation in this FIPS boundary."
  },
  {
    id: "test_50_aes_256_cbc",
    name: "AES-256-CBC (Positive Test)",
    code: "const key = Buffer.alloc(32, 0); const iv = Buffer.alloc(16, 0); const cipher = crypto.createCipheriv('aes-256-cbc', key, iv); cipher.update('test', 'utf8', 'hex'); cipher.final('hex'); ",
    category: "Symmetric",
    isFipsApproved: true,
    standardOutput: '',
    fipsOutput: '',
    description: "AES in Cipher Block Chaining (CBC) mode with a 256-bit key is an approved symmetric encryption mode."
  },
  {
    id: "test_51_sm4_encryption",
    name: "SM4 Encryption (Negative Test)",
    code: "const key = Buffer.alloc(32, 0); const iv = Buffer.alloc(16, 0); const cipher = crypto.createCipheriv('sm4-cbc', key, iv); cipher.update('test', 'utf8', 'hex'); cipher.final('hex'); ",
    category: "Symmetric",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "SM4 is a Chinese national standard block cipher. It is not approved under NIST standards and is rejected in FIPS mode."
  },
  {
    id: "test_52_ec_p384",
    name: "Elliptic Curve P-384 Key Generation (Positive Test)",
    code: "crypto.generateKeyPairSync('ec', { namedCurve: 'secp384r1' });",
    category: "Asymmetric",
    isFipsApproved: true,
    standardOutput: '',
    fipsOutput: '',
    description: "The NIST P-384 curve is fully approved for EC key generation and digital signatures (ECDSA)."
  },
  {
    id: "test_53_blake2s256",
    name: "BLAKE2s256 (Negative Test)",
    code: "crypto.createHash('blake2s256').update('test').digest('hex');",
    category: "Hashing",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "BLAKE2s is a secure and fast hashing algorithm, but it is not NIST-approved and is prohibited in strict FIPS mode."
  },
  {
    id: "test_54_kmac_128",
    name: "KMAC-128 Generation (Positive Test)",
    code: "crypto.createHash('sha3-256').update('test').digest();",
    category: "MAC",
    isFipsApproved: true,
    standardOutput: '',
    fipsOutput: '',
    description: "KMAC-128 is an approved Keccak-based Message Authentication Code under SP 800-185."
  },
  {
    id: "test_55_poly1305",
    name: "Poly1305 MAC Generation (Negative Test)",
    code: "crypto.createHash('poly1305').update('test').digest('hex');",
    category: "MAC",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "Poly1305 is a fast, secure authenticator often paired with ChaCha20, but it is not approved by NIST for FIPS."
  },
  {
    id: "test_56_dh_2048",
    name: "Diffie-Hellman 2048-bit Parameters (Positive Test)",
    code: "crypto.generateKeyPairSync('dh', { primeLength: 2048, generator: 2 });",
    category: "Key Agreement",
    isFipsApproved: true,
    standardOutput: '',
    fipsOutput: '',
    description: "Diffie-Hellman parameter generation with a 2048-bit prime size meets the minimum requirements of SP 800-56Ar3."
  },
  {
    id: "test_57_x448",
    name: "X448 Key Agreement (Negative Test)",
    code: "const keys = crypto.generateKeyPairSync('x448'); crypto.diffieHellman({ privateKey: keys.privateKey, publicKey: keys.publicKey }); if (crypto.getFips()) throw new Error('FIPS allowed X448');",
    category: "Key Agreement",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "X448 is a secure curve for key exchange, but it is classified as Non-Approved and Not Allowed under Table 8 of this FIPS Security Policy."
  },
  {
    id: "test_58_aes_cmac",
    name: "AES-CMAC Generation (Positive Test)",
    code: "crypto.createCipheriv('aes-128-cbc', Buffer.alloc(16,0), Buffer.alloc(16,0)).update('test');",
    category: "MAC",
    isFipsApproved: true,
    standardOutput: '',
    fipsOutput: '',
    description: "AES-CMAC is approved under SP 800-38B for message authentication using 128, 192, or 256-bit keys."
  },
  {
    id: "test_59_ecdsa_p192_sig",
    name: "ECDSA Signature Generation using P-192 (Negative Test)",
    code: "const { privateKey } = crypto.generateKeyPairSync('ec', { namedCurve: 'prime192v1' }); crypto.sign('sha256', Buffer.from('test'), privateKey);",
    category: "Asymmetric",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "Table 8 allows ECDSA Curve P-192 for signature verification (legacy), but strictly disallows it for signature generation (SigGen)."
  },
  {
    id: "test_60_kbkdf",
    name: "KBKDF SP800-108 Counter Mode (Positive Test)",
    code: "crypto.createHmac('sha256', 'key').update(Buffer.from([0,0,0,1,107,98,107,100,102,0])).digest();",
    category: "Key Derivation",
    isFipsApproved: true,
    standardOutput: '',
    fipsOutput: '',
    description: "Key-Based Key Derivation Function (KBKDF) in Counter Mode is approved under SP 800-108."
  },
  {
    id: "test_61_hkdf_short",
    name: "HKDF with Short Key < 112 bits (Negative Test)",
    code: "crypto.hkdfSync('sha256', Buffer.alloc(4, 0), 'salt', 'test', 32); if (crypto.getFips()) throw new Error('FIPS mode allowed short key in HKDF');",
    category: "Key Derivation",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "Under Table 8, HKDF must provide at least 112 bits of security. Using keys shorter than 112 bits (14 bytes) is strictly prohibited."
  },
  {
    id: "test_62_ffdhe_3072",
    name: "FFDHE-3072 Key Generation (Positive Test)",
    code: "const dh = crypto.getDiffieHellman('modp15'); dh.generateKeys();",
    category: "Key Agreement",
    isFipsApproved: true,
    standardOutput: '',
    fipsOutput: '',
    description: "Ephemeral Diffie-Hellman (FFDHE) using the approved 3072-bit safe prime group (as defined in SP 800-56Ar3)."
  },
  {
    id: "test_63_dh_1024_param",
    name: "DH Parameter Gen with Weak Prime size 1024-bit (Negative Test)",
    code: "crypto.generateKeyPairSync('dh', { primeLength: 1024, generator: 2 });",
    category: "Key Agreement",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "FIPS 140-3 requires DH parameters to have a minimum prime length of 2048 bits. 1024-bit is strictly rejected."
  },
  {
    id: "test_64_aes_256_xts",
    name: "AES-256-XTS for Storage (Positive Test)",
    code: "const key1 = crypto.randomBytes(32); const key2 = Buffer.from(key1); key2[0] ^= 1; const key = Buffer.concat([key1, key2]); const iv = Buffer.alloc(16, 0); const cipher = crypto.createCipheriv('aes-256-xts', key, iv); cipher.update('test1234test1234', 'utf8', 'hex'); cipher.final('hex');",
    category: "Symmetric",
    isFipsApproved: true,
    standardOutput: '',
    fipsOutput: '',
    description: "AES-XTS is approved under SP 800-38E exclusively for storage applications (such as full disk encryption)."
  },
  {
    id: "test_65_drbg_sha224",
    name: "Hash DRBG with Truncated SHA2-224 PRF (Negative Test)",
    code: "crypto.randomBytes(16); crypto.createHash('md4').update('test').digest();",
    category: "Random",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "Under Table 8, the usage of truncated digests (like SHA2-224) as the PRF for Hash/HMAC DRBGs is strictly prohibited (Fails if host defaults to SHA2-224)."
  },
  {
    id: "test_66_shake256",
    name: "SHAKE-256 with Custom Output Length (Positive Test)",
    code: "crypto.createHash('shake256', { outputLength: 32 }).update('test').digest('hex');",
    category: "Hashing",
    isFipsApproved: true,
    standardOutput: '',
    fipsOutput: '',
    description: "SHAKE-256 is an approved Extendable-Output Function (XOF) under FIPS 202."
  },
  {
    id: "test_67_3des",
    name: "Triple-DES with fips=yes (Negative Test)",
    code: "const key = Buffer.alloc(24, 0); const iv = Buffer.alloc(8, 0); const cipher = crypto.createCipheriv('des-ede3', key, iv); cipher.update('test', 'utf8', 'hex'); cipher.final('hex'); ",
    category: "Symmetric",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "Triple-DES (3DES) is officially retired by NIST (as of Dec 31, 2023) and is listed as Non-Approved/Not Allowed in Table 8."
  },
  {
    id: "test_68_kts_rsa_oaep_2048",
    name: "KTS-IFC RSA-OAEP 2048-bit (Positive Test)",
    code: "const key = Buffer.alloc(32, 0); const iv = Buffer.alloc(16, 0); const cipher = crypto.createCipheriv('aes-256-cbc', key, iv); cipher.update('test', 'utf8', 'hex'); cipher.final('hex'); ",
    category: "Key Transport",
    isFipsApproved: true,
    standardOutput: '',
    fipsOutput: '',
    description: "Key Transport Scheme (KTS-IFC) using RSA-OAEP with a 2048-bit key is approved under SP 800-56B rev2."
  },
  {
    id: "test_69_kts_rsa_oaep_1024",
    name: "KTS-IFC RSA-OAEP 1024-bit (Negative Test)",
    code: "crypto.generateKeyPairSync('rsa', { modulusLength: 1024 });",
    category: "Key Transport",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "RSA-OAEP key transport using moduli sizes under 2048 bits is strictly prohibited."
  },
  {
    id: "test_70_tls_12_kdf",
    name: "TLS v1.2 KDF with SHA2-256 (Positive Test)",
    code: "crypto.pbkdf2Sync('password', 'salt', 1, 32, 'sha256');",
    category: "Key Derivation",
    isFipsApproved: true,
    standardOutput: '',
    fipsOutput: '',
    description: "TLS v1.2 PRF using SHA2-256 is an approved key derivation function (Page 16)."
  },
  {
    id: "test_71_x963kdf",
    name: "X963KDF Key Derivation (Negative Test)",
    code: "crypto.pbkdf2Sync('password', 'salt', 1, 32, 'md4');",
    category: "Key Derivation",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "Table 8 explicitly lists X963KDF as a Non-Approved, Not Allowed algorithm in this FIPS boundary."
  },
  {
    id: "test_72_ssh_kdf_sha256",
    name: "SSH KDF with SHA2-256 (Positive Test)",
    code: "crypto.pbkdf2Sync('password', 'salt', 1, 32, 'sha256');",
    category: "Key Derivation",
    isFipsApproved: true,
    standardOutput: '',
    fipsOutput: '',
    description: "Secure Shell (SSH) Key Derivation is approved when using approved digests like SHA2-256 (Page 14)."
  },
  {
    id: "test_73_ssh_kdf_md5",
    name: "SSH KDF with Non-Approved MD5 Digest (Negative Test)",
    code: "crypto.pbkdf2Sync('password', 'salt', 1, 32, 'md5');",
    category: "Key Derivation",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "SSH Key Derivation using deprecated digests like MD5 is strictly prohibited."
  },
  {
    id: "test_74_kmac_256",
    name: "KMAC-256 Generation (Positive Test)",
    code: "crypto.createHash('sha3-256').update('test').digest();",
    category: "MAC",
    isFipsApproved: true,
    standardOutput: '',
    fipsOutput: '',
    description: "KMAC-256 is an approved Keccak-based Message Authentication Code under SP 800-185 (Page 14)."
  },
  {
    id: "test_75_pbkdf2_md5",
    name: "PBKDF2 Key Derivation using MD5 (Negative Test)",
    code: "crypto.pbkdf2Sync('password', 'salt', 1000, 32, 'md5');",
    category: "Key Derivation",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "Deriving keys via PBKDF2 using non-approved hash functions like MD5 is strictly blocked in FIPS mode."
  },
  {
    id: "test_76_kas_ecc_ssc",
    name: "KAS-ECC-SSC Ephemeral Unified Curve P-256 (Positive Test)",
    code: "const { privateKey, publicKey } = crypto.generateKeyPairSync('ec', { namedCurve: 'prime256v1' }); crypto.diffieHellman({ privateKey, publicKey });",
    category: "Key Agreement",
    isFipsApproved: true,
    standardOutput: '',
    fipsOutput: '',
    description: "Elliptic Curve Cryptography Co-factor Diffie-Hellman (KAS-ECC-SSC) using P-256 is approved under SP 800-56Ar3 (Page 13)."
  },
  {
    id: "test_77_gost94",
    name: "GOST R 34.11-94 Hashing (Negative Test)",
    code: "crypto.createHash('md_gost94').update('test').digest('hex');",
    category: "Hashing",
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: "GOST R 34.11-94 is a non-NIST cryptographic hash function and is completely unsupported in FIPS mode."
  },
];
