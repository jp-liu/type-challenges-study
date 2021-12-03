import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 将联合类型转换为包含联合排列的数组的排列类型
 * @think 一开始我打算使用模板类型的十字相乘,但是好像错了,这样做不到
 *        不过根本还是要拿联合类型的每一项去进行排列
 *
 * @tips 1.利用联合类型分配,只需要处理一个,会自动分配其他所有的联合类型
 *       2.利用`infer U`推导出当前元素,我是这样理解的
 */
type Permutation<T, C = T> = [T] extends [never]
  ? []
  : C extends infer U
  ? [U, ...Permutation<Exclude<T, U>>]
  : [];

// 第一步,联合类型分配 "A"
// "A" | "B" | "C" => ["A", ...Permutation<"B" | "C">]
// 联合类型先是 "B"
// "B" | "C"       => ["B", ...Permutation<"C">]
// "C"             => ["C", ...[]]
// "B" | "C"       => ["B", ...["C"]]   => ["B", "C"]
// 联合类型再是 "C"
// "B" | "C"       => ["C", ...Permutation<"B">]
// "B"             => ["B", ...[]]
// "B" | "C"       => ["C", ...["B"]]   => ["C", "B"]
// 没有了,递归第一次得到结果,返回
// "A" | "B" | "C" => ["A", ...["B", "C"]] => ["A", "B", "C"]
// "A" | "B" | "C" => ["A", ...["C", "B"]] => ["A", "C", "B"]

// 第二步,联合类型分配 "B"
// "A" | "B" | "C" => ["B", ...Permutation<"A" | "C">] // A-C 互换,成就两种结果
// ["B", "A", "C"] | ["B", "C", "A"]

// 第三步,联合类型分配 "C"
// "A" | "B" | "C" => ["C", ...Permutation<"A" | "B">] // A-B 互换,成就两种结果
// ["C", "A", "B"] | ["C", "B", "A"]

type perm = Permutation<"A">;
type perm1 = Permutation<"A" | "B" | "C">;
// expected ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']

type cases = [Expect<Equal<Permutation<"A">, ["A"]>>];
