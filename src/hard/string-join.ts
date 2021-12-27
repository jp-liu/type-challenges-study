import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 将元组按照分隔符转换为字符串
 * @tips 1.一个元素一个元素的处理`[infer Head, ...infer Tail]
 *       2.`R`用来存储已经连接的字符串
 *       3.`${R extends "" ? "" : `${R}${U}`}`处理第一个元素,第一个元素不需要连字符
 */
type Join<
  T extends any[],
  U extends string | number,
  R extends string = ""
> = T extends [infer Head, ...infer Tail]
  ? Tail["length"] extends 0
    ? `${R extends "" ? "" : `${R}${U}`}${Head & string}`
    : Join<Tail, U, `${R extends "" ? "" : `${R}${U}`}${Head & string}`>
  : R;
declare function join<U extends string>(
  delimiter: U
): <T extends string[]>(...parts: T) => Join<T, U>;

// "123---321---456"
const a = join("---")("123", "321", "456");
