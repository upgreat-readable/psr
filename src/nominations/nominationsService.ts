import { EnterGlobalObject, IterationPsrResult } from '../types/MainPsrTypes';
import { NominationsCalculator } from './nominationsCalculator';
import { Validator } from '../main/Validator';
import { nominationReturnObject } from '../types/nominationTypes';
import {
    settleEng,
    settleHistLogic,
    settleHistStructure,
    settleLitLogic,
    settleLitStructure,
    settleRusLogic,
    settleRusStructure,
    settleSocLogic,
    settleSocStructure,
} from './settlementTypes';

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
        /* Готовим почву под логику[0] и структуру[1] */
        //@ts-ignore
        this._compileAnswer = [{ markup: {} }, { markup: {} }];
        this.runGeneralCompares(entryMarkupObject, 'logic');
        this.runGeneralCompares(entryMarkupObject, 'structure');

        /**
         * Запускаем цикл для присланных разметок - 1я итерация
         */

        return this._compileAnswer;
    }

    public runGeneralCompares(entryMarkupObject: EnterGlobalObject, type: 'logic' | 'structure') {
        const cleanUpMkObject = this.defragmentSelections(entryMarkupObject, type);
        const indexForAnswer = type == 'logic' ? 0 : 1;

        for (let i in cleanUpMkObject.essay.markups) {
            /* на каждую из главных итераций пушим в итоговый массив id разметки и пустой результат сравнения */
            if (!cleanUpMkObject.essay.markups[i].isExpert) {
                this._compileAnswer[indexForAnswer].markup.id = cleanUpMkObject.essay.markups[i].id;
                this._compileAnswer[indexForAnswer].markup.matching = [];
                this._compileAnswer[indexForAnswer].markup.isExp = false;
            }

            /**
             * Запускаем цикл для присланных разметок - 2я итерация - перебираем все разметки для 1й выбранной
             */
            for (let j in cleanUpMkObject.essay.markups) {
                /* исключаем сравнение разметки с самой собой и исключаем из Y разметки алгоритмов */
                if (i !== j && cleanUpMkObject.essay.markups[j].isExpert) {
                    let metric = new NominationsCalculator(
                        cleanUpMkObject.essay.markups[i],
                        cleanUpMkObject.essay.markups[j],
                        cleanUpMkObject.essay.meta,
                        cleanUpMkObject.essay.text,
                        'suppose'
                    ).dash();
                    /* запушим результат в итоговых массив */
                    this.fillAnswer(cleanUpMkObject.essay.markups[i].id, metric, indexForAnswer);
                }
            }

            /* после вычисления метрик расчитаем стар/стэр, в зависимости от типа разметки */
            try {
                this.calcAccuracy(
                    cleanUpMkObject.essay.markups[i].id,
                    cleanUpMkObject.essay.markups[i].isExpert,
                    indexForAnswer
                );
            } catch (e: any) {
                throw new Error(
                    'Во время расчёта СТАР/СТЭР произошла ошибка \n' +
                        'разметка - ' +
                        cleanUpMkObject.essay.markups[i].id +
                        '\n' +
                        'эссе - ' +
                        entryMarkupObject.essay.id +
                        e.stack
                );
            }
        }
        this._compileAnswer[indexForAnswer].essayId = entryMarkupObject.essay.id;
        this._compileAnswer[indexForAnswer].type = type;
    }

    public defragmentSelections(entryMarkupObject: EnterGlobalObject, type: 'logic' | 'structure') {
        /** Очистим объект от ошибок, не имеющих отношения к номинации */
        const deepClonedEMO = JSON.parse(JSON.stringify(entryMarkupObject));
        for (let i in deepClonedEMO.essay.markups) {
            switch (deepClonedEMO.essay.meta.subject) {
                case 'rus':
                    const rusFilter =
                        type == 'logic' ? this.filterRusLogic : this.filterRusStructure;
                    deepClonedEMO.essay.markups[i].selections = deepClonedEMO.essay.markups[
                        i
                    ].selections.filter(rusFilter);
                    break;
                case 'social':
                    const socFilter =
                        type == 'logic' ? this.filterSocLogic : this.filterSocStructure;
                    deepClonedEMO.essay.markups[i].selections = deepClonedEMO.essay.markups[
                        i
                    ].selections.filter(socFilter);
                    break;
                case 'hist':
                    const histFilter =
                        type == 'logic' ? this.filterHistLogic : this.filterHistStructure;
                    deepClonedEMO.essay.markups[i].selections = deepClonedEMO.essay.markups[
                        i
                    ].selections.filter(histFilter);
                    break;
                case 'lit':
                    const litFilter =
                        type == 'logic' ? this.filterLitLogic : this.filterLitStructure;
                    deepClonedEMO.essay.markups[i].selections = deepClonedEMO.essay.markups[
                        i
                    ].selections.filter(litFilter);
                    break;
                default:
                    throw new Error(
                        'В номинации не может участвовать предмет, отличный от social/hist/rus/lit. В данной ошибке был - ' +
                            deepClonedEMO.essay.meta.subject
                    );
            }
        }

        // deepClonedEMO.essay.markups = deepClonedEMO.essay.markups.filter(
        //     this.nonEmptyFilter
        // );

        return deepClonedEMO;
    }

    filterRusLogic(obj: any) {
        return settleRusLogic.includes(obj.type.toLocaleLowerCase());
    }

    filterRusStructure(obj: any) {
        return settleRusStructure.includes(obj.type.toLocaleLowerCase());
    }

    filterSocLogic(obj: any) {
        return settleSocLogic.includes(obj.type.toLocaleLowerCase());
    }

    filterSocStructure(obj: any) {
        return settleSocStructure.includes(obj.type.toLocaleLowerCase());
    }

    filterHistLogic(obj: any) {
        return settleHistLogic.includes(obj.type.toLocaleLowerCase());
    }

    filterHistStructure(obj: any) {
        return settleHistStructure.includes(obj.type.toLocaleLowerCase());
    }

    filterLitLogic(obj: any) {
        return settleLitLogic.includes(obj.type.toLocaleLowerCase());
    }

    filterLitStructure(obj: any) {
        return settleLitStructure.includes(obj.type.toLocaleLowerCase());
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
     * @param indexForAnswer
     */
    fillAnswer(mainMarkupId: string, psrConcreteResult: IterationPsrResult, indexForAnswer: 0 | 1) {
        if (this._compileAnswer[indexForAnswer].markup.id === mainMarkupId) {
            this._compileAnswer[indexForAnswer].markup.matching.push(psrConcreteResult);
        }
    }

    calcAccuracy(mainMarkupId: string, expertMarker: boolean | undefined, indexForAnswer: 0 | 1) {
        let numenator = 0;
        let denominator = 0;

        if (this._compileAnswer[indexForAnswer].markup.id === mainMarkupId) {
            /* для каждого элемента сравнения суммируем mTotal */
            for (let j in this._compileAnswer[indexForAnswer].markup.matching) {
                numenator =
                    numenator +
                    this._compileAnswer[indexForAnswer].markup.matching[j].metrics.MTotal;
                denominator = denominator + 1;
            }

            if (!expertMarker) {
                this._compileAnswer[indexForAnswer].markup.STAR = +(
                    numenator / denominator
                ).toFixed(2);
            }
        }
    }
}
