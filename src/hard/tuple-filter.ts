import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description
 * @tips
 */
type FilterOut<T extends any[], K, U extends any[] = []> = T extends [
  infer Head,
  ...infer Tail
]
  ? [Head] extends [K]
    ? FilterOut<Tail, K, U>
    : FilterOut<Tail, K, [...U, Head]>
  : U;

type Filtered = FilterOut<[1, 2, null, 3], null>; // [1, 2, 3]
type Filtered1 = FilterOut<[1, 2, null, 3], 1>; // [1, 2, 3]

type cases = [Expect<Equal<FilterOut<[1, 2, null, 3], null>, [1, 2, 3]>>];
