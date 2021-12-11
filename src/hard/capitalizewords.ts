import { Expect, Equal } from "@type-challenges/utils";
import { WhiteSpace } from "..";

/**
 * @description 将字符串单词转换为大写
 * @tips 1.提取字符串中的特殊字符 ' ', ',', '.'
 *       2.根据特殊字符分析上下文，提取左右单词
 *       3.转换左右单词为大驼峰形式
 */
export type CapitalizeWords<
  S extends string,
  FirstSep extends string = FirstSeparator<S>
> = S extends `${infer Head}${FirstSep}${infer Tail}`
  ? `${Capitalize<Head>}${FirstSep}${CapitalizeWords<Tail>}`
  : Capitalize<S>;

// 有缺点只能是空格，不能计算其他情况
type CapitalizeWords1<S> = S extends `${infer F}${WhiteSpace}${infer L}`
  ? `${Capitalize<F>} ${CapitalizeWords<`${Capitalize<L>}`>}`
  : S;

type FirstSeparator<S> = S extends `${infer Head}${infer Tail}`
  ? Head extends " " | "," | "."
    ? Head
    : FirstSeparator<Tail>
  : never;

type capitalized = CapitalizeWords<"hello world, my friends">; // expected to be 'Hello World, My Friends'

type cases = [
  Expect<
    Equal<CapitalizeWords<"hello world, my friends">, "Hello World, My Friends">
  >
];
