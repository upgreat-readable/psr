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
        M7: 1,
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

        this.mX1 = (1 - Math.abs(K1Sum - K2Sum) / K_MAX[this.meta.subject]) * 100;

        if (!Number.isInteger(this.mX1)) {
            this.iterationPsrResult.metrics.M1 = Math.round(this.mX1);
        } else {
            this.iterationPsrResult.metrics.M1 = this.mX1;
        }
    }

    setM2(preValue?: number): void {
        if (typeof preValue === 'number') {
            this.mX2 = preValue;
        } else {
            let res1 = new MathMachine(
                this._X.selections,
                this._Y.selections,
                true
            ).complexSearchMatchedFragments();
            let res2 = new MathMachine(
                this._Y.selections,
                this._X.selections,
                true
            ).complexSearchMatchedFragments();

            this.mX2 = Math.round((2 / (1 / res1 + 1 / res2)) * 100);
        }

        if (!Number.isInteger(this.mX2)) {
            this.iterationPsrResult.metrics.M2 = Math.round(this.mX2);
        } else {
            this.iterationPsrResult.metrics.M2 = this.mX2;
        }
    }

    setM3(preValue?: number): void {
        if (typeof preValue === 'number') {
            this.mX3 = preValue;
        } else {
            this.mX3 =
                new MathMachine(
                    this._X.selections,
                    this._Y.selections,
                    true
                ).complexSearchMatchedFragments() * 100;
        }

        if (!Number.isInteger(this.mX3)) {
            this.iterationPsrResult.metrics.M3 = Math.round(this.mX3);
        } else {
            this.iterationPsrResult.metrics.M3 = this.mX3;
        }
    }

    setM4(preValue?: number): void {
        if (typeof preValue === 'number') {
            this.mX4 = preValue;
        } else {
            this.mX4 =
                new MathMachine(
                    this._X.selections,
                    this._Y.selections,
                    true,
                    'correction'
                ).complexSearchMatchedFragments() * 100;
        }

        if (!Number.isInteger(this.mX4)) {
            this.iterationPsrResult.metrics.M4 = Math.round(this.mX4);
        } else {
            this.iterationPsrResult.metrics.M4 = this.mX4;
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

            for (let k in jaccardMatrix) {
                for (let u in jaccardMatrix[k]) {
                    if (jaccardMatrix[k][u] !== 1) {
                        if (jaccardMatrix[k][u] === 0) {
                            slagaemoe = 1;
                        } else {
                            slagaemoe = jaccardMatrix[k][u];
                        }
                        jackSum += slagaemoe;
                    }
                }
            }

            let proizJack = this._Y.selections.length;

            this.mX5 = (jackSum * 100) / proizJack;

            if (this.mX5 > 100) {
                this.mX5 = 100;
            }
        }

        if (!Number.isInteger(this.mX5)) {
            this.iterationPsrResult.metrics.M5 = Math.round(this.mX5);
        } else {
            this.iterationPsrResult.metrics.M5 = this.mX5;
        }
    }

    setM6(preValue?: number): void {
        if (typeof preValue === 'number') {
            this.mX6 = preValue;
        } else {
            this.mX6 =
                new MathMachine(
                    this._X.selections,
                    this._Y.selections,
                    true,
                    'explanation'
                ).complexSearchMatchedFragments() * 100;
        }

        if (!Number.isInteger(this.mX6)) {
            this.iterationPsrResult.metrics.M6 = Math.round(this.mX6);
        } else {
            this.iterationPsrResult.metrics.M6 = this.mX6;
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

        this.mTotal =
            Object.values(this.iterationPsrResult.metrics).reduce((a, b) => a + b, 0) /
            denominationFinal;

        if (!Number.isInteger(this.mTotal)) {
            this.iterationPsrResult.metrics.MTotal = Math.round(this.mTotal);
        } else {
            this.iterationPsrResult.metrics.MTotal = this.mTotal;
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
