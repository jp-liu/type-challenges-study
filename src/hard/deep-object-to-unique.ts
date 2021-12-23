import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 记录对象属性路径
 */
type DeepObjectToUniq<O extends object> = {
  [k in keyof O]: O[k] extends object
    ? DeepObjectToUniq<O[k]> & { _uniq?: [O, k] }
    : O[k];
};

type Foo = { foo: 2; bar: { 0: { a: "1" } }; baz: { 0: 1 } };

type UniqFoo = DeepObjectToUniq<Foo>;

declare let foo: Foo;
declare let uniqFoo: UniqFoo;

uniqFoo = foo; // ok
foo = uniqFoo; // ok

type T0 = Equal<UniqFoo, Foo>; // false
type T1 = UniqFoo["foo"]; // 2
type T2 = Equal<UniqFoo["bar"], UniqFoo["baz"]>; // false
type T3 = UniqFoo["bar"][0]; // 1
type T4 = Equal<keyof Foo & string, keyof UniqFoo & string>; // true
