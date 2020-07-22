import {MetricService} from "./MetricService";

console.log(123);
let a = [1, 2, 3, 4, 5]

/* разметка пример */
let failExampleWithOutThird = {
    essay: {
        id: 'failExampleWithOutThirdID',
        meta: {
            theme: 'failExampleWithOutThird',
            topic: 'topic',
            class: 11,
            year: 2020,
            subject: 'rus',
            test: 'test',
            category: 'category',
            expert: 'expert',
            timeMarkup: 'timeMarkup',
            timeSecondMarkup: 'timeSecondMarkup',
        },
        originalText: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.',
        markups:
            [
                {
                    id: 'fail-id-1',
                    isExpert: true,
                    third: false,
                    criterions: {
                        K1: 2,
                        K2: 1,
                        K3: 3,
                        K4: 1,
                        K5: 2,
                        K6: 3,
                        K7: 4,
                        K8: 3.5,
                        K9: 2,
                        K10: 1,
                        K11: 1,
                        K12: 1,
                    },
                    metrics: {
                        M1: 50
                    },
                    selections:
                        [
                            {
                                id: 1,
                                startSelection: 50,
                                endSelection: 52,
                                code: 'О.теорсвязь',
                                comment: 'Комментарий1',
                                explanation: 'Пояснение1',
                                correction: 'Исправление1',
                                tag: 'tag1',
                                type: 'error',
                                subtype: 'error',
                            },
                            {
                                id: 2,
                                startSelection: 7,
                                endSelection: 20,
                                code: 'ПОНЯТИЕ',
                                comment: 'Комментарий2',
                                explanation: 'Пояснение2',
                                correction: 'Исправление2',
                                tag: 'tag2',
                                type: 'meaning',
                                subtype: 'error',
                            },
                        ],
                },
                {
                    id: 'fail-id-2',
                    isExpert: true,
                    third: false,
                    criterions: {
                        K1: 2,
                        K2: 1,
                        K3: 3,
                        K4: 1,
                        K5: 2,
                        K6: 3,
                        K7: 4,
                        K8: 3.5,
                        K9: 2,
                        K10: 1,
                        K11: 1,
                        K12: 1,
                    },
                    metrics: {
                        M1: 50
                    },
                    selections:
                        [
                            {
                                id: 1,
                                startSelection: 30,
                                endSelection: 38,
                                code: 'О.теорсвязь',
                                comment: 'Комментарий1',
                                explanation: 'Пояснение1',
                                correction: 'Исправление1',
                                tag: 'tag1',
                                type: 'error',
                                subtype: 'error',
                            },
                            {
                                id: 2,
                                startSelection: 17,
                                endSelection: 65,
                                code: 'ПОНЯТИЕ',
                                comment: 'Комментарий2',
                                explanation: 'Пояснение2',
                                correction: 'Исправление2',
                                tag: 'tag2',
                                type: 'meaning',
                                subtype: 'error',
                            },
                            {
                                id: 3,
                                startSelection: 65,
                                endSelection: 70,
                                code: 'ОТНОШЕНИЕ',
                                comment: 'Комментарий3',
                                explanation: 'Пояснение3',
                                correction: 'Исправление3',
                                tag: 'tag3',
                                type: 'meaning',
                                subtype: 'error',
                            },
                        ],
                },
                {
                    id: 'fail-id-3',
                    isExpert: false,
                    third: false,
                    criterions: {
                        K1: 2,
                        K2: 1,
                        K3: 3,
                        K4: 1,
                        K5: 2,
                        K6: 3,
                        K7: 4,
                        K8: 3.5,
                        K9: 2,
                        K10: 1,
                        K11: 1,
                        K12: 1,
                    },
                    metrics: {
                        M1: 50
                    },
                    selections:
                        [
                            {
                                id: 1,
                                startSelection: 30,
                                endSelection: 38,
                                code: 'О.теорсвязь',
                                comment: 'Комментарий1',
                                explanation: 'Пояснение1',
                                correction: 'Исправление1',
                                tag: 'tag1',
                                type: 'error',
                                subtype: 'error',
                            },
                            {
                                id: 2,
                                startSelection: 17,
                                endSelection: 65,
                                code: 'ПОНЯТИЕ',
                                comment: 'Комментарий2',
                                explanation: 'Пояснение2',
                                correction: 'Исправление2',
                                tag: 'tag2',
                                type: 'meaning',
                                subtype: 'error',
                            },
                            {
                                id: 3,
                                startSelection: 65,
                                endSelection: 70,
                                code: 'ОТНОШЕНИЕ',
                                comment: 'Комментарий3',
                                explanation: 'Пояснение3',
                                correction: 'Исправление3',
                                tag: 'tag3',
                                type: 'meaning',
                                subtype: 'error',
                            },
                        ],
                },
            ],
    }
}
let failExampleWithThird = {
    essay: {
        id: 'failExampleWithOutThirdID',
        meta: {
            theme: 'failExampleWithOutThird',
            topic: 'topic',
            class: 11,
            year: 2020,
            subject: 'rus',
            test: 'test',
            category: 'category',
            expert: 'expert',
            timeMarkup: 'timeMarkup',
            timeSecondMarkup: 'timeSecondMarkup',
        },
        originalText: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.',
        markups:
            [
                {
                    id: 'fail-id-1',
                    isExpert: true,
                    third: false,
                    criterions: {
                        K1: 2,
                        K2: 1,
                        K3: 3,
                        K4: 1,
                        K5: 2,
                        K6: 3,
                        K7: 4,
                        K8: 3.5,
                        K9: 2,
                        K10: 1,
                        K11: 1,
                        K12: 1,
                    },
                    metrics: {
                        M1: 50
                    },
                    selections:
                        [
                            {
                                id: 1,
                                startSelection: 50,
                                endSelection: 52,
                                code: 'О.теорсвязь',
                                comment: 'Комментарий1',
                                explanation: 'Пояснение1',
                                correction: 'Исправление1',
                                tag: 'tag1',
                                type: 'error',
                                subtype: 'error',
                            },
                            {
                                id: 2,
                                startSelection: 7,
                                endSelection: 20,
                                code: 'ПОНЯТИЕ',
                                comment: 'Комментарий2',
                                explanation: 'Пояснение2',
                                correction: 'Исправление2',
                                tag: 'tag2',
                                type: 'meaning',
                                subtype: 'error',
                            },
                        ],
                },
                {
                    id: 'fail-id-2',
                    isExpert: true,
                    third: false,
                    criterions: {
                        K1: 2,
                        K2: 1,
                        K3: 3,
                        K4: 1,
                        K5: 2,
                        K6: 3,
                        K7: 4,
                        K8: 3.5,
                        K9: 2,
                        K10: 1,
                        K11: 1,
                        K12: 1,
                    },
                    metrics: {
                        M1: 50
                    },
                    selections:
                        [
                            {
                                id: 1,
                                startSelection: 30,
                                endSelection: 38,
                                code: 'О.теорсвязь',
                                comment: 'Комментарий1',
                                explanation: 'Пояснение1',
                                correction: 'Исправление1',
                                tag: 'tag1',
                                type: 'error',
                                subtype: 'error',
                            },
                            {
                                id: 2,
                                startSelection: 17,
                                endSelection: 65,
                                code: 'ПОНЯТИЕ',
                                comment: 'Комментарий2',
                                explanation: 'Пояснение2',
                                correction: 'Исправление2',
                                tag: 'tag2',
                                type: 'meaning',
                                subtype: 'error',
                            },
                            {
                                id: 3,
                                startSelection: 65,
                                endSelection: 70,
                                code: 'ОТНОШЕНИЕ',
                                comment: 'Комментарий3',
                                explanation: 'Пояснение3',
                                correction: 'Исправление3',
                                tag: 'tag3',
                                type: 'meaning',
                                subtype: 'error',
                            },
                        ],
                },
            ],
    }
}

