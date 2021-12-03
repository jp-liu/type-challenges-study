import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 输入接受类似于 `PromiseAll` 的对象数组的函数。返回值应该是 `Promise<T>` ，其中 `T` 是已解析的结果数组。
 *              返回 `PromiseAll` 中每个`Promise`的返回值类型
 * @tips 1.[...T]获取全部参数
 *       2.返回值`Promise<{}>`需要判定参数是否返回的还是`Promise`类型,如果是需要得到返回值类型
 */
declare function PromiseAll<T extends unknown[]>(
  values: readonly [...T]
): Promise<{ [P in keyof T]: T[P] extends Promise<infer R> ? R : T[P] }>;

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise<string>((resolve, reject) => {
  setTimeout(resolve, 100, "foo");
});

// function PromiseAll<[Promise<number>, number, Promise<string>]>(values: readonly [Promise<number>, number, Promise<string>]): Promise<[number, number, string]>
const PromiseAllType = PromiseAll([promise1, promise2, promise3]);

// expected to be `Promise<[number, number, string]>`
const p = Promise.all([promise1, promise2, promise3]);

type cases = [
  Expect<Equal<typeof PromiseAllType, Promise<[number, number, string]>>>
];
