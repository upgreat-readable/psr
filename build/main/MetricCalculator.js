"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricCalculator = void 0;
var constants_1 = require("../constants");
var CompareActions_1 = require("./CompareActions");
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
        this.weight = 0;
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
            CTER: 0
        };
        this._X = calcTerm;
        this._Y = ethalonTerm;
        this.meta = commonMeta;
        this.originalText = originalText;
    }
    /*@todo округление должно происходить только в случае, когда результаты вычисления долей не являются целыми*/
    //основной метод расчёта метрик
    MetricCalculator.prototype.dash = function () {
        this.iterationPsrResult.markupId = this._Y.id;
        this.setM1();
        this.setM2();
        this.setM3();
        this.setM4();
        this.setM5();
        this.setM6();
        this.setM7();
        return this.iterationPsrResult;
    };
    MetricCalculator.prototype.setM1 = function () {
        if (!this._X.criterions || !this._Y.criterions) {
            throw new Error('В разметках не заполнены критерии.');
        }
        var K1Sum = Object.values(this._X.criterions).reduce(function (a, b) { return a + b; }, 0);
        var K2Sum = Object.values(this._Y.criterions).reduce(function (a, b) { return a + b; }, 0);
        if (!constants_1.K_MAX.hasOwnProperty(this.meta.subject)) {
            throw new Error('Получен несуществующий код предмета.');
        }
        this.mX1 = Math.round((1 - Math.abs(K1Sum - K2Sum) / constants_1.K_MAX[this.meta.subject]) * 100);
        this.iterationPsrResult.metrics.M1 = this.mX1;
        console.log('---m1 ' + this.mX1);
    };
    MetricCalculator.prototype.setM2 = function () {
        // let compareResult = this.compareSimilarFragments(this._X.selections, this._Y.selections)
        var compareResult = CompareActions_1.CompareActions.run(this._X.selections, this._Y.selections);
        //точность поиска
        var searchAccuracy = compareResult.saI / this._X.selections.length;
        //полнота поиска
        var completenessOfSearch = compareResult.cosI / this._Y.selections.length;
        this.mX2 = Math.round((2 / (1 / searchAccuracy + 1 / completenessOfSearch)) * 100);
        this.iterationPsrResult.metrics.M2 = this.mX2;
        console.log('---m2 ' + this.mX2);
    };
    MetricCalculator.prototype.setM3 = function () {
        // let compareResult = this.compareSimilarFragments(this._X.selections, this._Y.selections, 'code')
        var compareResult = CompareActions_1.CompareActions.run(this._X.selections, this._Y.selections, 'code');
        this.mX3 = (compareResult.saI / this._X.selections.length) * 100;
        this.iterationPsrResult.metrics.M3 = this.mX3;
        console.log('---m3 ' + this.mX3);
    };
    /*@todo парафразы должны быть занесены в константы (либо получены по запросу от catalog_errors) и быть поняты, как эталон для комментирования. https://w6p.ru/YWE1Y2R.png*/
    MetricCalculator.prototype.setM4 = function () {
        // let compareResult = this.compareSimilarFragments(this._X.selections, this._Y.selections, 'subtype-comm')
        var compareResult = CompareActions_1.CompareActions.run(this._X.selections, this._Y.selections, 'subtype-comm');
        this.mX4 = (compareResult.saI / this._X.selections.length) * 100;
        this.iterationPsrResult.metrics.M4 = this.mX4;
        console.log('---m4 ' + this.mX4);
    };
    /**@todo мера жаккара. описано в техрегламенте. фактически, критерий не расчитываем до тех пор, пока не будет разъяснен механизм сопоставления фрагментов**/
    MetricCalculator.prototype.setM5 = function () {
        // let compareResult = CompareActions.run()
        // let compareResult = CompareActions.run(this._X.selections, this._Y.selections, 'jaccardIndex')
        this.mX5 = 0;
        this.iterationPsrResult.metrics.M5 = this.mX5;
        console.log('---m5 ' + this.mX5);
    };
    MetricCalculator.prototype.setM6 = function () {
        // let compareResult = this.compareSimilarFragments(this._X.selections, this._Y.selections, 'correction')
        var compareResult = CompareActions_1.CompareActions.run(this._X.selections, this._Y.selections, 'correction');
        this.mX6 = (compareResult.saI / this._X.selections.length) * 100;
        this.iterationPsrResult.metrics.M6 = this.mX6;
        console.log('---m6 ' + this.mX6);
    };
    /*@todo уточнить по поводу этого параметра
    *   занулён, т.к пояснения не были получены*/
    MetricCalculator.prototype.setM7 = function () {
        this.mX7 = 0;
        this.iterationPsrResult.metrics.M7 = this.mX7;
        console.log('---m7 ' + this.mX7);
    };
    return MetricCalculator;
}());
exports.MetricCalculator = MetricCalculator;
