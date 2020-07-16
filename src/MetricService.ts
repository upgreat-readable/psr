import {EnterGlobalObject, IterationPsrResult, ReturnObject} from "./types/MainPsrTypes";
import {MetricCalculator} from "./MetricCalculator";

export class MetricService {

    private _compileAnswer: ReturnObject = {} as ReturnObject

    constructor() {

    }

    calculate(entryMarkupObject: EnterGlobalObject) {
        for (let i in entryMarkupObject.essay.markups) {
            console.log('key - ' + i);
            for (let j in entryMarkupObject.essay.markups) {
                if (i !== j) {
                    let metric = new MetricCalculator(entryMarkupObject.essay.markups[i], entryMarkupObject.essay.markups[j], entryMarkupObject.essay.meta).dash()
                    this.fillAnswer(i, metric)
                    console.log('another keys -- ' + j);
                }
            }
        }

        return this._compileAnswer
    }

    fillAnswer(mainMarkupId: string, psrConcreteResult: IterationPsrResult) {
        for (let i in this._compileAnswer.markups) {
            if (this._compileAnswer.markups[i].id === mainMarkupId) {
                this._compileAnswer.markups[i].matching.push(psrConcreteResult)
            }
        }
    }
}
