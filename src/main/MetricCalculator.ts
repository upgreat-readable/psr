import {IMetricCalculator} from "../interfaces/IMetricCalculator";
import {ParticipateInPsrObj, IterationPsrResult, MetaInPsr, MetricObj} from "../types/MainPsrTypes";
import {K_MAX} from "../constants";
import {CompareActions} from "./CompareActions";
import {MathMachine} from "./MathMachine";

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

        // console.log('---m1 ' + this.mX1);
    }

    setM2(): void {
        let xPrepArray = []
        let yPrepArray = []
        for (let i in this._X.selections) {
            //@ts-ignore
            xPrepArray.push({start: this._X.selections[i].startSelection, end: this._X.selections[i].endSelection, determFactor: this._X.selections[i].type})
        }

        for (let j in this._Y.selections) {
            //@ts-ignore
            yPrepArray.push({start: this._Y.selections[j].startSelection, end: this._Y.selections[j].endSelection, determFactor: this._Y.selections[j].type})
        }
        // console.log(this._X);

        let m = new MathMachine(
            xPrepArray,
            yPrepArray);
        m.calcJaccardMatrix()
        m.calcLossMatrix()
        let res1 = m.goPsrGo()

        let m2 = new MathMachine(
            yPrepArray,
            xPrepArray);
        m2.calcJaccardMatrix()
        m2.calcLossMatrix()
        let res2 = m2.goPsrGo()


        this.mX2 = Math.round((2 / (1 / res1 + 1 / res2)) * 100)

        if (!Number.isInteger(this.mX2)) {
            this.iterationPsrResult.metrics.M2 = Math.round(this.mX2)
        } else {
            this.iterationPsrResult.metrics.M2 = this.mX2
        }

        // console.log('---m2 ' + this.mX2);
    }

    setM3(): void {
        let xPrepArray = []
        let yPrepArray = []
        for (let i in this._X.selections) {
            //@ts-ignore
            xPrepArray.push({start: this._X.selections[i].startSelection, end: this._X.selections[i].endSelection, determFactor: this._X.selections[i].type})
        }

        for (let j in this._Y.selections) {
            //@ts-ignore
            yPrepArray.push({start: this._Y.selections[j].startSelection, end: this._Y.selections[j].endSelection, determFactor: this._Y.selections[j].type})
        }


        let m = new MathMachine(
            xPrepArray,
            yPrepArray);
        m.calcJaccardMatrix()
        m.calcLossMatrix()
        this.mX3 = m.goPsrGo() * 100

        if (!Number.isInteger(this.mX3)) {
            this.iterationPsrResult.metrics.M3 = Math.round(this.mX3)
        } else {
            this.iterationPsrResult.metrics.M3 = this.mX3
        }

        // console.log('---m3 ' + this.mX3);
    }

    /*@todo парафразы должны быть занесены в константы (либо получены по запросу от catalog_errors) и быть поняты, как эталон для комментирования. https://w6p.ru/YWE1Y2R.png*/
    setM4(): void {

        let xPrepArray = []
        let yPrepArray = []
        for (let i in this._X.selections) {
            //@ts-ignore
            xPrepArray.push({start: this._X.selections[i].startSelection, end: this._X.selections[i].endSelection, determFactor: this._X.selections[i].correction})
        }

        for (let j in this._Y.selections) {
            //@ts-ignore
            yPrepArray.push({start: this._Y.selections[j].startSelection, end: this._Y.selections[j].endSelection, determFactor: this._Y.selections[j].correction})
        }


        let m = new MathMachine(
            xPrepArray,
            yPrepArray);
        m.calcJaccardMatrix()
        m.calcLossMatrix()

        this.mX4 = m.goPsrGo() * 100

        if (!Number.isInteger(this.mX4)) {
            this.iterationPsrResult.metrics.M4 = Math.round(this.mX4)
        } else {
            this.iterationPsrResult.metrics.M4 = this.mX4
        }

        // console.log('---m4 ' + this.mX4);
    }

    /**@todo мера жаккара. описано в техрегламенте. фактически, критерий не расчитываем до тех пор, пока не будет разъяснен механизм сопоставления фрагментов**/
    setM5(): void {

        let xPrepArray = []
        let yPrepArray = []
        for (let i in this._X.selections) {
            //@ts-ignore
            xPrepArray.push({start: this._X.selections[i].startSelection, end: this._X.selections[i].endSelection, determFactor: this._X.selections[i].correction})
        }

        for (let j in this._Y.selections) {
            //@ts-ignore
            yPrepArray.push({start: this._Y.selections[j].startSelection, end: this._Y.selections[j].endSelection, determFactor: this._Y.selections[j].correction})
        }


        let m = new MathMachine(
            xPrepArray,
            yPrepArray);
        m.calcJaccardMatrix()

        let jackSum = 0
        let slagaemoe = 0

        for (let k in m.jaccardMatrix) {
            for (let u in m.jaccardMatrix[k]) {
                if (m.jaccardMatrix[k][u] !== 1) {
                    if (m.jaccardMatrix[k][u] === 0) {
                        slagaemoe = 1
                    } else {
                        slagaemoe = m.jaccardMatrix[k][u]
                    }
                    jackSum += slagaemoe
                }
            }
        }

        // console.log('matrica     ' +  m.jaccardMatrix );
        // console.log('summa po matrice     ' + jackSum );


        // let proizJack = m.jaccardMatrix.length * m.jaccardMatrix[0].length
        let proizJack = this._Y.selections.length

        this.mX5 = (jackSum * 100 / proizJack)

        if (this.mX5 > 100) {
            this.mX5 = 100
        }

        if (!Number.isInteger(this.mX5)) {
            this.iterationPsrResult.metrics.M5 = Math.round(this.mX5)
        } else {
            this.iterationPsrResult.metrics.M5 = this.mX5
        }

        // console.log('---m5 ' + this.mX5);
    }

    setM6(): void {
        let xPrepArray = []
        let yPrepArray = []
        for (let i in this._X.selections) {
            //@ts-ignore
            xPrepArray.push({start: this._X.selections[i].startSelection, end: this._X.selections[i].endSelection, determFactor: this._X.selections[i].explanation})
        }

        for (let j in this._Y.selections) {
            //@ts-ignore
            yPrepArray.push({start: this._Y.selections[j].startSelection, end: this._Y.selections[j].endSelection, determFactor: this._Y.selections[j].explanation})
        }


        let m = new MathMachine(
            xPrepArray,
            yPrepArray);
        m.calcJaccardMatrix()
        m.calcLossMatrix()
        this.mX6 = m.goPsrGo() * 100
        if (!Number.isInteger(this.mX6)) {
            this.iterationPsrResult.metrics.M6 = Math.round(this.mX6)
        } else {
            this.iterationPsrResult.metrics.M6 = this.mX6
        }

        // console.log('---m6 ' + this.mX6);
    }

    /*@todo уточнить по поводу этого параметра
    *   занулён, т.к пояснения не были получены*/
    setM7() {
        this.mX7 = 0

        if (!Number.isInteger(this.mX7)) {
            this.iterationPsrResult.metrics.M7 = Math.round(this.mX7)
        } else {
            this.iterationPsrResult.metrics.M7 = this.mX7
        }

        // console.log('---m7 ' + this.mX7);
    }

    setMTotal() {
        let denominationFinal = 0
        for (let i in this.iterationPsrResult.metrics) {
            //@ts-ignore
            if (this.weight[i] !== 0) {
                // console.log('key -    ' + i);
                denominationFinal++
            }
        }

        // console.log('vsego metrici - ' + denominationFinal);

        this.mTotal = Object.values(this.iterationPsrResult.metrics).reduce((a, b) => a + b, 0) / denominationFinal

        if (!Number.isInteger(this.mTotal)) {
            this.iterationPsrResult.metrics.MTotal = Math.round(this.mTotal)
        } else {
            this.iterationPsrResult.metrics.MTotal = this.mTotal
        }
    }
}
