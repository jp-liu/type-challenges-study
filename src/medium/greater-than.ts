import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 比较大小
 * @tips 1.比较方式,借助一个变量`A`取`length`,因为是同步比较的,所以
 *          - T === A, 此时 `T` 已经比较完毕,最好的情况就是 T === K,所以直接返回 `false`
 *          - K === A, 此时 `T` 经过比较,肯定是大于 `T > A`, 所有 T > K
 */
type GreaterThan<
  T extends number,
  K extends number,
  A extends number[] = []
> = A["length"] extends T
  ? false
  : A["length"] extends K
  ? true
  : GreaterThan<T, K, [...A, 1]>;

type a = GreaterThan<2, 1>; //should be true
type b = GreaterThan<1, 1>; //should be false

type cases = [
  Expect<Equal<GreaterThan<2, 1>, true>>,
  Expect<Equal<GreaterThan<1, 1>, false>>
];
