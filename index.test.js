import { string, number, array, object, set } from './index.js'

/*
https://jestjs.io/docs/expect#tothrowerror => You must wrap the code in a function, otherwise the error will not be caught and the assertion will fail.
*/

// string.reverse()

test('string.reverse', () => {
  expect(string.reverse('hello world')).toStrictEqual('dlrow olleh')

  // invalid parameter type
  expect(() => {
    string.reverse(69)
  }).toThrow()

  // undefined parameter (implicit)
  expect(() => {
    string.reverse()
  }).toThrow()

  // undefined parameter (explicit)
  expect(() => {
    string.reverse(undefined)
  }).toThrow()

  // null parameter
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

  // invalid parameter type
  expect(() => {
    string.slugify(69)
  }).toThrow()

  // missing parameters
  expect(() => {
    string.slugify()
  }).toThrow()
})

// string.compare()

test('string.compare', () => {
  // true
  expect(string.compare('The quick brown fox', 'The quick brown fox')).toBeTruthy()

  // false
  expect(string.compare('The quick brown fox', 'The quick brown foxes')).toBeFalsy()
})

// string.wordCount()

test('string.wordCount', () => {
  let strA = "the quick brown fox - 69"
  let strB = "a bb ccc dddd eeeee ffffff g"
  let strC = "JavaScript, TypeScript, and WebAssembly at the edge, worldwide."
  expect(string.wordCount(strA)).toStrictEqual(5)
  expect(string.wordCount(strB)).toStrictEqual(7)
  expect(string.wordCount(strC)).toStrictEqual(8)
})

// string.isAnagram()

test('string.isAnagram', () => {
  // true
  expect(string.isAnagram('paramdeo', 'oedmarap')).toBeTruthy()

  // false
  expect(string.isAnagram('paramdeo', 'oedmaraps')).toBeFalsy()
})

// number.range()

test('number.range', () => {
  expect(number.range(1, 10)).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
})

// number.multiply()

test('number.multiply', () => {
  // safe
  expect(number.multiply(5000, 2)).toStrictEqual(10000)

  // unsafe multiplier
  expect(() => {
    number.multiply(9007199254740992, 1)
  }).toThrow()

  // unsafe multiplicand
  expect(() => {
    number.multiply(1, 9007199254740992)
  }).toThrow()

  // unsafe product
  expect(() => {
    number.multiply(9007199254740991, 2)
  }).toThrow()
})

// number.random()

test('number.random', () => {
  expect(number.random(10)).toBeLessThanOrEqual(10)
})

// array.flatten()

test('array.flatten', () => {
  // numbers
  expect(array.flatten([1, 2, [3]])).toStrictEqual([1, 2, 3])
  expect(array.flatten([1, 2, [3], [[4, 5]]], 2)).toStrictEqual([1, 2, 3, 4, 5])
  expect(array.flatten([1, 2, [3], [[4, 5]]])).toStrictEqual([1, 2, 3, 4, 5])

  // strings
  expect(array.flatten(['a', 'bb', ['ccc']])).toStrictEqual(['a', 'bb', 'ccc'])
  expect(array.flatten(['a', 'bb', ['ccc'], [['dddd', 'eeeee']]], 2)).toStrictEqual(['a', 'bb', 'ccc', 'dddd', 'eeeee'])
  expect(array.flatten(['a', 'bb', ['ccc'], [['dddd', 'eeeee']]])).toStrictEqual(['a', 'bb', 'ccc', 'dddd', 'eeeee'])
})

// array.hasDuplicates()

test('array.hasDuplicates', () => {
  // numbers
  expect(array.hasDuplicates([1, 2, 3, 3])).toBeTruthy()
  expect(array.hasDuplicates([1, 2, 3])).toBeFalsy()

  // strings
  expect(array.hasDuplicates(['a', 'b', 'c', 'c'])).toBeTruthy()
  expect(array.hasDuplicates(['a', 'b', 'c'])).toBeFalsy()
})

// array.removeDuplicates()

