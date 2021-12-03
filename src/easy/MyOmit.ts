/**
 * @description 从 `T` 中忽略 `K`,也就是在 `T` 中 提取 `K` 没有的部分
 * @tips 利用 Pick 提取， 利用 Exclude 将 `T` 中的 `K` 部分排除
 */
type MyOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type aaa = Exclude<keyof Todo, "description" | "title"> // completed

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = MyOmit<Todo, "description" | "title">;

const todo: TodoPreview = {
  completed: false,
};

export {};
