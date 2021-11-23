import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 可链式选项,通过链式调用,收集所有的键值对类型,并在`get`方法进行返回
 * @tips 1.实现一个链式调用返回的接口,`option`需要返回`Chainable`,才能链式调用
 *       2.通过泛型,存储一个类型,并在`get`时进行返回
 */
interface Chainable<O = {}> {
  option<K extends string, V>(key: K, value: V): Chainable<O & { [P in K]: V }>;
  get(): O;
}

declare const config: Chainable;

const result = config
  .option("foo", 123)
  .option("name", "type-challenges")
  .option("bar", { value: "Hello World" })
  .get();
type b = typeof result
console.log(result.bar.value);

// expect the type of result to be:
interface Result {
  foo: number;
  name: string;
  bar: {
    value: string;
  };
}
