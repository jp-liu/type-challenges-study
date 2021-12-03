/**
 * @description 像元组末尾中添加项
 */
type Push<T extends unknown[], K> = K extends unknown[]
  ? [...T, ...K]
  : [...T, K];

type Result = Push<[1, 2], "3">; // [1, 2, '3']

export {};
