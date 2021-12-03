/**
 * @description 判断类型一是否存在类型二
 */
type Includes<T extends any[], K> = K extends T[number] ? true : false

type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`
