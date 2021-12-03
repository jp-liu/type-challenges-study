import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 在`S`中找到`From`部分并替换成`To`
 * @tips 1.判断`From`是否是空字符串,不能全部替换啊
 *       2.通过类型推导,判断是否有满足条件的字符串
 *       3.将符合的字符,替换为`To`
 */
type Replace<
  S extends string,
  From extends string,
  To extends string
> = From extends ""
  ? S
  : S extends `${infer L}${From}${infer T}`
  ? `${L}${To}${T}`
  : S;

type replaced = Replace<"types are fun!", "fun", "awesome">; // expected to be 'types are awesome!'

type cases = [
  Expect<
    Equal<Replace<"types are fun!", "fun", "awesome">, "types are awesome!">
  >
];
