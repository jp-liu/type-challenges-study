import { Expect, Equal } from "@type-challenges/utils";
/**
 * @description 判断是否原生键
 * @tips 原理:
 *         "foo" extends string => true
 *         string extends "foo" => false
 */
type TypeLiteralOnly<T> = string extends T
  ? never
  : number extends T
  ? never
  : T;

/**
 * @description 从对象类型中排除索引签名
 * @tips 1.知道索引签名的类型, 参照`indexed1, indexed12`
 *       2.在对象中,索引签名会得到`key`的类型,而正常签名会得到一个字面量字符串,
 *         由此编写辅助类型`TypeLiteralOnly`,判断是否原生键
 *       3.通过映射类型,进行断言,排除索引签名
 */
type RemoveIndexSignature<T> = { [P in keyof T as TypeLiteralOnly<P>]: T[P] };

type Foo = {
  [key: string]: any;
  foo(): void;
};
type Bar = {
  [key: number]: any;
  bar(): number;
};
type indexed1 = keyof Foo; // string | "foo"
type indexed2 = keyof Bar; // number | "bar"

type A = RemoveIndexSignature<Foo>; // expected { foo(): void }

type cases = [
    Expect<Equal<RemoveIndexSignature<Foo>, { foo(): void }>>,
    Expect<Equal<RemoveIndexSignature<Bar>, { bar(): number }>>,
];
