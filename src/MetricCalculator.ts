import {IMetricCalculator} from "./interfaces/IMetricCalculator";
import {ParticipateInPsrObj, MetricEnum, ReturnObject, IterationPsrResult} from "./types/MainPsrTypes";

export class MetricCalculator implements IMetricCalculator {
    //вычисляемая разметка
    _X: ParticipateInPsrObj
    //значения метрик (измеряются в %)
    mX1 = 0
    mX2 = 0
    mX3 = 0
    mX4 = 0
    mX5 = 0
    mX6 = 0
    mX7 = 0
    //эталонная разметка
    _Y: ParticipateInPsrObj

    weight = 0
    private iterationPsrResult: IterationPsrResult = {} as IterationPsrResult

    constructor(calcTerm: ParticipateInPsrObj, ethalonTerm: ParticipateInPsrObj) {
        this._X = calcTerm
        this._Y = ethalonTerm
    }

    dash(): IterationPsrResult {
        return this.iterationPsrResult
    }

    calcCriterionSum(markUpNum: 0 | 1): number {
        let sum = 0

        // if (!markUpNum) {
        //     throw new Error('При расчёте метрики M1 не был получен номер разметки.')
        // }
        //
        // let currentMK: number = markUpNum
        //
        //
        // for (let Knum in this.X.essay.markUp[currentMK].criterions) {
        //     sum = sum + this.X.essay.markUp[currentMK].criterions[Knum]
        // }

        return sum
    }


    // setM1(): void {
    //     let K1Sum = Object.values(this.X.essay.markUp[currentMK].criterions).reduce((a, b) => a + b, 0)this.calcCriterionSum(0)
    //     let K2Sum = this.calcCriterionSum(1)
    //     this.mX1 = (1 - Math.abs(K1Sum - K2Sum))
    // }
}
