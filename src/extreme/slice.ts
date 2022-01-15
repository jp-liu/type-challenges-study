import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 实现数组的`slice`类型版本
 * @tips 1.封装`SliceNormal`,使用柯里化,封装内部参数
 *       2.创建`MakePositive`,定位起点和结束点,因为存在负数,需要计算
 *       3.创建`Repect`,生成指定长度的`T[]`的元组
 */
type Slice<
  Arr extends any[],
  Start extends number = 0,
  End extends number = Arr["length"]
> = SliceNormal<
  Arr,
  MakePositive<Start, Repect<0, Arr["length"]>>,
  MakePositive<End, Repect<0, Arr["length"]>>
>;

/**
 * @description 根据数字创建固定长度的元组
 */
type Repect<T, N extends number, R extends T[] = []> = R["length"] extends N
  ? R
  : Repect<T, N, [T, ...R]>;

/**
 * @description 计算负数的对应下标
 * @tips 1.判断是不是负数,不是则直接返回
 *       2.是负数,则用数组长度减去对应的数, `-2`,就是 `length-2`
 */
type MakePositive<
  N extends number,
  T extends any[],
  R extends any[] = []
> = `${N}` extends `-${string}`
  ? // 不满足的时候,则说明已经没有元素可以减,例如数组就三个元素, 写了-4
    T extends [any, ...infer Rest]
    ? `-${R["length"]}` extends `${N}`
      ? T["length"] // 相等则表示已经减完了,将剩余的返回
      : MakePositive<N, Rest, [any, ...R]> // 不相等则使用`Rest`,相当于减少一位,`R`加一位表示已经处理的数量
    : 0
  : N;
type a = MakePositive<-2, Repect<0, 5>>;

/**
 * @description 截取元组
 * @tips 1.使用`Pre`记录已经处理过的元素
 *       2.`Pre["length"] extends End`
 *             - true  表示已经截取完毕,左闭右开,`End`取不到,直接返回`R`
 *             - false 表示还没截取完毕
 *       3.`Pre["length"] extends Start`
 *             - true  表示开始,将第一个元素加入`R`,开启递归
 *             - false 表示没结束,但是不知道开始没
 *      4.`R extends []`
 *             - true  表示还没开始截取,`Pre`加入当前元素,标记已经处理过了
 *             - false 表示已经有元素,在截取过程中,`R`参数累加即可
 */
type SliceNormal<
  Arr extends any[],
  Start extends number = 0,
  End extends number = Arr["length"],
  Pre extends any[] = [],
  R extends any[] = []
> = Arr extends [infer F, ...infer L]
  ? Pre["length"] extends End
    ? R
    : Pre["length"] extends Start
    ? SliceNormal<L, Start, End, [...Pre, F], [F]>
    : R extends []
    ? SliceNormal<L, Start, End, [...Pre, F]>
    : SliceNormal<L, Start, End, [...Pre, F], [...R, F]>
  : R;

type Arr1 = [1];
type Result = Slice<Arr1, 2>; // expected to be [3, 4]

type Arr = [1, 2, 3, 4, 5];

type cases = [
  // basic
  Expect<Equal<Slice<Arr, 0, 1>, [1]>>,
  Expect<Equal<Slice<Arr, 0, 0>, []>>,
  Expect<Equal<Slice<Arr, 2, 4>, [3, 4]>>,

  // optional args
  Expect<Equal<Slice<[]>, []>>,
  Expect<Equal<Slice<Arr>, Arr>>,
  Expect<Equal<Slice<Arr, 0>, Arr>>,
  Expect<Equal<Slice<Arr, 2>, [3, 4, 5]>>,

  // negative index
  Expect<Equal<Slice<Arr, 0, -1>, [1, 2, 3, 4]>>,
  Expect<Equal<Slice<Arr, -3, -1>, [3, 4]>>,

  // invalid
  Expect<Equal<Slice<Arr, 10>, []>>,
  Expect<Equal<Slice<Arr, 1, 0>, []>>,
  Expect<Equal<Slice<Arr, 10, 20>, []>>
];
