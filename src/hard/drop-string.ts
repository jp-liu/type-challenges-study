import { Expect, Equal } from "@type-challenges/utils";
import { StringToUnion } from "../medium/string-to-union";

/**
 * @description 排除字符串中指定字符
 * @tips 1.通过`StringToUnion`将指定字符转换成为联合类型
 *       2.通过`R`存储处理过的字符串,一个个判定即可
 */
type DropString<
  S extends string,
  D extends string,
  R extends string = ""
> = S extends `${infer F}${infer L}`
  ? F extends StringToUnion<D>
    ? DropString<L, D, R>
    : DropString<L, D, `${R}${F}`>
  : R;

type Butterfly = DropString<"foobar!", "fb">; // 'ooar!'

type cases = [Expect<Equal<DropString<"foobar!", "fb">, "ooar!">>];
