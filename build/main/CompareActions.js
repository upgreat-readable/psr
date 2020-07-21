"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompareActions = void 0;
var CompareActions = /** @class */ (function () {
    function CompareActions() {
    }
    CompareActions.run = function (x, y, mode) {
        if (mode === void 0) { mode = ''; }
        this.x = x;
        this.y = y;
        this.result = { saI: 0, cosI: 0 };
        for (var i in this.x) {
            for (var j in y) {
                if (this.x[i].startSelection === y[j].startSelection &&
                    this.x[i].endSelection === y[j].endSelection) {
                    switch (mode) {
                        case 'jaccardIndex':
                            break;
                        case 'correction':
                            this.correction(this.x[i].correction, y[j].correction);
                            break;
                        case 'subtype-comm':
                            this.mistakes = require('../mistakes/mistakes.json');
                            if (!this.mistakes) {
                                throw new Error('Не были получены ошибки, выгруженные из каталога.');
                            }
                            this.subtype_comm(this.x[i].subtype, y[j].subtype, this.x[i].comment, y[j].comment);
                            break;
                        case 'code':
                            this.code(x[i].code, y[j].code);
                            break;
                        case '':
                            this.result.saI++;
                            break;
                    }
                }
            }
        }
        if (mode === '') {
            for (var i in y) {
                for (var j in this.x) {
                    if (y[i].startSelection === this.x[j].startSelection &&
                        y[i].endSelection === this.x[j].endSelection) {
                        this.result.cosI++;
                    }
                }
            }
        }
        return this.result;
    };
    CompareActions.subtype_comm = function (xSt, ySt, xComm, yComm) {
        if (xSt === ySt || this.compareComments(xComm)) {
            this.result.saI++;
        }
    };
    CompareActions.compareComments = function (xComm) {
        for (var i in this.mistakes) {
            if (!this.mistakes[i].hasOwnProperty('subtypes')) {
                throw new Error('Ключ subtypes отсутствует в массиве каталога ошибок');
            }
            for (var j in this.mistakes[i].subtypes) {
                if (!this.mistakes[i].subtypes.hasOwnProperty('comment')) {
                    throw new Error('Ключ comment отсутствует в массиве каталога ошибок');
                }
                if (this.mistakes[i].subtypes[j].comment === xComm) {
                    return true;
                }
            }
        }
        return false;
    };
    CompareActions.code = function (xCode, yCode) {
        if (xCode === yCode) {
            this.result.saI++;
        }
    };
    CompareActions.jaccardIndex = function (text) {
    };
    CompareActions.correction = function (xCorrection, yCorrection) {
        if (xCorrection === yCorrection) {
            this.result.saI++;
        }
    };
    CompareActions.result = { saI: 0, cosI: 0 };
    return CompareActions;
}());
exports.CompareActions = CompareActions;
