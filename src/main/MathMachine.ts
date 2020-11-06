import { LotsOf, Selections } from '../types/MainPsrTypes';

export class MathMachine {
    workWithSelection: boolean;
    determFactor: 'type' | 'correction' | 'explanation' | 'subtype' = 'type';
    lotsOfX: LotsOf;
    lotsOfY: LotsOf;

    jaccardMatrix: Array<number[]> = [];
    lossMatrix: Array<number[]> = [];

    matchedFragmentsPercent: number = 0;

    constructor(
        x: LotsOf | Selections,
        y: LotsOf | Selections,
        workWithSelecton: boolean = false,
        determFactor: 'type' | 'correction' | 'explanation' | 'subtype'
    ) {
        this.workWithSelection = workWithSelecton;
        this.determFactor = determFactor;
        if (this.workWithSelection) {
            //@ts-ignore
            this.lotsOfX = this.transformSelectionsToMathFormat(x);
            //@ts-ignore
            this.lotsOfY = this.transformSelectionsToMathFormat(y);
        } else {
            //@ts-ignore
            this.lotsOfX = x;
            //@ts-ignore
            this.lotsOfY = y;
        }

        this.lotsOfX.forEach(x => this.jaccardMatrix.push([]));
        this.lotsOfX.forEach(x => this.lossMatrix.push([]));
    }

    complexSearchMatchedFragments(): number {
        this.calcJaccardMatrix();
        this.calcLossMatrix();

        this.goPsrGo();
        return this.matchedFragmentsPercent;
    }

    calcJaccardMatrix() {
        for (let i in this.lotsOfX) {
            this.lotsOfY.forEach((item, key) => {
                let temp = this.calcCrossNDivergence(
                    this.lotsOfX[i].start,
                    this.lotsOfX[i].end,
                    item.start,
                    item.end
                );
                this.jaccardMatrix[i][key] = +(
                    1 -
                    temp.cross.length / temp.divergence.length
                ).toFixed(1);
            });
        }
    }

    getJaccardMatrix() {
        return this.jaccardMatrix;
    }

    calcLossMatrix() {
        for (let i in this.jaccardMatrix) {
            for (let j in this.jaccardMatrix[i]) {
                this.lossMatrix[i][j] =
                    this.jaccardMatrix[i][j] +
                    (this.jaccardMatrix[i][j] === 1 ? 1 : 0) +
                    (this.lotsOfX[i].start !== this.lotsOfY[j].start ? 1 : 0) +
                    (this.lotsOfX[i].determFactor !== this.lotsOfY[j].determFactor ? 1 : 0);
            }
        }
    }

    getLossMatrix() {
        return this.lossMatrix;
    }

    calcCrossNDivergence(xBegin: number, xEnd: number, yBegin: number, yEnd: number) {
        let nX = this.implodeNumRange(xBegin, xEnd);
        let nY = this.implodeNumRange(yBegin, yEnd);
        return {
            cross: nX.filter(x => nY.includes(x)),
            divergence: [...new Set<number>([...nX, ...nY])],
        };
    }

    implodeNumRange(min: number, max: number) {
        let arrCoords = [];
        for (var i = min; i <= max; i++) {
            arrCoords.push(i);
        }

        return arrCoords;
    }

    goPsrGo() {
        var arr: Array<number[]> = [];
        for (let g = 0; g < this.jaccardMatrix.length + 1; g++) {
            arr[g] = [];
            for (var v = 0; v < this.jaccardMatrix[0].length + 1; v++) {
                //@ts-ignore
                arr[g][v] = 0;
            }
        }

        let M = arr;
        let Mmin = arr;

        //Взять вместо М - матрицу жаккара для более точного расчёта
        let Qm = M.length + M[0].length;
        let connComponents = arr;

        let connLine = [];
        let mLine: any = [];
        let mLineTruth: any = [];
        let mLineTruth2: any = [];

        let Q = 0;
        let Qold = 0;
        let sumToQ = 0;

        let x0 = 0;
        let y0 = 0;

        let xPrep = [];
        let yPrep = [];

        let xEmp = 0;
        let yEmp = 0;

        let xSmejh = 0;
        let ySmejh = 0;

        let index = 0;

        //@ts-ignore
        let xblock = [];
        //@ts-ignore
        let yblock = [];
        //пре-заполняем M элементами из Loss, которые равны 0
        for (let z in this.lossMatrix) {
            for (let x in this.lossMatrix[z]) {
                if (this.lossMatrix[z][x] === 0) {
                    //@ts-ignore
                    if (!xblock.includes(z) && !yblock.includes(x)) {
                        mLineTruth.push({ row: z, col: x });
                        M[z][x] = this.lossMatrix[z][x];
                        xblock.push(z);
                        yblock.push(x);
                    }
                }
            }
        }

        //Определяем компоненты связности
        for (let z in this.jaccardMatrix) {
            for (let x in this.jaccardMatrix[z]) {
                if (this.jaccardMatrix[z][x] !== 1 && !xblock.includes(z) && !yblock.includes(x)) {
                    connLine.push({ row: z, col: x });
                    connComponents[z][x] = this.jaccardMatrix[z][x];
                }
            }
        }

        let i = 0;
        for (let p in connLine) {
            //перебрать паросочетания
            if ((xSmejh !== +connLine[p].row && ySmejh !== +connLine[p].col) || i === 0) {
                index = mLine.push(connLine[p]);
                //посчитаем неучтенные вершины в долях графа по x и по y
                for (let k in mLine) {
                    xPrep.push(mLine[k].row);
                    yPrep.push(mLine[k].col);
                }

                x0 = new Set(xPrep).size;
                y0 = new Set(yPrep).size;
                //-----------//

                //считаем L(i,k)
                sumToQ = 0;
                for (let k in mLine) {
                    xEmp = this.lossMatrix.length - x0;
                    yEmp = this.lossMatrix[0].length - y0;
                    sumToQ += this.lossMatrix[mLine[k].row][mLine[k].col];
                }
                Q = sumToQ + xEmp + yEmp;

                if (Q < Qm) {
                    Qm = Q;
                    mLineTruth2.push(connLine[p]);
                } else {
                    delete mLine.index;
                }
            }

            xSmejh = +connLine[p].row;
            ySmejh = +connLine[p].col;

            i++;
        }
        //прибавим полностью совпавшие фрагменты
        //посчитаем долю совпавших
        let count = [];
        for (let t in mLineTruth2) {
            count.push(mLineTruth2[t].row);
        }

        let countUniq = new Set(count).size + mLineTruth.length;
        this.matchedFragmentsPercent = countUniq / this.lossMatrix[0].length;
    }

    getMatchedFragmentsPercent() {
        return this.matchedFragmentsPercent;
    }

    transformSelectionsToMathFormat(selections: Selections) {
        let result = [];

        for (let i in selections) {
            result.push({
                start: selections[i].startSelection,
                end: selections[i].endSelection,
                determFactor: selections[i][this.determFactor],
            });
        }

        return result;
    }
}
