import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 替换联合类型中的键。如果某些类型没有键，只需跳过替换。
 * @tips 1.变更键的类型,需要满足条件有两条
 *          - 在`K`中指定的`key`,才需要变更,没指定,则返回原值
 *          - 在`U`中指定对应`key`键的值,才知道需要变为什么类型,没指定则为`never`
 *       2.联合类型会自动分配展开,处理一个种情况即可
 */
type ReplaceKeys<T, K, U> = {
  [P in keyof T]: P extends keyof K ? (P extends keyof U ? U[P] : never) : T[P];
};

type NodeA = {
  type: "A";
  name: string;
  flag: number;
};

type NodeB = {
  type: "B";
  id: number;
  flag: number;
};

type NodeC = {
  type: "C";
  name: string;
  flag: number;
};

type Nodes = NodeA | NodeB | NodeC;
// would replace name from string to number, replace flag from number to string
type ReplacedNodes = ReplaceKeys<
  Nodes,
  "name" | "flag",
  { name: number; flag: string }
>;

// would replace name to never
type ReplacedNotExistKeys = ReplaceKeys<Nodes, "name", { aa: number }>;

type cases = [
  Expect<
    Equal<
      ReplaceKeys<Nodes, "name", { aa: number }>,
      | {
          type: "A";
          name: string;
          flag: number;
        }
      | {
          type: "B";
          id: number;
          flag: number;
        }
      | {
          type: "C";
          name: string;
          flag: number;
        }
    >
  >
];
