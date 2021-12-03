import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 获取函数类型
 * @tips
 */
type ReturnType<T extends (...args: any[]) => any> = T extends (
  ...args: any[]
) => infer R
  ? R
  : never;

const fn = (v: boolean) => {
  if (v) return 1;
  else return 2;
};

type a = ReturnType<typeof fn>; // should be "1 | 2"
type cases = [Expect<Equal<ReturnType<typeof fn>, 1 | 2>>];
