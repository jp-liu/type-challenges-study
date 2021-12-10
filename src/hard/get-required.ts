import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 在`T`中提取必选参数
 * @tips 1.通过映射类型断言, 在`T`中提取`K`,如果 {} extends Pick<T, key> 则证明,这个值可选,因为空对象和纯可选是一致的
 */
type GetRequired<T> = {
  [key in keyof T as {} extends Pick<T, key> ? never : key]: T[key];
};

type I = GetRequired<{ foo: number; aaa: string; bar?: string }>; // expected to be { foo: number }

type cases = [
  Expect<Equal<GetRequired<{ foo: number; bar?: string }>, { foo: number }>>
];
