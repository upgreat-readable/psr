"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricCalculator = void 0;
var constants_1 = require("../constants");
var MathMachine_1 = require("./MathMachine");
var MetricCalculator = /** @class */ (function () {
    function MetricCalculator(calcTerm, ethalonTerm, commonMeta, originalText) {
        //значения метрик (измеряются в %)
        this.mX1 = 0;
        this.mX2 = 0;
        this.mX3 = 0;
        this.mX4 = 0;
        this.mX5 = 0;
        this.mX6 = 0;
        this.mX7 = 0;
        this.mTotal = 0;
        this.weight = {
            M1: 1,
            M2: 1,
            M3: 1,
            M4: 1,
            M5: 1,
            M6: 1,
            M7: 1
        };
        this.iterationPsrResult = {
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
            STER: 0
        };
        this._X = calcTerm;
        this._Y = ethalonTerm;
        this.meta = commonMeta;
        this.originalText = originalText;
    }
    //основной метод расчёта метрик
    MetricCalculator.prototype.dash = function () {
        this.iterationPsrResult.markupId = this._Y.id;
        this.iterationPsrResult.third = this._Y.third;
        this.setM1();
        this.setM2();
        this.setM3();
        this.setM4();
        this.setM5();
        this.setM6();
        this.setM7();
        this.setMTotal();
        return this.iterationPsrResult;
    };
    MetricCalculator.prototype.setM1 = function () {
        if (!this._X.criteria || !this._Y.criteria) {
            throw new Error('В разметках не заполнены критерии.');
        }
        var K1Sum = Object.values(this._X.criteria).reduce(function (a, b) { return a + b; }, 0);
        var K2Sum = Object.values(this._Y.criteria).reduce(function (a, b) { return a + b; }, 0);
        if (!constants_1.K_MAX.hasOwnProperty(this.meta.subject)) {
            throw new Error('Получен несуществующий код предмета.');
        }
        if (constants_1.K_MAX[this.meta.subject] < K1Sum || constants_1.K_MAX[this.meta.subject] < K2Sum) {
            throw new Error('Вычисленная сумма критериев больше максимального значения');
        }
        this.mX1 = (1 - Math.abs(K1Sum - K2Sum) / constants_1.K_MAX[this.meta.subject]) * 100;
        if (!Number.isInteger(this.mX1)) {
            this.iterationPsrResult.metrics.M1 = Math.round(this.mX1);
        }
        else {
            this.iterationPsrResult.metrics.M1 = this.mX1;
        }
        // console.log('---m1 ' + this.mX1);
    };
    MetricCalculator.prototype.setM2 = function () {
        var xPrepArray = [];
        var yPrepArray = [];
        for (var i in this._X.selections) {
            //@ts-ignore
            xPrepArray.push({ start: this._X.selections[i].startSelection, end: this._X.selections[i].endSelection, determFactor: this._X.selections[i].type });
        }
        for (var j in this._Y.selections) {
            //@ts-ignore
            yPrepArray.push({ start: this._Y.selections[j].startSelection, end: this._Y.selections[j].endSelection, determFactor: this._Y.selections[j].type });
        }
        // console.log(this._X);
        var m = new MathMachine_1.MathMachine(xPrepArray, yPrepArray);
        m.calcJaccardMatrix();
        m.calcLossMatrix();
        var res1 = m.goPsrGo();
        var m2 = new MathMachine_1.MathMachine(yPrepArray, xPrepArray);
        m2.calcJaccardMatrix();
        m2.calcLossMatrix();
        var res2 = m2.goPsrGo();
        this.mX2 = Math.round((2 / (1 / res1 + 1 / res2)) * 100);
        if (!Number.isInteger(this.mX2)) {
            this.iterationPsrResult.metrics.M2 = Math.round(this.mX2);
        }
        else {
            this.iterationPsrResult.metrics.M2 = this.mX2;
        }
        // console.log('---m2 ' + this.mX2);
    };
    MetricCalculator.prototype.setM3 = function () {
        var xPrepArray = [];
        var yPrepArray = [];
        for (var i in this._X.selections) {
            //@ts-ignore
            xPrepArray.push({ start: this._X.selections[i].startSelection, end: this._X.selections[i].endSelection, determFactor: this._X.selections[i].type });
        }
        for (var j in this._Y.selections) {
            //@ts-ignore
            yPrepArray.push({ start: this._Y.selections[j].startSelection, end: this._Y.selections[j].endSelection, determFactor: this._Y.selections[j].type });
        }
        var m = new MathMachine_1.MathMachine(xPrepArray, yPrepArray);
        m.calcJaccardMatrix();
        m.calcLossMatrix();
        this.mX3 = m.goPsrGo() * 100;
        if (!Number.isInteger(this.mX3)) {
            this.iterationPsrResult.metrics.M3 = Math.round(this.mX3);
        }
        else {
            this.iterationPsrResult.metrics.M3 = this.mX3;
        }
        // console.log('---m3 ' + this.mX3);
    };
    /*@todo парафразы должны быть занесены в константы (либо получены по запросу от catalog_errors) и быть поняты, как эталон для комментирования. https://w6p.ru/YWE1Y2R.png*/
    MetricCalculator.prototype.setM4 = function () {
        var xPrepArray = [];
        var yPrepArray = [];
        for (var i in this._X.selections) {
            //@ts-ignore
            xPrepArray.push({ start: this._X.selections[i].startSelection, end: this._X.selections[i].endSelection, determFactor: this._X.selections[i].correction });
        }
        for (var j in this._Y.selections) {
            //@ts-ignore
            yPrepArray.push({ start: this._Y.selections[j].startSelection, end: this._Y.selections[j].endSelection, determFactor: this._Y.selections[j].correction });
        }
        var m = new MathMachine_1.MathMachine(xPrepArray, yPrepArray);
        m.calcJaccardMatrix();
        m.calcLossMatrix();
        this.mX4 = m.goPsrGo() * 100;
        if (!Number.isInteger(this.mX4)) {
            this.iterationPsrResult.metrics.M4 = Math.round(this.mX4);
        }
        else {
            this.iterationPsrResult.metrics.M4 = this.mX4;
        }
        // console.log('---m4 ' + this.mX4);
    };
    /**@todo мера жаккара. описано в техрегламенте. фактически, критерий не расчитываем до тех пор, пока не будет разъяснен механизм сопоставления фрагментов**/
    MetricCalculator.prototype.setM5 = function () {
        var xPrepArray = [];
        var yPrepArray = [];
        for (var i in this._X.selections) {
            //@ts-ignore
            xPrepArray.push({ start: this._X.selections[i].startSelection, end: this._X.selections[i].endSelection, determFactor: this._X.selections[i].correction });
        }
        for (var j in this._Y.selections) {
            //@ts-ignore
            yPrepArray.push({ start: this._Y.selections[j].startSelection, end: this._Y.selections[j].endSelection, determFactor: this._Y.selections[j].correction });
        }
        var m = new MathMachine_1.MathMachine(xPrepArray, yPrepArray);
        m.calcJaccardMatrix();
        var jackSum = 0;
        var slagaemoe = 0;
        for (var k in m.jaccardMatrix) {
            for (var u in m.jaccardMatrix[k]) {
                if (m.jaccardMatrix[k][u] !== 1) {
                    if (m.jaccardMatrix[k][u] === 0) {
                        slagaemoe = 1;
                    }
                    else {
                        slagaemoe = m.jaccardMatrix[k][u];
                    }
                    jackSum += slagaemoe;
                }
            }
        }
        // console.log('matrica     ' +  m.jaccardMatrix );
        // console.log('summa po matrice     ' + jackSum );
        // let proizJack = m.jaccardMatrix.length * m.jaccardMatrix[0].length
        var proizJack = this._Y.selections.length;
        this.mX5 = (jackSum * 100 / proizJack);
        if (this.mX5 > 100) {
            this.mX5 = 100;
        }
        if (!Number.isInteger(this.mX5)) {
            this.iterationPsrResult.metrics.M5 = Math.round(this.mX5);
        }
        else {
            this.iterationPsrResult.metrics.M5 = this.mX5;
        }
        // console.log('---m5 ' + this.mX5);
    };
    MetricCalculator.prototype.setM6 = function () {
        var xPrepArray = [];
        var yPrepArray = [];
        for (var i in this._X.selections) {
            //@ts-ignore
            xPrepArray.push({ start: this._X.selections[i].startSelection, end: this._X.selections[i].endSelection, determFactor: this._X.selections[i].explanation });
        }
        for (var j in this._Y.selections) {
            //@ts-ignore
            yPrepArray.push({ start: this._Y.selections[j].startSelection, end: this._Y.selections[j].endSelection, determFactor: this._Y.selections[j].explanation });
        }
        var m = new MathMachine_1.MathMachine(xPrepArray, yPrepArray);
        m.calcJaccardMatrix();
        m.calcLossMatrix();
        this.mX6 = m.goPsrGo() * 100;
        if (!Number.isInteger(this.mX6)) {
            this.iterationPsrResult.metrics.M6 = Math.round(this.mX6);
        }
        else {
            this.iterationPsrResult.metrics.M6 = this.mX6;
        }
        // console.log('---m6 ' + this.mX6);
    };
    /*@todo уточнить по поводу этого параметра
    *   занулён, т.к пояснения не были получены*/
    MetricCalculator.prototype.setM7 = function () {
        this.mX7 = 0;
        if (!Number.isInteger(this.mX7)) {
            this.iterationPsrResult.metrics.M7 = Math.round(this.mX7);
        }
        else {
            this.iterationPsrResult.metrics.M7 = this.mX7;
        }
        // console.log('---m7 ' + this.mX7);
    };
    MetricCalculator.prototype.setMTotal = function () {
        var denominationFinal = 0;
        for (var i in this.iterationPsrResult.metrics) {
            //@ts-ignore
            if (this.weight[i] !== 0) {
                // console.log('key -    ' + i);
                denominationFinal++;
            }
        }
        // console.log('vsego metrici - ' + denominationFinal);
        this.mTotal = Object.values(this.iterationPsrResult.metrics).reduce(function (a, b) { return a + b; }, 0) / denominationFinal;
        if (!Number.isInteger(this.mTotal)) {
            this.iterationPsrResult.metrics.MTotal = Math.round(this.mTotal);
        }
        else {
            this.iterationPsrResult.metrics.MTotal = this.mTotal;
        }
    };
    return MetricCalculator;
}());
exports.MetricCalculator = MetricCalculator;
