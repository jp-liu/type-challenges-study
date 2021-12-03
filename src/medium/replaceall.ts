import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 将`S`中的`From`全部替换为`To`
 * @tips 1.和`replace`一样,只不过递归调用,全量替换罢了
 *       2.递归需要注意,可能会存在漏洞,比如 <"fooo","fo","f"> => foo => fo => f,这很明显有问题
 *         需要将变更完后的字符串保留,作为下一次推导的前缀
 *       3.`Before`作为上一次演算的结果,下一次就不参与了,作为推演前缀
 */
type ReplaceAll<
  S extends string,
  From extends string,
  To extends string,
  Before extends string = ""
> = From extends ""
  ? S
  : S extends `${Before}${infer R}${From}${infer L}`
  ? ReplaceAll<`${Before}${R}${To}${L}`, From, To, `${Before}${R}${To}`>
  : S;

type replaced = ReplaceAll<"t y p e s", " ", "">; // expected to be 'types'
type replaced1 = ReplaceAll<"fooofooo", "fo", "f">; // 没有`Before`之前 => "ff"

type cases = [
  Expect<Equal<ReplaceAll<"t y p e s", " ", "">, "types">>,
  Expect<Equal<ReplaceAll<"fooofooo", "fo", "ts">, "tsootsoo">>,
  Expect<Equal<ReplaceAll<"fooofooo", "fo", "f">, "foofoo">>
];
