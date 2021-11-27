import { Expect, Equal } from "@type-challenges/utils";

/**
 * @description 匹配正负号
 */
type ParseSign<S extends string> = S extends `${infer F}${any}` ? F extends '+' | '-' ? F : '' : ''

/**
 * @description 匹配百分比符号
 */
type ParsePercent<S extends string> = S extends `${any}%` ? '%' : ''

/**
 * @description 匹配数字
 */
type ParseNumber<S extends string> = S extends `${ParseSign<S>}${infer N}${ParsePercent<S>}` ? N : ''

/** 
 * @description 解析一个百分之字符串,获取其结构,根据/^ (+ | -) ? (d *) ? (%) ? $/规则匹配
 * @tips 1.实现正负号匹配器   
 *       2.实现百分比匹配器
 *       3.四线数字匹配器
 */
type PercentageParser<P extends string> = [
    ParseSign<P>,
    ParseNumber<P>,
    ParsePercent<P>
]

type PString1 = "";
type PString2 = "+85%";
type PString3 = "-85%";
type PString4 = "85%";
type PString5 = "85";

type R1 = PercentageParser<PString1>; // expected ['', '', '']
type R2 = PercentageParser<PString2>; // expected ["+", "85", "%"]
type R3 = PercentageParser<PString3>; // expected ["-", "85", "%"]
type R4 = PercentageParser<PString4>; // expected ["", "85", "%"]
type R5 = PercentageParser<PString5>; // expected ["", "85", ""]

type cases = [
    Expect<Equal<PercentageParser<PString1>, ['', '', '']>>,
    Expect<Equal<PercentageParser<PString2>, ["+", "85", "%"]>>,
    Expect<Equal<PercentageParser<PString3>, ["-", "85", "%"]>>,
    Expect<Equal<PercentageParser<PString4>, ["", "85", "%"]>>,
    Expect<Equal<PercentageParser<PString5>, ["", "85", ""]>>,
];
