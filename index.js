/**
 * Type checks the input parameters of a given function
 * and throws an Error if the parameter type is incorrect
 * @param {any} parameters
 * @param {any} type
*/
function checkParamTypes(type, ...parameters) {
  for (let param of parameters) {
    if (typeof param !== type) {
      throw new Error(`${param} is not a valid ${type}`)
    }
    if (param === undefined || param === null) {
      throw new Error(`You're missing one or more parameters...`)
    }
  }
}

// Strings

export const string = {

  /**
   * Reverses a given string of characters.
   * @param {string} string A string that needs reversing.
   * @returns {string} A reversed string.
   * @example
   * string.reverse('dlrow olleh') // 'hello world'
   */
  reverse(string) {
    checkParamTypes('string', string)
    return Array.from(string).reverse().join('').toString()
  },

  /**
   * Converts a string of text into a URL-friendly slug. Sanitizes for slug-safe characters, i.e. letters, numbers, dashes.
   * @param {string} string A string of words in any case.
   * @returns {string} A URL slug.
   * @example
   * let example = 'Alice and Bob discover mushrooms!'
   * string.slugify(example) // alice-and-bob-discover-mushrooms
   */
  slugify(string) {
    checkParamTypes('string', string)
    let unsafe = /[^a-z0-9-_]/g
    return string
      .toLowerCase()
      .replaceAll(' ', '-')
      .replaceAll(unsafe,'')
  },

  /**
   * Compares two strings to check if they are the same (length, characters in order).
   * @param {string} string The first string to compare.
   * @param {string} _string The second string to compare.
   * @returns {boolean} true if the strings are equal, false otherwise.
   * @example
   * let strA = 'Hello World.'
   * let strB = 'Hello World.'
   * let strC = 'Hello Earth.'
   * let strD = 'Hello Planet.'
   * string.compare(strA, strB) // true
   * string.compare(strA, strC) // false
   * string.compare(strB, strD) // false
   */
   compare(string, _string) {
    checkParamTypes('string', string, _string)
    if (string.length !== _string.length) {
      return false
    }
    return JSON.stringify(string) === JSON.stringify(_string)
  },

  /**
   * Compares two strings to check if they are anagrammatic, that is, both strings
   * contain a different arrangement of the same characters.
   * @param {string} string The first string to compare.
   * @param {string} _string The second string to compare.
   * @returns {boolean} true if the strings are anagrammatic, false otherwise.
   * @example
   * let strA = 'root', strB = 'toor'
   * let strC = 'root', strD = 'boot'
   * string.isAnagram(strA, strB) // true
   * string.isAnagram(strC, strD) // false
   */
   isAnagram(string, _string) {
    checkParamTypes('string', string, _string)
    if (string.length !== _string.length) {
      return false
    }
    let arr = Array.from(string.toLowerCase()).sort()
    let _arr = Array.from(_string.toLowerCase()).sort()
    return JSON.stringify(arr) === JSON.stringify(_arr)
  }
}

// Arrays

export const array = {

  /**
   * Flattens an array. If no depth is specified, the array is flattened completely by default.
   * @param {Array} array An array of elements.
   * @param {number} number The depth at which to flatten. If omitted, defaults to Infinity.
   * @returns {Array} A flattened array.
   * @example
   * array.flatten([1, 2, [3]]) //  [1, 2, 3]
   * array.flatten([1, 2, [3], [[4,5]]], 2) //  [1, 2, 3, 4, 5]
   */
  flatten(array, number = Infinity) {
    checkParamTypes('object', array)
    return array.flat(number)
  },

  /**
   * Removes duplicate elements in an array.
   * @param {Array} array An array of elements.
   * @returns {Array} An array without duplicate elements.
   * @example
   * array.removeDuplicates([1, 2, 3, 3]) //  [1, 2, 3]
   * array.removeDuplicates([1, 2, 3, 3, 'alice', 'bob', 'alice']) // [1, 2, 3, 'alice', 'bob'] 
   */
  removeDuplicates(array) {
    checkParamTypes('object', array)
    return Array.from(new Set([...array]))
  },

  /**
   * Sorts numbers according to size.
   * @param {Array<number>} array An array of unsorted numbers.
   * @returns {Array<number>} An array of sorted numbers.
   * @example
   * let unsorted = [1, 5, 66, 3, 8, 7, 99, 33]
   * array.sortNumbers(unsorted) // [1, 3, 5, 7, 9, 33, 66, 99]
   */
  sortNumbers(array) {
    checkParamTypes('object', array)
    return array.sort((a, b) => a - b)
  },

  /**
   * Removes negative array indices, as well as hidden properties.
   * @param {Array} array An array with possible negative indices and/or hidden properties.
   * @returns {Array} An array without negative indices or hidden properties.
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
  sanitize(array) {
    checkParamTypes('object', array)
    let temp = new Set(array)
    return Array.from(temp).filter(element => array.indexOf(element) >= 0)
  },

  /**
   * Sorts an array of words by their length.
   * @param {Array<string>} array An array of words
   * @returns {Array<string>} An array of sorted words
   * @example
   * let words = ['aaa', 'b', 'cc', 'foo', 'bars']
   * array.sortWords(words) // ['b', 'cc', 'aaa', 'foo', 'bars']
   */
  sortWordsByLength(array) {
    checkParamTypes('object', array)
    return array.sort((a, b) => a.length - b.length)
  },

  /**
   * Checks if two arrays are deeply equal. Mixed-order indices, referential inequality, and hidden properties will return a falsy result.
   * @param {Array} array The first array to be compared.
   * @param {Array} _array The second array to be compared.
   * @returns {boolean} True if the arrays are referentially equal, false otherwise.
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
  isEqual(array, _array) {
    return Object.is(array, _array)
  }
}

// Numbers

export const number = {

  /**
   * Multiplies two numbers and checks whether either number or product are safe integers.
   * @param {number} number A number to be multiplied (throws an error if the number is unsafe).
   * @param {number} _number A number to be multiplied (throws an error if the number is unsafe).
   * @returns A product (throws an error if the product is unsafe).
   * @example
   * number.multiply(5000, 2) // 10000
   * number.multiply(1_000_000, 5) // 5000000
   * multiply(9007199254740991, 1) // 9007199254740991
   * multiply(9007199254740992, 1) // 9007199254740992 is an unsafe integer.
   * multiply(9007199254740991, 2) // [ERR]: Product of both numbers is an unsafe integer
   */
  multiply(number, _number) {
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
  },


  /**
   * Returns an array of numbers in a given range (inclusive of the starting and ending numbers).
   * @param {number} start The beginning of the range.
   * @param {number} end The end of the range.
   * @returns {Array<number>} An array of numbers within the given range.
   * @example
   * number.range(1, 10) // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
   */
  range(start, end) {
    let range = []
    for (let _ = start; _ < end + 1; _++) {
      range.push(_)
    }
    return range
  }
}

