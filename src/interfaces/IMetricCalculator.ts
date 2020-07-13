import {EnterObject, MetricEnum, ReturnObject} from "../types/EnterObject";

export interface IMetricCalculator {
    X: EnterObject
    mX1: number
    mX2: number
    mX3: number
    mX4: number
    mX5: number
    mX6: number
    mX7: number

    Y: EnterObject

    weight: number

    setWeight(): void

    // calculate(): ReturnObject
    //
    setM1(): void
    //
    // setM2(): MetricEnum
    //
    // setM3(): MetricEnum
    //
    // setM4(): MetricEnum
    //
    // setM5(): MetricEnum
    //
    // setM6(): MetricEnum
    //
    // setM7(): MetricEnum
}
