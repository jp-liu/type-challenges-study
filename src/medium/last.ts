import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 返回数组的最后一个元素
 * @tips 1.直接取就行
 */
type Last<T extends any[]> = T extends [...infer F, infer L] ? L : never

type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type tail1 = Last<arr1> // expected to be 'c'
type tail2 = Last<arr2> // expected to be 1

type cases = [
    Expect<Equal<Last<arr1>, 'c'>>,
    Expect<Equal<Last<arr2>, 1>>
];
