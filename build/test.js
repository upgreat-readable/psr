"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MetricService_1 = require("./MetricService");
// console.log(123);
var a = [1, 2, 3, 4, 5];
/* разметка пример */
var failExampleWithOutThird = {
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
        text: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.',
        markups: [
            {
                id: 'fail-id-1',
                isExpert: true,
                third: false,
                criteria: {
                    K1: 0,
                    K2: 0,
                    K3: 0,
                    K4: 0,
                    K5: 0,
                    K6: 0,
                    K7: 0,
                    K8: 3.5,
                    K9: 2,
                    K10: 0,
                    K11: 0,
                    K12: 0,
                },
                metrics: {
                    M1: 50
                },
                selections: [
                    {
                        id: 60,
                        tag: "",
                        type: "ПРОБЛЕМА",
                        group: "meaning",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 77,
                        startSelection: 60
                    },
                    {
                        id: 261,
                        tag: "",
                        type: "Р.мест",
                        group: "error",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 251,
                        startSelection: 248
                    },
                    {
                        id: 301,
                        tag: "",
                        type: "Г.упр",
                        group: "error",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 285,
                        startSelection: 277
                    },
                    {
                        id: 341,
                        tag: "",
                        type: "Р.мест",
                        group: "error",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 311,
                        startSelection: 307
                    },
                    {
                        id: 443,
                        tag: "",
                        type: "ПОЯСНЕНИЕ",
                        group: "meaning",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 506,
                        startSelection: 398
                    },
                    {
                        id: 566,
                        tag: "",
                        type: "ПРИМЕР",
                        group: "meaning",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 619,
                        startSelection: 507
                    },
                    {
                        id: 690,
                        tag: "",
                        type: "Р.лишн",
                        group: "error",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 627,
                        startSelection: 620
                    },
                    {
                        id: 701,
                        tag: "",
                        type: "СВЯЗЬ",
                        group: "meaning",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 627,
                        startSelection: 622
                    },
                    {
                        id: 742,
                        tag: "",
                        type: "ПОЯСНЕНИЕ",
                        group: "meaning",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 728,
                        startSelection: 651
                    },
                    {
                        id: 834,
                        tag: "",
                        type: "ПРИМЕР",
                        group: "meaning",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 940,
                        startSelection: 729
                    },
                    {
                        id: 871,
                        tag: "",
                        type: "Р.повтор",
                        group: "error",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 765,
                        startSelection: 757
                    },
                    {
                        id: 1123,
                        tag: "",
                        type: "ПОЗИЦИЯ",
                        group: "meaning",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 1226,
                        startSelection: 994
                    },
                    {
                        id: 1301,
                        tag: "",
                        type: "Г.сказ",
                        group: "error",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 1171,
                        startSelection: 1162
                    },
                    {
                        id: 1331,
                        tag: "",
                        type: "Р.знач",
                        group: "error",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 1188,
                        startSelection: 1181
                    },
                    {
                        id: 1450,
                        tag: "",
                        type: "ОТНОШЕНИЕ",
                        group: "meaning",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 1460,
                        startSelection: 1287
                    },
                    {
                        id: 1912,
                        tag: "",
                        type: "Л.причслед",
                        group: "error",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 1790,
                        startSelection: 1735
                    },
                    {
                        id: 2087,
                        tag: "",
                        type: "Г.упр",
                        group: "error",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 1922,
                        startSelection: 1895
                    },
                    {
                        id: 2261,
                        tag: "",
                        type: "Г.эллипс",
                        group: "error",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 2074,
                        startSelection: 2059
                    },
                    {
                        id: 2643,
                        tag: "",
                        type: "Г.видовр",
                        group: "error",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 2445,
                        startSelection: 2428
                    },
                    {
                        id: 2786,
                        tag: "",
                        type: "Г.упр",
                        group: "error",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 2585,
                        startSelection: 2558
                    }
                ],
            },
            {
                id: 'fail-id-2',
                isExpert: true,
                third: false,
                criteria: {
                    K1: 0,
                    K2: 0,
                    K3: 0,
                    K4: 0,
                    K5: 0,
                    K6: 0,
                    K7: 0,
                    K8: 3.5,
                    K9: 2,
                    K10: 0,
                    K11: 0,
                    K12: 0,
                },
                metrics: {
                    M1: 50
                },
                selections: [
                    {
                        id: 60,
                        tag: "",
                        type: "ПРОБЛЕМА",
                        group: "meaning",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 77,
                        startSelection: 60
                    },
                    {
                        id: 301,
                        tag: "",
                        type: "Г.упр",
                        group: "error",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 285,
                        startSelection: 277
                    },
                    {
                        id: 341,
                        tag: "",
                        type: "Р.мест",
                        group: "error",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 311,
                        startSelection: 307
                    },
                    {
                        id: 443,
                        tag: "",
                        type: "ПОЯСНЕНИЕ",
                        group: "meaning",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 506,
                        startSelection: 398
                    },
                    {
                        id: 690,
                        tag: "",
                        type: "Р.лишн",
                        group: "error",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 627,
                        startSelection: 620
                    },
                    {
                        id: 701,
                        tag: "",
                        type: "СВЯЗЬ",
                        group: "meaning",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 627,
                        startSelection: 622
                    },
                    {
                        id: 742,
                        tag: "",
                        type: "ПОЯСНЕНИЕ",
                        group: "meaning",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 728,
                        startSelection: 651
                    },
                    {
                        id: 834,
                        tag: "",
                        type: "ПРИМЕР",
                        group: "meaning",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 940,
                        startSelection: 729
                    },
                    {
                        id: 871,
                        tag: "",
                        type: "Р.повтор",
                        group: "error",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 765,
                        startSelection: 757
                    },
                    {
                        id: 1123,
                        tag: "",
                        type: "ПОЗИЦИЯ",
                        group: "meaning",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 1226,
                        startSelection: 994
                    },
                    {
                        id: 1301,
                        tag: "",
                        type: "Г.сказ",
                        group: "error",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 1171,
                        startSelection: 1162
                    },
                    {
                        id: 1331,
                        tag: "",
                        type: "Р.знач",
                        group: "error",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 1188,
                        startSelection: 1181
                    },
                    {
                        id: 1450,
                        tag: "",
                        type: "ОТНОШЕНИЕ",
                        group: "meaning",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 1460,
                        startSelection: 1287
                    },
                    {
                        id: 1912,
                        tag: "",
                        type: "Л.причслед",
                        group: "error",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 1790,
                        startSelection: 1735
                    },
                    {
                        id: 2087,
                        tag: "",
                        type: "Г.упр",
                        group: "error",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 1922,
                        startSelection: 1895
                    },
                    {
                        id: 2261,
                        tag: "",
                        type: "Г.эллипс",
                        group: "error",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 2074,
                        startSelection: 2059
                    },
                    {
                        id: 2643,
                        tag: "",
                        type: "Г.видовр",
                        group: "error",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 2445,
                        startSelection: 2428
                    },
                    {
                        id: 2786,
                        tag: "",
                        type: "Г.упр",
                        group: "error",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 2585,
                        startSelection: 2558
                    },
                    {
                        id: 322,
                        tag: "",
                        type: "Р.мест",
                        group: "error",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 255,
                        startSelection: 240
                    }
                ],
            },
            {
                id: 'fail-id-3',
                isExpert: false,
                third: false,
                criteria: {
                    K1: 0,
                    K2: 0,
                    K3: 0,
                    K4: 0,
                    K5: 0,
                    K6: 0,
                    K7: 0,
                    K8: 3.5,
                    K9: 2,
                    K10: 0,
                    K11: 0,
                    K12: 0,
                },
                metrics: {
                    M1: 50
                },
                selections: [
                    {
                        id: 60,
                        tag: "",
                        type: "ПРОБЛЕМА",
                        group: "meaning",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 77,
                        startSelection: 60
                    },
                    {
                        id: 301,
                        tag: "",
                        type: "Г.упр",
                        group: "error",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 285,
                        startSelection: 277
                    },
                    {
                        id: 341,
                        tag: "",
                        type: "Р.мест",
                        group: "error",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 311,
                        startSelection: 307
                    },
                    {
                        id: 443,
                        tag: "",
                        type: "ПОЯСНЕНИЕ",
                        group: "meaning",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 506,
                        startSelection: 398
                    },
                    {
                        id: 690,
                        tag: "",
                        type: "Р.лишн",
                        group: "error",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 627,
                        startSelection: 620
                    },
                    {
                        id: 701,
                        tag: "",
                        type: "СВЯЗЬ",
                        group: "meaning",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 627,
                        startSelection: 622
                    },
                    {
                        id: 742,
                        tag: "",
                        type: "ПОЯСНЕНИЕ",
                        group: "meaning",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 728,
                        startSelection: 651
                    },
                    {
                        id: 834,
                        tag: "",
                        type: "ПРИМЕР",
                        group: "meaning",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 940,
                        startSelection: 729
                    },
                    {
                        id: 871,
                        tag: "",
                        type: "Р.повтор",
                        group: "error",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 765,
                        startSelection: 757
                    },
                    {
                        id: 1301,
                        tag: "",
                        type: "Г.сказ",
                        group: "error",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 1171,
                        startSelection: 1162
                    },
                    {
                        id: 1331,
                        tag: "",
                        type: "Р.знач",
                        group: "error",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 1188,
                        startSelection: 1181
                    },
                    {
                        id: 1450,
                        tag: "",
                        type: "ОТНОШЕНИЕ",
                        group: "meaning",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 1460,
                        startSelection: 1287
                    },
                    {
                        id: 1912,
                        tag: "",
                        type: "Л.причслед",
                        group: "error",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 1790,
                        startSelection: 1735
                    },
                    {
                        id: 2087,
                        tag: "",
                        type: "Г.упр",
                        group: "error",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 1922,
                        startSelection: 1895
                    },
                    {
                        id: 2261,
                        tag: "",
                        type: "Г.эллипс",
                        group: "error",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 2074,
                        startSelection: 2059
                    },
                    {
                        id: 2643,
                        tag: "",
                        type: "Г.видовр",
                        group: "error",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 2445,
                        startSelection: 2428
                    },
                    {
                        id: 2786,
                        tag: "",
                        type: "Г.упр",
                        group: "error",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 2585,
                        startSelection: 2558
                    },
                    {
                        id: 322,
                        tag: "",
                        type: "Р.мест",
                        group: "error",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 255,
                        startSelection: 240
                    },
                    {
                        id: 487,
                        tag: "",
                        type: "Э.агресс",
                        group: "error",
                        comment: "",
                        subtype: "",
                        correction: "",
                        explanation: "",
                        endSelection: 14,
                        startSelection: 0
                    },
                    {
                        id: 889,
                        tag: "",
                        type: "ИСП",
                        group: "error",
                        comment: "",
                        subtype: "",
                        correction: "Исправление",
                        explanation: "",
                        endSelection: 155,
                        startSelection: 146
                    }
                ],
            },
        ],
    }
};
// let winExampleWithOutThird = {
//     essay: {
//         id: 'failExampleWithOutThirdID',
//         meta: {
//             theme: 'failExampleWithOutThird',
//             topic: 'topic',
//             class: 11,
//             year: 2020,
//             subject: 'rus',
//             test: 'test',
//             category: 'category',
//             expert: 'expert',
//             timeMarkup: 'timeMarkup',
//             timeSecondMarkup: 'timeSecondMarkup',
//         },
//         originalText: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.',
//         markups:
//             [
//                 {
//                     id: 'fail-id-1',
//                     isExpert: true,
//                     third: false,
//                     criteria: {
//                         K1: 2,
//                         K2: 1,
//                         K3: 3,
//                         K4: 1,
//                         K5: 2,
//                         K6: 3,
//                         K7: 4,
//                         K8: 3.5,
//                         K9: 2,
//                         K10: 1,
//                         K11: 1,
//                         K12: 1,
//                     },
//                     metrics: {
//                         M1: 50
//                     },
//                     selections:
//                         [
//                             {
//                                 id: 1,
//                                 startSelection: 50,
//                                 endSelection: 52,
//                                 code: 'О.теорсвязь',
//                                 comment: 'Комментарий1',
//                                 explanation: 'Пояснение1',
//                                 correction: 'Исправление1',
//                                 tag: 'tag1',
//                                 type: 'error',
//                                 subtype: 'error',
//                             },
//                             {
//                                 id: 2,
//                                 startSelection: 7,
//                                 endSelection: 20,
//                                 code: 'ПОНЯТИЕ',
//                                 comment: 'Комментарий2',
//                                 explanation: 'Пояснение2',
//                                 correction: 'Исправление2',
//                                 tag: 'tag2',
//                                 type: 'meaning',
//                                 subtype: 'error',
//                             },
//                         ],
//                 },
//                 {
//                     id: 'fail-id-2',
//                     isExpert: true,
//                     third: false,
//                     criteria: {
//                         K1: 2,
//                         K2: 1,
//                         K3: 3,
//                         K4: 1,
//                         K5: 2,
//                         K6: 3,
//                         K7: 4,
//                         K8: 3.5,
//                         K9: 2,
//                         K10: 1,
//                         K11: 1,
//                         K12: 1,
//                     },
//                     metrics: {
//                         M1: 50
//                     },
//                     selections:
//                         [
//                             {
//                                 id: 1,
//                                 startSelection: 30,
//                                 endSelection: 38,
//                                 code: 'О.теорсвязь',
//                                 comment: 'Комментарий1',
//                                 explanation: 'Пояснение1',
//                                 correction: 'Исправление1',
//                                 tag: 'tag1',
//                                 type: 'error',
//                                 subtype: 'error',
//                             },
//                             {
//                                 id: 2,
//                                 startSelection: 17,
//                                 endSelection: 65,
//                                 code: 'ПОНЯТИЕ',
//                                 comment: 'Комментарий2',
//                                 explanation: 'Пояснение2',
//                                 correction: 'Исправление2',
//                                 tag: 'tag2',
//                                 type: 'meaning',
//                                 subtype: 'error',
//                             },
//                             {
//                                 id: 3,
//                                 startSelection: 65,
//                                 endSelection: 70,
//                                 code: 'ОТНОШЕНИЕ',
//                                 comment: 'Комментарий3',
//                                 explanation: 'Пояснение3',
//                                 correction: 'Исправление3',
//                                 tag: 'tag3',
//                                 type: 'meaning',
//                                 subtype: 'error',
//                             },
//                         ],
//                 },
//                 {
//                     id: 'fail-id-3',
//                     isExpert: false,
//                     third: false,
//                     criteria: {
//                         K1: 2,
//                         K2: 1,
//                         K3: 3,
//                         K4: 1,
//                         K5: 2,
//                         K6: 3,
//                         K7: 4,
//                         K8: 3.5,
//                         K9: 2,
//                         K10: 1,
//                         K11: 1,
//                         K12: 1,
//                     },
//                     metrics: {
//                         M1: 50
//                     },
//                     selections:
//                         [
//                             {
//                                 id: 1,
//                                 startSelection: 30,
//                                 endSelection: 38,
//                                 code: 'О.теорсвязь',
//                                 comment: 'Комментарий1',
//                                 explanation: 'Пояснение1',
//                                 correction: 'Исправление1',
//                                 tag: 'tag1',
//                                 type: 'error',
//                                 subtype: 'error',
//                             },
//                             {
//                                 id: 2,
//                                 startSelection: 17,
//                                 endSelection: 65,
//                                 code: 'ПОНЯТИЕ',
//                                 comment: 'Комментарий2',
//                                 explanation: 'Пояснение2',
//                                 correction: 'Исправление2',
//                                 tag: 'tag2',
//                                 type: 'meaning',
//                                 subtype: 'error',
//                             },
//                             {
//                                 id: 3,
//                                 startSelection: 65,
//                                 endSelection: 70,
//                                 code: 'ОТНОШЕНИЕ',
//                                 comment: 'Комментарий3',
//                                 explanation: 'Пояснение3',
//                                 correction: 'Исправление3',
//                                 tag: 'tag3',
//                                 type: 'meaning',
//                                 subtype: 'error',
//                             },
//                         ],
//                 },
//             ],
//     }
// }
// var _ = require('lodash');
// let n = _.groupBy(x.essay.markups[0].selections, 'tag')
// console.log(n);
var p = new MetricService_1.MetricService().calculate(failExampleWithOutThird);
console.log(JSON.stringify(p, null, 2));
// const z = (min: number, max: number) => Array.apply(null, {length: max + 1 - min}).map((item, key) => key + min)
// var foo = [];
//
// function z(min: number, max: number) {
//     let arrCoords = [];
//     for (var i = min; i <= max; i++) {
//         arrCoords.push(i);
//     }
//
//     return arrCoords
// }
//
//
//
// let y = z(51, 55);
// console.log(y);
// let rus1 = [{start: 60, end: 77, determFactor: 'ПРОБЛЕМА'}, {start: 248, end: 251, determFactor: 'Р.мест'}, {start: 277, end: 285, determFactor: 'Г.упр'},{start: 307, end: 311, determFactor: 'Р.мест'}, {start: 398, end: 506, determFactor: 'ПОЯСНЕНИЕ'}, {start: 507, end: 619, determFactor: 'ПРИМЕР'}, {start: 620, end: 627, determFactor: 'Р.лишн'}, {start: 622, end: 627, determFactor: 'СВЯЗЬ'}, {start: 651, end: 728, determFactor: 'ПОЯСНЕНИЕ'}, {start: 729, end: 940, determFactor: 'ПРИМЕР'}, {start: 757, end: 765, determFactor: 'Р.повтор'}, {start: 994, end: 1226, determFactor: 'ПОЗИЦИЯ'}, {start: 1162, end: 1171, determFactor: 'Г.сказ'}, {start: 1181, end: 1188, determFactor: 'Р.знач'}, {start: 1287, end: 1460, determFactor: 'ОТНОШЕНИЕ'}, {start: 1735, end: 1790, determFactor: 'Л.причслед'}, {start: 1895, end: 1922, determFactor: 'Г.упр'}, {start: 2059, end: 2074, determFactor: 'Г.эллипс'}, {start: 2428, end: 2445, determFactor: 'Г.видовр'}, {start: 2558, end: 2585, determFactor: 'Г.упр'}]
//
// let rus2 = [{start: 60, end: 77, determFactor: 'ПРОБЛЕМА'}, {start: 248, end: 251, determFactor: 'Р.мест'}, {start: 277, end: 285, determFactor: 'Г.упр'},{start: 307, end: 311, determFactor: 'Р.мест'}, {start: 398, end: 506, determFactor: 'ПОЯСНЕНИЕ'}, {start: 507, end: 619, determFactor: 'ПРИМЕР'}, {start: 620, end: 627, determFactor: 'Р.лишн'}, {start: 622, end: 627, determFactor: 'СВЯЗЬ'}, {start: 651, end: 728, determFactor: 'ПОЯСНЕНИЕ'}, {start: 729, end: 940, determFactor: 'ПРИМЕР'}, {start: 757, end: 765, determFactor: 'Р.повтор'}, {start: 994, end: 1226, determFactor: 'ПОЗИЦИЯ'}, {start: 1162, end: 1171, determFactor: 'Г.сказ'}, {start: 1181, end: 1188, determFactor: 'Р.знач'}, {start: 1287, end: 1460, determFactor: 'ОТНОШЕНИЕ'}, {start: 1735, end: 1790, determFactor: 'Л.причслед'}, {start: 1895, end: 1922, determFactor: 'Г.упр'}, {start: 2059, end: 2074, determFactor: 'Г.эллипс'}, {start: 2428, end: 2445, determFactor: 'Г.видовр'}, {start: 2558, end: 2585, determFactor: 'Г.упр'}, {start: 0, end: 14, determFactor: 'Э.агресс'}, {start: 146, end: 155, determFactor: 'ИСП'}]
//
// let o1 = [{start: 1, end: 15, determFactor: 'A'}, {start: 20, end: 27, determFactor: 'B'}, {start: 30, end: 45, determFactor: 'C'}]
// let o2 = [{start: 1, end: 10, determFactor: 'A'}, {start: 20, end: 25, determFactor: 'B'}, {start: 33, end: 40, determFactor: 'C'}, {start: 40, end: 45, determFactor: 'D'}]
//
//
//
//
//
//
//
// // let m = new MathMachine(
// //     [{start: 1, end: 15, determFactor: 'A'}, {start: 20, end: 27, determFactor: 'B'}, {start: 30, end: 45, determFactor: 'C'}],
// //     [{start: 1, end: 10, determFactor: 'A'}, {start: 20, end: 25, determFactor: 'B'}, {start: 33, end: 40, determFactor: 'C'}, {start: 40, end: 45, determFactor: 'D'}]);
//
// let m = new MathMachine(
//     rus1,
//     rus2);
// m.calcJaccardMatrix()
// m.calcLossMatrix()
// console.log(m.jaccardMatrix);
// console.log(m.lossMatrix);
//
// var arr: Array<number[]>  =[];
// for(let g = 0; g < m.jaccardMatrix.length + 1; g++){
//     arr[g]=[];
//     for(var v=0; v<m.jaccardMatrix[0].length + 1;v++){
//         //@ts-ignore
//         arr[g][v] = 0
//     }
// }
//
// let M = arr
// let Mmin = arr
//
// //Взять вместо М - матрицу жаккара для более точного расчёта
// let Qm = M.length + M[0].length
// let connComponents = arr
//
// let connLine = []
// let mLine: any = []
// let mLineTruth: any = []
//
//
// let Q = 0
// let Qold = 0
// let sumToQ = 0
//
// let x0 = 0
// let y0 = 0
//
// let xPrep = []
// let yPrep = []
//
// let xEmp = 0
// let yEmp = 0
//
// let xSmejh = 0
// let ySmejh = 0
//
// let index = 0
// //пре-заполняем M элементами из Loss, которые равны 0
// for (let z in m.lossMatrix) {
//     for (let x in m.lossMatrix[z]) {
//         if (m.lossMatrix[z][x] === 0) {
//             mLineTruth.push({row: z, col: x})
//             M[z][x] = m.lossMatrix[z][x]
//         }
//     }
// }
//
// //Определяем компоненты связности
// for (let z in m.jaccardMatrix) {
//     for (let x in m.jaccardMatrix[z]) {
//         if (m.jaccardMatrix[z][x] !== 1) {
//             connLine.push({row: z, col: x})
//
//             connComponents[z][x] = m.jaccardMatrix[z][x]
//         }
//     }
// }
//
//
// let i = 0
// for (let p in connLine) {
//     if (i === 0) {
//          // xSmejh = +connLine[p].row
//          // ySmejh = +connLine[p].col
//     }
//
//         //перебрать паросочетания
//         if (xSmejh !== +connLine[p].row && ySmejh !== +connLine[p].col || i === 0) {
//             index = mLine.push(connLine[p])
//             console.log('cur object - ' + connLine[p]);
//
//             //посчитаем неучтенные вершины в долях графа по x и по y
//             for (let k in mLine) {
//                 xPrep.push(mLine[k].row)
//                 yPrep.push(mLine[k].col)
//             }
//
//             x0 = new Set(xPrep).size;
//             y0 = new Set(yPrep).size;
//             //-----------//
//
//             //считаем L(i,k)
//             console.log(mLine);
//             sumToQ = 0
//             for (let k in mLine) {
//                 // console.log(mLine[k]);
//                 xEmp = m.lossMatrix.length - x0
//                 yEmp = m.lossMatrix[0].length - y0
//                 sumToQ += m.lossMatrix[mLine[k].row][mLine[k].col]
//                 console.log(mLine[k].row + '-------- ' + mLine[k].col);
//
//             }
//             Q = sumToQ + xEmp + yEmp
//
//             if (Q < Qm) {
//                 Qm = Q
//                 mLineTruth.push(connLine[p])
//             } else {
//                 delete mLine.index
//             }
//
//
//
//             console.log(Qm);
//         }
//
//         xSmejh = +connLine[p].row
//         ySmejh = +connLine[p].col
//
//     i++
// }
//
// //посчитаем долю совпавших
// let count = []
// for (let t in mLineTruth) {
//     count.push(mLineTruth[t].row)
// }
// let countUniq = new Set(count).size;
// let result = countUniq / m.lossMatrix[0].length
//
//
//
//
// console.log(mLineTruth);
// console.log(result);
