import {IMetricCalculator} from "../interfaces/IMetricCalculator";
import {ParticipateInPsrObj, IterationPsrResult, MetaInPsr, MetricObj} from "../types/MainPsrTypes";
import {K_MAX} from "../constants";
import {CompareActions} from "./CompareActions";

export class MetricCalculator implements IMetricCalculator {
    private meta: MetaInPsr
    //вычисляемая разметка
    _X: ParticipateInPsrObj
    //значения метрик (измеряются в %)
    mX1: number = 0
    mX2: number = 0
    mX3: number = 0
    mX4: number = 0
    mX5: number = 0
    mX6: number = 0
    mX7: number = 0

    mTotal: number = 0
    //эталонная разметка
    _Y: ParticipateInPsrObj

    weight: MetricObj = {
        M1: 1,
        M2: 1,
        M3: 1,
        M4: 1,
        M5: 1,
        M6: 1,
        M7: 1
    }

    originalText: string

    private iterationPsrResult: IterationPsrResult = {
        markupId: '',
        metrics: {
            M1: 0,
            M2: 0,
            M3: 0,
            M4: 0,
            M5: 0,
            M6: 0,
            M7: 0
        },
        STAR: 0,
        CTER: 0
    } as IterationPsrResult

    constructor(calcTerm: ParticipateInPsrObj, ethalonTerm: ParticipateInPsrObj, commonMeta: MetaInPsr, originalText: string) {
        this._X = calcTerm
        this._Y = ethalonTerm
        this.meta = commonMeta
        this.originalText = originalText
    }

    //основной метод расчёта метрик
    dash(): IterationPsrResult {
        this.iterationPsrResult.markupId = this._Y.id
        this.iterationPsrResult.third = this._Y.third
        this.setM1()
        this.setM2()
        this.setM3()
        this.setM4()
        this.setM5()
        this.setM6()
        this.setM7()
        this.setMTotal()
        return this.iterationPsrResult
    }

    setM1(): void {
        if (!this._X.criterions || !this._Y.criterions) {
            throw new Error('В разметках не заполнены критерии.')
        }

        let K1Sum = Object.values(this._X.criterions).reduce((a, b) => a + b, 0)
        let K2Sum = Object.values(this._Y.criterions).reduce((a, b) => a + b, 0)

        if (!K_MAX.hasOwnProperty(this.meta.subject)) {
            throw new Error('Получен несуществующий код предмета.')
        }

        if (K_MAX[this.meta.subject] < K1Sum || K_MAX[this.meta.subject] < K2Sum) {
            throw new Error('Вычисленная сумма критериев больше максимального значения')
        }

        this.mX1 = (1 - Math.abs(K1Sum - K2Sum) / K_MAX[this.meta.subject]) * 100

        if (!Number.isInteger(this.mX1)) {
            this.iterationPsrResult.metrics.M1 = Math.round(this.mX1)
        } else {
            this.iterationPsrResult.metrics.M1 = this.mX1
        }

        console.log('---m1 ' + this.mX1);
    }

    setM2(): void {
        let compareResult = CompareActions.run(this._X.selections, this._Y.selections)

        //точность поиска
        let searchAccuracy = compareResult.saI / this._X.selections.length
        //полнота поиска
        let completenessOfSearch = compareResult.cosI / this._Y.selections.length

        this.mX2 = Math.round((2 / (1 / searchAccuracy + 1 / completenessOfSearch)) * 100)

        if (!Number.isInteger(this.mX2)) {
            this.iterationPsrResult.metrics.M2 = Math.round(this.mX2)
        } else {
            this.iterationPsrResult.metrics.M2 = this.mX2
        }

        console.log('---m2 ' + this.mX2);
    }

    setM3(): void {
        let compareResult = CompareActions.run(this._X.selections, this._Y.selections, 'code')

        this.mX3 = (compareResult.saI / this._X.selections.length) * 100

        if (!Number.isInteger(this.mX3)) {
            this.iterationPsrResult.metrics.M3 = Math.round(this.mX3)
        } else {
            this.iterationPsrResult.metrics.M3 = this.mX3
        }

        console.log('---m3 ' + this.mX3);
    }

    /*@todo парафразы должны быть занесены в константы (либо получены по запросу от catalog_errors) и быть поняты, как эталон для комментирования. https://w6p.ru/YWE1Y2R.png*/
    setM4(): void {
        let compareResult = CompareActions.run(this._X.selections, this._Y.selections, 'subtype-comm')

        this.mX4 = (compareResult.saI / this._X.selections.length) * 100

        if (!Number.isInteger(this.mX4)) {
            this.iterationPsrResult.metrics.M4 = Math.round(this.mX4)
        } else {
            this.iterationPsrResult.metrics.M4 = this.mX4
        }

        console.log('---m4 ' + this.mX4);
    }

    /**@todo мера жаккара. описано в техрегламенте. фактически, критерий не расчитываем до тех пор, пока не будет разъяснен механизм сопоставления фрагментов**/
    setM5(): void {
        // let compareResult = CompareActions.run(this._X.selections, this._Y.selections, 'jaccardIndex')
        this.mX5 = 0

        if (!Number.isInteger(this.mX5)) {
            this.iterationPsrResult.metrics.M5 = Math.round(this.mX5)
        } else {
            this.iterationPsrResult.metrics.M5 = this.mX5
        }

        console.log('---m5 ' + this.mX5);
    }

    setM6(): void {
        let compareResult = CompareActions.run(this._X.selections, this._Y.selections, 'correction')

        this.mX6 = (compareResult.saI / this._X.selections.length) * 100

        if (!Number.isInteger(this.mX6)) {
            this.iterationPsrResult.metrics.M6 = Math.round(this.mX6)
        } else {
            this.iterationPsrResult.metrics.M6 = this.mX6
        }

        console.log('---m6 ' + this.mX6);
    }

    /*@todo уточнить по поводу этого параметра
    *   занулён, т.к пояснения не были получены*/
    setM7() {
        this.weight.M7 = 0
        this.mX7 = 0

        if (!Number.isInteger(this.mX7)) {
            this.iterationPsrResult.metrics.M7 = Math.round(this.mX7)
        } else {
            this.iterationPsrResult.metrics.M7 = this.mX7
        }

        console.log('---m7 ' + this.mX7);
    }

    setMTotal() {
        let denominationFinal = 0
        for (let i in this.iterationPsrResult.metrics) {
            //@ts-ignore
            if (this.weight[i] !== 0) {
                denominationFinal++
            }
        }

        this.mTotal = Object.values(this.iterationPsrResult.metrics).reduce((a, b) => a + b, 0) / denominationFinal

        if (!Number.isInteger(this.mTotal)) {
            this.iterationPsrResult.metrics.MTotal = Math.round(this.mTotal)
        } else {
            this.iterationPsrResult.metrics.MTotal = this.mTotal
        }
    }
}
