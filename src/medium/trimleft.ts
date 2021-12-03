import { Expect, Equal } from "@type-challenges/utils";
import { WhiteSpace } from "..";

/**
 * @description 删除字符串左侧空格
 * @tips 和`trim`一样
 */
type TrimLeft<S extends string> = S extends `${WhiteSpace}${infer L}`
  ? TrimLeft<L>
  : S;

type trimmed = TrimLeft<"  Hello World  ">; // expected to be 'Hello World  '

type cases = [Expect<Equal<TrimLeft<"  Hello World  ">, "Hello World  ">>];
