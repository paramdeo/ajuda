// Strings

export const string = {

  /**
   * Reverses a given string of characters.
   * @param string A string that needs reversing.
   * @result A reversed string.
   * @example
   * string.reverse('dlrow olleh') // 'hello world'
   */
  reverse(string: string): string {
    return [...string].reverse().join('').toString()
  },

  /**
   * Converts a string of text into a URL-friendly slug.
   * @param string A string of words in any case.
   * @returns A URL slug.
   * @example
   * let example = 'Alice and Bob discover mushrooms'
   * string.slugify(example) // alice-and-bob-discover-mushrooms
   */
  slugify(string: string): string {
    return string.toLowerCase().replaceAll(' ','-')
  }
}

// Arrays

export const array = {

  flatten(array: Array<any>, number: number = Infinity): Array<any> {
    return array.flat(number)
  },

  /**
   * Removes duplicate elements in an array.
   * @param array An array of elements.
   * @returns An array without duplicate elements.
   * @example
   * array.removeDuplicates([1, 2, 3, 3]) //  [1, 2, 3]
   * array.removeDuplicates([1, 2, 3, 3, 'alice', 'bob', 'alice']) // [1, 2, 3, 'alice', 'bob'] 
   */
  removeDuplicates(array: Array<any>): Array<any> {
    return Array.from(new Set([...array]))
  },

  /**
   * Sorts numbers according to size.
   * @param array An array of unsorted numbers.
   * @returns An array of sorted numbers.
   * @example
   * let unsorted = [1, 5, 66, 3, 8, 7, 99, 33]
   * array.sortNumbers(unsorted) // [1, 3, 5, 7, 9, 33, 66, 99]
   */
  sortNumbers(array: Array<number>): Array<number> {
    return array.sort((a, b) => a - b)
  },

  /**
   * Removes negative array indices.
   * @param array An array with possible negative indices
   * @returns An array without negative indices
   * @example
   * let example = [1, 2, 3]
   * example[-1] = 5
   * 
   * array.sanitize(example) // [1, 2, 3]
   */
  sanitize(array: Array<any>): Array<any> {
    return array.filter(element => array.indexOf(element) >= 0)
  },

  /**
   * Sorts an array of words by their length.
   * @param array An array of words
   * @returns An array of sorted words
   * @example
   * let words = ['aaa', 'b', 'cc', 'foo', 'bars']
   * array.sortWords(words) // ['b', 'cc', 'aaa', 'foo', 'bars']
   */
  sortWordsByLength(array: Array<string>): Array<string> {
    return array.sort((a, b) => a.length - b.length)
  },

  /**
   * Checks if two arrays are deeply equal. Mixed-order indices, referential inequality, and hidden properties will return a falsy result.
   * @param array The first array to be compared.
   * @param _array The second array to be compared.
   * @returns True if the arrays are referentially equal, false otherwise.
   * @example
   * let arr1 = [1, 2, 44, 5]
   * let arr2 = [1, 2, 5, 44]
   * let arr3 = [1, 2, 44, 5]
   * arr3[-1] = 6
   * let arr4 = [1, 2, 5, 44]
   * let arr5 = arr1
   * 
   * array.isEqual(arr1, arr2) // false
   * array.isEqual(arr1, arr3) // false
   * array.isEqual(arr2, arr4) // false
   * array.isEqual(arr1, arr5) // true
   */
  isEqual(array: Array<any>, _array: Array<any>): boolean {
    return Object.is(array, _array)
  }
}

// Numbers

export const number = {

  /**
   * Multiplies two numbers and checks whether either number or product are safe integers.
   * @param number A number to be multiplied (throws an error if the number is unsafe).
   * @param _number A number to be multiplied (throws an error if the number is unsafe).
   * @returns A product (throws an error if the product is unsafe).
   * @example
   * number.multiply(5000, 2) // 10000
   * number.multiply(1_000_000, 5) // 5000000
   * multiply(9007199254740991, 1) // 9007199254740991
   * multiply(9007199254740992, 1) // 9007199254740992 is an unsafe integer.
   * multiply(9007199254740991, 2) // [ERR]: Product of both numbers is an unsafe integer
   */
  multiply(number: number, _number: number): number {
    if (!Number.isSafeInteger(number)) {
      throw new Error(`${number} is an unsafe integer.`)
    }
    if (!Number.isSafeInteger(_number)) {
      throw new Error(`${_number} is an unsafe integer.`)
    }
    let result = number * _number
    if (!Number.isSafeInteger(result)) {
      throw new Error('Product of both numbers is an unsafe integer')
    }
    return result
  }
}

// Sets

export const set = {

  intersection(set: Set<any>, _set: Set<any>): Set<any> {
    return new Set(
      Array.from(set).filter(element => _set.has(element))
    )
  },

  union(set: Set<any>, _set: Set<any>): Set<any> {
    return new Set([
      ...set,
      ..._set
    ])
  }
}
