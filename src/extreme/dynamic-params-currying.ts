import { Equal, Expect } from '@type-challenges/utils'

/**
 * @description 柯里化: 通过传递部分参数,返回处理其他参数的函数这一种过程
 * @tips 1.意思就是,不一定是限制为只能传递一个参数,而是多个也行,例如:
 *          1.1 curried1('123')(123)(true) 可以
 *          1.2 curried1('123', 123)(false) 也可以
 *       2.第一种方案,穷举,将所有参数的情况都列出来,递归早就每种情况,一个参数的,两个参数的,甚至更多
 */
type Curried<A, R, Args extends any[] = []> = A extends []
  ? R
  : A extends [infer Head, ...infer Tail]
  ? // 单参数柯里化
    { (...args: [...Args, Head]): Curried<Tail, R> } & (Tail extends [] // 多参数柯里化
      ? {}
      : Curried<Tail, R, [...Args, Head]>)
  : never

// ((...args: [...Args, H]) => Curry<T, R>) 一个一个参数传递的情况
// Curry<T, R, [...Args, H]>                之前的参数加上新的, 组成这种情况 (args_0: string, args_1: number) => boolean
type Curry<A, R, Args extends any[] = []> = A extends [infer H, ...infer T]
  ? T extends []
    ? (...args: [...Args, H]) => R
    : ((...args: [...Args, H]) => Curry<T, R>) & Curry<T, R, [...Args, H]>
  : () => R
// type Curry<A, R, D extends unknown[] = []> = A extends [infer H, ...infer T]
//   ? T extends []
//     ? (...args: [...D, H]) => R
//     : ((...args: [...D, H]) => Curry<T, R>) & Curry<T, R, [...D, H]>
//   : () => R

// type a = () => string
type a = { (): string }
declare function DynamicParamsCurrying<Args extends any[], Ret>(
  fn: (...args: Args) => Ret
): Curry<Args, Ret>

const curried = DynamicParamsCurrying((a: string) => true)
const curried0 = DynamicParamsCurrying((a: string, b: number) => true)
const curried1 = DynamicParamsCurrying(
  (a: string, b: number, c: boolean) => true
)
const curried2 = DynamicParamsCurrying(
  (
    a: string,
    b: number,
    c: boolean,
    d: boolean,
    e: boolean,
    f: string,
    g: boolean
  ) => true
)

const curried1Return1 = curried1('123')(123)(true)
const curried1Return2 = curried1('123', 123)(false)
const curried1Return3 = curried1('123', 123, true)

const curried2Return1 = curried2('123')(123)(true)(false)(true)('123')(false)
const curried2Return2 = curried2('123', 123)(true, false)(true, '123')(false)
const curried2Return3 = curried2('123', 123)(true)(false)(true, '123', false)
const curried2Return4 = curried2('123', 123, true)(false, true, '123')(false)
const curried2Return5 = curried2('123', 123, true)(false)(true)('123')(false)
const curried2Return6 = curried2('123', 123, true, false)(true, '123', false)
const curried2Return7 = curried2('123', 123, true, false, true)('123', false)
const curried2Return8 = curried2('123', 123, true, false, true)('123')(false)
const curried2Return9 = curried2('123', 123, true, false, true, '123')(false)
const curried2Return10 = curried2('123', 123, true, false, true, '123', false)

type cases = [
  Expect<Equal<typeof curried1Return1, boolean>>,
  Expect<Equal<typeof curried1Return2, boolean>>,
  Expect<Equal<typeof curried1Return3, boolean>>,

  Expect<Equal<typeof curried2Return1, boolean>>,
  Expect<Equal<typeof curried2Return2, boolean>>,
  Expect<Equal<typeof curried2Return3, boolean>>,
  Expect<Equal<typeof curried2Return4, boolean>>,
  Expect<Equal<typeof curried2Return5, boolean>>,
  Expect<Equal<typeof curried2Return6, boolean>>,
  Expect<Equal<typeof curried2Return7, boolean>>,
  Expect<Equal<typeof curried2Return8, boolean>>,
  Expect<Equal<typeof curried2Return9, boolean>>,
  Expect<Equal<typeof curried2Return10, boolean>>
]
