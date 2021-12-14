import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 是否是 `any` 类型
 * @tips 1.实现一个只有 `any` 可以满足的类型,就可以了
 */
type IsAny<T> = 0 extends 1 & T ? true : false;

type a = IsAny<any>;
type b = IsAny<1>;

type cases = [
  Expect<Equal<IsAny<any>, true>>,
  Expect<Equal<IsAny<1>, false>>,
  Expect<Equal<IsAny<" ">, false>>,
  Expect<Equal<IsAny<{}>, false>>,
  Expect<Equal<IsAny<boolean>, false>>,
  Expect<Equal<IsAny<undefined>, false>>,
  Expect<Equal<IsAny<unknown>, false>>
];
