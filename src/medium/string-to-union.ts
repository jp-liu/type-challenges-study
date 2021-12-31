import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 将字符串变为联合类型
 * @tips 1.每次取出一个字符,进行联合
 */
export type StringToUnion<S extends string> = S extends `${infer F}${infer L}`
  ? F | StringToUnion<L>
  : never;
type a<T extends string> = T extends `${infer F}${infer L}` ? F | a<T> : T;

type Test = "123";
type Result = StringToUnion<"Test">; // expected to be "1" | "2" | "3"

type cases = [Expect<Equal<StringToUnion<Test>, "1" | "2" | "3">>];
