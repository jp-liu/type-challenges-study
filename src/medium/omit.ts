import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 从`T`中剔除`K`部分
 * @tips 从`T`中剔除`K`,也就是在`T`中提取`K`没有的部分,使用对应方法提取即可
 *       也可以使用映射类型进行断言操作
 */
type MyOmit<T, K> = Pick<T, Exclude<keyof T, K>>;
type MyOmit1<T, K> = { [P in keyof T as P extends K ? never : P]: T[P] };

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = MyOmit<Todo, "description" | "title">; // { completed: boolean }
type TodoPreview1 = MyOmit1<Todo, "description" | "title">; // { completed: boolean }

const todo: TodoPreview = {
  completed: false,
};
type cases = [
  Expect<
    Equal<
      MyOmit<Todo, "description" | "title">,
      {
        completed: boolean;
      }
    >
  >,
  Expect<
    Equal<
      MyOmit1<Todo, "description" | "title">,
      {
        completed: boolean;
      }
    >
  >
];
