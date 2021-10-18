import { EnterGlobalObject, IterationPsrResult } from '../types/MainPsrTypes';
import { NominationsCalculator } from './nominationsCalculator';
import { Validator } from '../main/Validator';
import { nominationReturnObject } from '../types/nominationTypes';
import { settleEng } from './settlementTypes';

/**
 * Основной сервис-класс, обслуживающий MetricCalculator и реализующий итоговые подсчёты СТАР/СТЭР и ОТАР для присланных разметок эссе.
 */
export class NominationsService {
    /**
     * Объект, который отдаст класс после расчётов.
     * @private
     */
    private _compileAnswer: nominationReturnObject = {} as nominationReturnObject;

    /**
     * EntryPoint, производящий вычисления
     * @param entryMarkupObject
     */
    calculate(entryMarkupObject: EnterGlobalObject) {
        Validator.validate(entryMarkupObject);
        //@ts-ignore
        this._compileAnswer = { markup: {} };

        /** Очистим объект от ошибок, не имеющих отношения к номинации */
        for (let i in entryMarkupObject.essay.markups) {
            switch (entryMarkupObject.essay.meta.subject) {
                case 'eng':
                    entryMarkupObject.essay.markups[i].selections = entryMarkupObject.essay.markups[
                        i
                    ].selections.filter(this.filterEngs);
                    break;
                case 'rus':
                    entryMarkupObject.essay.markups[i].selections = entryMarkupObject.essay.markups[
                        i
                    ].selections.filter(this.filterRus);
                    break;
                case 'lit':
                    entryMarkupObject.essay.markups[i].selections = entryMarkupObject.essay.markups[
                        i
                    ].selections.filter(this.filterLit);
                    break;
                default:
                    throw new Error(
                        'В номинации не может участвовать предмет, отличный от eng/rus/lit. В данной ошибке был - ' +
                            entryMarkupObject.essay.meta.subject
                    );
            }
        }

        entryMarkupObject.essay.markups = entryMarkupObject.essay.markups.filter(
            this.nonEmptyFilter
        );

        /**
         * Запускаем цикл для присланных разметок - 1я итерация
         */
        for (let i in entryMarkupObject.essay.markups) {
            /* на каждую из главных итераций пушим в итоговый массив id разметки и пустой результат сравнения */
            if (!entryMarkupObject.essay.markups[i].isExpert) {
                this._compileAnswer.markup.id = entryMarkupObject.essay.markups[i].id;
                this._compileAnswer.markup.matching = [];
                this._compileAnswer.markup.isExp = false;
            }

            /**
             * Запускаем цикл для присланных разметок - 2я итерация - перебираем все разметки для 1й выбранной
             */
            for (let j in entryMarkupObject.essay.markups) {
                /* исключаем сравнение разметки с самой собой и исключаем из Y разметки алгоритмов */
                if (i !== j && entryMarkupObject.essay.markups[j].isExpert) {
                    let metric = new NominationsCalculator(
                        entryMarkupObject.essay.markups[i],
                        entryMarkupObject.essay.markups[j],
                        entryMarkupObject.essay.meta,
                        entryMarkupObject.essay.text
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
        }
        this._compileAnswer.essayId = entryMarkupObject.essay.id;
        return this._compileAnswer;
    }

    filterEngs(obj: any) {
        return settleEng.includes(obj.type.toLocaleLowerCase());
    }

    filterRus(obj: any) {
        return !!(
            obj.type.toLocaleLowerCase().match(/^р\./) || obj.type.toLocaleLowerCase().match(/^г\./)
        );
    }

    filterLit(obj: any) {
        return !!obj.type.toLocaleLowerCase().match(/^р\./);
    }

    nonEmptyFilter(obj: any) {
        if (obj.isExpert) {
            return obj.selections.length !== 0;
        }
        return true;
    }
    /**
     * Пушит результат в итоговый массив
     * @param mainMarkupId
     * @param psrConcreteResult
     */
    fillAnswer(mainMarkupId: string, psrConcreteResult: IterationPsrResult) {
        if (this._compileAnswer.markup.id === mainMarkupId) {
            this._compileAnswer.markup.matching.push(psrConcreteResult);
        }
    }

    calcAccuracy(mainMarkupId: string, expertMarker: boolean | undefined) {
        let numenator = 0;
        let denominator = 0;

        if (this._compileAnswer.markup.id === mainMarkupId) {
            /* для каждого элемента сравнения суммируем mTotal */
            for (let j in this._compileAnswer.markup.matching) {
                numenator = numenator + this._compileAnswer.markup.matching[j].metrics.MTotal;
                denominator = denominator + 1;
            }

            if (!expertMarker) {
                this._compileAnswer.markup.STAR = +(numenator / denominator).toFixed(2);
            }
        }
    }
}
