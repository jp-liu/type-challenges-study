import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 将驼峰字符串,转换成连字符形式
 * @tips 1.通过模板字符串类型,一个字母一个字母操作
 *       2.通过`Uncapitailize`判断是否首字母是否大写
 */
type KebabCase<S> = S extends `${infer F}${infer L}`
  ? L extends Uncapitalize<L>
    ? `${Uncapitalize<F>}${KebabCase<L>}`
    : `${Uncapitalize<F>}-${KebabCase<L>}`
  : S;

type a = Uncapitalize<'FooBarBaz'> // "fooBarBaz"
type kebabCase = KebabCase<"FooBarBaz">; // expected "foo-bar-baz"

type cases = [Expect<Equal<KebabCase<"FooBarBaz">, "foo-bar-baz">>];
