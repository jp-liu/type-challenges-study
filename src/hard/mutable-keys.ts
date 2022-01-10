import { Expect, Equal } from '@type-challenges/utils'

/**
 * @description 提取所有非只读键组成联合类型,不包括`readonly`
 * @tips 通过`Equal`判断当前值是否只读,如果只读则不需要,为`never`
 */
type MutableKeys<T> = keyof {
  [Key in keyof T as Equal<Pick<T, Key>, Readonly<Pick<T, Key>>> extends true
    ? never
    : Key]: string
}

// expected to be “bar”
type Keys = MutableKeys<{ readonly foo: string; bar: number }>

type cases = [
  Expect<Equal<MutableKeys<{ readonly foo: string; bar: number }>, 'bar'>>
]
