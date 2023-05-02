export const string = {
  reverse(string: string): string {
    return [...string].reverse().join('').toString()
  },

  slugify(string: string): string {
    return string.toLowerCase().replaceAll(' ','-')
  }
}

export const array = {
  flatten(array: Array<any>, number: number = Infinity): Array<any> {
    return array.flat(number)
  },

  sortNumbers(array: Array<number>): Array<number> {
    return array.sort((a, b) => a - b)
  },

  sortWordsByLength(array: Array<string>): Array<string> {
    return array.sort((a, b) => a.length - b.length)
  }
}

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