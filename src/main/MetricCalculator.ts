import { IMetricCalculator } from '../interfaces/IMetricCalculator';
import {
    ParticipateInPsrObj,
    IterationPsrResult,
    MetaInPsr,
    MetricObj,
} from '../types/MainPsrTypes';
import { K_MAX } from '../constants';
import { MathMachine } from './MathMachine';

export class MetricCalculator implements IMetricCalculator {
    private meta: MetaInPsr;
    //вычисляемая разметка
    _X: ParticipateInPsrObj;
    //значения метрик (измеряются в %)
    mX1: number = 0;
    mX2: number = 0;
    mX3: number = 0;
    mX4: number = 0;
    mX5: number = 0;
    mX6: number = 0;
    mX7: number = 0;
    F1: number = 0;

    mTotal: number = 0;
    //эталонная разметка
    _Y: ParticipateInPsrObj;

    weight: MetricObj = {
        M1: 1,
        M2: 1,
        M3: 1,
        M4: 1,
        M5: 1,
        M6: 1,
        M7: 0,
    };

    originalText: string;

    private iterationPsrResult: IterationPsrResult = {
        markupId: '',
        metrics: {
            M1: 0,
            M2: 0,
            M3: 0,
            M4: 0,
            M5: 0,
            M6: 0,
            M7: 0,
        },
    } as IterationPsrResult;

    constructor(
        calcTerm: ParticipateInPsrObj,
        ethalonTerm: ParticipateInPsrObj,
        commonMeta: MetaInPsr,
        originalText: string
    ) {
        this._X = calcTerm;
        this._Y = ethalonTerm;
        this.meta = commonMeta;
        this.originalText = originalText;
    }

    //основной метод расчёта метрик
    dash(): IterationPsrResult {
        this.iterationPsrResult.markupId = this._Y.id;
        this.iterationPsrResult.third = this._Y.third ? this._Y.third : false;
        this.setM1();

        if (!this.areThereEmptySelections()) {
            this.setM2();
            this.setM3();
            this.setM4();
            this.setM5();
            this.setM6();
            this.setM7();
        }

        this.setMTotal();
        return this.iterationPsrResult;
    }

    setM1(): void {
        if (!this._X.criteria || !this._Y.criteria) {
            throw new Error('В разметках не заполнены критерии.');
        }

        let K1Sum = Object.values(this._X.criteria).reduce((a, b) => a + b, 0);
        let K2Sum = Object.values(this._Y.criteria).reduce((a, b) => a + b, 0);

        if (!K_MAX.hasOwnProperty(this.meta.subject)) {
            throw new Error('Получен несуществующий код предмета.');
        }

        if (K_MAX[this.meta.subject] < K1Sum || K_MAX[this.meta.subject] < K2Sum) {
            throw new Error('Вычисленная сумма критериев больше максимального значения');
        }

        this.mX1 = 1 - Math.abs(K1Sum - K2Sum) / K_MAX[this.meta.subject];

        if (!Number.isInteger(this.mX1)) {
            this.iterationPsrResult.metrics.M1 = Math.round(this.mX1) * 100;
        } else {
            this.iterationPsrResult.metrics.M1 = this.mX1 * 100;
        }
    }

    setM2(preValue?: number): void {
        if (typeof preValue === 'number') {
            this.mX2 = preValue;
        } else {
            let res1 = new MathMachine(
                this._X.selections,
                this._Y.selections,
                true,
                'type'
            ).complexSearchMatchedFragments();
            let res2 = new MathMachine(
                this._Y.selections,
                this._X.selections,
                true,
                'type'
            ).complexSearchMatchedFragments();

            // this.F1 = (2 / (1 / res1 + 1 / res2));
            this.mX2 = 2 / (1 / res1 + 1 / res2);
        }

        if (this.mX2 > 1) {
            this.mX2 = 1;
        }

        if (!Number.isInteger(this.mX2)) {
            this.iterationPsrResult.metrics.M2 = +(this.mX2 * 100).toFixed(2);
        } else {
            this.iterationPsrResult.metrics.M2 = this.mX2 * 100;
        }
    }

    setM3(preValue?: number): void {
        if (typeof preValue === 'number') {
            this.mX3 = preValue;
        } else {
            this.mX3 = new MathMachine(
                this._X.selections,
                this._Y.selections,
                true,
                'type'
            ).complexSearchMatchedFragments();
        }

        if (this.mX3 > 1) {
            this.mX3 = 1;
        }

        if (!Number.isInteger(this.mX3)) {
            this.iterationPsrResult.metrics.M3 = +(this.mX3 * 100).toFixed(2);
        } else {
            this.iterationPsrResult.metrics.M3 = this.mX3 * 100;
        }
    }

