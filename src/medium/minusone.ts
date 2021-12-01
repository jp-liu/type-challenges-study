import { Expect, Equal } from "@type-challenges/utils";
import { Tuple } from "..";

/**
 * @description 返回`N`整数类型`-1`之后的结果
 * @tips 1.`TS`没有计算功能
 *       2.通过数组的推导,排除最后一位,需要编写辅助类型`Tuple`,放在`index.ts`中
 *       3.超过`50`就不行了,递归层级过深
 */
export type MinusOne<N extends number> = Tuple<N> extends [...infer F, unknown]
  ? F["length"]
  : never;

type Zero = MinusOne<1>; // 0

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<33>, 32>>,
  Expect<Equal<MinusOne<42>, 41>>
];
