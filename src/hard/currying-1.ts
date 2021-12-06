/**
 * @description 柯里化函数,将多参函数,转换成为单参数函数
 * @tips 1.将多参数函数转换成,单参数函数,就是函数的组合,函数式编程的经典逻辑
 *       2.我们需要将每个参数拆解成为一个个函数,进行组合,通过闭包,在内层的计算公式中,是可以拿到外层的变量的
 *       3.取得参数`Y`,判断是否还有参数,如果是,则进行进一步的拆解, 如果不是,则直接返回,说明已经是最后了
 */
type Curried<T extends Function> = T extends (
  arg: infer X,
  ...args: infer Y
) => any
  ? Y["length"] extends 0
    ? (arg: X) => ReturnType<T>
    : (arg: X) => Curried<(...args: Y) => ReturnType<T>>
  : T;

declare function Currying<T extends Function>(fn: T): Curried<T>;

const add = (a: number, b: number) => a + b;
const three = add(1, 2);

const curriedAdd = Currying(add);
const five = curriedAdd(2)(3);
console.log(five);
