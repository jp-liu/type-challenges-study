import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 获取字符串长度,支持上百的长度
 * @tips 1.简单版本的是一个一个加长度,这里我们十个十个的加就行了嘛,哈哈,这个也太秀了
 */
type LengthOfString<
  S extends string,
  C extends number[] = []
> = S extends `${infer F0}${infer F1}${infer F2}${infer F3}${infer F4}${infer F5}${infer F6}${infer F7}${infer F8}${infer F9}${infer R}`
  ? LengthOfString<R, [...C, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]>
  : S extends `${infer F}${infer R}`
  ? LengthOfString<R, [...C, 0]>
  : C["length"];
