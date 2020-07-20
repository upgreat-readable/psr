import {Selections} from "../types/MainPsrTypes";

export class CompareActions {

    static x: Selections
    static y: Selections

    static mistakes: any

    static result = {saI: 0, cosI: 0}

    static run(x: Selections, y: Selections, mode: string = '') {
        this.x = x
        this.y = y


        for (let i in this.x) {
            for (let j in y) {
                if (this.x[i].startSelection === y[j].startSelection &&
                    this.x[i].endSelection === y[j].endSelection
                ) {
                    switch (mode) {
                        case 'jaccardIndex':

                            break
                        case 'correction':
                            this.correction(this.x[i].correction, y[j].correction)
                            break
                        case 'subtype-comm':
                            this.mistakes = require('../mistakes/mistakes.json')

                            if (!this.mistakes) {
                                throw new Error('Не были получены ошибки, выгруженные из каталога.')
                            }

                            this.subtype_comm(this.x[i].subtype, y[j].subtype, this.x[i].comment, y[j].comment)
                            break
                        case 'code':
                            this.code(x[i].code, y[j].code)
                            break
                        case '':
                            this.result.saI++
                            break
                    }
                }
            }
        }

        if (mode === '') {
            for (let i in y) {
                for (let j in this.x) {
                    if (y[i].startSelection === this.x[j].startSelection &&
                        y[i].endSelection === this.x[j].endSelection
                    ) {
                        this.result.cosI++
                    }
                }
            }
        }

        return this.result
    }

    static subtype_comm(xSt: string, ySt: string, xComm: string, yComm: string) {
        if (xSt === ySt || this.compareComments(xComm)) {
            this.result.saI++
        }
    }

    static compareComments(xComm: string) : boolean {
        for (let i in this.mistakes) {
            if (!this.mistakes[i].hasOwnProperty('subtypes')) {
                throw new Error('Ключ subtypes отсутствует в массиве каталога ошибок')
            }

            for (let j in this.mistakes[i].subtypes) {
                if (!this.mistakes[i].subtypes.hasOwnProperty('comment')) {
                    throw new Error('Ключ comment отсутствует в массиве каталога ошибок')
                }

                if (this.mistakes[i].subtypes[j].comment === xComm) {
                    return true
                }
            }
        }

        return false
    }

    static code(xCode: string, yCode: string) {
        if (xCode === yCode) {
            this.result.saI++
        }
    }

    static jaccardIndex(text: string) {

    }

    static correction(xCorrection: string, yCorrection: string) {
        if (xCorrection === yCorrection) {
            this.result.saI++
        }
    }
}
