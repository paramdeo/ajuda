/**
 * Type checks the input parameters of a given function
 * and throws an Error if the parameter type is incorrect.
 * @param {string} parameters
 * @param {any} type
*/
function checkParams(type, ...parameters) {
  for (let param of parameters) {
    if (typeof param !== type) {
      throw new Error(`${param} is not a valid ${type}`)
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
    checkParams('string', string)
    let _ = string.slice()
    return Array.from(_)
      .reverse()
      .join('')
      .toString()
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
    checkParams('string', string)
    let unsafe = /[^a-z0-9-_]/g
    let _ = string.slice()
    return _
      .toLowerCase()
      .replaceAll(' ', '-')
      .replaceAll(unsafe,'')
  },

  /**
   * Returns the number of words in a string. Does not count punctuation.
   * @param {string} string A string of words in any case.
   * @returns {number} The number of words.
   * @example
   * let strA = "the quick brown fox - 69"
   * let strB = "a bb ccc dddd eeeee ffffff g"
   * let strC = "JavaScript, TypeScript, and WebAssembly at the edge, worldwide."
   * 
   * string.wordCount(strA) // 5
   * string.wordCount(strB) // 7
   * string.wordCount(strC) // 8
   */
  wordCount(string) {
    checkParams('string', string)
    let _ = string.slice() 
    return _
    .replace(/[^A-Za-z0-9]+/g, ' ')
    .split(/\s+/g)
    .filter(char => char.trim().length > 0)
    .length
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
   * 
   * string.compare(strA, strB) // true
   * string.compare(strA, strC) // false
   * string.compare(strB, strD) // false
   */
   compare(string, _string) {
    checkParams('string', string, _string)
    if (string.length !== _string.length) {
      return false
    }
    return JSON.stringify(string) === JSON.stringify(_string)
  },

  /**
   * Compares two strings to check if they are anagrammatic, that is, if both strings
   * contain a different arrangement of the same characters.
   * @param {string} string The first string to compare.
   * @param {string} _string The second string to compare.
   * @returns {boolean} true if the strings are anagrammatic, false otherwise.
   * @example
   * let root = 'root', toor = 'toor', boot = 'boot'
   * 
   * string.isAnagram(root, toor) // true
   * string.isAnagram(root, boot) // false
   */
   isAnagram(string, _string) {
    checkParams('string', string, _string)
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
    checkParams('object', array)
    let _ = array.slice()
    return _.flat(number)
  },

  /**
   * Check if an array has duplicate values.
   * @param {Array} array An array of elements.
   * @returns {boolean} true if the array has duplicates, false otherwise.
   * @example
   * array.hasDuplicates([1, 2, 3, 3]) // true
   * array.hasDuplicates([1, 2, 3]) // false
   */
  hasDuplicates(array) {
    checkParams('object', array)
    let _ = new Set(array)
    return _.size !== array.length
  },

  /**
   * Removes duplicate elements in an array.
   * @param {Array} array An array of elements.
   * @returns {Array} An array without duplicate elements.
   * @example
   * array.removeDuplicates([1, 2, 3, 3]) // [1, 2, 3]
   * array.removeDuplicates([1, 2, 3, 3, 'alice', 'bob', 'alice']) // [1, 2, 3, 'alice', 'bob'] 
   */
  removeDuplicates(array) {
    checkParams('object', array)
    let _ = array.slice()
    return Array.from(new Set([..._]))
  },

  /**
   * Sorts an array of numbers according to size.
   * @param {Array<number>} array An array of unsorted numbers.
   * @returns {Array<number>} An array of sorted numbers.
   * @example
   * let unsorted = [1, 5, 66, 3, 8, 7, 99, 33]
   * array.sortNumbers(unsorted, { sort: 'asc' }) // [1, 3, 5, 7, 9, 33, 66, 99]
   */
  sortNumbers(array, { sort } = {}) {
    checkParams('object', array)
    let _ = array.slice()
    if (sort === 'desc') {
      return _.sort((a, b) => b - a)
    }
    else if (sort === 'asc') {
      return _.sort((a, b) => a - b)
    }
    else return _.sort((a,b) => a - b) 
  },

  /**
   * Sorts an array of strings alphabetically.
   * @param {Array<string>} array An array of unsorted strings.
   * @returns {Array<string>} An array of sorted strings.
   * @example
   * let unsorted = ['aaa', 'b', 'cc', 'foo', 'bars']
   * array.sortStrings(unsorted, { sort: 'asc' }) // ['aaa', 'b', 'cc', 'foo', 'bars']
   */
  sortStrings(array, { sort } = {}) {
    checkParams('object', array)
    let _ = array.slice()
    if (sort === 'desc') {
      return _.sort().reverse()
    }
    else if (sort === 'asc') {
      return _.sort()
    }
    else return _.sort()
  },

  /**
   * Sorts an array of strings by their length.
   * @param {Array<string>} array An array of strings.
   * @returns {Array<string>} An array of sorted strings.
   * @example
   * let unsorted = ['aaa', 'b', 'cc', 'foo', 'bars']
   * array.sortStrings(unsorted) // ['b', 'cc', 'aaa', 'foo', 'bars']
   */
  sortStringsByLength(array) {
    checkParams('object', array)
    let _ = array.slice()
    return _.sort((a, b) => a.length - b.length)
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
    checkParams('object', array)
    let _ = new Set(array)
    return Array.from(_).filter(element => array.indexOf(element) >= 0)
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
   * Multiplies two numbers and checks whether either numbers or product are safe integers.
   * @param {number} number A number to be multiplied (throws an error if the number is unsafe).
   * @param {number} _number A number to be multiplied (throws an error if the number is unsafe).
   * @returns A product (throws an error if the product is unsafe).
   * @example
   * number.multiply(5000, 2) // 10000
   * number.multiply(1_000_000, 5) // 5000000
   * number.multiply(9007199254740991, 1) // 9007199254740991
   * number.multiply(9007199254740992, 1) // [ERR]: 9007199254740992 is an unsafe integer.
   * number.multiply(9007199254740991, 2) // [ERR]: Product of both numbers is an unsafe integer
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
  random(_number) {
    return Math.ceil(Math.random() * _number)
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
