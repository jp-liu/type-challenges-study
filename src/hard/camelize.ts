import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 递归将连字符键转换为小驼峰形式
 * @tips 1.通过`Camelcase`将所有连字符转换为小驼峰
 *       2.通过`CamelizeArr`处理数组的情况
 */
type Camelize<T> = T extends object
  ? T extends readonly any[]
    ? CamelizeArr<T>
    : {
        [Key in keyof T as Key extends string ? Camelcase<Key> : Key]: Camelize<
          T[Key]
        >;
      }
  : T;

type CamelizeArr<A> = A extends readonly [infer Head, ...infer Tail]
  ? [Camelize<Head>, ...(Tail extends [] ? [] : CamelizeArr<Tail>)]
  : [];

type Camelcase<S extends string> = S extends `${infer F}_${infer L}`
  ? `${F}${Camelcase<Capitalize<L>>}`
  : S;

type answer = Camelize<{
  some_prop: string;
  prop: { another_prop: string };
  array: [{ snake_case: string }];
}>;

type cases = [
  Expect<
    Equal<
      Camelize<{
        some_prop: string;
        prop: { another_prop: string };
        array: [{ snake_case: string }];
      }>,
      {
        someProp: string;
        prop: { anotherProp: string };
        array: [{ snakeCase: string }];
      }
    >
  >
];
