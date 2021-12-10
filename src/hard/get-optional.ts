import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 提取可选类型,重组类型
 * @tips 1.通过映射类型断言, 提取当前 `key` 组成新的类型,如果空对象能满足,则是可选 `key`
 */
type GetOptional<T> = {
  [key in keyof T as {} extends Pick<T, key> ? key : never]: T[key];
};

type I = GetOptional<{ foo: number; bar?: string }>; // expected to be { bar?: string }

type cases = [
  Expect<Equal<GetOptional<{ foo: number; bar?: string }>, { bar?: string }>>
];
