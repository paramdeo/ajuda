import { string, array } from './index'

// Strings

test('string.reverse', () => {
  const test = "hello world"
  expect(string.reverse(test)).toStrictEqual("dlrow olleh")
})

test('string.slugify', () => {
  const test = "The quick brown fox"
  const slug = /[A-Za-z0-9-]/
  expect(string.slugify(test)).toStrictEqual("the-quick-brown-fox")
  expect(string.slugify(test)).toStrictEqual(expect.stringMatching(slug))
})

// Arrays

test('array.sortNumbers', () => {
  const test = [1,5,3,8,6,92,45,87]
  expect(array.sortNumbers(test)).toStrictEqual([1,3,5,6,8,45,87,92])
})
