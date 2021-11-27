import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 将数组的最后一个元素删除
 * @tips 很简单的利用`infer`推导即可
 */
type Pop<T extends any[]> = T extends [...infer A, infer L] ? A : never;

type arr1 = ["a", "b", "c", "d"];
type arr2 = [3, 2, 1];

type re1 = Pop<arr1>; // expected to be ['a', 'b', 'c']
type re2 = Pop<arr2>; // expected to be [3, 2]

type cases = [
  Expect<Equal<Pop<arr1>, ["a", "b", "c"]>>,
  Expect<Equal<Pop<arr2>, [3, 2]>>
];
