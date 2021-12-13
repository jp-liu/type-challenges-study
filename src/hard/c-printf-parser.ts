import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 提取字符串中的因子元组
 * @tips 1.模板字符串推演
 *       2.添加对应项 => 元组
 */
type ParsePrintFormat<
  S extends string,
  K extends any[] = []
> = S extends `${infer _}%${infer L}${infer R}`
  ? L extends keyof ControlsMap
    ? ParsePrintFormat<R, [...K, ControlsMap[L]]>
    : ParsePrintFormat<R, K>
  : K;

// printf("The result is %d.", 42);

type ControlsMap = {
  c: "char";
  s: "string";
  d: "dec";
  o: "oct";
  h: "hex";
  f: "float";
  p: "pointer";
};

type a = ParsePrintFormat<"aa%c%d">;
type cases = [Expect<Equal<ParsePrintFormat<"%cdsahi%d">, ["char", "dec"]>>];
