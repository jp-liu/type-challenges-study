import { Expect, Equal } from "@type-challenges/utils";
import { ForOf } from "..";
import { Required } from "../easy/required";

/**
 * @description 将`K`置换为必选,如果不传递,则为设置全部
 * @tips 1.遍历结果,组装一个完整的接口
 *       2.将`K`和`T`的交集置为必选,然后交叉`T`中没有`K`的部分,得到结果
 * 就相当于 Required<K> + T-K = 必选部分加T剩余部分
 */
type RequiredByKeys<T, K extends keyof T = keyof T> = ForOf<
  Required<Pick<T, keyof T & K>> & Omit<T, K>
>;

interface User {
  name?: string;
  age?: number;
  address?: string;
}

type UserPartialName = RequiredByKeys<User, "name">; // { name: string; age?: number; address?: string }

type cases = [
  Expect<
    Equal<
      RequiredByKeys<User, "name">,
      { name: string; age?: number; address?: string }
    >
  >
];
