import { Expect, Equal } from '@type-challenges/utils'
import { ForOf } from '..'

/**
 * @description 蒋元祖类型转换成为接口类型
 * @tips 1.先将元组类型转换成为键值对 `{ [K in T[0]]: T[1] }`
 */
// type ObjectFromEntries<T extends [string, any]> = T extends any
//   ? (arg: { [K in T[0]]: T[1] }) => void
//   : never
// ((arg: {name: string;}) => void) | ((arg: {age: number;}) => void) | ((arg: {locations: string[];}) => void)
// type result1 = ObjectFromEntries<ModelEntries>

/**
 * @description 蒋元祖类型转换成为接口类型
 * @tips 1.先将元组类型转换成为键值对 `{ [K in T[0]]: T[1] }`
 *       2.转换为交叉类型,用于遍历生成结果
 */
type ObjectFromEntries<T extends [string, any]> = ForOf<
  (T extends any ? (arg: { [K in T[0]]: T[1] }) => void : never) extends (
    arg: infer P
  ) => void
    ? P
    : never
>
type result1 = ObjectFromEntries<ModelEntries>

interface Model {
  name: string
  age: number
  locations: string[] | null
}

type ModelEntries =
  | ['name', string]
  | ['age', number]
  | ['locations', string[] | null]

type result = ObjectFromEntries<ModelEntries> // expected to be Model

type cases = [Expect<Equal<ObjectFromEntries<ModelEntries>, Model>>]