// Objects

export const object = {
  /**
   * Returns safely parsed JSON via round-tripping with JSON.stringify first.
   * @param {Object} object The JSON payload to be safely parsed.
   * @returns {Object} Safely parsed JSON
   * @example
   * let object = {
   *     alpha: "bravo",
   *     "charlie": "delta",
   *     1: 2
   * }
   *
   * object.parseJSON(object)
   * 
   *  {
   *   "1": 2,
   *   "alpha": "bravo",
   *   "charlie": "delta"
   *  }
   */
  parseJSON(object) {
    return JSON.parse(JSON.stringify(object))
  }
}

// Sets

export const set = {
  /**
  * Takes two Sets as arguments and returns a Set that has elements contained in both Sets.
  * @param {Set} set A Set of elements.
  * @param {Set} _set A Set of elements.
  * @returns {Set} A Set containing elements found in both Sets
  * @example
  * let SetA = new Set([1, 2, 3, 4, 5])
  * let SetB = new Set([2, 3, 4, 5, 6])
  * Array.from(set.intersection(SetA, SetB)) // [2, 3, 4, 5]
  */
  intersection(set, _set) {
    return new Set(
      Array.from(set).filter(element => _set.has(element))
    )
  },


  /**
  * Takes two Sets as arguments and returns a Set that has elements NOT contained in both Sets. Please note that this operation computes the Symmetric Set Difference as that's a saner/implicit default when comparing two Sets.
  * @param {Set} set A Set of elements.
  * @param {Set} _set A Set of elements.
  * @returns {Set} A Set containing elements NOT found in both Sets
  * @example
  * let SetA = new Set([1, 2, 3, 4, 5])
  * let SetB = new Set([2, 3, 4, 5, 6])
  * Array.from(set.intersection(SetA, SetB)) // [1, 6]
  */
  difference(set, _set) {
    let __set = new Set(set)
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
  * @param {Set} set A Set of elements.
  * @param {Set} _set A Set of elements.
  * @returns {Set} A Set containing merged elements from both Sets.
  * @example
  * let SetA = new Set([1, 2, 3, 4, 5])
  * let SetB = new Set([2, 3, 4, 5, 6])
  * Array.from(set.union(SetA, SetB)) // [1, 2, 3, 4, 5, 6]
  */
  union(set, _set) {
    return new Set([
      ...set,
      ..._set
    ])
  }
}

export const utils = {

  /**
  * @todo Make sure the descriptions below are mathematically correct...
  * Creates a generator function that returns the powers of a given base with each iteration.
  * @param {number} base The base number for which powers will be generated.
  * @result The power of the base, incrementing with each iteration.
  * @example
  * let baseFive = utils.powersOf(5)
  *
  * five.next() // { value: 1, done: false }
  * five.next() // { value: 5, done: false }
  * five.next() // { value: 25, done: false }
  * five.next().value // 125
  * five.next() // { value: 625, done: false }
  * five.return() // { done: true }
  */
  *powersOf(base) {
    let exponent = 0
    while (true) {
      yield base ** exponent
      exponent++
    }
  },

  /**
   * Returns a random number between 1 and the end of the range (inclusive).
   * @param {number} _number The upper limit of the range of random numbers.
   * @result A random number between 1 and the end of the range (inclusive).
   * @example
   * return utils.randomNumber(10) // 8
   * return utils.randomNumber(10) // 4
   * return utils.randomNumber(10) // 3
   * return utils.randomNumber(10) // 10
   */
  randomNumber(_number) {
    return Math.ceil(Math.random() * _number)
  }
}
