import { Expect, Equal } from "@type-challenges/utils";

enum Comparison {
  Greater,
  Equal,
  Lower,
}

/**
 * @description 比较数字的大小
 * @tips 1.`TS`比较大小,需要取巧啊,创建比较大小的`LargeThan`辅助类型
 *       2.先判断是否相等,然后`A/B`判断负数的情况
 *       2.都是负数的情况,去除负号比较数值大小
 */
type Comparator<A extends number, B extends number> = A extends B
  ? Comparison.Equal
  : `${A}` extends `-${infer A1}`
  ? `${B}` extends `-${infer B1}`
    ? LargeThan<StringToNumber<A1>, StringToNumber<B1>> extends true
      ? Comparison.Lower
      : Comparison.Greater
    : Comparison.Lower
  : `${B}` extends `-${infer B1}`
  ? Comparison.Greater
  : LargeThan<A, B> extends true
  ? Comparison.Greater
  : Comparison.Lower;

type a1 = Comparator<-5, 1>;
/**
 * @description 判断`A`是否大于`B`
 * @tips 1.通过同步增加`AList/BList`,然后查看长度
 *          - A extends AList["length"] 则说明`A`已经达到最大值了,则`A < B`,返回`false`
 */
type LargeThan<
  A extends number,
  B extends number,
  List extends number[] = []
> = A extends List["length"]
  ? false
  : B extends List["length"]
  ? true
  : LargeThan<A, B, [0, ...List]>;

type a = LargeThan<4, 3>;

/**
 * @description 字符串类型转换成为数字
 */
type StringToNumber<S extends string> = ToTuple<S>["length"];

/**
 * @description 字符串转换为元组
 * 110 => 1, 10 => [0]
 * 10  => 1, 0  => [Make10<[0]>, [0]]
 * 0   => 0     => [Make10<Make10<[0]>>, [0]]
 */
type ToTuple<
  S extends string,
  T extends any[] = []
> = S extends `${infer F}${infer L}`
  ? ToTuple<L, [...Make10<T>, ...Make1<F>]>
  : T;

type a2 = Make10<[]>;
type a3 = ToTuple<"110">;

type Make1<S extends string, T extends any[] = []> = `${T["length"]}` extends S
  ? T
  : Make1<S, [0, ...T]>;

type Make10<T extends any[]> = [
  ...T,
  ...T,
  ...T,
  ...T,
  ...T,
  ...T,
  ...T,
  ...T,
  ...T,
  ...T
];

type cases = [
  Expect<Equal<Comparator<5, 5>, Comparison.Equal>>,
  Expect<Equal<Comparator<5, 6>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 8>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 0>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, 0>, Comparison.Lower>>,
  Expect<Equal<Comparator<0, 0>, Comparison.Equal>>,
  Expect<Equal<Comparator<0, -5>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -3>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -3>, Comparison.Lower>>,
  Expect<Equal<Comparator<-25, -30>, Comparison.Greater>>,
  Expect<Equal<Comparator<15, -23>, Comparison.Greater>>,
  Expect<Equal<Comparator<40, 37>, Comparison.Greater>>,
  Expect<Equal<Comparator<-36, 36>, Comparison.Lower>>,
  Expect<Equal<Comparator<27, 27>, Comparison.Equal>>,
  Expect<Equal<Comparator<-38, -38>, Comparison.Equal>>
];
