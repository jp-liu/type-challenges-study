import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description
 * @tips
 */
type Get<T, K extends string> = K extends `${infer Head}.${infer Tail}`
  ? Head extends keyof T
    ? Get<T[Head], Tail>
    : never
  : K extends keyof T
  ? T[K]
  : never;

type Data = {
  foo: {
    bar: {
      value: "foobar";
      count: 6;
    };
    included: true;
  };
  hello: "world";
};

type A = Get<Data, "hello">; // 'world'
type B = Get<Data, "foo.bar.count">; // 6
type C = Get<Data, "foo.bar">; // { value: 'foobar', count: 6 }

type cases = [
  Expect<Equal<Get<Data, "hello">, "world">>,
  Expect<Equal<Get<Data, "foo.bar.count">, 6>>,
  Expect<Equal<Get<Data, "foo.bar">, { value: "foobar"; count: 6 }>>
];
