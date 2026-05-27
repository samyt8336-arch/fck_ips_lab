import { TestCase } from './types';

export const FIPS_TEST_SUITE: TestCase[] = [
  {
    id: 'test_1_md5',
    name: 'Testing MD5 (Should FAIL)',
    command: 'echo "test" > demo.txt && openssl md5 -provider fips demo.txt',
    category: 'Hashing',
    isFipsApproved: false,
    standardOutput: '',
    fipsOutput: '',
    description: 'MD5 is insecure and completely disabled under FIPS.'
  },
  {
    id: 'test_2_sha256',
    name: 'Testing SHA256 (Should PASS)',
    command: 'echo "test" > demo.txt && openssl sha256 -provider fips demo.txt',
    category: 'Hashing',
    isFipsApproved: true,
    standardOutput: '',
    fipsOutput: '',
    description: 'SHA256 is an approved hashing algorithm under FIPS.'
  }
];
