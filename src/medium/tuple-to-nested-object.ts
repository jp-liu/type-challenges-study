import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 将字符串元组的元素,递归构建一个对象类型
 * @tips 1.每次处理一个头元素
 */
type TupleToNestedObject<T, U> = T extends [infer F, ...infer L]
  ? F extends string
    ? { [P in F]: TupleToNestedObject<L, U> }
    : never
  : U;

type a = TupleToNestedObject<["a"], string>; // {a: string}
type b = TupleToNestedObject<["a", "b"], number>; // {a: {b: number}}
type c = TupleToNestedObject<[], boolean>; // boolean. if the tuple is empty, just return the U type

type cases = [
  Expect<Equal<TupleToNestedObject<["a"], string>, { a: string }>>,
  Expect<Equal<TupleToNestedObject<["a", "b"], number>, { a: { b: number } }>>,
  Expect<Equal<TupleToNestedObject<[], boolean>, boolean>>
];
