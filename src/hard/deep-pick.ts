/**
 * @description 深度递归提取类型
 * @tips 1.通过`Split`拆分路径
 *       2.通过`PickByPath`根据路径提取对应路径的`value`
 *       3.通过`UnionToIntersrction`将联合类型转换成为交叉类型
 */
type DeepPick<O extends object, K extends string> = UnionToIntersrction<
  K extends string ? PickByPath<O, Split<K>> : never
>;

/**
 * @description 联合类型转交叉类型
 */
type UnionToIntersrction<U> = (
  U extends any ? (arg: U) => void : never
) extends (arg: infer P) => void
  ? P
  : never;

type Path = readonly string[];

/**
 * @description 提取数组剩余参数部分
 * Tail<[]> = []
 * Tail<['foo', 'bar']> = ['bar']
 */
type Tail<P extends Path> = P extends [unknown, ...infer T] ? T : [];

/**
 * @description 拆分字符串
 * Split<'foo'> = ['foo']
 * Split<'foo.bar'> = ['foo', 'bar']
 */
type Split<S extends string> = S extends `${infer K}.${infer Rest}`
  ? [K, ...Split<Rest>]
  : [S];

/**
 * @description 根据元组路径获取类型`value`
 * PickByPath<{ foo: { bar:2 } }, ['foo', 'bar']> = 2
 * PickByPath<{ foo: { bar:2 } }, ['foo']> = { bar: 2 }
 */
type PickByPath<O, P extends Path> = P extends []
  ? O
  : P[0] extends keyof O
  ? { [K in P[0]]: PickByPath<O[P[0]], Tail<P>> }
  : unknown;

type obj = {
  name: "hoge";
  age: 20;
  friend: {
    name: "fuga";
    age: 30;
    family: {
      name: "baz";
      age: 1;
    };
  };
};

type T1 = DeepPick<obj, "name">; // { name : 'hoge' }
type T2 = DeepPick<obj, "name" | "friend.name">; // { name : 'hoge' } & { friend: { name: 'fuga' }}
type T3 = DeepPick<obj, "name" | "friend.name" | "friend.family.name">; // { name : 'hoge' } &  { friend: { name: 'fuga' }} & { friend: { family: { name: 'baz' }}} type cases = [Expect<Equal<>>];
