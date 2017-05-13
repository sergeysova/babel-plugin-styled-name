import { expect } from 'chai';
import { join } from 'path';
import { readFileSync } from 'fs';

import testPlugin from './testPlugin';

const FIXTURE_PATH = join(__dirname, 'fixtures');

describe('babel-plugin-import-node', () => {
  const actual = readFileSync(join(FIXTURE_PATH, 'actual.js'), 'utf8');
  const expected = readFileSync(join(FIXTURE_PATH, 'expected.js'), 'utf8');
  it('works', () => {
    const result = testPlugin(actual);
    expect(result.trim()).to.equal(expected.trim());
  });
});
