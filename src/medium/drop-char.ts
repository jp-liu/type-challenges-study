import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 从字符串中删除指定的字符
 * @tip 1.通过模板字符串类型,判断是否有符合`U`条件的字符
 *      2.递归消除`U`
 */
type DropChar<T, U extends string> = T extends `${infer F}${U}${infer L}`
  ? DropChar<`${F}${L}`, U>
  : T;

type Butterfly = DropChar<" b u t t e r f l y ! ", " ">; // 'butterfly!'

type cases = [
  Expect<Equal<DropChar<" b u t t e r f l y ! ", " ">, "butterfly!">>,
  Expect<Equal<DropChar<"hellTTo world", "T">, "hello world">>
];
