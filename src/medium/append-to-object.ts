import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 向对象类型添加一组 key-value
 * @tips 1.限制为`O`为对象类型,`Key`为字符串类型,符合一个正常对象
 *       2.通过`keyof`和`|`联合类型,获取`O`的所有`key`联合上`Key`,取得所有`key`
 *       3.通过`extends`获取对应的类型
 */
type AppendToObject<O extends object, Key extends string, Value> = {
  [P in keyof O | Key]: P extends keyof O ? O[P] : Value;
};
type Test = { id: "1" };
type Result = AppendToObject<Test, "value", 4>; // expected to be { id: '1', value: 4 }

type cases = [
  Expect<Equal<AppendToObject<Test, "value", 4>, { id: "1"; value: 4 }>>,
  Expect<Equal<AppendToObject<Test, "3213", 1>, { id: "1"; "3213": 1 }>>,
  Expect<
    Equal<
      AppendToObject<Test, "321", { a: 123; b: boolean }>,
      { id: "1"; "321": { a: 123; b: boolean } }
    >
  >
];
