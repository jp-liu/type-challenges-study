import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 合并两个对象,相同的键,使用`K`的键值
 * @tips 1.通过`Union`联合类型获取所有的`key`,然后判断`key`的来源,优先判断`K`的即可
 */
type Merge<T, K> = {
  [P in keyof T | keyof K]: P extends keyof K
    ? K[P]
    : P extends keyof T
    ? T[P]
    : never;
};

type Foo = {
  a: number;
  b: string;
};

type Bar = {
  b: number;
};

type a = keyof Foo & keyof Bar;
type b = { [P in a]: Bar[P] };

type merged = Merge<Foo, Bar>; // expected { a: number; b: number }

type cases = [Expect<Equal<Merge<Foo, Bar>, { a: number; b: number }>>];
