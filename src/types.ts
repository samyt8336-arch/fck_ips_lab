export type TestCategory = 'Hashing' | 'Symmetric' | 'Asymmetric' | 'MAC' | 'Key Derivation' | 'Key Agreement' | 'Random' | 'Key Transport';

export interface TestCase {
  id: string;
  name: string;
  code: string;
  category: TestCategory;
  isFipsApproved: boolean; // if false, this is a negative test essentially when FIPS is on
  standardOutput: string;
  fipsOutput: string;
  description: string;
}

export type TestResult = 'passed' | 'failed' | 'pending' | 'running' | 'idle';

export interface TestExecution {
  testId: string;
  result: TestResult;
  timestamp: number;
}
