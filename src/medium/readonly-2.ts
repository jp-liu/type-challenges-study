import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 指定属性变为只读,没有指定则全部为只读
 * @tips 1.约束`K`,并初始化为`keyof T`,默认是全部`key`
 *       2.`K`默认是全部,如果指定,则只会遍历指定的`K`
 *       3.采用交叉类型,满足`readonly`
 */
type ReadOnly<T, K extends keyof T = keyof T> = T & {
  readonly [P in K]: T[P];
};

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type read = ReadOnly<Todo, "title" | "description">;
const a: read = {
  title: "string",
  description: "string",
  completed: true,
};

// a.title = '123' // 无法分配到 "title" ，因为它是只读属性

type cases = [
  Expect<
    Equal<
      ReadOnly<Todo, "title" | "description">,
      Todo & {
        readonly title: string;
        readonly description: string;
      }
    >
  >
];
