"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log(123);
var a = [1, 2, 3, 4, 5];
var x = {
    essay: {
        meta: {
            topic: 'topic',
            class: 11,
            year: 2020,
            subject: 'subject',
            test: 'test',
            category: 'category',
            expert: 'expert',
            timeMarkup: 'timeMarkup',
            timeSecondMarkup: 'timeSecondMarkup',
        },
        markUp: [
            {
                id: 1,
                isExpert: true,
                criterions: {
                    'K1': 312,
                    'K2': 312,
                    'K3': 312
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
                    },
                ],
            },
            {
                id: 2,
                isExpert: true,
                criterions: {
                    'K1': 312,
                    'K2': 312,
                    'K3': 312
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
                    },
                ],
            },
        ]
    }
};
// new MetricService().calculate(x)
for (var i in x.essay.markUp) {
    console.log('сейчас ключ  =-' + i);
    for (var j in x.essay.markUp) {
        if (i !== j) {
            console.log('и я работаю с ключами ---  ' + j);
        }
    }
}
