// Strings

export const string = {

  reverse(string: string): string {
    return [...string].reverse().join('').toString()
  },

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
   * Sorts numbers according to size.
   * @param array An array of unsorted numbers.
   * @returns An array of sorted numbers.
   * @example
   * let unsorted = [1,5,66,3,8,7,99,33]
   * array.sortNumbers(unsorted) // [1,3,5,7,9,33,66,99]
   */
  sortNumbers(array: Array<number>): Array<number> {
    return array.sort((a, b) => a - b)
  },

  /**
   * Removes negative array indices and hidden properties.
   * @param array An array with possible negative indices
   * @returns An array without negative indices
   * @example
   * let example = [1,2,3]
   * example[-1] = 5
   * 
   * array.sanitize([example]) // [1,2,3]
   */
  sanitize(array: Array<any>): Array<any> {
    return array.filter(element => array.indexOf(element) >= 0)
  },

  sortWordsByLength(array: Array<string>): Array<string> {
    return array.sort((a, b) => a.length - b.length)
  }
}

// Numbers

export const number = {

  multiply(number: number, _number: number): number {
    if (!Number.isSafeInteger(number) || !Number.isSafeInteger(_number)) {
      throw new Error('One or both numbers are unsafe integers')
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
