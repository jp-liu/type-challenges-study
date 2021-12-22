import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 字符串匹配转换,未匹配项默认为 `string`
 * @tips 1.`%s` 对应 (x: string) => ???
 *       2.`%d` 对应 (x: number) => ???
 *       3.通过`MapDict`映射地图,进行`extends`匹配
 */
type Format<T extends string> = T extends `${string}%${infer M}${infer R}`
  ? M extends keyof MapDict
    ? (x: MapDict[M]) => Format<R>
    : Format<R>
  : string;

type MapDict = {
  s: string;
  d: number;
};

type FormatCase1 = Format<"%sabc">; // FormatCase1 : string => string
type FormatCase2 = Format<"%s%dabc">; // FormatCase2 : string => number => string
type FormatCase3 = Format<"sdabc">; // FormatCase3 :  string
type FormatCase4 = Format<"sd%abc">; // FormatCase4 :  string

type cases = [
  Expect<Equal<Format<"%sabc">, (a: string) => string>>,
  Expect<Equal<Format<"%s%dabc">, (x: string) => (x: number) => string>>,
  Expect<Equal<Format<"sdabc">, string>>,
  Expect<Equal<Format<"sdabc">, string>>
];
