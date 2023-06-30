import { string, number, array, object, set } from './index.js'

// string.reverse()

test('string.reverse', () => {
  expect(string.reverse('hello world')).toStrictEqual('dlrow olleh')
})

test('string.reverse --> Error: Invalid parameter type', () => {
  // https://jestjs.io/docs/expect#tothrowerror => You must wrap the code in a function, otherwise the error will not be caught and the assertion will fail.
  expect(() => {
    string.reverse(69)
  }).toThrow()
})

test('string.reverse --> Error: Implicit undefined parameter', () => {
  expect(() => {
    string.reverse()
  }).toThrow()
})

test('string.reverse --> Error: Explicit undefined parameter', () => {
  expect(() => {
    string.reverse(undefined)
  }).toThrow()
})

test('string.reverse --> Error: Null parameter', () => {
  expect(() => {
    string.reverse(null)
  }).toThrow()
})

// string.slugify()

test('string.slugify', () => {
  const test = 'The quick brown fox'
  const _test = 'Alice and Bob!'
  const slug = /\w+-/
  expect(string.slugify(test)).toStrictEqual('the-quick-brown-fox')
  expect(string.slugify(_test)).toStrictEqual('alice-and-bob')
  expect(string.slugify(test)).toStrictEqual(expect.stringMatching(slug))
})

test('string.slugify --> Error: Invalid parameter type', () => {
  // https://jestjs.io/docs/expect#tothrowerror => You must wrap the code in a function, otherwise the error will not be caught and the assertion will fail.
  expect(() => {
    string.slugify(69)
  }).toThrow()
})

test('string.slugify --> Error: Missing parameters', () => {
  expect(() => {
    string.slugify()
  }).toThrow()
})

// string.compare()

test('string.compare(true)', () => {
  expect(string.compare('The quick brown fox', 'The quick brown fox')).toBeTruthy()
})

test('string.compare(false)', () => {
  expect(string.compare('The quick brown fox', 'The quick brown foxes')).toBeFalsy()
})

test('string.isAnagram(true)', () => {
  expect(string.isAnagram('paramdeo', 'oedmarap')).toBeTruthy()
})

test('string.isAnagram(false)', () => {
  expect(string.isAnagram('paramdeo', 'oedmaraps')).toBeFalsy()
})

// Numbers

test('number.range', () => {
  expect(number.range(1, 10)).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
})

test('number.multiply(safe)', () => {
  expect(number.multiply(5000, 2)).toStrictEqual(10000)
})

test('number.multiply --> Error: Unsafe multiplier', () => {
  expect(() => {
    number.multiply(9007199254740992, 1)
  }).toThrow()
})

test('number.multiply --> Error: Unsafe multiplicand', () => {
  expect(() => {
    number.multiply(1, 9007199254740992)
  }).toThrow()
})

test('number.multiply --> Error: Unsafe product', () => {
  expect(() => {
    number.multiply(9007199254740991, 2)
  }).toThrow()
})

test('number.random', () => {
  expect(number.random(10)).toBeLessThanOrEqual(10)
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

test('array.sortNumbers(default)', () => {
  expect(array.sortNumbers([1, 5, 66, 3, 9, 7, 99, 33])).toStrictEqual([1, 3, 5, 7, 9, 33, 66, 99])
})

test('array.sortNumbers(ascending)', () => {
  expect(array.sortNumbers([1, 5, 66, 3, 9, 7, 99, 33], { sort: 'asc' })).toStrictEqual([1, 3, 5, 7, 9, 33, 66, 99])
})

test('array.sortNumbers(descending)', () => {
  expect(array.sortNumbers([1, 5, 66, 3, 9, 7, 99, 33], { sort: 'desc' })).toStrictEqual([99, 66, 33, 9, 7, 5, 3, 1])
})

test('array.sortStringsByLength', () => {
  expect(array.sortStringsByLength(['aaa', 'b', 'cc', 'foo', 'bars'])).toStrictEqual(['b', 'cc', 'aaa', 'foo', 'bars'])
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

