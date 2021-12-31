import { Expect, Equal } from "@type-challenges/utils";

type MapGetters<G extends Record<string, any>> = {
  readonly [P in keyof G]: G[P] extends (...args: any[]) => infer R ? R : never;
};

type GetGetters<T extends Object> = {
  [P in keyof T]: T[P] extends (...args: any[]) => any
    ? ReturnType<T[P]>
    : never;
};

declare function defineStore<S, G, A>(store: {
  id: string;
  state: () => S;
  getters: G & ThisType<Readonly<S> & GetGetters<G>>;
  actions: A & ThisType<A & S>;
}): A & Readonly<S> & GetGetters<G>;

const store = defineStore({
  id: "123321",
  state: () => ({ a: 1, b: "2" }),
  getters: {
    aaa() {
      const a = "123";
      return a;
    },
  },
  actions: {
    bbb() {
      console.log(this.state.b);
      return 123;
    },
  },
});

store.aaa;
store.bbb();
