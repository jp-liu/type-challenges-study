import { Expect, Equal } from '@type-challenges/utils'
import { ForOf } from '..'

/**
 * @description 解析`QueryString`
 * @tips 1.通过模板字符串推导,分批解析
 *       2.结果合并为对象输出,重复键值作为元组导出
 */
type ParseQueryString<S extends string> = S extends ''
  ? {}
  : S extends `${infer Head}&${infer Rest}`
  ? MeargeObject<ParseKeyValue<Head>, ParseQueryString<Rest>>
  : ParseKeyValue<S>

/**
 * @description 解析一组键值对
 */
type ParseKeyValue<KV extends string> = KV extends `${infer K}=${infer V}`
  ? { [P in K]: V }
  : { [P in KV]: true }

/**
 * @description 合并两个对象类型
 */
type MeargeObject<X, Y> = {
  [K in keyof X | keyof Y]: K extends keyof X
    ? K extends keyof Y
      ? MeargeValues<X[K], Y[K]>
      : X[K]
    : K extends keyof Y
    ? Y[K]
    : never
}

/**
 * @description 合并重复键的值
 * @tips 1.如果相同则直接返回随便一个
 *       2.如果一个为`true`则返回另一个,`true`表示没有值,采用默认的
 *       3.判断之前是否已经有重复的了,有则是添加,没有就是直接组合起来
 */
type MeargeValues<V1, V2> = V1 extends V2
  ? V1
  : V1 extends true
  ? V2
  : V2 extends true
  ? V1
  : V1 extends string[]
  ? [...V1, V2]
  : [V1, V2]

type a = ParseQueryString<'k1=v1&k1=v2'>
type b = ForOf<{ k1: 'v1' } & { k1: 'v2' }>

/* _____________ Your Code Here _____________ */

/* _____________ Test Cases _____________ */

type cases = [
  Expect<Equal<ParseQueryString<''>, {}>>,
  Expect<Equal<ParseQueryString<'k1'>, { k1: true }>>,
  Expect<Equal<ParseQueryString<'k1=v1'>, { k1: 'v1' }>>,
  Expect<Equal<ParseQueryString<'k1&k1'>, { k1: true }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v1'>, { k1: 'v1' }>>,
  Expect<Equal<ParseQueryString<'k1&k2'>, { k1: true; k2: true }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v2'>, { k1: 'v1'; k2: 'v2' }>>,

  Expect<Equal<ParseQueryString<'k1=v1&k1=v2'>, { k1: ['v1', 'v2'] }>>,
  Expect<
    Equal<ParseQueryString<'k1=v1&k2=v2&k1=v2'>, { k1: ['v1', 'v2']; k2: 'v2' }>
  >,
  Expect<Equal<ParseQueryString<'k1=v1&k2'>, { k1: 'v1'; k2: true }>>
]

/* _____________ Further Steps _____________ */
