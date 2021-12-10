import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 判断输入类型是否是元组
 * @tips 1.元组是一种长度固定的数组
 *       2.通过判断是否是数组,且是否有长度来判定,是否是元组
 *       3.`number extends T['length']`当元组有长度时,是具体的长度,而没有长度的数组,['length']是`number`类型
 */
type IsTuple<T> = T extends readonly any[]
  ? number extends T["length"]
    ? false
    : true
  : false;

type case1 = IsTuple<[number]>; // true
type case2 = IsTuple<readonly [number]>; // true
type case3 = IsTuple<number[]>; // false

type cases = [
  Expect<Equal<IsTuple<[number]>, true>>,
  Expect<Equal<IsTuple<readonly [number]>, true>>,
  Expect<Equal<IsTuple<number[]>, false>>
];
