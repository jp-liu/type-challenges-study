import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 属性切换可选
 * @tips 遍历即可
 */
export type Partial<T> = { [P in keyof T]?: T[P] };

interface Todo {
  name: string;
  age: number;
  job: string;
}

type cases = [
  Expect<
    Equal<
      Partial<Todo>,
      {
        name?: string;
        age?: number;
        job?: string;
      }
    >
  >
];
