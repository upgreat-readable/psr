import {ParticipateInPsrObj, MetricEnum, ReturnObject, IterationPsrResult} from "../types/MainPsrTypes";

export interface IMetricCalculator {
    _X: ParticipateInPsrObj
    mX1: number
    mX2: number
    mX3: number
    mX4: number
    mX5: number
    mX6: number
    mX7: number

    _Y: ParticipateInPsrObj

    weight: number

    // setWeight(): void

    dash(): IterationPsrResult

    //
    // setM1(): void
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
