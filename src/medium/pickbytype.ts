import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 根据`U`类型,再`T`中提取对于的键值对类型
 * @tips 1.使用映射类型,进行条件判断
 *       2.利用`never`的`key`会自动过滤的特性,排除掉不是`U`类型的`key`
 */
type PickByType<T, U> = { [P in keyof T as T[P] extends U ? P : never]: T[P] };

type OnlyBoolean = PickByType<
  {
    name: string;
    count: number;
    isReadonly: boolean;
    isEnable: boolean;
  },
  boolean
>; // { isReadonly: boolean; isEnable: boolean; }

type cases = [
  Expect<
    Equal<
      PickByType<
        {
          name: string;
          count: number;
          isReadonly: boolean;
          isEnable: boolean;
        },
        boolean
      >,
      { isReadonly: boolean; isEnable: boolean }
    >
  >
];
