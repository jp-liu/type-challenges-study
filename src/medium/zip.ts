import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 将数组组装为`Map`链表形
 * @tips 1.分别拿出两个元组中的头一个元素,进行拼装,然后递归处理后续元素
 */
type Zip<T extends unknown[], K extends unknown[]> = T extends [
  infer TF,
  ...infer TL
]
  ? K extends [infer FK, ...infer LK]
    ? [[TF, FK], ...Zip<TL, LK>]
    : []
  : [];

type exp = Zip<[1, 2, 3], [true, false, "aaa"]>; // expected to be [[1, true], [2, false]]

type cases = [
  Expect<Equal<Zip<[1, 2], [true, false]>, [[1, true], [2, false]]>>
];
