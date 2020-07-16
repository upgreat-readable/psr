"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricService = void 0;
var MetricCalculator_1 = require("./MetricCalculator");
var MetricService = /** @class */ (function () {
    function MetricService() {
        this._compileAnswer = {};
    }
    MetricService.prototype.calculate = function (entryMarkupObject) {
        for (var i in entryMarkupObject.essay.markups) {
            console.log('key - ' + i);
            for (var j in entryMarkupObject.essay.markups) {
                if (i !== j) {
                    var metric = new MetricCalculator_1.MetricCalculator(entryMarkupObject.essay.markups[i], entryMarkupObject.essay.markups[j], entryMarkupObject.essay.meta).dash();
                    this.fillAnswer(i, metric);
                    console.log('another keys -- ' + j);
                }
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
    return MetricService;
}());
exports.MetricService = MetricService;
