import { Expect, Equal } from "@type-challenges/utils";
import { ForOf } from "..";

/**
 * @description 将指定联合属性`U`置为可选属性
 * @tips 1.`extends`条件类型判断即可
 */
type PartialByKeys<T, K extends keyof T = keyof T> = ForOf<
  Omit<T, K> & { [P in K]?: T[P] }
>;

// 作者的方案,测试过了,给never,和这个一样,是没处理,没必要那么麻烦
// type PartialByKeys<T, K extends keyof any = keyof T> = ForOf<Partial<Pick<T,Extract<keyof T, K>>> & Omit<T,K>>

// type PartialByKeys<T extends {}, K extends keyof T> = {
//   [P in keyof T as P extends K ? P : never]?: T[P];
// } & { [P in keyof T as P extends K ? never : P]: T[P] } extends infer U
//   ? { [P in keyof U]: U[P] }
//   : never;

// type PartialByKeys<T extends {}, K extends keyof T> = {
//   [P in keyof T as P extends K ? P : never]?: T[P];
// } & Pick<T, Exclude<keyof T, K>> extends infer U
//   ? { [P in keyof U]: U[P] }
//   : never;

// Pick<T, Exclude<keyof T, K>>;
interface User {
  name?: string;
  age?: number;
  address: string;
}

type UserPartialName = PartialByKeys<User>; // { name?:string; age:number; address:string }

const b: UserPartialName = {
  name: "1",
  age: 12,
  address: "123",
};

type cases = [
  Expect<
    Equal<
      PartialByKeys<User, never>,
      { name?: string; age?: number; address: string }
    >
  >
];
