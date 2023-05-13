import { string, array } from './index'

// Strings

test('string.reverse', () => {
  expect(string.reverse("hello world")).toStrictEqual("dlrow olleh")
})

test('string.reverse => Error', () => {
  // https://jestjs.io/docs/expect#tothrowerror => You must wrap the code in a function, otherwise the error will not be caught and the assertion will fail.
  expect(() => {
    // @ts-expect-error
    string.reverse(69)
  }).toThrow()
})

test('string.slugify', () => {
  const test = "The quick brown fox"
  const slug = /[A-Za-z0-9-]/
  expect(string.slugify(test)).toStrictEqual("the-quick-brown-fox")
  expect(string.slugify(test)).toStrictEqual(expect.stringMatching(slug))
})

// Arrays

test('array.flatten(numbers)', () => {
  expect(array.flatten([1, 2, [3]])).toStrictEqual([1, 2, 3])
  expect(array.flatten([1, 2, [3], [[4,5]]], 2)).toStrictEqual([1, 2, 3, 4, 5])
  expect(array.flatten([1, 2, [3], [[4,5]]])).toStrictEqual([1, 2, 3, 4, 5])
})

test('array.flatten(strings)', () => {
  expect(array.flatten(['a', 'bb', ['ccc']])).toStrictEqual(['a', 'bb', 'ccc'])
  expect(array.flatten(['a', 'bb', ['ccc'], [['dddd', 'eeeee']]], 2)).toStrictEqual(['a', 'bb', 'ccc', 'dddd', 'eeeee'])
  expect(array.flatten(['a', 'bb', ['ccc'], [['dddd', 'eeeee']]])).toStrictEqual(['a', 'bb', 'ccc', 'dddd', 'eeeee'])
})

test('array.removeDuplicates(numbers)', () => {
  expect(array.removeDuplicates([1, 2, 3, 3])).toStrictEqual([1, 2, 3])
})

test('array.removeDuplicates(words)', () => {
  expect(array.removeDuplicates(['alice', 'bob', 'alice'])).toStrictEqual(['alice', 'bob'])
})

test('array.removeDuplicates(mixed)', () => {
  expect(array.removeDuplicates([1, 2, 3, 3, 'alice', 'bob', 'alice'])).toStrictEqual([1, 2, 3, 'alice', 'bob'])
})

test('array.sortNumbers', () => {
  expect(array.sortNumbers([1,5,66,3,9,7,99,33])).toStrictEqual([1,3,5,7,9,33,66,99])
})

test('array.sortWordsByLength', () => {
  expect(array.sortWordsByLength(['aaa', 'b', 'cc', 'foo', 'bars'])).toStrictEqual(['b', 'cc', 'aaa', 'foo', 'bars'])
})


test('array.sanitize(numbers)', () => {
  let numbers = [1, 2, 3]
  numbers[-1] = 5
  expect(array.sanitize(numbers)).toStrictEqual([1, 2, 3])
})
