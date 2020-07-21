import {MetricService} from "./MetricService";

console.log(123);
let a = [1, 2, 3, 4, 5]

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

// const y = require('./mistakes/mistakes.json')
// console.log(y);



// x.essay.markups

// var _ = require('lodash');
// let n = _.groupBy(x.essay.markups[0].selections, 'tag')
// console.log(n);





let p = new MetricService().calculate(x)
//@ts-ignore
console.log(p.markups[0].matching);
//@ts-ignore
console.log(p.markups[1].matching);
//@ts-ignore
console.log(p.markups[2].matching);


// let z = [
//     {
//         subtypes: [
//             {
//                 name: 'qwe',
//                 komm: 'zzz'
//             },
//             {
//                 name: 'qwe1',
//                 komm: 'zzz1'
//             }
//         ]
//     },
//     {
//         subtypes: [
//             {
//                 name: 'qwe2',
//                 komm: 'zzz3'
//             },
//             {
//                 name: 'qwe3',
//                 komm: 'zzz3'
//             }
//         ]
//     }
// ]
//
// for (let i in z) {
//     for (let j in z[i].subtypes) {
//         if (z[i].subtypes[j].komm === 'zzz3') {
//             console.log(123);
//         }
//     }
// }


// for (let i in x.essay.markUp) {
//     console.log('сейчас ключ  =-' + i);
//     for (let j in x.essay.markUp) {
//         if (i !== j) {
//
//             console.log('и я работаю с ключами ---  ' + j);
//         }
//     }
// }
