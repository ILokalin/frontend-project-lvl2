import { expect, it } from '@jest/globals';
import { formatString, getReport } from '../src/index.js';

describe('main app test', () => {
  it('formatString', () => {
    expect(formatString({ testKey: 'value' }, 'testKey', '-')).toBe('  - testKey: value\n');
    expect(formatString({ testKey: 'value' }, 'testKey', '+')).toBe('  + testKey: value\n');
    expect(formatString({ testKey: 'value' }, 'testKey')).toBe('    testKey: value\n');
  });
  it('getReport', () => {
    const dataReference = { keyNotChanged: 'test', keyUpdated: 20, keyRemoved: 2 };
    const dataCompare = { keyNotChanged: 'test', keyUpdated: 30, keyAdded: 100 };
    const keys = ['keyNotChanged', 'keyUpdated', 'keyAdded', 'keyRemoved'];

    const expected = `{
    keyNotChanged: test
  - keyUpdated: 20
  + keyUpdated: 30
  + keyAdded: 100
  - keyRemoved: 2
}`;
    expect(getReport({ dataCompare, dataReference, keys })).toBe(expected);
  });
});
