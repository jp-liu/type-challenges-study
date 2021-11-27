import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 获取字符串类型的长度
 * @tips 1.`string`类型的`length`返回是的一个`number`类型,不是具体长度,不可用
 *       2.需要借助元组,来获取`length`,我们需要将字符一个一个加入元组,然后取`length`
 */
type LengthOfString<
  S extends string,
  T extends string[] = []
> = S extends `${infer F}${infer L}`
  ? LengthOfString<L, [...T, F]>
  : T["length"];

// 最后一步就相当于与这样  LengthOfString<'', ["H","e","l","l","o",",","","W","o","r","l","d"]>
type a = "" extends `${infer F}${infer L}` ? L : ["H","e","l","l","o",",","","W","o","r","l","d"]['length']; // 12

type length = LengthOfString<"Hello, World">; // expected to be 12

type cases = [Expect<Equal<LengthOfString<"Hello, World">, 12>>];
