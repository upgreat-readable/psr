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
                matching: []
            });
            for (var j in entryMarkupObject.essay.markups) {
                /* исключаем сравнение разметки с самой собой и исключаем из Y разметки алгоритмов */
                if (i !== j && entryMarkupObject.essay.markups[j].isExpert) {
                    var metric = new MetricCalculator_1.MetricCalculator(entryMarkupObject.essay.markups[i], entryMarkupObject.essay.markups[j], entryMarkupObject.essay.meta, entryMarkupObject.essay.originalText).dash();
                    /* запушим результат в итоговых массив */
                    this.fillAnswer(entryMarkupObject.essay.markups[i].id, metric);
                    console.log('another keys -- ' + j);
                }
            }
            /* после вычисления метрик расчитаем стар/стэр, в зависимости от типа разметки */
            this.calcAccuracy(i);
        }
        return this._compileAnswer;
    };
    MetricService.prototype.fillAnswer = function (mainMarkupId, psrConcreteResult) {
        for (var i in this._compileAnswer.markups) {
            console.log('rmid  ' + mainMarkupId);
            if (this._compileAnswer.markups[i].id === mainMarkupId) {
                this._compileAnswer.markups[i].matching.push(psrConcreteResult);
            }
        }
    };
    MetricService.prototype.calcAccuracy = function (mainMarkupId) {
        for (var i in this._compileAnswer.markups) {
            if (this._compileAnswer.markups[i].id === mainMarkupId) {
            }
        }
    };
    return MetricService;
}());
exports.MetricService = MetricService;
