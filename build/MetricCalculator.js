"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricCalculator = void 0;
var MetricCalculator = /** @class */ (function () {
    function MetricCalculator(calcTerm, ethalonTerm) {
        //значения метрик (измеряются в %)
        this.mX1 = 0;
        this.mX2 = 0;
        this.mX3 = 0;
        this.mX4 = 0;
        this.mX5 = 0;
        this.mX6 = 0;
        this.mX7 = 0;
        this.weight = 0;
        this.iterationPsrResult = {};
        this._X = calcTerm;
        this._Y = ethalonTerm;
    }
    MetricCalculator.prototype.dash = function () {
        return this.iterationPsrResult;
    };
    MetricCalculator.prototype.calcCriterionSum = function (markUpNum) {
        var sum = 0;
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
        return sum;
    };
    return MetricCalculator;
}());
exports.MetricCalculator = MetricCalculator;
