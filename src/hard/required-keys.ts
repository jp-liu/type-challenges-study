import { Expect, Equal } from "@type-challenges/utils";
import { GetRequired } from "./get-required";

/**
 * @description 提取所有必选的 `key`
 * @tips 1.`keyof`就行了,我不知道为啥这个题为啥在 `hard` 分类中
 */
type RequiredKeys<T> = keyof GetRequired<T>;

type Result = RequiredKeys<{ foo: number; bar?: string }>;
// expected to be “foo”

type cases = [
  Expect<Equal<RequiredKeys<{ foo: number; bar?: string }>, "foo">>
];
