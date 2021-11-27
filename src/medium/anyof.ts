import { Expect, Equal } from "@type-challenges/utils";
import { falsy } from "..";

/**
 * @description 元组中是否有布尔值为`false`的值,有则返回`false`,没有则为`true`
 * @tips 1.`T extends [infer H, ...T]`条件符合,说明不是空数组
 *       2.通过`infer`推导第一个元素, 通过`infer`将剩余元素重新赋值给`T`
 *       3.`H`为`false`则递归下一组元素,直到没有元素,则为`false`
 */
type AnyOf<T extends readonly any[]> = T extends [infer H, ...infer T]
  ? H extends falsy
    ? AnyOf<T>
    : true
  : false;

type Sample1 = AnyOf<["", false, [], {}]>; // expected to be true
type Sample2 = AnyOf<[0, "", false, [], {}]>; // expected to be false
type a = { [P in any]: never };

type cases = [
  Expect<Equal<AnyOf<[1, "", false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, "", false, [], {}]>, false>>
]
