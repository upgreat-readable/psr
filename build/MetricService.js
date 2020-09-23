"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricService = void 0;
var MetricCalculator_1 = require("./main/MetricCalculator");
var MetricService = /** @class */ (function () {
    function MetricService() {
        this._compileAnswer = {};
    }
    MetricService.prototype.calculate = function (entryMarkupObject) {
        //@ts-ignore
        this._compileAnswer = { markups: [] };
        for (var i in entryMarkupObject.essay.markups) {
            /* на каждую из главных итераций пушим в итоговый массив id разметки и пустой результат сравнения */
            this._compileAnswer.markups.push({
                id: entryMarkupObject.essay.markups[i].id,
                matching: [],
                STAR: 0,
                CTER: 0,
                OTAR: 0
            });
            for (var j in entryMarkupObject.essay.markups) {
                /* исключаем сравнение разметки с самой собой и исключаем из Y разметки алгоритмов */
                if (i !== j && entryMarkupObject.essay.markups[j].isExpert) {
                    var metric = new MetricCalculator_1.MetricCalculator(entryMarkupObject.essay.markups[i], entryMarkupObject.essay.markups[j], entryMarkupObject.essay.meta, entryMarkupObject.essay.text).dash();
                    /* запушим результат в итоговых массив */
                    this.fillAnswer(entryMarkupObject.essay.markups[i].id, metric);
                }
            }
            /* после вычисления метрик расчитаем стар/стэр, в зависимости от типа разметки */
            try {
                this.calcAccuracy(entryMarkupObject.essay.markups[i].id, entryMarkupObject.essay.markups[i].isExpert);
            }
            catch (e) {
                throw new Error('Во время расчёта СТАР/СТЭР произошла ошибка \n'
                    + 'разметка - ' + entryMarkupObject.essay.markups[i].id + '\n'
                    + 'эссе - ' + entryMarkupObject.essay.id
                    + e.stack);
            }
            /* далее, расчитаем отар и закончим итерацию для конкретной разметки */
            try {
                console.log(entryMarkupObject.essay.markups[i].id);
                this.calcFinalOtar(entryMarkupObject.essay.markups[i].id, entryMarkupObject.essay.markups[i].isExpert);
            }
            catch (e) {
                throw new Error('Во время расчёта ОТАР произошла ошибка \n'
                    + 'разметка - ' + entryMarkupObject.essay.markups[i].id + '\n'
                    + 'эссе - ' + entryMarkupObject.essay.id
                    + e.stack);
            }
        }
        return this._compileAnswer;
    };
    MetricService.prototype.fillAnswer = function (mainMarkupId, psrConcreteResult) {
        for (var i in this._compileAnswer.markups) {
            if (this._compileAnswer.markups[i].id === mainMarkupId) {
                this._compileAnswer.markups[i].matching.push(psrConcreteResult);
            }
        }
    };
    MetricService.prototype.calcAccuracy = function (mainMarkupId, expertMarker) {
        var numenator = 0;
        var denominator = 0;
        for (var i in this._compileAnswer.markups) {
            if (this._compileAnswer.markups[i].id === mainMarkupId) {
                /* для каждого элемента сравнения суммируем mTotal */
                for (var j in this._compileAnswer.markups[i].matching) {
                    /*@todo после получения ответа от Константина, нужно будет либо удалить коммент, либо исправить реализацию*/
                    /* если результат сравнения был расчитан относительно разметки 3м экспертом - его вес будет равен 2 */
                    if (this._compileAnswer.markups[i].matching[j].third) {
                        numenator = numenator + this._compileAnswer.markups[i].matching[j].metrics.MTotal * 2;
                        denominator = denominator + 2;
                    }
                    else {
                        numenator = numenator + this._compileAnswer.markups[i].matching[j].metrics.MTotal;
                        denominator = denominator + 1;
                    }
                }
                if (expertMarker) {
                    this._compileAnswer.markups[i].CTER = numenator / denominator;
                }
                else {
                    this._compileAnswer.markups[i].STAR = numenator / denominator;
                }
            }
        }
    };
    /*@todo на данный момент СТЭР, участвующий в подсчете ОТАР вычисляется как среднее значение СТЭР*/
    MetricService.prototype.calcFinalOtar = function (mainMarkupId, expertMarker) {
        var averageSter = 0;
        var star = 0;
        var averageSterDenominator = 0;
        // console.log(JSON.stringify(this._compileAnswer.markups, null ,2));
        for (var i in this._compileAnswer.markups) {
            // if (this._compileAnswer.markups[i].id === mainMarkupId) {
            if (this._compileAnswer.markups[i].CTER !== 0) {
                averageSter += this._compileAnswer.markups[i].CTER;
                averageSterDenominator++;
            }
            if (this._compileAnswer.markups[i].STAR !== 0) {
                star = this._compileAnswer.markups[i].STAR;
            }
            // }
        }
        var ster = averageSter / averageSterDenominator;
        for (var i in this._compileAnswer.markups) {
            if (this._compileAnswer.markups[i].STAR !== 0) {
                var tempOtar = (star / ster) * 100;
                if (!Number.isInteger(tempOtar)) {
                    tempOtar = Math.round(tempOtar);
                }
                this._compileAnswer.markups[i].OTAR = tempOtar;
            }
        }
    };
    return MetricService;
}());
exports.MetricService = MetricService;
