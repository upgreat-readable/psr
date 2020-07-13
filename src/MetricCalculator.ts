import {IMetricCalculator} from "./interfaces/IMetricCalculator";
import {EnterObject, ReturnObject} from "./types/EnterObject";

export class MetricCalculator implements IMetricCalculator{
    //вычисляемая разметка
    X: EnterObject
    //эталонная разметка
    Y: EnterObject

    constructor(calcTerm: EnterObject, ethalonTerm: EnterObject) {
        this.X = calcTerm
        this.Y = ethalonTerm
    }
}
