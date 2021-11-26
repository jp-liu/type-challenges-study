import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 判断两个对象类型不一样的地方
 * @tips 1.我们需要通过联合类型获取所有的`key`
 *       2.通过`extends`进行条件判断,判断`key`从何而来
 *       3.重点: `diff`是取出两个集合的差集,也就是二者集合之外交集的部分,通过`&`交叉,获取交集,然后排除掉
 */
type Diff<T, K> = {
  [P in keyof T | keyof K as Exclude<P, keyof T & keyof K>]: P extends keyof T
    ? T[P]
    : P extends keyof K
    ? K[P]
    : never;
};

type Foo = {
  name: string;
  age: string;
};

type Bar = {
  name: string;
  age: string;
  gender: number;
};

type test0 = Diff<Foo, Bar>; // expected { gender: number }

type cases = [Expect<Equal<Diff<Foo, Bar>, { gender: number }>>];
