import { IMetricCalculator } from '../interfaces/IMetricCalculator';
import {
    ParticipateInPsrObj,
    IterationPsrResult,
    MetaInPsr,
    MetricObj,
} from '../types/MainPsrTypes';
import { K_MAX } from '../constants';
import { params } from '../regulator';
import { MathMachine } from './MathMachine';
import { MetricCalc, MetricInterfaceCalc } from './service/metric.interface.calc';
import { MetricMainCalc } from './service/metric.main.calc';
import { MetricSupposeCalc } from './service/metric.suppose.calc';
import paricipantMSevens from './mSevenStat/eng_final_m7_AVG.json';
import expertMSevens from './mSevenStat/exper_m7_markup_100.json';
import excludedDoubles from './mSevenStat/excludedDoubles.json';

export class MetricCalculator implements IMetricCalculator {
    firmware: MetricCalc;
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
        M2: 2,
        M3: 1,
        M4: 1,
        M5: 1,
        M6: 1,
        M7: 0,
    };

    originalText: string;
    essayUuid: string;

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
        originalText: string,
        mode: string = 'main',
        essayUuid: string
    ) {
        this._X = calcTerm;
        this._Y = ethalonTerm;
        this.meta = commonMeta;
        this.originalText = originalText;
        this.essayUuid = essayUuid;
        if (mode == 'main') {
            this.firmware = new MetricMainCalc();
        } else {
            this.firmware = new MetricSupposeCalc();
        }
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
        this.firmware.setM1(this._X.criteria, this._Y.criteria, this.meta.subject);
        this.mX1 = this.firmware.m1;

        if (this.mX1 > 1) {
            this.mX1 = 1;
        }

        if (!Number.isInteger(this.mX1)) {
            this.iterationPsrResult.metrics.M1 = +(this.mX1 * 100).toFixed(2);
        } else {
            this.iterationPsrResult.metrics.M1 = this.mX1 * 100;
        }
    }

    setM2(preValue?: number): void {
        if (typeof preValue === 'number') {
            this.mX2 = preValue;
        } else {
            this.firmware.setM2(this._X.selections, this._Y.selections);
            this.mX2 = this.firmware.m2;
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
            this.firmware.setM3(this._X.selections, this._Y.selections);
            this.mX3 = this.firmware.m3;

            if (this.mX3 > 1) {
                this.mX3 = 1;
            }

            if (!Number.isInteger(this.mX3)) {
                this.iterationPsrResult.metrics.M3 = +(this.mX3 * 100).toFixed(2);
            } else {
                this.iterationPsrResult.metrics.M3 = this.mX3 * 100;
            }
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
                this.firmware.setM4(this._X.selections, this._Y.selections);
                this.mX4 = this.firmware.m4;
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
            this.firmware.setM5(this._X.selections, this._Y.selections, this.originalText);
            this.mX5 = this.firmware.m5;

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
                this.firmware.setM6(this._X.selections, this._Y.selections);
                this.mX6 = this.firmware.m6;
            }
        }

        if (this.mX6 > 1) {
            this.mX6 = 1;
        }

        if (!Number.isInteger(this.mX4)) {
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
            if (params.weight[i] !== 0) {
                denominationFinal++;
            }
        }
        const gammaM7Coeff = 500 / 46; /* N(500) / n (48) eng*/

        console.log(params.weight.M7);
        let sum =
            params.weight.M1 * this.mX1 +
            params.weight.M2 * this.mX2 +
            params.weight.M3 * this.mX3 +
            params.weight.M4 * this.mX4 +
            params.weight.M5 * this.mX5 +
            params.weight.M6 * this.mX6 +
            params.weight.M7 * (500 / 46) * this.mX7;

        this.mTotal = sum / denominationFinal;
        if (!Number.isInteger(this.mTotal)) {
            this.iterationPsrResult.metrics.MTotal = +(this.mTotal * 100).toFixed(2);
        } else {
            this.iterationPsrResult.metrics.MTotal = this.mTotal * 100;
        }
    }

    areThereEmptySelections(): boolean {
        if (this._X.selections.length === 0 && this._Y.selections.length === 0) {
            this.setM2(1);
            this.setM3(1);
            this.setM4(1);
            this.setM5(1);
            this.setM6(1);

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
