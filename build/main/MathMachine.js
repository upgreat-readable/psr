"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MathMachine = void 0;
var MathMachine = /** @class */ (function () {
    function MathMachine(x, y) {
        var _this = this;
        this.jaccardMatrix = [];
        this.lossMatrix = [];
        this.lotsOfX = x;
        this.lotsOfY = y;
        this.lotsOfX.forEach(function (x) { return _this.jaccardMatrix.push([]); });
        this.lotsOfX.forEach(function (x) { return _this.lossMatrix.push([]); });
    }
    MathMachine.prototype.calcJaccardMatrix = function () {
        var _this = this;
        var _loop_1 = function (i) {
            this_1.lotsOfY.forEach(function (item, key) {
                var temp = _this.calcCrossNDivergence(_this.lotsOfX[i].start, _this.lotsOfX[i].end, item.start, item.end);
                _this.jaccardMatrix[i][key] = +(1 - (temp.cross.length) / (temp.divergence.length)).toFixed(1);
            });
        };
        var this_1 = this;
        for (var i in this.lotsOfX) {
            _loop_1(i);
        }
    };
    MathMachine.prototype.calcLossMatrix = function () {
        for (var i in this.jaccardMatrix) {
            for (var j in this.jaccardMatrix[i]) {
                this.lossMatrix[i][j] = this.jaccardMatrix[i][j] +
                    (this.jaccardMatrix[i][j] === 1 ? 1 : 0) +
                    (this.lotsOfX[i].start !== this.lotsOfY[j].start ? 1 : 0) +
                    (this.lotsOfX[i].determFactor !== this.lotsOfY[j].determFactor ? 1 : 0);
            }
        }
    };
    MathMachine.prototype.calcCrossNDivergence = function (xBegin, xEnd, yBegin, yEnd) {
        var nX = this.implodeNumRange(xBegin, xEnd);
        var nY = this.implodeNumRange(yBegin, yEnd);
        return {
            cross: nX.filter(function (x) { return nY.includes(x); }),
            divergence: __spread(new Set(__spread(nX, nY)))
        };
    };
    MathMachine.prototype.implodeNumRange = function (min, max) {
        var arrCoords = [];
        for (var i = min; i <= max; i++) {
            arrCoords.push(i);
        }
        return arrCoords;
    };
    return MathMachine;
}());
exports.MathMachine = MathMachine;
