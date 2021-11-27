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
export type Tuple<N extends number, T extends unknown[] = []> = T["length"] extends N
  ? T
  : Tuple<N, [...T, unknown]>;
