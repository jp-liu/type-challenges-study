import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 将元组进行分块
 * @tips 1.判断元组长度是否达到处理阈值
 *       2.如果`K === A['length']`说明一件分好一个块了,继续递归拆分下一个块
 */
type Chunk<
  T extends any[],
  K extends number,
  A extends any[] = []
> = K extends A["length"]
  ? [A, ...Chunk<T, K>]
  : T extends [infer F, ...infer L]
  ? Chunk<L, K, [...A, F]>
  : A extends []
  ? A
  : [A];

type exp1 = Chunk<[1, 2, 3], 2>; // expected to be [[1, 2], [3]]
type exp2 = Chunk<[1, 2, 3], 4>; // expected to be [[1, 2, 3]]
type exp3 = Chunk<[1, 2, 3], 1>; // expected to be [[1], [2], [3]]

type cases = [
  Expect<Equal<Chunk<[1, 2, 3], 2>, [[1, 2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3], 4>, [[1, 2, 3]]>>,
  Expect<Equal<Chunk<[1, 2, 3], 1>, [[1], [2], [3]]>>
];
