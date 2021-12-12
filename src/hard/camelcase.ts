import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 字符串小驼峰
 * @tips 1.将字符串全部转换成小写字符
 *       2.使用模板字符串进行推导,头部不用处理,后面的将其转化为头字母大写,继续下一步递归
 */
type CamelCase<
  S extends string,
  Temp extends string = Lowercase<S>
> = Temp extends `${infer Head}_${infer Tail}`
  ? `${Head}${CamelCase<"", Capitalize<Tail>>}`
  : Capitalize<Temp>;

type camelCase1 = CamelCase<"hello_world_with_types">; // expected to be 'helloWorldWithTypes'
type camelCase2 = CamelCase<"HELLO_WORLD_WITH_TYPES">; // expected to be same as previous one

type cases = [
  Expect<Equal<CamelCase<"hello_world_with_types">, "helloWorldWithTypes">>,
  Expect<Equal<CamelCase<"HELLO_WORLD_WITH_TYPES">, "helloWorldWithTypes">>
];
