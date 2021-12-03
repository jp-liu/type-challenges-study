import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 将元组的元素转换为联合类型
 * @tips 1.直接利用索引类型,取得元组的全部元素的联合类型
 */
type TupleToUnion<T extends unknown[]> = T[number];

type Arr = ["1", "2", "3"];
const a: TupleToUnion<Arr> = "1"; // expected to be '1' | '2' | '3'

type cases = [Expect<Equal<TupleToUnion<Arr>, "1" | "2" | "3">>];
