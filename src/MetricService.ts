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
                matching: [],
                STAR: 0,
                CTER: 0
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
                }
            }

            /* после вычисления метрик расчитаем стар/стэр, в зависимости от типа разметки */
            this.calcAccuracy(entryMarkupObject.essay.markups[i].id, entryMarkupObject.essay.markups[i].isExpert)
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

    calcAccuracy(mainMarkupId: string, expertMarker: boolean) {
        let numenator = 0
        let denominator = 0
        for (let i in this._compileAnswer.markups) {

            if (this._compileAnswer.markups[i].id === mainMarkupId) {
                /* для каждого элемента сравнения суммируем mTotal */
                for (let j in this._compileAnswer.markups[i].matching) {
                    /*@todo после получения ответа от Константина, нужно будет либо удалить коммент, либо исправить реализацию*/
                    /* если результат сравнения был расчитан относительно разметки 3м экспертом - его вес будет равен 2 */
                    if (this._compileAnswer.markups[i].matching[j].thirdExpert) {
                        numenator = numenator + this._compileAnswer.markups[i].matching[j].metrics.MTotal * 2
                        denominator = denominator + 2
                    } else {
                        numenator = numenator + this._compileAnswer.markups[i].matching[j].metrics.MTotal
                        denominator = denominator + 1
                    }
                }

                if (expertMarker) {
                    this._compileAnswer.markups[i].STAR = numenator / denominator
                } else {
                    this._compileAnswer.markups[i].CTER = numenator / denominator
                }
            }
        }
    }

}
