import { TestCase } from './types';

export const FIPS_TEST_SUITE: TestCase[] = [
  {
    id: 'test_1_md5',
    name: 'MD5 (Negative Test)',
    command: 'echo "test" | openssl dgst -md5 -provider fips',
    category: 'Hashing',
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: 'MD5 is cryptographically broken and strictly prohibited under FIPS for any digital signature or hashing application.'
  },
  {
    id: 'test_2_sha1',
    name: 'SHA-1 Digital Signature (Negative Test)',
    command: 'openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -out rsa_key.pem && echo "test" | openssl dgst -sha1 -sign rsa_key.pem -provider fips',
    category: 'Hashing',
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: 'SHA-1 hashing is allowed, but strictly disallowed for digital signatures by NIST due to collision vulnerabilities.'
  },
  {
     id: 'test_3_sha256',
     name: 'SHA-256 (Positive Test)',
     command: 'echo "test" | openssl dgst -sha256 -provider fips',
     category: 'Hashing',
     isFipsApproved: true,
     standardOutput: '',
     fipsOutput: '',
     description: 'SHA-256 is an approved, secure hashing algorithm under FIPS 180-4.'
  },
  {
     id: 'test_4_sha3_512',
     name: 'SHA-3 / 512 (Positive Test)',
     command: 'echo "test" | openssl dgst -sha3-512 -provider fips',
     category: 'Hashing',
     isFipsApproved: true,
     standardOutput: '',
     fipsOutput: '',
     description: 'SHA-3 is the latest generation of approved hashing algorithms (FIPS 202).'
  },
  {
     id: 'test_5_rsa_1024',
     name: 'RSA 1024-bit (Negative Test)',
     command: 'openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:1024 -provider fips',
     category: 'Asymmetric',
     isFipsApproved: false,
     standardOutput: '',
     fipsOutput: '',
     description: 'NIST SP 800-131A dictates that RSA keys must be at least 2048 bits long. 1024-bit is considered weak.'
  },
  {
     id: 'test_6_rsa_2048',
     name: 'RSA 2048-bit (Positive Test)',
     command: 'openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -provider fips',
     category: 'Asymmetric',
     isFipsApproved: true,
     standardOutput: '',
     fipsOutput: '',
     description: '2048-bit RSA meets the minimum security strength approved by FIPS.'
  },
  {
     id: 'test_7_ec_p256',
     name: 'Elliptic Curve Secp256r1 (Positive Test)',
     command: 'openssl genpkey -algorithm EC -pkeyopt ec_paramgen_curve:prime256v1 -provider fips',
     category: 'Asymmetric',
     isFipsApproved: true,
     standardOutput: '',
     fipsOutput: '',
     description: 'The NIST P-256 curve is highly recommended and approved for key generation and digital signatures (ECDSA).'
  },
  {
     id: 'test_8_des',
     name: 'DES (Negative Test)',
     command: 'echo "test" > data.txt && openssl enc -des -in data.txt -out data.enc -K 0123456789ABCDEF -provider fips',
     category: 'Symmetric',
     isFipsApproved: false,
     standardOutput: '',
     fipsOutput: '',
     description: 'Data Encryption Standard (DES) is entirely obsolete, broken, and withdrawn from FIPS approval.'
  },
  {
     id: 'test_9_3des',
     name: '3DES / Triple DES (Negative Test)',
     command: 'echo "test" > data.txt && openssl enc -des3 -in data.txt -out data.enc -K 0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF -provider fips',
     category: 'Symmetric',
     isFipsApproved: false,
     standardOutput: '',
     fipsOutput: '',
     description: '3DES is officially deprecated and retired by NIST as of Dec 31, 2023.'
  },
  {
     id: 'test_10_aes_256_gcm',
     name: 'AES-256-GCM (Positive Test)',
     command: 'echo "test" > data.txt && openssl enc -aes-256-gcm -in data.txt -out data.enc -K 0000000000000000000000000000000000000000000000000000000000000000 -iv 000000000000000000000000 -provider fips',
     category: 'Symmetric',
     isFipsApproved: true,
     standardOutput: '',
     fipsOutput: '',
     description: 'AES in Galois/Counter Mode (GCM) is the gold standard for Authenticated Encryption (AEAD) under FIPS.'
  },
  {
     id: 'test_11_aes_128_ecb',
     name: 'AES-128-ECB (Positive Test)',
     command: 'echo "test" > data.txt && openssl enc -aes-128-ecb -in data.txt -out data.enc -K 00000000000000000000000000000000 -provider fips',
     category: 'Symmetric',
     isFipsApproved: true,
     standardOutput: '',
     fipsOutput: '',
     description: 'ECB mode structurally weak. Allowed by FIPS provider math, but forbidden by strict security policy. Testing as POSITIVE to verify provider.'
  },
  {
     id: 'test_12_rc4',
     name: 'RC4 (Negative Test)',
     command: 'echo "test" > data.txt && openssl enc -rc4 -in data.txt -out data.enc -K 0123456789ABCDEF -provider fips',
     category: 'Symmetric',
     isFipsApproved: false,
     standardOutput: '',
     fipsOutput: '',
     description: 'RC4 is a vulnerable stream cipher with multiple known biases and is strictly forbidden under FIPS 140-2 and 140-3.'
  },
  {
     id: 'test_13_blowfish',
     name: 'Blowfish (Negative Test)',
     command: 'echo "test" > data.txt && openssl enc -bf -in data.txt -out data.enc -K 0123456789ABCDEF0123456789ABCDEF -provider fips',
     category: 'Symmetric',
     isFipsApproved: false,
     standardOutput: '',
     fipsOutput: '',
     description: 'Blowfish is a non-approved legacy block cipher with a 64-bit block size and is not FIPS-compliant.'
  },
  {
     id: 'test_14_dsa_1024',
     name: 'DSA 1024-bit (Negative Test)',
     command: 'openssl dsaparam -out dsaparam.pem 1024 && openssl gendsa -out dsa_key.pem dsaparam.pem -provider fips',
     category: 'Asymmetric',
     isFipsApproved: false,
     standardOutput: '',
     fipsOutput: '',
     description: 'NIST SP 800-131A strictly disallows Digital Signature Algorithm (DSA) keys less than 2048 bits for digital signature generation.'
  },
  {
     id: 'test_15_md4',
     name: 'MD4 (Negative Test)',
     command: 'echo "test" | openssl dgst -md4 -provider fips',
     category: 'Hashing',
     isFipsApproved: false,
     standardOutput: '',
     fipsOutput: '',
     description: 'MD4 is an obsolete cryptographic hash function with severe collision vulnerabilities and is strictly prohibited by FIPS.'
  },
  {
     id: 'test_16_hmac_md5',
     name: 'HMAC-MD5 (Negative Test)',
     command: 'echo "test" | openssl dgst -md5 -hmac "secretkey" -provider fips',
     category: 'MAC',
     isFipsApproved: false,
     standardOutput: '',
     fipsOutput: '',
     description: 'While HMAC is an approved algorithm, using it in conjunction with the broken MD5 hash function is completely rejected by FIPS.'
  },
  {
     id: 'test_17_dh_1024',
     name: 'DH 1024-bit (Negative Test)',
     command: 'openssl dhparam -out dhparam.pem 1024 -provider fips',
     category: 'Key Agreement',
     isFipsApproved: false,
     standardOutput: '',
     fipsOutput: '',
     description: 'Diffie-Hellman (DH) key exchange using a 1024-bit prime is considered weak and is prohibited by NIST SP 800-131A (requires minimum 2048-bit).'
  },
  {
     id: 'test_18_cast5',
     name: 'CAST5 / CAST-128 (Negative Test)',
     command: 'echo "test" > data.txt && openssl enc -cast5-cbc -in data.txt -out data.enc -K 0123456789ABCDEF0123456789ABCDEF -provider fips',
     category: 'Symmetric',
     isFipsApproved: false,
     standardOutput: '',
     fipsOutput: '',
     description: 'CAST5 is a legacy symmetric encryption algorithm that is not FIPS-approved and must be rejected by the FIPS provider.'
  },
  {
     id: 'test_19_idea',
     name: 'IDEA (Negative Test)',
     command: 'echo "test" > data.txt && openssl enc -idea -in data.txt -out data.enc -K 00112233445566778899AABBCCDDEEFF -provider fips',
     category: 'Symmetric',
     isFipsApproved: false,
     standardOutput: '',
     fipsOutput: '',
     description: 'International Data Encryption Algorithm (IDEA) is a patented, non-NIST standard block cipher completely prohibited in FIPS mode.'
  },
  {
     id: 'test_20_rsa_md5',
     name: 'RSA Signature with MD5 (Negative Test)',
     command: 'openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -out rsa_key.pem && echo "test" | openssl dgst -md5 -sign rsa_key.pem -provider fips',
     category: 'Asymmetric',
     isFipsApproved: false,
     standardOutput: '',
     fipsOutput: '',
     description: 'Even if a strong 2048-bit RSA key is used, generating a digital signature using the MD5 digest is strictly forbidden by NIST.'
  },
  {
     id: 'test_21_rsa_1536',
     name: 'RSA 1536-bit (Negative Test)',
     command: 'openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:1536 -provider fips',
     category: 'Asymmetric',
     isFipsApproved: false,
     standardOutput: '',
     fipsOutput: '',
     description: 'While stronger than 1024-bit, 1536-bit RSA still falls short of the NIST SP 800-131A minimum requirement of 2048 bits for key generation.'
  },
  {
     id: 'test_22_ripemd160',
     name: 'RIPEMD160 (Negative Test)',
     command: 'echo "test" | openssl dgst -ripemd160 -provider fips',
     category: 'Hashing',
     isFipsApproved: false,
     standardOutput: '',
     fipsOutput: '',
     description: 'RIPEMD-160 is a cryptographic hash function that is not approved by NIST for FIPS validation.'
  },
  {
     id: 'test_23_sm3',
     name: 'SM3 (Negative Test)',
     command: 'echo "test" | openssl dgst -sm3 -provider fips',
     category: 'Hashing',
     isFipsApproved: false,
     standardOutput: '',
     fipsOutput: '',
     description: 'SM3 is a Chinese national standard cryptographic hash function. It is not approved under FIPS 180-4 or FIPS 202 and will be rejected.'
  },
  {
     id: 'test_24_blake2b512',
     name: 'BLAKE2b512 (Negative Test)',
     command: 'echo "test" | openssl dgst -blake2b512 -provider fips',
     category: 'MAC',
     isFipsApproved: false,
     standardOutput: '',
     fipsOutput: '',
     description: 'Despite being highly secure, BLAKE2 is not included in the current FIPS approved lists and fails in strict FIPS mode.'
  },
  {
     id: 'test_25_chacha20',
     name: 'ChaCha20 (Negative Test)',
     command: 'echo "test" > data.txt && openssl enc -chacha20 -in data.txt -out data.enc -K 00112233445566778899AABBCCDDEEFF00112233445566778899AABBCCDDEEFF -iv 00112233445566778899AABB -provider fips',
     category: 'Symmetric',
     isFipsApproved: false,
     standardOutput: '',
     fipsOutput: '',
     description: 'ChaCha20 is a highly secure and popular stream cipher, but it is not currently approved by NIST under FIPS 140-2/3 standards.'
  },
  {
     id: 'test_26_camellia',
     name: 'Camellia (Negative Test)',
     command: 'echo "test" > data.txt && openssl enc -camellia-128-cbc -in data.txt -out data.enc -K 0123456789ABCDEF0123456789ABCDEF -provider fips',
     category: 'Symmetric',
     isFipsApproved: false,
     standardOutput: '',
     fipsOutput: '',
     description: 'Camellia is a strong ISO/IEC standard block cipher, but it is entirely outside the scope of NIST FIPS-approved algorithms.'
  },
  {
     id: 'test_27_secp256k1',
     name: 'Elliptic Curve secp256k1 (Negative Test)',
     command: 'openssl genpkey -algorithm EC -pkeyopt ec_paramgen_curve:secp256k1 -provider fips',
     category: 'Asymmetric',
     isFipsApproved: false,
     standardOutput: '',
     fipsOutput: '',
     description: 'While secp256k1 is famously used in Bitcoin and is secure, it is NOT a NIST-approved curve and is rejected in FIPS mode.'
  },
  {
     id: 'test_28_rsa_512',
     name: 'RSA 512-bit (Negative Test)',
     command: 'openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:512 -provider fips',
     category: 'Asymmetric',
     isFipsApproved: false,
     standardOutput: '',
     fipsOutput: '',
     description: '512-bit RSA is trivially breakable today (e.g., RSA-155 factorization) and is strictly blocked by the FIPS provider.'
  },
  {
     id: 'test_29_whirlpool',
     name: 'Whirlpool (Negative Test)',
     command: 'echo "test" | openssl dgst -whirlpool -provider fips',
     category: 'Hashing',
     isFipsApproved: false,
     standardOutput: '',
     fipsOutput: '',
     description: 'Whirlpool is an ISO/IEC standard hash function, but it lacks FIPS validation and will be rejected.'
  },
  {
     id: 'test_30_mdc2',
     name: 'MDC2 (Negative Test)',
     command: 'echo "test" | openssl dgst -mdc2 -provider fips',
     category: 'Hashing',
     isFipsApproved: false,
     standardOutput: '',
     fipsOutput: '',
     description: 'MDC-2 is an outdated IBM cryptographic hash function based on DES, making it completely unsupported and forbidden in FIPS.'
  },
  {
     id: 'test_31_dh_512',
     name: 'DH 512-bit (Negative Test)',
     command: 'openssl dhparam -out dhparam.pem 512 -provider fips',
     category: 'Key Agreement',
     isFipsApproved: false,
     standardOutput: '',
     fipsOutput: '',
     description: '512-bit Diffie-Hellman parameters are extremely weak, completely vulnerable to Logjam attacks, and strictly forbidden by FIPS.'
  },
  {
     id: 'test_32_aes_192_ofb',
     name: 'AES-192-OFB (Negative Test)',
     command: 'echo "test" > data.txt && openssl enc -aes-192-ofb -in data.txt -out data.enc -K 000000000000000000000000000000000000000000000000 -iv 000000000000000000000000 -provider fips',
     category: 'Symmetric',
     isFipsApproved: false,
     standardOutput: '',
     fipsOutput: '',
     description: 'While AES is the standard, modes like OFB (Output Feedback) are often unsupported in FIPS providers in strict OpenSSL implementations and will be rejected.'
  },
  {
     id: 'test_33_seed',
     name: 'SEED (Negative Test)',
     command: 'echo "test" > data.txt && openssl enc -seed-cbc -in data.txt -out data.enc -K 0123456789ABCDEF0123456789ABCDEF -provider fips',
     category: 'Symmetric',
     isFipsApproved: false,
     standardOutput: '',
     fipsOutput: '',
     description: 'The SEED algorithm is a Korean standard (KISA), secure in its context, but not within the NIST approved list for FIPS.'
  },
  {
     id: 'test_34_dsa_512',
     name: 'DSA 512-bit (Negative Test)',
     command: 'openssl dsaparam -out dsaparam.pem 512 -provider fips && openssl gendsa -out dsa_key.pem dsaparam.pem -provider fips',
     category: 'Asymmetric',
     isFipsApproved: false,
     standardOutput: '',
     fipsOutput: '',
     description: 'DSA with a 512-bit key is considered completely insecure and obsolete, strictly rejected according to NIST SP 800-131A policy.'
  },
  {
     id: 'test_35_rsa_pss_sha1',
     name: 'RSA-PSS with SHA-1 (Negative Test)',
     command: 'openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -out rsa_key.pem && echo "test" | openssl dgst -sha1 -sign rsa_key.pem -sigopt rsa_padding_mode:pss -provider fips',
     category: 'Asymmetric',
     isFipsApproved: false,
     standardOutput: '',
     fipsOutput: '',
     description: 'RSA-PSS signature is modern, but combining it with SHA-1 (not used for signatures) makes the operation rejected in a strict FIPS environment.'
  },
  {
     id: 'test_36_gost',
     name: 'GOST 28147 (Negative Test)',
     command: 'echo "test" | openssl dgst -gost -provider fips',
     category: 'Hashing',
     isFipsApproved: false,
     standardOutput: '',
     fipsOutput: '',
     description: 'The GOST algorithm is a Russian standard, and is completely absent from the OpenSSL FIPS library.'
  },
  {
     id: 'test_37_hmac_sha1',
     name: 'HMAC-SHA-1 (Negative Test)',
     command: 'echo "test" | openssl dgst -sha1 -hmac "secretkey" -provider fips',
     category: 'MAC',
     isFipsApproved: false,
     standardOutput: '',
     fipsOutput: '',
     description: 'Although SHA-1 may be used for Hashing in limited cases, its use in HMAC (as MAC) is often rejected in strict FIPS security policies.'
  }
];
