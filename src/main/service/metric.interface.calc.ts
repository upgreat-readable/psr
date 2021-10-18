export interface MetricInterfaceCalc {
    setM1(xCriteria: any, yCriteria: any, subject: any): void;
    setM2(xSelections: any, ySelections: any): void;
    setM3(xSelections: any, ySelections: any): void;
    setM4(xSelections: any, ySelections: any): void;
    setM5(xSelections: any, ySelections: any, text: string): void;
    setM6(xSelections: any, ySelections: any): void;
    setM7(xSelections: any, ySelections: any): void;

    exportMs(): any;
}

export abstract class MetricCalc implements MetricInterfaceCalc {
    get m7(): number {
        return this._m7;
    }

    set m7(value: number) {
        this._m7 = value;
    }
    get m6(): number {
        return this._m6;
    }

    set m6(value: number) {
        this._m6 = value;
    }
    get m5(): number {
        return this._m5;
    }

    set m5(value: number) {
        this._m5 = value;
    }
    get m4(): number {
        return this._m4;
    }

    set m4(value: number) {
        this._m4 = value;
    }
    get m3(): number {
        return this._m3;
    }

    set m3(value: number) {
        this._m3 = value;
    }
    get m2(): number {
        return this._m2;
    }
    set m2(value: number) {
        this._m2 = value;
    }
    get m1(): number {
        return this._m1;
    }

    set m1(value: number) {
        this._m1 = value;
    }
    public _m1: number = 0;
    public _m2: number = 0;
    public _m3: number = 0;
    public _m4: number = 0;
    public _m5: number = 0;
    public _m6: number = 0;
    public _m7: number = 0;

    exportMs(): any {}

    setM1(xCriteria: any, yCriteria: any, subject: any) {}

    setM2(xSelections: any, ySelections: any) {}

    setM3(xSelections: any, ySelections: any) {}

    setM4(xSelections: any, ySelections: any) {}

    setM5(xSelections: any, ySelections: any, text: string) {}

    setM6(xSelections: any, ySelections: any) {}

    setM7(xSelections: any, ySelections: any) {}

    // calcMatching(xSelections: any, ySelections: any) {
    //
    // }
}
