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
    setM1(): void
    //
    setM2(): void
    //
    setM3(): void
    //
    setM4(): void
    //
    setM5(): void
    //
    setM6(): void
    //
    setM7(): void
}
