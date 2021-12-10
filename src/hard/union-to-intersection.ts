import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 将联合类型转化能成为交叉类型
 * @tips 1.利用 `extends` 进行分发,创建 `N` 个函数|
 *       2.利用函数参数的逆变,交叉类型, 因为同时要满足函数调用,必须交叉类型,避免参数类型错误
 */
type Union2Intersection<T> = (
  T extends any ? (arg: T) => void : never
) extends (arg: infer R) => void
  ? R
  : never;

type I = Union2Intersection<"foo" | 42 | true>; // expected to be 'foo' & 42 & true

type cases = [
  Expect<Equal<Union2Intersection<"foo" | 42 | true>, "foo" & 42 & true>>
];
