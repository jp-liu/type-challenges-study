import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 提取类中的公共`key`
 * @tips `keyof` 会提取公共部分
 * ?? 这题真有这么简单吗?
 */
type ClassPublicKeys<T> = keyof T;

class A {
  public str: string;
  protected num: number;
  private bool: boolean;
  getNum() {
    return Math.random();
  }
}

type publicKyes = ClassPublicKeys<A>; // 'str' | 'getNum'
type cases = [Expect<Equal<ClassPublicKeys<A>, "str" | "getNum">>];
