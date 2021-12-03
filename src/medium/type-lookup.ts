import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 在联合类型中,查找`K`类型的源类型
 * @tips 1.判断条件, `T`是否实现了 { type: K } 接口
 */
type LookUp<T, K> = T extends { type: K } ? T : never;

interface Cat {
  type: "cat";
  breeds: "Abyssinian" | "Shorthair" | "Curl" | "Bengal";
}

interface Dog {
  type: "dog";
  breeds: "Hound" | "Brittany" | "Bulldog" | "Boxer";
  color: "brown" | "white" | "black";
}

type MyDogType = LookUp<Cat | Dog, "dog">; // expected to be `Dog`

type cases = [
  Expect<Equal<LookUp<Cat | Dog, "dog">, Dog>>,
  Expect<Equal<LookUp<Cat | Dog, "cat">, Cat>>
];
