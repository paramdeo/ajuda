function typeError(parameter: unknown, type: string): never {
  // Throw an error when the parameter type is incorrect
  // For JavaScript users mostly, and also for better test coverage
  throw new Error(`${parameter} is not a valid ${type}`)
}

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
    if (typeof string !== 'string') { typeError(string, 'string') }
    return [...string].reverse().join('').toString()
  },

  /**
   * @todo Implement regex pattern matching unsafe chars for URLs
   * Converts a string of text into a URL-friendly slug.
   * @param string A string of words in any case.
   * @returns A URL slug.
   * @example
   * let example = 'Alice and Bob discover mushrooms'
   * string.slugify(example) // alice-and-bob-discover-mushrooms
   */
  slugify(string: string): string {
    if (typeof string !== 'string') { typeError(string, 'string') }
    return string.toLowerCase().replaceAll(' ', '-')
  }
}

// Arrays

export const array = {

  /**
   * Flattens an array. If n
   * @param array An array of elements.
   * @param number The depth at which to flatten. If omitted, defaults to Infinity.
   * @returns A flattened array.
   * @example
   * array.flatten([1, 2, [3]]) //  [1, 2, 3]
   * array.flatten([1, 2, [3], [[4,5]]], 2) //  [1, 2, 3, 4, 5]
   */
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
  removeDuplicates<T>(array: Array<T>): Array<T> {
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
   * Removes negative array indices, as well as hidden properties.
   * @param array An array with possible negative indices and/or hidden properties.
   * @returns An array without negative indices or hidden properties.
   * @example
   * let example = [1, 2, 3, 'alice', 'bob']
   * example.foo = 'bar'
   * example[-1] = 69
   * 
   * example.length // 5
   * Object.values(example) // [1, 2, 3, 'alice', 'bob', 'bar', 69]
   * 
   * array.sanitize(example) // [1, 2, 3]
   */
  sanitize<T>(array: Array<T>): Array<T> {
    let temp = new Set(array)
    return Array.from(temp).filter(element => array.indexOf(element) >= 0)
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
  isEqual<T>(array: Array<T>, _array: Array<T>): boolean {
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
  /**
  * Takes two Sets as arguments and returns a Set that has elements contained in both Sets.
  * @param set A Set of elements.
  * @param _set A Set of elements.
  * @returns A Set containing elements found in both Sets
  * @example
  * let SetA = new Set([1, 2, 3, 4, 5])
  * let SetB = new Set([2, 3, 4, 5, 6])
  * Array.from(set.intersection(SetA, SetB)) // [2, 3, 4, 5]
  */
  intersection(set: Set<any>, _set: Set<any>): Set<any> {
    return new Set(
      Array.from(set).filter(element => _set.has(element))
    )
  },


  /**
  * Takes two Sets as arguments and returns a Set that has elements NOT contained in both Sets. Please note that this operation computes the Symmetric Set Difference as that's a saner/implicit default when comparing two Sets.
  * @param set A Set of elements.
  * @param _set A Set of elements.
  * @returns A Set containing elements NOT found in both Sets
  * @example
  * let SetA = new Set([1, 2, 3, 4, 5])
  * let SetB = new Set([2, 3, 4, 5, 6])
  * Array.from(set.intersection(SetA, SetB)) // [1, 6]
  */
  difference(set: Set<any>, _set: Set<any>): Set<any> {
    let __set: Set<any> = new Set(set)
    for (let element of _set) {
      if (__set.has(element)) {
        __set.delete(element)
      } else {
        __set.add(element)
      }
    }
    return __set
  },

  /**
  * Takes two Sets as arguments and returns a Set of merged elements from both Sets.
  * @param set A Set of elements.
  * @param _set A Set of elements.
  * @returns A Set containing merged elements from both Sets.
  * @example
  * let SetA = new Set([1, 2, 3, 4, 5])
  * let SetB = new Set([2, 3, 4, 5, 6])
  * Array.from(set.union(SetA, SetB)) // [1, 2, 3, 4, 5, 6]
  */
  union(set: Set<any>, _set: Set<any>): Set<any> {
    return new Set([
      ...set,
      ..._set
    ])
  }
}
