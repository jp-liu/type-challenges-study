import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 判断一个类型是否是联合类型
 * @tip 1.通过`extends`条件类型,会展开联合类型的特性,判断是否联合类型
 *      2.使用`C`保存`T`,用于比较,是否展开
 *      3.`never`不会算作一个联合条件
 */
type IsUnion<T, C = T> = T extends C ? ([C] extends [T] ? false : true) : never;

type a = string | never // string
type b = a
type c = a extends b ? true : false // true

// 判断一个联合类型的解析
type casea = IsUnion<string | number>; // true
// 1.`T = C = string | number`
// 2.使用`extends`展开后结果
//      [C] = [string | number]
//      [T] = [string] | [number]
// 3.[C] extends [T] = false  为`false`则是联合类型,`T`被展开分配了

// 不是联合类型
type case1 = IsUnion<string>; // false
//      [C] = [string]
//      [T] = [string]
// 条件成立,说明并未进行展开分配,所以不是联合类型

type case2 = IsUnion<string | number>; // true
type case3 = IsUnion<[string | number]>; // false

type cases = [
  Expect<Equal<IsUnion<string>, false>>,
  Expect<Equal<IsUnion<string | number>, true>>,
  Expect<Equal<IsUnion<[string | number]>, false>>
];
