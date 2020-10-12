import { EnterGlobalObject } from '../types/MainPsrTypes';

/**
 * Класс, содержащий корневые правила валидации для ПСР
 */
export class Validator {
    static EnterGlobalObject: EnterGlobalObject;

    static validate(entryMarkupObject: EnterGlobalObject) {
        Validator.EnterGlobalObject = entryMarkupObject;

        Validator.checkUniquenessAlgMarkup();
    }

    /**
     * В сервис ПСР может быть подано неограниченное количество экспертных разметок, но 1 алгоритмическая
     */
    static checkUniquenessAlgMarkup() {
        let algMkCount = 0;
        for (let i in Validator.EnterGlobalObject.essay.markups) {
            if (!Validator.EnterGlobalObject.essay.markups[i].isExpert) {
                algMkCount++;
            }
        }

        if (algMkCount > 1) {
            throw new Error('В алгоритм было подано более, чем 1 алгоритмическая разметка.');
        }
    }
}
