import {EnterGlobalObject, IterationPsrResult, ReturnObject} from "./types/MainPsrTypes";
import {MetricCalculator} from "./main/MetricCalculator";

export class MetricService {

    private _compileAnswer: ReturnObject = {} as ReturnObject

    calculate(entryMarkupObject: EnterGlobalObject) {
        //@ts-ignore
        this._compileAnswer = {markups: []}

        for (let i in entryMarkupObject.essay.markups) {
            /* на каждую из главных итераций пушим в итоговый массив id разметки и пустой результат сравнения */
            this._compileAnswer.markups.push({
                id: entryMarkupObject.essay.markups[i].id,
                matching: []
            })

            for (let j in entryMarkupObject.essay.markups) {
                /* исключаем сравнение разметки с самой собой и исключаем из Y разметки алгоритмов */
                if (i !== j && entryMarkupObject.essay.markups[j].isExpert) {
                    let metric = new MetricCalculator(
                        entryMarkupObject.essay.markups[i], entryMarkupObject.essay.markups[j],
                        entryMarkupObject.essay.meta, entryMarkupObject.essay.originalText
                    ).dash()
                    /* запушим результат в итоговых массив */
                    this.fillAnswer(entryMarkupObject.essay.markups[i].id, metric)
                    console.log('another keys -- ' + j);
                }
            }

            /* после вычисления метрик расчитаем стар/стэр, в зависимости от типа разметки */
            this.calcAccuracy(i)
        }

        return this._compileAnswer
    }

    fillAnswer(mainMarkupId: string, psrConcreteResult: IterationPsrResult) {
        for (let i in this._compileAnswer.markups) {
            console.log('rmid  ' + mainMarkupId);
            if (this._compileAnswer.markups[i].id === mainMarkupId) {
                this._compileAnswer.markups[i].matching.push(psrConcreteResult)
            }
        }
    }

    calcAccuracy(mainMarkupId: string) {
        for (let i in this._compileAnswer.markups) {
            if (this._compileAnswer.markups[i].id === mainMarkupId) {

            }
        }
    }

}
