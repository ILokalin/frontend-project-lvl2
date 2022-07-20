// @ts-check
import _ from 'lodash';

export const buildDiff = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));

  return _.sortBy(keys).map((key) => {
    const referenceValue = data1[key];
    const compareValue = data2[key];

    if (!_.has(data1, key)) {
      return {
        key,
        type: 'added',
        value: compareValue,
      };
    }

    if (!_.has(data2, key)) {
      return {
        key,
        type: 'removed',
        value: referenceValue,
      };
    }

    if (_.isPlainObject(referenceValue) && _.isPlainObject(compareValue)) {
      return {
        key,
        type: 'nested',
        children: buildDiff(referenceValue, compareValue),
      };
    }

    if (_.isEqual(referenceValue, compareValue)) {
      return {
        key,
        type: 'unchanged',
        value: referenceValue,
      };
    }

    return {
      key,
      type: 'changed',
      value1: referenceValue,
      value2: compareValue,
    };
  });
};

export default (data1, data2) => ({
  type: 'root',
  children: buildDiff(data1, data2),
});
