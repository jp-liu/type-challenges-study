import { Expect, Equal } from '@type-challenges/utils'

/**
 * @description 取元组中的交集
 * @tips 1.通过`T[number]`将元组转换成为所有元素的联合
 *       2.通过`R & ToUnion<F>`一个元素一个元素的交叉,获取交集
 *       3.`R = ToUnion<T[0]>`是提供一个初始值,第一个元素元素第一个元素交叉还是第一个元素
 */

type Intersection<T extends any[], R = ToUnion<T[0]>> = T extends [
  infer F,
  ...infer L
]
  ? Intersection<L, R & ToUnion<F>>
  : R

/**
 * @description 将元组转换成为联合类型
 */
type ToUnion<T> = T extends any[] ? T[number] : T

type Res = Intersection<[[1, 2], [2, 3], [2, 2]]> // expected to be 2
type Res1 = Intersection<[[1, 2, 3], [2, 3, 4], [2, 2, 3]]> // expected to be 2 | 3
type Res2 = Intersection<[[1, 2], [3, 4], [5, 6]]> // expected to be never
type Res3 = Intersection<[[1, 2, 3], [2, 3, 4], 3]> // expected to be 3
type Res4 = Intersection<[[1, 2, 3], 2 | 3 | 4, 2 | 3]> // expected to be 2 | 3
type Res5 = Intersection<[[1, 2, 3], 2, 3]> // expected to be never

type cases = [
  Expect<Equal<Intersection<[[1, 2], [2, 3], [2, 2]]>, 2>>,
  Expect<Equal<Intersection<[[1, 2, 3], [2, 3, 4], [2, 2, 3]]>, 2 | 3>>,
  Expect<Equal<Intersection<[[1, 2], [3, 4], [5, 6]]>, never>>,
  Expect<Equal<Intersection<[[1, 2, 3], [2, 3, 4], 3]>, 3>>,
  Expect<Equal<Intersection<[[1, 2, 3], 2 | 3 | 4, 2 | 3]>, 2 | 3>>,
  Expect<Equal<Intersection<[[1, 2, 3], 2, 3]>, never>>
]