    setM4(preValue?: number): void {
        if (typeof preValue === 'number') {
            this.mX4 = preValue;
        } else {
            let xWithSubtype = [];
            let yWithSubtype = [];
            for (let i in this._X.selections) {
                if (this._X.selections[i].subtype !== '') {
                    xWithSubtype.push(this._X.selections[i]);
                }
            }
            for (let j in this._Y.selections) {
                if (this._Y.selections[j].subtype !== '') {
                    yWithSubtype.push(this._Y.selections[j]);
                }
            }

            if (xWithSubtype.length === 0 && yWithSubtype.length === 0) {
                /*Неопределённость 0/0 ни в каком разумном умолчании не может быть 1*/
                this.mX4 = 0;
            } else if (xWithSubtype.length === 0 || yWithSubtype.length === 0) {
                this.mX4 = 0;
            } else {
                this.mX4 = new MathMachine(
                    xWithSubtype,
                    yWithSubtype,
                    true,
                    'subtype'
                ).complexSearchMatchedFragments();
            }
        }

        if (this.mX4 > 1) {
            this.mX4 = 1;
        }

        if (!Number.isInteger(this.mX4)) {
            this.iterationPsrResult.metrics.M4 = +(this.mX4 * 100).toFixed(2);
        } else {
            this.iterationPsrResult.metrics.M4 = this.mX4 * 100;
        }
    }

    setM5(preValue?: number): void {
        if (typeof preValue === 'number') {
            this.mX5 = preValue;
        } else {
            let mathObj = new MathMachine(
                this._X.selections,
                this._Y.selections,
                true,
                'correction'
            );
            mathObj.calcJaccardMatrix();
            let jaccardMatrix = mathObj.getJaccardMatrix();

            let jackSum = 0;
            let slagaemoe = 0;

            let delitel = 0;

            for (let k in jaccardMatrix) {
                for (let u in jaccardMatrix[k]) {
                    if (jaccardMatrix[k][u] !== 1) {
                        if (jaccardMatrix[k][u] === 0) {
                            slagaemoe = 1;
                        } else {
                            slagaemoe = jaccardMatrix[k][u];
                        }
                        jackSum += slagaemoe;
                        delitel++;
                    } else {
                        delitel++;
                    }
                }
            }

            let proizJack = this._Y.selections.length;
            this.mX5 = jackSum / proizJack;

            if (this.mX5 > 1) {
                this.mX5 = 1;
            }
        }

        if (!Number.isInteger(this.mX5)) {
            this.iterationPsrResult.metrics.M5 = +(this.mX5 * 100).toFixed(2);
        } else {
            this.iterationPsrResult.metrics.M5 = this.mX5 * 100;
        }
    }

    setM6(preValue?: number): void {
        if (typeof preValue === 'number') {
            this.mX6 = preValue;
        } else {
            let xWithCorrection = [];
            let yWithCorrection = [];
            for (let i in this._X.selections) {
                if (this._X.selections[i].correction !== '') {
                    xWithCorrection.push(this._X.selections[i]);
                }
            }
            for (let j in this._Y.selections) {
                if (this._Y.selections[j].correction !== '') {
                    yWithCorrection.push(this._Y.selections[j]);
                }
            }

            if (xWithCorrection.length === 0 && yWithCorrection.length === 0) {
                /*Неопределённость 0/0 ни в каком разумном умолчании не может быть 1*/
                this.mX6 = 0;
            } else if (xWithCorrection.length === 0 || yWithCorrection.length === 0) {
                this.mX6 = 0;
            } else {
                this.mX6 = new MathMachine(
                    xWithCorrection,
                    yWithCorrection,
                    true,
                    'correction'
                ).complexSearchMatchedFragments();
            }
        }

        if (this.mX6 > 1) {
            this.mX6 = 1;
        }

        if (!Number.isInteger(this.mX6)) {
            this.iterationPsrResult.metrics.M6 = +(this.mX6 * 100).toFixed(2);
        } else {
            this.iterationPsrResult.metrics.M6 = this.mX6 * 100;
        }
    }

    setM7() {
        this.mX7 = 0;
        if (!Number.isInteger(this.mX7)) {
            this.iterationPsrResult.metrics.M7 = Math.round(this.mX7);
        } else {
            this.iterationPsrResult.metrics.M7 = this.mX7;
        }
    }

    setMTotal() {
        let denominationFinal = 0;
        for (let i in this.iterationPsrResult.metrics) {
            //@ts-ignore
            if (this.weight[i] !== 0) {
                denominationFinal++;
            }
        }

        let sum =
            this.mX1 * this.weight.M1 +
            this.mX2 *
                (this.weight.M2 +
                    this.weight.M3 * this.mX3 +
                    this.weight.M4 * this.mX4 +
                    this.weight.M5 * this.mX5 +
                    this.weight.M6 * this.mX6) +
            this.mX7 * this.weight.M7;

        this.mTotal = sum / denominationFinal;

        if (!Number.isInteger(this.mTotal)) {
            this.iterationPsrResult.metrics.MTotal = +(this.mTotal * 100).toFixed(2);
        } else {
            this.iterationPsrResult.metrics.MTotal = this.mTotal * 100;
        }
    }

    areThereEmptySelections(): boolean {
        if (this._X.selections.length === 0 && this._Y.selections.length === 0) {
            this.setM2(100);
            this.setM3(100);
            this.setM4(100);
            this.setM5(100);
            this.setM6(100);

            return true;
        } else if (
            (this._X.selections.length === 0 && this._Y.selections.length !== 0) ||
            (this._Y.selections.length === 0 && this._X.selections.length !== 0)
        ) {
            this.setM2(0);
            this.setM3(0);
            this.setM4(0);
            this.setM5(0);
            this.setM6(0);

            return true;
        }

        return false;
    }
}
