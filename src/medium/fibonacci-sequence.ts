import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 斐波那契数列
 * @tips 1.f(n) = f(n-1) + f(n-2)
 *       2.f(n) = 前面两个值相加
 *       3.通过`CurrentIndex`保存当前`n`
 *       4.通过`Prev+Current`求出一下级的数组,就是`队列`的斐波那契数列求法,两两相加,求出下一个数,然后弹出一个,继续计算
 *       5.通过`Current`在下一次递归中,拿到`Prev`
 */
type Fibonacci<
  T extends number,
  CurrentIndex extends number[] = [1],
  Prev extends number[] = [],
  Current extends number[] = [1]
> = CurrentIndex["length"] extends T
  ? Current["length"]
  : Fibonacci<T, [...CurrentIndex, 1], Current, [...Prev, ...Current]>;

type Result1 = Fibonacci<4>; // 2
type Result2 = Fibonacci<8>; // 21

type cases = [Expect<Equal<Fibonacci<3>, 2>>, Expect<Equal<Fibonacci<8>, 21>>];
