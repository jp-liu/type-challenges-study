import { Expect, Equal } from "@type-challenges/utils";
import { Required } from "../easy/required";

/**
 * @description 枚举对象的所有`key`
 * @tips 1.取出所有`T`的`keyof`
 *       2.遍历获取结果,利用`keyof`通过`mapped`类型,分配得到所有`value`
 */
type ObjectEntries<T extends object, K = Required<T>> = {
  [P in keyof K]: [P, K[P]];
}[keyof K];

interface Model {
  name: string;
  age: number;
  locations: string[] | null;
}
type modelEntries = ObjectEntries<Model>; // ['name', string] | ['age', number] | ['locations', string[] | null];

type cases = [
  Expect<
    Equal<
      ObjectEntries<Model>,
      ["name", string] | ["age", number] | ["locations", string[] | null]
    >
  >
];
