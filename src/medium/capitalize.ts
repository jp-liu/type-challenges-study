import { CapitalizedChars } from "..";

/**
 * @description 首字母大写
 * @tips 好像并不能知道第一个字母对应的大写是什么,这很明显需要一个字典,但是`TS`我们有字典吗?
 */
type Capitalize<S> = S extends `${infer F}${infer T}`
  ? `${F extends keyof CapitalizedChars ? CapitalizedChars[F] : F}${T}`
  : S;

type capitalized = Capitalize<"hello world">; // expected to be 'Hello world'
