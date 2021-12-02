import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description
 * @tips
 */
type Flip<T extends Record<string, string | number | boolean>> = {
  [P in keyof T as `${T[P]}`]: P;
};

type a = Flip<{ a: "x"; b: "y"; c: "z" }>; // {x: 'a', y: 'b', z: 'c'}
type b = Flip<{ a: 1; b: 2; c: 3 }>; // {1: 'a', 2: 'b', 3: 'c'}
type c = Flip<{ a: false; b: true }>; // {false: 'a', true: 'b'}

type cases = [
  Expect<Equal<Flip<{ a: "x"; b: "y"; c: "z" }>, { x: "a"; y: "b"; z: "c" }>>,
  Expect<Equal<Flip<{ a: 1; b: 2; c: 3 }>, { 1: "a"; 2: "b"; 3: "c" }>>,
  Expect<Equal<Flip<{ a: false; b: true }>, { false: "a"; true: "b" }>>
];