let x = {
    essay: {
        id: 'qwe',
        meta: {
            theme: 'qwe',
            topic: 'topic',
            class: 11,
            year: 2020,
            subject: 'rus',
            test: 'test',
            category: 'category',
            expert: 'expert',
            timeMarkup: 'timeMarkup',
            timeSecondMarkup: 'timeSecondMarkup',
        },
        originalText: 'qwe',
        markups:
            [
                {
                    id: 'qwe3',
                    isExpert: true,
                    third: false,
                    criterions: {
                        K1: 2,
                        K2: 1,
                        K3: 0
                    },
                    metrics: {
                        M1: 50
                    },
                    selections:
                        [
                            {
                                id: 1,
                                startSelection: 50,
                                endSelection: 52,
                                code: 'О.теорсвязь',
                                comment: 'Комментарий1',
                                explanation: 'Пояснение1',
                                correction: 'Исправление1',
                                tag: 'tag1',
                                type: 'error',
                                subtype: 'error',
                            },
                            {
                                id: 2,
                                startSelection: 7,
                                endSelection: 20,
                                code: 'ПОНЯТИЕ',
                                comment: 'Комментарий2',
                                explanation: 'Пояснение2',
                                correction: 'Исправление2',
                                tag: 'tag2',
                                type: 'meaning',
                                subtype: 'error',
                            },
                        ],
                },
                {
                    id: 'qwe5',
                    isExpert: true,
                    third: false,
                    criterions: {
                        K1: 2,
                        K2: 1,
                        K3: 0
                    },
                    metrics: {
                        M1: 50
                    },
                    selections:
                        [
                            {
                                id: 1,
                                startSelection: 50,
                                endSelection: 52,
                                code: 'О.теорсвязь',
                                comment: 'Комментарий1',
                                explanation: 'Пояснение1',
                                correction: 'Исправление1',
                                tag: 'tag1',
                                type: 'error',
                                subtype: 'error',
                            },
                            {
                                id: 2,
                                startSelection: 7,
                                endSelection: 20,
                                code: 'ПОНЯТИЕ',
                                comment: 'Комментарий2',
                                explanation: 'Пояснение2',
                                correction: 'Исправление2',
                                tag: 'tag2',
                                type: 'meaning',
                                subtype: 'error',
                            },
                        ],
                },
                {
                    id: 'qwe4',
                    isExpert: true,
                    third: false,
                    criterions: {
                        K1: 2,
                        K2: 2,
                        K3: 3
                    },
                    metrics: {
                        M1: 50
                    },
                    selections:
                        [
                            {
                                id: 1,
                                startSelection: 50,
                                endSelection: 52,
                                code: 'О.теорсвязь',
                                comment: 'Комментарий1',
                                explanation: 'Пояснение1',
                                correction: 'Исправление1',
                                tag: 'tag1',
                                type: 'error',
                                subtype: 'error',
                            },
                            {
                                id: 2,
                                startSelection: 7,
                                endSelection: 20,
                                code: 'ПОНЯТИЕ',
                                comment: 'Комментарий2',
                                explanation: 'Пояснение2',
                                correction: 'Исправление2',
                                tag: 'tag2',
                                type: 'meaning',
                                subtype: 'error',
                            },

                        ],
                },
            ],

    }
}

// var _ = require('lodash');
// let n = _.groupBy(x.essay.markups[0].selections, 'tag')
// console.log(n);





let p = new MetricService().calculate(failExampleWithOutThird)
// console.log(JSON.stringify(p, null ,2));
