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

  // invalid parameter type
  expect(() => {
    string.compare(69)
  }).toThrow()

  // missing parameters
  expect(() => {
    string.compare()
  }).toThrow()
})

// string.wordCount()

test('string.wordCount', () => {
  let alpha = "the quick brown fox - 69"
  let bravo = "a bb ccc dddd eeeee ffffff g"
  let charlie = "JavaScript, TypeScript, and WebAssembly at the edge, worldwide."
  expect(string.wordCount(alpha)).toStrictEqual(5)
  expect(string.wordCount(bravo)).toStrictEqual(7)
  expect(string.wordCount(charlie)).toStrictEqual(8)

  // invalid parameter type
  expect(() => {
    string.wordCount(69)
  }).toThrow()

  // missing parameters
  expect(() => {
    string.wordCount()
  }).toThrow()
})

// string.isAnagram()

test('string.isAnagram', () => {
  // true
  expect(string.isAnagram('paramdeo', 'oedmarap')).toBeTruthy()

  // false
  expect(string.isAnagram('paramdeo', 'oedmaraps')).toBeFalsy()

  // invalid parameter type
  expect(() => {
    string.isAnagram(69)
  }).toThrow()

  // missing parameters
  expect(() => {
    string.isAnagram()
  }).toThrow()
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

  // invalid parameter type
  expect(() => {
    number.multiply(69, 'alpha')
  }).toThrow()

  // missing parameters
  expect(() => {
    number.multiply()
  }).toThrow()
})

// number.random()

test('number.random', () => {
  expect(number.random(10)).toBeLessThanOrEqual(10)

  // invalid parameter type
  expect(() => {
    number.random('alpha')
  }).toThrow()

  // missing parameters
  expect(() => {
    number.random()
  }).toThrow()
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

  // invalid parameter type
  expect(() => {
    array.flatten('alpha')
  }).toThrow()

  // missing parameters
  expect(() => {
    array.flatten()
  }).toThrow()
})

// array.hasDuplicates()

test('array.hasDuplicates', () => {
  // numbers
  expect(array.hasDuplicates([1, 2, 3, 3])).toBeTruthy()
  expect(array.hasDuplicates([1, 2, 3])).toBeFalsy()

  // strings
  expect(array.hasDuplicates(['a', 'b', 'c', 'c'])).toBeTruthy()
  expect(array.hasDuplicates(['a', 'b', 'c'])).toBeFalsy()

  // invalid parameter type
  expect(() => {
    array.hasDuplicates('alpha')
  }).toThrow()

  // missing parameters
  expect(() => {
    array.hasDuplicates()
  }).toThrow()
})

// array.removeDuplicates()

test('array.removeDuplicates', () => {
  // numbers
  expect(array.removeDuplicates([1, 2, 3, 3])).toStrictEqual([1, 2, 3])

  // strings
  expect(array.removeDuplicates(['alice', 'bob', 'alice'])).toStrictEqual(['alice', 'bob'])

  // mixed elements
  expect(array.removeDuplicates([1, 2, 3, 3, 'alice', 'bob', 'alice'])).toStrictEqual([1, 2, 3, 'alice', 'bob'])

  // invalid parameter type
  expect(() => {
    array.removeDuplicates('alpha')
  }).toThrow()

  // missing parameters
  expect(() => {
    array.removeDuplicates()
  }).toThrow()
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

  // invalid parameter type
  expect(() => {
    array.sortNumbers('alpha')
  }).toThrow()

  // missing parameters
  expect(() => {
    array.sortNumbers()
  }).toThrow()
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

  // invalid parameter type
  expect(() => {
    array.sortStrings('alpha')
  }).toThrow()

  // missing parameters
  expect(() => {
    array.sortStrings()
  }).toThrow()
})

// array.sortStringsByLength()

test('array.sortStringsByLength', () => {
  expect(array.sortStringsByLength(['aaa', 'b', 'cc', 'foo', 'bars'])).toStrictEqual(['b', 'cc', 'aaa', 'foo', 'bars'])

  // invalid parameter type
  expect(() => {
    array.sortStringsByLength('alpha')
  }).toThrow()

  // missing parameters
  expect(() => {
    array.sortStringsByLength()
  }).toThrow()
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

  // invalid parameter type
  expect(() => {
    array.sanitize('alpha')
  }).toThrow()

  // missing parameters
  expect(() => {
    array.sanitize()
  }).toThrow()
})

// array.isEqual

test('array.isEqual', () => {
  let alpha = [1, 2, 3, 4, 5]
  let bravo = [1, 2, 3, 4, 5]
  let charlie = [1, 2, 4, 3, 5] 
  expect(array.isEqual(alpha, bravo)).toBeTruthy()
  expect(array.isEqual(alpha, charlie)).toBeFalsy()
  // invalid parameter type
  expect(() => {
    array.flatten('alpha', 69)
  }).toThrow()

  // missing parameters
  expect(() => {
    array.flatten()
  }).toThrow()
})

// object.isEmpty

test('object.isEmpty', () => {
  let notEmpty = { name: "Alice" }
  let empty = {}
  expect(object.isEmpty(notEmpty)).toBeFalsy()
  expect(object.isEmpty(empty)).toBeTruthy()

  // invalid parameter type
  expect(() => {
    object.isEmpty('alpha')
  }).toThrow()

  // missing parameters
  expect(() => {
    object.isEmpty()
  }).toThrow()
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

  // invalid parameter type
  expect(() => {
    object.parse('alpha')
  }).toThrow()

  // missing parameters
  expect(() => {
    object.parse()
  }).toThrow()
})

// set.intersection()

test('set.intersection', () => {
  let SetA = new Set([1, 2, 3, 4, 5])
  let SetB = new Set([2, 3, 4, 5, 6])
  expect(Array.from(set.intersection(SetA, SetB))).toStrictEqual([2, 3, 4, 5])

  // invalid parameter type
  expect(() => {
    (Array.from(set.intersection('alpha', 69)))
  }).toThrow()

  // missing parameters
  expect(() => {
    (Array.from(set.intersection()))
  }).toThrow()
})

// set.difference()

test('set.difference', () => {
  let SetA = new Set([1, 2, 3, 4, 5])
  let SetB = new Set([2, 3, 4, 5, 6])
  expect(Array.from(set.difference(SetA, SetB))).toStrictEqual([1, 6])

  // invalid parameter type
  expect(() => {
    (Array.from(set.difference('alpha', 69)))
  }).toThrow()

  // missing parameters
  expect(() => {
    (Array.from(set.difference()))
  }).toThrow()
})

// set.union()

test('set.union', () => {
  let SetA = new Set([1, 2, 3, 4, 5])
  let SetB = new Set([2, 3, 4, 5, 6])
  expect(Array.from(set.union(SetA, SetB))).toStrictEqual([1, 2, 3, 4, 5, 6])

  // invalid parameter type
  expect(() => {
    (Array.from(set.union('alpha', 69)))
  }).toThrow()

  // missing parameters
  expect(() => {
    (Array.from(set.union()))
  }).toThrow()
})
