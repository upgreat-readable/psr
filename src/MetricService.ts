import { EnterGlobalObject, IterationPsrResult, ReturnObject } from './types/MainPsrTypes';
import { MetricCalculator } from './main/MetricCalculator';
import { Validator } from './main/Validator';

/**
 * Основной сервис-класс, обслуживающий MetricCalculator и реализующий итоговые подсчёты СТАР/СТЭР и ОТАР для присланных разметок эссе.
 */
export class MetricService {
    /**
     * Объект, который отдаст класс после расчётов.
     * @private
     */
    private _compileAnswer: ReturnObject = {} as ReturnObject;

    /**
     * EntryPoint, производящий вычисления
     * @param entryMarkupObject
     */
    calculate(entryMarkupObject: EnterGlobalObject) {
        Validator.validate(entryMarkupObject);
        //@ts-ignore
        this._compileAnswer = { markups: [] };

        /**
         * Запускаем цикл для присланных разметок - 1я итерация
         */
        for (let i in entryMarkupObject.essay.markups) {
            /* на каждую из главных итераций пушим в итоговый массив id разметки и пустой результат сравнения */
            this._compileAnswer.markups.push({
                id: entryMarkupObject.essay.markups[i].id,
                matching: [],
                STAR: 0,
                STER: 0,
                OTAR: 0,
                isExp: entryMarkupObject.essay.markups[i].isExpert,
            });

            /**
             * Запускаем цикл для присланных разметок - 2я итерация - перебираем все разметки для 1й выбранной
             */
            for (let j in entryMarkupObject.essay.markups) {
                /* исключаем сравнение разметки с самой собой и исключаем из Y разметки алгоритмов */
                if (i !== j && entryMarkupObject.essay.markups[j].isExpert) {
                    // console.log(entryMarkupObject.essay.markups[i].id + ' 1я');
                    // console.log(entryMarkupObject.essay.markups[j].id + ' 2я');
                    // console.log(entryMarkupObject.essay.id);
                    let metric = new MetricCalculator(
                        entryMarkupObject.essay.markups[i],
                        entryMarkupObject.essay.markups[j],
                        entryMarkupObject.essay.meta,
                        entryMarkupObject.essay.text,
                        'suppose',
                        entryMarkupObject.essay.id
                    ).dash();
                    /* запушим результат в итоговых массив */
                    this.fillAnswer(entryMarkupObject.essay.markups[i].id, metric);
                }
            }

            /* после вычисления метрик расчитаем стар/стэр, в зависимости от типа разметки */
            try {
                this.calcAccuracy(
                    entryMarkupObject.essay.markups[i].id,
                    entryMarkupObject.essay.markups[i].isExpert
                );
            } catch (e: any) {
                throw new Error(
                    'Во время расчёта СТАР/СТЭР произошла ошибка \n' +
                        'разметка - ' +
                        entryMarkupObject.essay.markups[i].id +
                        '\n' +
                        'эссе - ' +
                        entryMarkupObject.essay.id +
                        e.stack
                );
            }

            /* далее, расчитаем отар и закончим итерацию для конкретной разметки */
            try {
                this.calcFinalOtar(
                    entryMarkupObject.essay.markups[i].id,
                    entryMarkupObject.essay.markups[i].isExpert
                );
            } catch (e: any) {
                throw new Error(
                    'Во время расчёта ОТАР произошла ошибка \n' +
                        'разметка - ' +
                        entryMarkupObject.essay.markups[i].id +
                        '\n' +
                        'эссе - ' +
                        entryMarkupObject.essay.id +
                        e.stack
                );
            }
        }

        this._compileAnswer.STER_AVG = this.calcFinalSter();
        this._compileAnswer.essayId = entryMarkupObject.essay.id;

        return this._compileAnswer;
    }

    /**
     * Пушит результат в итоговый массив
     * @param mainMarkupId
     * @param psrConcreteResult
     */
    fillAnswer(mainMarkupId: string, psrConcreteResult: IterationPsrResult) {
        for (let i in this._compileAnswer.markups) {
            if (this._compileAnswer.markups[i].id === mainMarkupId) {
                this._compileAnswer.markups[i].matching.push(psrConcreteResult);
            }
        }
    }

    calcFinalSter() {
        let averageSter = 0;
        let averageSterDenominator = 0;
        for (let i in this._compileAnswer.markups) {
            if (this._compileAnswer.markups[i].STER !== 0) {
                averageSter += this._compileAnswer.markups[i].STER;
                averageSterDenominator++;
            }
        }

        if (averageSterDenominator === 0) {
            averageSterDenominator = 1;
        }

        return +(averageSter / averageSterDenominator).toFixed(2);
    }

    calcAccuracy(mainMarkupId: string, expertMarker: boolean | undefined) {
        let numenator = 0;
        let denominator = 0;
        for (let i in this._compileAnswer.markups) {
            if (this._compileAnswer.markups[i].id === mainMarkupId) {
                /* для каждого элемента сравнения суммируем mTotal */
                for (let j in this._compileAnswer.markups[i].matching) {
                    numenator =
                        numenator + this._compileAnswer.markups[i].matching[j].metrics.MTotal;
                    denominator = denominator + 1;
                }

                if (expertMarker) {
                    this._compileAnswer.markups[i].STER = +(numenator / denominator).toFixed(2);
                } else {
                    this._compileAnswer.markups[i].STAR = +(numenator / denominator).toFixed(2);
                }
            }
        }
    }

    calcFinalOtar(mainMarkupId: string, expertMarker: boolean | undefined) {
        let averageSter = 0;
        let star = 0;
        let averageSterDenominator = 0;
        for (let i in this._compileAnswer.markups) {
            if (this._compileAnswer.markups[i].STER !== 0) {
                averageSter += this._compileAnswer.markups[i].STER;
                averageSterDenominator++;
            }

            if (this._compileAnswer.markups[i].STAR !== 0) {
                star = this._compileAnswer.markups[i].STAR;
            }
        }

        let ster = averageSter / averageSterDenominator;

        for (let i in this._compileAnswer.markups) {
            if (this._compileAnswer.markups[i].STAR !== 0) {
                let tempOtar = (star / ster) * 100;

                if (!Number.isInteger(tempOtar)) {
                    tempOtar = +tempOtar.toFixed(2);
                }

                if (ster == 0) {
                    this._compileAnswer.markups[i].OTAR = 0;
                }

                this._compileAnswer.markups[i].OTAR = tempOtar;
            }
        }
    }
}
