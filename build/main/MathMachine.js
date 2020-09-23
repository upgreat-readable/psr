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
    MathMachine.prototype.goPsrGo = function () {
        var arr = [];
        for (var g = 0; g < this.jaccardMatrix.length + 1; g++) {
            arr[g] = [];
            for (var v = 0; v < this.jaccardMatrix[0].length + 1; v++) {
                //@ts-ignore
                arr[g][v] = 0;
            }
        }
        var M = arr;
        var Mmin = arr;
        //Взять вместо М - матрицу жаккара для более точного расчёта
        var Qm = M.length + M[0].length;
        var connComponents = arr;
        var connLine = [];
        var mLine = [];
        var mLineTruth = [];
        var Q = 0;
        var Qold = 0;
        var sumToQ = 0;
        var x0 = 0;
        var y0 = 0;
        var xPrep = [];
        var yPrep = [];
        var xEmp = 0;
        var yEmp = 0;
        var xSmejh = 0;
        var ySmejh = 0;
        var index = 0;
        //пре-заполняем M элементами из Loss, которые равны 0
        for (var z in this.lossMatrix) {
            for (var x in this.lossMatrix[z]) {
                if (this.lossMatrix[z][x] === 0) {
                    mLineTruth.push({ row: z, col: x });
                    M[z][x] = this.lossMatrix[z][x];
                }
            }
        }
        //Определяем компоненты связности
        for (var z in this.jaccardMatrix) {
            for (var x in this.jaccardMatrix[z]) {
                if (this.jaccardMatrix[z][x] !== 1) {
                    connLine.push({ row: z, col: x });
                    connComponents[z][x] = this.jaccardMatrix[z][x];
                }
            }
        }
        var i = 0;
        for (var p in connLine) {
            if (i === 0) {
                // xSmejh = +connLine[p].row
                // ySmejh = +connLine[p].col
            }
            //перебрать паросочетания
            if (xSmejh !== +connLine[p].row && ySmejh !== +connLine[p].col || i === 0) {
                index = mLine.push(connLine[p]);
                // console.log('cur object - ' + connLine[p]);
                //посчитаем неучтенные вершины в долях графа по x и по y
                for (var k in mLine) {
                    xPrep.push(mLine[k].row);
                    yPrep.push(mLine[k].col);
                }
                x0 = new Set(xPrep).size;
                y0 = new Set(yPrep).size;
                //-----------//
                //считаем L(i,k)
                // console.log(mLine);
                sumToQ = 0;
                for (var k in mLine) {
                    // console.log(mLine[k]);
                    xEmp = this.lossMatrix.length - x0;
                    yEmp = this.lossMatrix[0].length - y0;
                    sumToQ += this.lossMatrix[mLine[k].row][mLine[k].col];
                    // console.log(mLine[k].row + '-------- ' + mLine[k].col);
                }
                Q = sumToQ + xEmp + yEmp;
                if (Q < Qm) {
                    Qm = Q;
                    mLineTruth.push(connLine[p]);
                }
                else {
                    delete mLine.index;
                }
                // console.log(Qm);
            }
            xSmejh = +connLine[p].row;
            ySmejh = +connLine[p].col;
            i++;
        }
        //посчитаем долю совпавших
        var count = [];
        for (var t in mLineTruth) {
            count.push(mLineTruth[t].row);
        }
        var countUniq = new Set(count).size;
        return (countUniq / this.lossMatrix[0].length);
        // return result;
    };
    return MathMachine;
}());
exports.MathMachine = MathMachine;
