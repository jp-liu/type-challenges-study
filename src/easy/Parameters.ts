/**
 * @description 获取函数参数
 */
export type Parameters<T extends (...args: any) => any> = T extends (
  ...args: infer R
) => any
  ? R
  : never;

type func = Parameters<(a: string, b: [1, 2, 3]) => void>;
// type func = [a: string, b: [1, 2, 3]]