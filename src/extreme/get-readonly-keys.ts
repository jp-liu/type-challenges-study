import { Expect, Equal } from '@type-challenges/utils'

/**
 * @description 获取只读`key`
 * @tips 1.利用`extends`分发`key`
 *       2.通过`Pick`提取当前`key`的类型
 *       3.通过`Equal`判断,只读与不只读是否一致
 */
type GetReadonlyKeys<T, K = keyof T> = K extends keyof T
  ? Equal<Pick<T, K>, Readonly<Pick<T, K>>> extends true
    ? K
    : never
  : never

interface Todo {
  readonly title: string
  readonly description: string
  completed: boolean
}

type Keys = GetReadonlyKeys<Todo> // expected to be "title" | "description"

type cases = [Expect<Equal<GetReadonlyKeys<Todo>, 'title' | 'description'>>]

type MyEqual<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false
