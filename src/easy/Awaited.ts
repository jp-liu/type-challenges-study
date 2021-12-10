/**
 * @description 获取包装类型的实际类型
 * @tips 使用映射类型，或者 `infer` 推导
 */
type Awaited<T extends Promise<any>> = T extends Promise<infer R> ? R : never

type a = Promise<string>
type b = Awaited<a>
type c = Awaited<Promise<{ field: 'wahaha' }>>


export {}
