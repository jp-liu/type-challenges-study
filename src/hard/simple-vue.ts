import { Expect, Equal } from "@type-challenges/utils";

// type Computed<T> = { [key in keyof T]: T[key] extends () => infer R ? R : never }
// type Options<D, C, M> = {
//   data: (this: {}) => D
//   computed: ThisType<D & Computed<C> & M> & C
//   methods: ThisType<D & Computed<C> & M> & M
// }
// /**
//  * @description 实现一个简版的`Vue`类型
//  * @tips 这个有点没太搞懂,东西我知道,但是他如何检验啊是否正确呢
//  */
//  type GetComputed<C> = C extends Record<string, (...args: any[]) => any>
//  ? { [S in keyof C]: ReturnType<C[S]> }
//  : never
type Computed<T> = {
  [P in keyof T]: T[P] extends () => infer V ? V : never;
};
type Options<D, C, M> = {
  data: (this: {}) => D;
  computed: ThisType<D & Computed<C> & M> & C;
  methods: ThisType<D & Computed<C> & M> & M;
};

declare function SimpleVue<D, C, M>(
  options: Options<D, C, M>
): D & Computed<C> & M;

const instance = SimpleVue({
  data() {
    return {
      firstname: "Type",
      lastname: "Challenges",
      amount: 10,
    };
  },
  computed: {
    fullname() {
      return this.firstname + " " + this.lastname;
    },
  },
  methods: {
    hi() {
      alert(this.fullname.toLowerCase());
    },
  },
});
