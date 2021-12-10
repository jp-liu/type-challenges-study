import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 根据要求填充元组的指定部分
 * @tips 1.定义辅助参数,`CurrentIndex`记录当前遍历到的元素下标,也就是到第几个元素了
 *       2.定义辅助参数,`IsRange`是否在填充范围内,不在则是向后顺延
 */
type Fill<
  T extends any[],
  N,
  Start extends number = 0,
  End extends number = T["length"],
  CurrentIndex extends number[] = [],
  IsRange extends boolean = false
> = T extends [infer First, ...infer Rest]
  ? End extends CurrentIndex["length"] // 是否到指定末尾下标了,length是大于下标一位的,所以相等就是到前面处理完了
    ? T
    : Start extends CurrentIndex["length"] // 是否开始填充
    ? [N, ...Fill<Rest, N, Start, End, [...CurrentIndex, 1], true>] // 开始填充,标记填充范围
    : IsRange extends true // 是否在填充范围内
    ? [N, ...Fill<Rest, N, Start, End, [...CurrentIndex, 1], true>] // 在填充范围,就是用`N`填充
    : [First, ...Fill<Rest, N, Start, End, [...CurrentIndex, 1]>] // 不在填充范围,就是用原始值,向后顺延
  : [];

type exp = Fill<[1, 2, 3], 0, 0, 2>; // expected to be [0, 0, 0]

type cases = [
  Expect<Equal<Fill<[1, 2, 3], 0, 2>, [1, 2, 0]>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 0, 2>, [0, 0, 3]>>
];
