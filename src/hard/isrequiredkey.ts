import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 判断`K`是否是必选键
 * @tips 1.通过`Required`判断是否必选键
 */
type IsRequiredKey<T, K extends keyof T> = (
  K extends keyof T ? (T extends Required<Pick<T, K>> ? true : false) : never
) extends true
  ? true
  : false;

type A = IsRequiredKey<{ a: number; b?: string }, "a">; // true
type B = IsRequiredKey<{ a: number; b?: string }, "b">; // false
type C = IsRequiredKey<{ a: number; b?: string }, "b" | "a">; // false
type cases = [
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, "a">, true>>,
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, "b">, false>>,
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, "a" | "b">, false>>
];
