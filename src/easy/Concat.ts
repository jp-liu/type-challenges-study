/**
 * @description 组合两个元组
 * ...可以展开数组类型
 */
type Concat<T extends any[], K extends any[]> = [...T, K[number]]

type Result = Concat<[1], [2]> // expected to be [1, 2]

export {}