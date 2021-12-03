/**
 * @description `T` 是否存在于 `U` 存在则排除
 */
export type Exclude<T, U> = T extends U ? never : T;

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type test = Exclude<keyof Todo, "title">;
// type test = "description" | "completed"