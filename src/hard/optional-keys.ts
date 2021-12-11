import { Expect, Equal } from "@type-challenges/utils";
import { GetOptional } from "./get-optional";

/**
 * @description 将所有可选类型键,组合成为一个联合类型(联合类型是协变,交叉类型是逆变)
 * @tips 1.取出所有可选类型
 *       2.keyof 提取key
 */
type OptionalKeys<T> = keyof GetOptional<T>;

type optional = { a: string; b?: number; c?: boolean };
type res = OptionalKeys<optional>;

type cases = [Expect<Equal<OptionalKeys<optional>, "b" | "c">>];
