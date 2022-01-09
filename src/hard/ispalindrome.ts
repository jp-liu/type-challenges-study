import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 检查字符串或者数字是否回文
 * @tips 将字符串或者数字翻转,然后判定是否相同,达到效果
 */
type IsPalindrome<T extends string | number> = `${T}` extends StringReverse<T>
  ? true
  : false;

type StringReverse<
  S extends string | number,
  R extends string = ""
> = `${S}` extends `${infer H}${infer T}` ? StringReverse<T, `${H}${R}`> : R;

type s = StringReverse<"123">;
type fal = IsPalindrome<"abc">; // false
type tru = IsPalindrome<121>; // true

// type StringToTuple<T extends string> = T extends `${infer F}${infer R}`
//   ? [F, ...StringToTuple<R>]
//   : [];

// type IsIsPalindromeArray<T extends any[]> = T extends [
//   infer F,
//   ...infer M,
//   infer L
// ]
//   ? F extends L
//     ? IsIsPalindromeArray<M>
//     : false
//   : true;

// type IsPalindrome1<T extends string | number> = IsIsPalindromeArray<
//   StringToTuple<`${T}`>
// >;

type cases = [
  Expect<Equal<IsPalindrome<"abc">, false>>,
  Expect<Equal<IsPalindrome<121>, true>>
];
