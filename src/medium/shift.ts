import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 删除数组头元素
 * @tips 使用`infer`推导即可
 */
type Shift<T extends any[]> = T extends [infer F, ...infer L] ? L : never;

type cases = [Expect<Equal<Shift<[3, 2, 1]>, [2, 1]>>];
