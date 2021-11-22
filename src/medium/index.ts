/**
 * @description `TS`中所有为`false`的类型
 */
export type falsy = false | "" | 0 | [] | { [P in any]: never };
