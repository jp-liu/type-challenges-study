import { Expect, Equal } from "@type-challenges/utils";

type WhiteSpace = " " | "\n" | "\t";

/**
 * @description 去除右侧多余空格
 * @tips 1.是用模板字符串进行推导,去除多余空格
 */
type TrimRight<T> = T extends `${infer S}${WhiteSpace}` ? TrimRight<S> : T;

type Trimed = TrimRight<"   Hello World    ">; // expected to be '   Hello World'

type cases = [Expect<Equal<TrimRight<"   Hello World    ">, "   Hello World">>];
