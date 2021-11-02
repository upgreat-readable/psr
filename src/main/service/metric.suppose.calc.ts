import { MetricCalc, MetricInterfaceCalc } from './metric.interface.calc';
import { K_MAX } from '../../constants';
import { MathMachine } from '../MathMachine';

/**
 * Класс нового ТР и новой трактовки в том числе
 */
export class MetricSupposeCalc extends MetricCalc {
    exportMs(): any {}

    setM1(
        xCriteria: {
            [key: string]: number;
        },
        yCriteria: {
            [key: string]: number;
        },
        subject: string
    ) {
        if (!xCriteria || !xCriteria) {
            throw new Error('В разметках не заполнены критерии.');
        }

        let K1Sum = Object.values(xCriteria).reduce((a, b) => a + b, 0);
        let K2Sum = Object.values(yCriteria).reduce((a, b) => a + b, 0);

        if (!K_MAX.hasOwnProperty(subject)) {
            throw new Error('Получен несуществующий код предмета.');
        }

        if (K_MAX[subject] < K1Sum || K_MAX[subject] < K2Sum) {
            throw new Error('Вычисленная сумма критериев больше максимального значения');
        }

        this.m1 = 1 - Math.abs(K1Sum - K2Sum) / K_MAX[subject];
    }

    setM2(xSelections: any, ySelections: any) {
        // console.log('M2 -- ');
        const res3 = new MathMachine(
            xSelections,
            ySelections,
            true,
            'type',
            'type'
            // true
        ).complexSearchMatchedCount();

        // console.log('M2 -- --');
        // console.log(res3.length);

        const countSelections = xSelections.length + ySelections.length;
        const doubleD = 2 * res3;

        this.m2 = doubleD / countSelections;
    }

    setM3(xSelections: any, ySelections: any) {
        const matchingWithType = new MathMachine(
            xSelections,
            ySelections,
            true,
            'type',
            'type'
        ).complexSearchDetailSelections();

        let countMatch = 0;
        const mds = matchingWithType.getMatchedDetailSelections();
        // console.log(mds);
        for (let p in mds) {
            if (mds[p][0]['metricFactor'] === mds[p][1]['metricFactor']) {
                // console.log(mds[p]);
                countMatch++;
            }
        }

        // this.m3 = (this.m2 * countMatch) / matchingWithType.getMatchedFragmentsCount();
        this.m3 = countMatch / matchingWithType.getMatchedFragmentsCount();
        if (matchingWithType.getMatchedFragmentsCount() == 0) {
            this.m3 = 0;
        }
    }

    setM4(xSelections: any, ySelections: any) {
        const matchingWithSubType = new MathMachine(
            xSelections,
            ySelections,
            true,
            'type',
            'subtype'
        ).complexSearchDetailSelections();

        let countMatch = 0;
        const mds = matchingWithSubType.getMatchedDetailSelections();
        for (let p in mds) {
            if (mds[p][0]['metricFactor'] === mds[p][1]['metricFactor']) {
                countMatch++;
            }
        }

        // this.m4 = (+this.m2.toFixed(2) * countMatch) / matchingWithSubType.getMatchedFragmentsCount();
        this.m4 = countMatch / matchingWithSubType.getMatchedFragmentsCount();

        if (matchingWithSubType.getMatchedFragmentsCount() == 0) {
            this.m4 = 0;
        }
    }

    setM5(xSelections: any, ySelections: any, text: string) {
        const matchingWithSubType = new MathMachine(
            xSelections,
            ySelections,
            true,
            'type',
            'subtype'
        ).complexSearchDetailSelections();

        let ar = [];
        const mds = matchingWithSubType.getMatchedDetailSelections();
        for (let y in mds) {
            ar.push([
                {
                    row0: mds[y][0].start,
                    col0: mds[y][0].end,
                    determFactor0: mds[y][0].determFactor,
                    text0: text.substring(mds[y][0].start, mds[y][0].end),
                },
                {
                    row1: mds[y][1].start,
                    col1: mds[y][1].end,
                    determFactor1: mds[y][1].determFactor,
                    text1: text.substring(mds[y][1].start, mds[y][1].end),
                },
            ]);
        }

        // console.log(ar);

        let countMatch = 0;
        // @ts-ignore
        let p: any = [];
        for (const msdParasochetanie in mds) {
            // @ts-ignore
            p[msdParasochetanie] = this.calcCrossNDivergence(
                mds[msdParasochetanie][0].start,
                mds[msdParasochetanie][0].end,
                mds[msdParasochetanie][1].start,
                mds[msdParasochetanie][1].end
            );
        }

        let relationSumm = 0;

        for (let crossDivergElem in p) {
            const minCross = Math.min(...p[crossDivergElem].cross);
            const maxCross = Math.max(...p[crossDivergElem].cross);
            const crossWordsCount = this.countWords(text.substring(minCross, maxCross));

            const minDivergence = Math.min(...p[crossDivergElem].divergence);
            const maxDivergence = Math.max(...p[crossDivergElem].divergence);
            const divergenceWordsCount = this.countWords(
                text.substring(minDivergence, maxDivergence)
            );
            // console.log(divergenceWordsCount)
            if (divergenceWordsCount === 0 || crossWordsCount === 0) {
                relationSumm += 0;
            } else {
                relationSumm += crossWordsCount / divergenceWordsCount;
            }
        }

        const d = matchingWithSubType.getMatchedDetailSelections();
        // console.log(relationSumm)

        // this.m5 =  (+this.m2 * +relationSumm) / d.length;
        this.m5 = +relationSumm / d.length;

        if (matchingWithSubType.getMatchedFragmentsCount() == 0) {
            this.m5 = 0;
        }
    }

    setM6(xSelections: any, ySelections: any) {
        const matchingWithCorrection = new MathMachine(
            xSelections,
            ySelections,
            true,
            'type',
            'correction'
        ).complexSearchDetailSelections();

        let countMatch = 0;
        const mds = matchingWithCorrection.getMatchedDetailSelections();
        for (let p in mds) {
            if (mds[p][0]['metricFactor'] === mds[p][1]['metricFactor']) {
                countMatch++;
            }
        }

        // this.m6 = (this.m2 * countMatch) / matchingWithCorrection.getMatchedFragmentsCount();
        this.m6 = countMatch / matchingWithCorrection.getMatchedFragmentsCount();

        if (matchingWithCorrection.getMatchedFragmentsCount() == 0) {
            this.m6 = 0;
        }
    }

    setM7() {}

    countWords(ortext: string): number {
        let text = ortext.replace(/\n/g, ' ');
        let newArray = text.split(' '),
            i,
            j;
        for (i = 0, j = 0; i < newArray.length; i++) {
            if (['.', ',', ':', ';', '-', '–', '?', '!', '_', ' '].includes(newArray[i])) {
                continue;
            }
            j++;
        }
        return j;
    }

    calcCrossNDivergence(xBegin: number, xEnd: number, yBegin: number, yEnd: number) {
        let nX = this.implodeNumRange(xBegin, xEnd);
        let nY = this.implodeNumRange(yBegin, yEnd);
        return {
            cross: nX.filter(x => nY.includes(x)),
            divergence: [...new Set<number>([...nX, ...nY])],
        };
    }

    implodeNumRange(min: number, max: number) {
        let arrCoords = [];
        for (var i = min; i <= max; i++) {
            arrCoords.push(i);
        }

        return arrCoords;
    }
}
