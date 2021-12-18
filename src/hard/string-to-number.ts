import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description
 * @tips
 */
type ToNumber<
  S extends string,
  T extends any[] = []
> = S extends `${T["length"]}` ? T["length"] : ToNumber<S, [...T, 1]>;

type num1 = ToNumber<"15">; // 15
type num2 = ToNumber<"22">; // 22

type cases = [
  Expect<Equal<ToNumber<"15">, 15>>,
  Expect<Equal<ToNumber<"151">, 151>>,
  Expect<Equal<ToNumber<"22">, 22>>
];
