import { MetricCalc, MetricInterfaceCalc } from './metric.interface.calc';
import { K_MAX } from '../../constants';
import { MathMachine } from '../MathMachine';

export class MetricMainCalc extends MetricCalc {
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
        const res1 = new MathMachine(
            xSelections,
            ySelections,
            true,
            'type',
            'type'
        ).complexSearchMatchedFragments();
        const res2 = new MathMachine(
            ySelections,
            xSelections,
            true,
            'type',
            'type'
        ).complexSearchMatchedFragments();

        // this.F1 = (2 / (1 / res1 + 1 / res2));
        this.m2 = 2 / (1 / res1 + 1 / res2);
    }

    setM3(xSelections: any, ySelections: any) {}

    setM4(xSelections: any, ySelections: any) {}

    setM5(xSelections: any, ySelections: any) {}

    setM6(xSelections: any, ySelections: any) {}

    setM7(xSelections: any, ySelections: any) {}
}
