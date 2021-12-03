/**
 * @description 像数组开头添加添加一项
 */

type Unshift<T extends unknown[], K> = K extends unknown[]
  ? [...K, ...T]
  : [K, ...T];

type Result = Unshift<[1, 2], 0>; // [0, 1, 2,]
