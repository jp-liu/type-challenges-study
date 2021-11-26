import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 判断字符`S`,是否以`E`结尾
 * @tip
 */
type EndsWith<S extends string, E extends string> = S extends `${any}${E}`
  ? true
  : false;

type R0 = EndsWith<"abc", "bc">; // true
type R1 = EndsWith<"abc", "abc">; // true
type R2 = EndsWith<"abc", "d">; // false

type cases = [
  Expect<Equal<EndsWith<"abc", "bc">, true>>,
  Expect<Equal<EndsWith<"abc", "abc">, true>>,
  Expect<Equal<EndsWith<"abc", "d">, false>>
];