test('array.removeDuplicates', () => {
  // numbers
  expect(array.removeDuplicates([1, 2, 3, 3])).toStrictEqual([1, 2, 3])

  // strings
  expect(array.removeDuplicates(['alice', 'bob', 'alice'])).toStrictEqual(['alice', 'bob'])

  // mixed elements
  expect(array.removeDuplicates([1, 2, 3, 3, 'alice', 'bob', 'alice'])).toStrictEqual([1, 2, 3, 'alice', 'bob'])
})

// array.sortNumbers()

test('array.sortNumbers', () => {
  // default (no sort parameter)
  expect(array.sortNumbers([1, 5, 66, 3, 9, 7, 99, 33])).toStrictEqual([1, 3, 5, 7, 9, 33, 66, 99])

  // malformed sort parameter
  expect(array.sortNumbers([1, 5, 66, 3, 9, 7, 99, 33])).toStrictEqual([1, 3, 5, 7, 9, 33, 66, 99])

  // ascending
  expect(array.sortNumbers([1, 5, 66, 3, 9, 7, 99, 33], { sort: 'asc' })).toStrictEqual([1, 3, 5, 7, 9, 33, 66, 99])

  // descending
  expect(array.sortNumbers([1, 5, 66, 3, 9, 7, 99, 33], { sort: 'desc' })).toStrictEqual([99, 66, 33, 9, 7, 5, 3, 1])
})

// array.sortStrings()

test('array.sortStrings', () => {
  let strings = ['foo', 'c', 'aa', 'bar', 'bbb']

  // default (no sort parameter)
  expect(array.sortStrings(strings)).toStrictEqual(['aa', 'bar', 'bbb', 'c', 'foo'])

  // malformed sort parameter
  expect(array.sortStrings(strings, { sort: 'hello' })).toStrictEqual(['aa', 'bar', 'bbb', 'c', 'foo'])

  // ascending
  expect(array.sortStrings(strings, { sort: 'asc' })).toStrictEqual(['aa', 'bar', 'bbb', 'c', 'foo'])

  // descending
  expect(array.sortStrings(strings, { sort: 'desc' })).toStrictEqual(['foo', 'c', 'bbb', 'bar', 'aa'])
})

// array.sortStringsByLength()

test('array.sortStringsByLength', () => {
  expect(array.sortStringsByLength(['aaa', 'b', 'cc', 'foo', 'bars'])).toStrictEqual(['b', 'cc', 'aaa', 'foo', 'bars'])
})

// array.sanitize()

test('array.sanitize', () => {
  // numbers
  let numbers = [1, 2, 3]
  numbers[-1] = 5
  numbers.foo = 69
  expect(array.sanitize(numbers)).toStrictEqual([1, 2, 3])

  // mixed
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

// object.isEmpty

test('object.isEmpty', () => {
  let notEmpty = { name: "Alice" }
  let empty = {}
  expect(object.isEmpty(notEmpty)).toBeFalsy()
  expect(object.isEmpty(empty)).toBeTruthy()
})

// object.parse()

test('object.parse', () => {
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
  expect(object.parse(malformedJSON)).toStrictEqual(wellFormedJSON)
})

// set.intersection()

test('set.intersection', () => {
  let SetA = new Set([1, 2, 3, 4, 5])
  let SetB = new Set([2, 3, 4, 5, 6])
  expect(Array.from(set.intersection(SetA, SetB))).toStrictEqual([2, 3, 4, 5])
})

// set.difference()

test('set.difference', () => {
  let SetA = new Set([1, 2, 3, 4, 5])
  let SetB = new Set([2, 3, 4, 5, 6])
  expect(Array.from(set.difference(SetA, SetB))).toStrictEqual([1, 6])
})

// set.union()

test('set.union', () => {
  let SetA = new Set([1, 2, 3, 4, 5])
  let SetB = new Set([2, 3, 4, 5, 6])
  expect(Array.from(set.union(SetA, SetB))).toStrictEqual([1, 2, 3, 4, 5, 6])
})

