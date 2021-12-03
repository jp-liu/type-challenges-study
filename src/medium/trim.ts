import { Expect, Equal } from "@type-challenges/utils";
import { WhiteSpace } from "..";

/**
 * @description 删除头尾空格
 * @tips 1.分别匹配左右空格,进行推导,不用`${infer R}${WhiteSpace}${infer L}`推导中间即可
 */
type Trim<S extends string> = S extends `${WhiteSpace}${infer L}`
  ? Trim<L>
  : S extends `${infer R}${WhiteSpace}`
  ? Trim<R>
  : S;

type trimmed = Trim<"  Hello World  ">; // expected to be 'Hello World'

type cases = [Expect<Equal<Trim<"  Hello World  ">, "Hello World">>];
