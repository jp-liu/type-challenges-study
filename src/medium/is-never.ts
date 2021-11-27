import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 判断一个类型是否是`never`
 * @tip 1.重点: `never`没有任何子集,所以不能判断`never`是否可以分配给`never`类型
 *      2.将`never`作为一个元素放到元组中,这样,就可以进行判断分配了
 */
type IsNever<T> = [T] extends [never] ? true : false;

type A = IsNever<never>; // expected to be true
type B = IsNever<undefined>; // expected to be false
type C = IsNever<null>; // expected to be false
type D = IsNever<[]>; // expected to be false
type E = IsNever<number>; // expected to be false

type cases = [
  Expect<Equal<IsNever<never>, true>>,
  Expect<Equal<IsNever<undefined>, false>>,
  Expect<Equal<IsNever<null>, false>>,
  Expect<Equal<IsNever<[]>, false>>,
  Expect<Equal<IsNever<number>, false>>
];
