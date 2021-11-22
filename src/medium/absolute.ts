import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 实现一个方法,将`string`,`number`和`bigint`的数值转换为绝对值
 * @tips `T=100`的话,则没有`-`号,不符合条件,进入``${T}``,
 *        当`T`有`-`号,则符合条件,`infer R`是没有`-`号的部分,直接输出,
 *        这里使用`-`号,作为了验算条件
 */
type Absolute<T extends string | number | bigint> = `${T}` extends `-${infer R}`
  ? R
  : `${T}`;

type Test = -100;
type Result = Absolute<Test>; // expected to be "100"

type cases = [
  Expect<Equal<Absolute<-100>, '100'>>,
  Expect<Equal<Absolute<100>, '100'>>,
  Expect<Equal<Absolute<'-100'>, '100'>>,
]
