import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 去除只读`readonly`限制
 * @tips 这个简单,应该属于`easy`类,直接使用`-`就行
 */
type Mutable<T> = { -readonly [P in keyof T]: T[P] };

interface Todo {
  readonly title: string;
  readonly description: string;
  readonly completed: boolean;
}

// { title: string; description: string; completed: boolean; }
type MutableTodo = Mutable<Todo>;

type cases = [
  Expect<
    Equal<
      Mutable<Todo>,
      { title: string; description: string; completed: boolean }
    >
  >
];
