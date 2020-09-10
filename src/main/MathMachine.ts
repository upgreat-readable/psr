import {LotsOf} from "../types/MainPsrTypes";

export class MathMachine {
    lotsOfX: LotsOf
    lotsOfY: LotsOf

    jaccardMatrix: Array<number[]> = []
    lossMatrix: Array<number[]> = []

    constructor(x: LotsOf, y: LotsOf) {
        this.lotsOfX = x
        this.lotsOfY = y
        this.lotsOfX.forEach(x => this.jaccardMatrix.push([]));
        this.lotsOfX.forEach(x => this.lossMatrix.push([]));
    }

    calcJaccardMatrix() {
        for (let i in this.lotsOfX) {
            this.lotsOfY.forEach((item, key) => {
                let temp = this.calcCrossNDivergence(
                    this.lotsOfX[i].start, this.lotsOfX[i].end,
                    item.start, item.end
                )
                this.jaccardMatrix[i][key] = +(1 - (temp.cross.length)/(temp.divergence.length)).toFixed(1)
            })
        }
    }

    calcLossMatrix() {
        for (let i in this.jaccardMatrix) {

            for (let j in this.jaccardMatrix[i]) {
                this.lossMatrix[i][j] = this.jaccardMatrix[i][j]  +
                (this.jaccardMatrix[i][j] === 1 ? 1 : 0) +
                    (this.lotsOfX[i].start !== this.lotsOfY[j].start ? 1 : 0) +
                    (this.lotsOfX[i].determFactor !== this.lotsOfY[j].determFactor ? 1 : 0)
            }

        }
    }

    calcCrossNDivergence(xBegin: number, xEnd: number, yBegin: number, yEnd: number) {
        let nX = this.implodeNumRange(xBegin, xEnd)
        let nY = this.implodeNumRange(yBegin, yEnd)
        return {
            cross: nX.filter(x => nY.includes(x)),
            divergence: [...new Set<number>([...nX, ...nY])]
        }
    }

    implodeNumRange(min: number, max: number) {
        let arrCoords = [];
        for (var i = min; i <= max; i++) {
            arrCoords.push(i);
        }

        return arrCoords
    }


}
