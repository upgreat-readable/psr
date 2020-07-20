import {IMetricCalculator} from "../interfaces/IMetricCalculator";
import {ParticipateInPsrObj, IterationPsrResult, MetaInPsr} from "../types/MainPsrTypes";
import {K_MAX} from "../constants";
import {CompareActions} from "./CompareActions";

export class MetricCalculator implements IMetricCalculator {
    private meta: MetaInPsr
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
    originalText: string

    private iterationPsrResult: IterationPsrResult = {} as IterationPsrResult

    constructor(calcTerm: ParticipateInPsrObj, ethalonTerm: ParticipateInPsrObj, commonMeta: MetaInPsr, originalText: string) {
        this._X = calcTerm
        this._Y = ethalonTerm
        this.meta = commonMeta
        this.originalText = originalText
    }

    /*@todo округление должно происходить только в случае, когда результаты вычисления долей не являются целыми*/
    //основной метод расчёта метрик
    dash(): IterationPsrResult {
        this.setM1()
        this.setM2()
        this.setM3()
        this.setM4()
        this.setM5()
        this.setM6()
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

        this.mX1 = Math.round((1 - Math.abs(K1Sum - K2Sum) / K_MAX[this.meta.subject]) * 100)

        console.log('---m1 ' + this.mX1);
    }

    setM2(): void {
        // let compareResult = this.compareSimilarFragments(this._X.selections, this._Y.selections)
        let compareResult = CompareActions.run(this._X.selections, this._Y.selections)

        //точность поиска
        let searchAccuracy = compareResult.saI / this._X.selections.length
        //полнота поиска
        let completenessOfSearch = compareResult.cosI / this._Y.selections.length

        this.mX2 = Math.round((2 / (1 / searchAccuracy + 1 / completenessOfSearch)) * 100)

        console.log('---m2 ' + this.mX2);
    }

    setM3(): void {
        // let compareResult = this.compareSimilarFragments(this._X.selections, this._Y.selections, 'code')
        let compareResult = CompareActions.run(this._X.selections, this._Y.selections, 'code')

        this.mX3 = (compareResult.saI / this._X.selections.length) * 100

        console.log('---m3 ' + this.mX3);
    }

    /*@todo парафразы должны быть занесены в константы (либо получены по запросу от catalog_errors) и быть поняты, как эталон для комментирования. https://w6p.ru/YWE1Y2R.png*/
    setM4(): void {
        // let compareResult = this.compareSimilarFragments(this._X.selections, this._Y.selections, 'subtype-comm')
        let compareResult = CompareActions.run(this._X.selections, this._Y.selections, 'subtype-comm')

        this.mX4 = (compareResult.saI / this._X.selections.length) * 100

        console.log('---m4 ' + this.mX4);
    }

    /**@todo мера жаккара. описано в техрегламенте**/
    setM5(): void {
        // let compareResult = CompareActions.run()
        let compareResult = CompareActions.run(this._X.selections, this._Y.selections, 'jaccardIndex')
        this.mX5 = 0

        console.log('---m5 ' + this.mX5);
    }

    setM6(): void {
        // let compareResult = this.compareSimilarFragments(this._X.selections, this._Y.selections, 'correction')
        let compareResult = CompareActions.run(this._X.selections, this._Y.selections, 'correction')

        this.mX6 = (compareResult.saI / this._X.selections.length) * 100

        console.log('---m6 ' + this.mX6);
    }

    /*@todo уточнить по поводу этого параметра*/
    setM7() {

    }
}
