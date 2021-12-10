import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 类型版的`Array.reverse`方法
 * @tips 1.通过类型推导,递归反向填充
 */
export type Reverse<T extends any[]> = T extends [infer F, ...infer L]
  ? [...Reverse<L>, F]
  : [];

type a = Reverse<["a", "b"]>; // ['b', 'a']
type b = Reverse<["a", "b", "c"]>; // ['c', 'b', 'a']

type cases = [
  Expect<Equal<Reverse<["a", "b"]>, ["b", "a"]>>,
  Expect<Equal<Reverse<["a", "b", "c"]>, ["c", "b", "a"]>>
];
