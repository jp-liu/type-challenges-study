import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 扁平化数组,输出数组的所有类型
 * @tip 1.判断是否是空数组
 *      2.推导数组首元素,并将剩余元素放置到`T`上
 *      3.通过递归,一次次判断,直到元素不为数组,返回`[T]`或者为空数组,返回`[]`
 *      4.通过`...`展开运算符,展开第三步的结果,放到结果里`[...Flatten<H>, ...Flatten<T>]`
 */
type Flatten<T> = T extends []
  ? []
  : T extends [infer H, ...infer T]
  ? [...Flatten<H>, ...Flatten<T>]
  : [T];
type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]>; // [1, 2, 3, 4, 5]

type cases = [Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>];
