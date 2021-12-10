/**
 * @description `TS`中所有为`false`的类型
 */
export type falsy = false | "" | 0 | [] | { [P in any]: never };

/**
 * @description 大小写字典
 */
export interface CapitalizedChars {
  l: "L";
  j: "J";
  p: "P";
  f: "F";
  h: "H";
}

/**
 * @description 创建指定长度的`unknown`元组
 */
export type Tuple<
  N extends number,
  T extends unknown[] = []
> = T["length"] extends N ? T : Tuple<N, [...T, unknown]>;

/**
 * @description 匹配空格/空行
 */
export type WhiteSpace = " " | "\t" | "\n";

/**
 * @description 迭代`Map`,用于组装交叉类型或者联合类型
 */
export type ForOf<T extends {}> = { [P in keyof T]: T[P] };
