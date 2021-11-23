import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 将模板字符转换为小驼峰字符串
 * @tips 1.判断是否是连字符字符串,不是则返回原值`S`
 *       2.第一个`H`不处理,递归,利用`Capitalize`辅助大写后续每一个`-`连字符的头字母
 *       3.是否保留连字符`-`,如果采用`-`连接大写字符,我们则需要保留
 */
// 1.原值
// type CamelCase<S> = S extends `${infer H}-${infer R}`
//   ? never
//   : S;

// 2.递归大写连字符首字母
// type CamelCase<S> = S extends `${infer H}-${infer R}`
//   ? `${H}${CamelCase<Capitalize<R>>}`
//   : S;

// 3.保留大写连字符
type CamelCase<S> = S extends `${infer H}-${infer R}`
  ? R extends Capitalize<R>
    ? `${H}-${CamelCase<R>}`
    : `${H}${CamelCase<Capitalize<R>>}`
  : S;

type camelCased = CamelCase<"foo-bar-baz">; // expected "fooBarBaz"

type cases = [Expect<Equal<CamelCase<"foo-bar-baz">, "fooBarBaz">>];
