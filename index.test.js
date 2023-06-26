import { string, number, array, object, set, utils } from './index.js'

// Strings

test('string.reverse', () => {
  expect(string.reverse('hello world')).toStrictEqual('dlrow olleh')
})

test('string.reverse => Error', () => {
  // https://jestjs.io/docs/expect#tothrowerror => You must wrap the code in a function, otherwise the error will not be caught and the assertion will fail.
  expect(() => {
    string.reverse(69)
  }).toThrow()
})

test('string.slugify', () => {
  const test = 'The quick brown fox'
  const slug = /\w+-/
  expect(string.slugify(test)).toStrictEqual('the-quick-brown-fox')
  expect(string.slugify(test)).toStrictEqual(expect.stringMatching(slug))
})

test('string.compare', () => {
  expect(string.compare('The quick brown fox', 'The quick brown fox')).toBeTruthy()
})

test('string.isAnagram', () => {
  expect(string.isAnagram('paramdeo', 'oedmarap')).toBeTruthy()
})

// Numbers

test('number.range', () => {
  expect(number.range(1, 10)).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
})

test('number.multiply', () => {
  expect(number.multiply(5000, 2)).toStrictEqual(10000)
})

// Arrays

test('array.flatten(numbers)', () => {
  expect(array.flatten([1, 2, [3]])).toStrictEqual([1, 2, 3])
  expect(array.flatten([1, 2, [3], [[4, 5]]], 2)).toStrictEqual([1, 2, 3, 4, 5])
  expect(array.flatten([1, 2, [3], [[4, 5]]])).toStrictEqual([1, 2, 3, 4, 5])
})

test('array.flatten(strings)', () => {
  expect(array.flatten(['a', 'bb', ['ccc']])).toStrictEqual(['a', 'bb', 'ccc'])
  expect(array.flatten(['a', 'bb', ['ccc'], [['dddd', 'eeeee']]], 2)).toStrictEqual(['a', 'bb', 'ccc', 'dddd', 'eeeee'])
  expect(array.flatten(['a', 'bb', ['ccc'], [['dddd', 'eeeee']]])).toStrictEqual(['a', 'bb', 'ccc', 'dddd', 'eeeee'])
})

test('array.removeDuplicates(numbers)', () => {
  expect(array.removeDuplicates([1, 2, 3, 3])).toStrictEqual([1, 2, 3])
})

test('array.removeDuplicates(strings)', () => {
  expect(array.removeDuplicates(['alice', 'bob', 'alice'])).toStrictEqual(['alice', 'bob'])
})

test('array.removeDuplicates(mixed)', () => {
  expect(array.removeDuplicates([1, 2, 3, 3, 'alice', 'bob', 'alice'])).toStrictEqual([1, 2, 3, 'alice', 'bob'])
})

test('array.sortNumbers', () => {
  expect(array.sortNumbers([1, 5, 66, 3, 9, 7, 99, 33])).toStrictEqual([1, 3, 5, 7, 9, 33, 66, 99])
})

test('array.sortWordsByLength', () => {
  expect(array.sortWordsByLength(['aaa', 'b', 'cc', 'foo', 'bars'])).toStrictEqual(['b', 'cc', 'aaa', 'foo', 'bars'])
})

test('array.sanitize(numbers)', () => {
  let numbers = [1, 2, 3]
  numbers[-1] = 5
  numbers.foo = 69
  expect(array.sanitize(numbers)).toStrictEqual([1, 2, 3])
})

test('array.sanitize(mixed)', () => {
  let mixed = [1, 2, 3, 'alice', 'bob']
  mixed.foo = 'bar'
  mixed[-1] = 69
  expect(array.sanitize(mixed)).toStrictEqual([1, 2, 3, 'alice', 'bob'])
})

test('array.isEqual', () => {
  let arr = [1, 2, 3, 4, 5]
  let _arr = arr
  expect(array.isEqual(arr, _arr)).toBeTruthy()
})

// Objects

test('object.parseJSON', () => {
  let malformedJSON = {
      alpha: "bravo",
      "charlie": "delta",
      1: 2
    }
  let wellFormedJSON = {
      "1": 2,
      "alpha": "bravo",
      "charlie": "delta"
    }
  expect(object.parseJSON(malformedJSON)).toStrictEqual(wellFormedJSON)
})

// Sets

test('set.intersection', () => {
  let SetA = new Set([1, 2, 3, 4, 5])
  let SetB = new Set([2, 3, 4, 5, 6])
  expect(Array.from(set.intersection(SetA, SetB))).toStrictEqual([2, 3, 4, 5])
})

test('set.difference', () => {
  let SetA = new Set([1, 2, 3, 4, 5])
  let SetB = new Set([2, 3, 4, 5, 6])
  expect(Array.from(set.difference(SetA, SetB))).toStrictEqual([1, 6])
})

test('set.union', () => {
  let SetA = new Set([1, 2, 3, 4, 5])
  let SetB = new Set([2, 3, 4, 5, 6])
  expect(Array.from(set.union(SetA, SetB))).toStrictEqual([1, 2, 3, 4, 5, 6])
})

test('utils.randomNumber', () => {
  expect(utils.randomNumber(10)).toBeLessThanOrEqual(10)
})

