import {EnterGlobalObject, IterationPsrResult, ReturnObject} from "./types/MainPsrTypes";
import {MetricCalculator} from "./main/MetricCalculator";

export class MetricServiceNew {

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
                STER: 0,
                OTAR: 0
            })

            for (let j in entryMarkupObject.essay.markups) {
                /* исключаем сравнение разметки с самой собой и исключаем из Y разметки алгоритмов */
                if (i !== j && entryMarkupObject.essay.markups[j].isExpert) {
                    let metric = new MetricCalculator(
                        entryMarkupObject.essay.markups[i], entryMarkupObject.essay.markups[j],
                        entryMarkupObject.essay.meta, entryMarkupObject.essay.text
                    ).dash()
                    /* запушим результат в итоговых массив */
                    this.fillAnswer(entryMarkupObject.essay.markups[i].id, metric)
                }
            }

            /* после вычисления метрик расчитаем стар/стэр, в зависимости от типа разметки */
            try {
                this.calcAccuracy(entryMarkupObject.essay.markups[i].id, entryMarkupObject.essay.markups[i].isExpert)
            } catch (e) {
                throw new Error('Во время расчёта СТАР/СТЭР произошла ошибка \n'
                    + 'разметка - ' + entryMarkupObject.essay.markups[i].id + '\n'
                    + 'эссе - ' + entryMarkupObject.essay.id
                    + e.stack)
            }

            /* далее, расчитаем отар и закончим итерацию для конкретной разметки */
            try {
                console.log(entryMarkupObject.essay.markups[i].id);
                this.calcFinalOtar(entryMarkupObject.essay.markups[i].id, entryMarkupObject.essay.markups[i].isExpert)
            } catch (e) {
                throw new Error('Во время расчёта ОТАР произошла ошибка \n'
                    + 'разметка - ' + entryMarkupObject.essay.markups[i].id + '\n'
                    + 'эссе - ' + entryMarkupObject.essay.id
                    + e.stack)
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

    calcAccuracy(mainMarkupId: string, expertMarker: boolean) {
        let numenator = 0
        let denominator = 0
        for (let i in this._compileAnswer.markups) {

            if (this._compileAnswer.markups[i].id === mainMarkupId) {
                /* для каждого элемента сравнения суммируем mTotal */
                for (let j in this._compileAnswer.markups[i].matching) {
                    /*@todo после получения ответа от Константина, нужно будет либо удалить коммент, либо исправить реализацию*/
                    /* если результат сравнения был расчитан относительно разметки 3м экспертом - его вес будет равен 2 */
                    if (this._compileAnswer.markups[i].matching[j].third) {
                        numenator = numenator + this._compileAnswer.markups[i].matching[j].metrics.MTotal * 2
                        denominator = denominator + 2
                    } else {
                        numenator = numenator + this._compileAnswer.markups[i].matching[j].metrics.MTotal
                        denominator = denominator + 1
                    }
                }

                if (expertMarker) {
                    this._compileAnswer.markups[i].STER = numenator / denominator
                } else {
                    this._compileAnswer.markups[i].STAR = numenator / denominator
                }
            }
        }
    }

    /*@todo на данный момент СТЭР, участвующий в подсчете ОТАР вычисляется как среднее значение СТЭР*/
    calcFinalOtar(mainMarkupId: string, expertMarker: boolean) {
        let averageSter = 0
        let star = 0
        let averageSterDenominator = 0
        // console.log(JSON.stringify(this._compileAnswer.markups, null ,2));
        for (let i in this._compileAnswer.markups) {
            // if (this._compileAnswer.markups[i].id === mainMarkupId) {

            if (this._compileAnswer.markups[i].STER !== 0) {

                averageSter += this._compileAnswer.markups[i].STER
                averageSterDenominator++
            }

            if (this._compileAnswer.markups[i].STAR !== 0) {
                star = this._compileAnswer.markups[i].STAR
            }
            // }
        }

        let ster = averageSter / averageSterDenominator


        for (let i in this._compileAnswer.markups) {
            if (this._compileAnswer.markups[i].STAR !== 0) {
                let tempOtar = (star / ster) * 100

                if (!Number.isInteger(tempOtar)) {
                    tempOtar = Math.round(tempOtar)
                }

                this._compileAnswer.markups[i].OTAR = tempOtar
            }
        }
    }
}
