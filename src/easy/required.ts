import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 所有属性全部置换为必选
 */
export type Required<T> = { [P in keyof T]-?: T[P] };

interface User {
  name?: string;
  age?: number;
  address?: string;
}

type UserPartialName = Required<User>; // { name: string; age?: number; address?: string }

type cases = [
  Expect<Equal<Required<User>, { name: string; age: number; address: string }>>
];
