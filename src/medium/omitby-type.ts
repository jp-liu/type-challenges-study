import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 排除`T`中`K`类型的键
 * @tips
 */
type OmitByType<T, K> = { [P in keyof T as T[P] extends K ? never : P]: T[P] };

type OmitBoolean = OmitByType<
  {
    name: string;
    count: number;
    isReadonly: boolean;
    isEnable: boolean;
  },
  boolean
>; // { name: string; count: number }

type cases = [
  Expect<
    Equal<
      OmitByType<
        {
          name: string;
          count: number;
          isReadonly: boolean;
          isEnable: boolean;
        },
        boolean
      >,
      { name: string; count: number }
    >
  >
];
