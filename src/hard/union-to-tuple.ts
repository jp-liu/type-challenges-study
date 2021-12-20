import { Expect, Equal } from "@type-challenges/utils";
// 今天这个题真的是令人费神

/**
 * @description 将联合类型转变为元组
 * @tips 1.通过函数的参数逆变特性,和重载特性,获取最后一个联合类型
 *       2.通过`Exclude`将排除掉已经处理过的一个类型,然后递归,获取剩余最后一个依次类推
 */
type UnionToTuple<T, Last = LastInUion<T>> = [T] extends [never]
  ? []
  : [...UnionToTuple<Exclude<T, Last>>, Last];

/**
 * @description 通过函数的重载特性,重载默认会采用最后一个函数定义,依次推导出`P`是最后一个函数参数类型
 */
type LastInUion<T> = UnionToIntersection<
  T extends unknown ? (a: T) => 0 : never
> extends (p: infer P) => 0
  ? P
  : never;

/**
 * @description 通过函数参数的逆变,将参数转变为交叉类型
 */
type UnionToIntersection<U> = (
  U extends unknown ? (arg: U) => 0 : never
) extends (arg: infer I) => 0
  ? I
  : never;

type a = UnionToIntersection<"a">;

// type a = UnionToTuple<1>; // [1], and correct
type b = UnionToTuple<"any" | "a">; // ['any','a'], and correct
type c = UnionToTuple<"any" | "a">; // ['any','a'], and correct

type cases = [
  Expect<Equal<UnionToTuple<any | "a">, UnionToTuple<any>>>, // will always be a true
  Expect<Equal<UnionToTuple<unknown | "a">, UnionToTuple<unknown>>>, // will always be a true
  Expect<Equal<UnionToTuple<never | "a">, UnionToTuple<"a">>>, // will always be a true
  Expect<Equal<UnionToTuple<"a" | "a" | "a">, UnionToTuple<"a">>> // will always be a true
];
