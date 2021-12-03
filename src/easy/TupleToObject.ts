/**
 * @description 操作元组，变更为对象
 * 关键在于，需要限制为数组，并且通过 T[number] 索引类型取得数组的每一项类型
 */
type TupleToObject<T extends readonly any[]> = {
    -readonly [P in T[number]]: P
}
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

type a = TupleToObject<typeof tuple>
// type a = {
//     tesla: "tesla";
//     "model 3": "model 3";
//     "model X": "model X";
//     "model Y": "model Y";
// }
export {}
