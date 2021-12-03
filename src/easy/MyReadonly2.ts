/**
 * @description 在 `T` 中将 `K` 指定属性设置为只读
 */
type MyReadonly2<T, K extends keyof T> = T & { readonly [P in K]: T[P] };
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
type ccc = MyReadonly2<Todo, "title" | "description">
const todo: MyReadonly2<Todo, "title" | "description"> = {
  title: "Hey",
  description: "foobar",
  completed: false,
};

// todo.title = "Hello"; // Error: cannot reassign a readonly property
// todo.description = "barFoo"; // Error: cannot reassign a readonly property
todo.completed = true; // OK
