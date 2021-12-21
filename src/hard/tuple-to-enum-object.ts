import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description
 * @tips 1.使用`PascalCase`类型辅助,将`key`转化能成为大驼峰
 *       2.使用`FindIndex`,查找元素下标
 */
type Enum<T extends readonly string[], N extends boolean = false> = {
  readonly [Key in T[number] as PascalCase<Key>]: T[number] extends infer L
    ? L extends Key
      ? N extends true
        ? FindIndex<T, Key>
        : Key
      : never
    : never;
};

/**
 * @description 查找元组元素的下标
 * @tips 1.通过推导,一个一个元素进行判断
 */
type FindIndex<
  T extends readonly string[],
  S extends T[number],
  I extends number[] = []
> = T extends readonly [infer F, ...infer L]
  ? F extends S
    ? I["length"]
    : L extends string[]
    ? FindIndex<L, S, [...I, 0]>
    : never
  : never;

/**
 * @description 首字母大写
 */
type PascalCase<S extends string> = S extends `${infer F}${infer R}`
  ? `${Uppercase<F>}${R}`
  : never;

type a = Enum<["aaa", "bbb"]>;

type cases = [
  Expect<
    Equal<
      Enum<["aaa", "bbb"]>,
      {
        readonly Aaa: "aaa";
        readonly Bbb: "bbb";
      }
    >
  >,
  Expect<
    Equal<
      Enum<["aaa", "bbb"], true>,
      {
        readonly Aaa: 0;
        readonly Bbb: 1;
      }
    >
  >
];
