"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log(123);
var a = [1, 2, 3, 4, 5];
var x = {
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
        markups: [
            {
                id: 'qwe',
                isExpert: true,
                criterions: {
                    K1: 2,
                    K2: 1,
                    K3: 0
                },
                metrics: {
                    M1: 50
                },
                selections: [
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
                id: 'qwe',
                isExpert: true,
                criterions: {
                    K1: 2,
                    K2: 2,
                    K3: 3
                },
                metrics: {
                    M1: 50
                },
                selections: [
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
};
var y = require('./mistakes/mistakes.json');
console.log(y);
// new MetricService().calculate(x)
var z = [
    {
        subtypes: [
            {
                name: 'qwe',
                komm: 'zzz'
            },
            {
                name: 'qwe1',
                komm: 'zzz1'
            }
        ]
    },
    {
        subtypes: [
            {
                name: 'qwe2',
                komm: 'zzz3'
            },
            {
                name: 'qwe3',
                komm: 'zzz3'
            }
        ]
    }
];
for (var i in z) {
    for (var j in z[i].subtypes) {
        if (z[i].subtypes[j].komm === 'zzz3') {
            console.log(123);
        }
    }
}
// for (let i in x.essay.markUp) {
//     console.log('сейчас ключ  =-' + i);
//     for (let j in x.essay.markUp) {
//         if (i !== j) {
//
//             console.log('и я работаю с ключами ---  ' + j);
//         }
//     }
// }
