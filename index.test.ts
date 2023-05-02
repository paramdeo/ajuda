import { string, array } from './index'

// string

test('Reverse "hello world" string via string.reverse', () => {
  expect(string.reverse("hello world")).toBe("dlrow olleh")
})

test('Slugify "The quick brown fox" string via string.slugify', () => {
  expect(string.slugify("The quick brown fox")).toBe("the-quick-brown-fox")
})

// array

test('Sort numerical array via array.sortNumbers', () => {
  expect(array.sortNumbers([1,5,3,8,6,92,45,87])).toStrictEqual([1,3,5,6,8,45,87,92])
})
