import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 计算`Props`的类型
 * @tips 1.计算属性的类型有两种情况
 *          - { a: String }
 *          - { type: String } || { type: [String, Number] }
 *       2.我们是通过基础类型的构造器来获取类型的,需要判断构造器
 *
 *       3.我们通过`Prop`判断两种情况
 *
 *       4.通过`PropConstructor`来判断构造器,取得返回值类型
 *
 *       5.`InferProps`是来迭代每一个`key`,获取`value`的类型,然后交给`Prop`判断类型
 */
type PropType<T> = PropConstructor<T> | PropConstructor<T>[];
type Prop<T = any> = PropType<T> | { type?: PropType<T> };

type PropConstructor<T = any> =
  | { new (...args: any[]): T & object }
  | { (): T };

// infer T 获取当前推导类型,也就是 StringConstructor || { type: StringConstructor }
type InferPropType<P> = P extends Prop<infer T>
  ? unknown extends T
    ? any
    : T
  : any;

type InferProps<P extends Record<string, any>> = {
  [K in keyof P]: InferPropType<P[K]>;
};

/**
 * @description 推导`Computed`类型
 * @tips 计算属性是函数计算,得到的应该是函数返回值
 */
type InferComputed<C extends Record<string, any>> = {
  [K in keyof C]: ReturnType<C[K]>;
};

declare function VueBasicProps<
  P,
  D,
  C extends Record<string, any>,
  M,
  Props = InferProps<P>
>(options: {
  props?: P;
  data?(this: Props): D;
  computed?: C & ThisType<Props & D & InferComputed<C> & M>;
  methods?: M & ThisType<Props & D & InferComputed<C> & M>;
}): Props & D & InferComputed<C> & M;

const vue = VueBasicProps({
  props: {
    a: String,
    b: {
      type: [String, Number, Boolean],
    },
  },
});

// 练习
// type a = {
//   a: string;
//   b: string | number | boolean;
// }
const a = {
  a: String,
  b: {
    type: [String, Number, Boolean],
  },
};
type a = InferProps<typeof a>;

// 获取构造器返回的类型
type PropConstructor1<T = any> = { new (...args: any[]): T & object };
type PropConstructor2<T = any> = { (): T };
type PropConstructor3<T = any> =
  | { new (...args: any[]): T & object }
  | { (): T };

type e1 = StringConstructor extends PropConstructor1<infer R> ? R : any; // String
type e2 = StringConstructor extends PropConstructor2<infer R> ? R : any; // string
type e3 = StringConstructor extends PropConstructor3<infer R> ? R : any; // string
type p1 = StringConstructor extends Prop<infer T> ? T : any; // string
type p2 = InferProps<{ a: StringConstructor }>; // string
