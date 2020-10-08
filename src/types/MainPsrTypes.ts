export type EnterGlobalObject = {
    essay: {
        id: string;
        meta: {
            theme: string;
            subject: string;
            [key: string]: string | number;
        };
        text: string;
        markups: {
            id: string;
            isExpert: boolean;
            third: boolean;
            criteria: {
                [key: string]: number;
            };
            selections: {
                id: number;
                tag: string;
                type: string;
                group: any;
                comment: string;
                subtype: string;
                correction: string;
                explanation: string;
                startSelection: number;
                endSelection: number;
            }[];
            metrics: {
                [key: string]: number;
            };
        }[];
    };
};

export type Selections = {
    id: number;
    tag: string;
    type: string;
    group: any;
    comment: string;
    subtype: string;
    correction: string;
    explanation: string;
    startSelection: number;
    endSelection: number;
}[];

export type ParticipateInPsrObj = {
    id: string;
    isExpert: boolean;
    third: boolean;
    criteria: {
        [key: string]: number;
    };
    selections: {
        id: number;
        tag: string;
        type: string;
        group: any;
        comment: string;
        subtype: string;
        correction: string;
        explanation: string;
        startSelection: number;
        endSelection: number;
    }[];
    metrics: {
        [key: string]: number;
    };
};

export type ReturnObject = {
    markups: [
        {
            id: string;
            matching: {
                third: boolean;
                markupId: string;
                metrics: {
                    M1: number;
                    M2: number;
                    M3: number;
                    M4: number;
                    M5: number;
                    M6: number;
                    M7: number;
                    MTotal: number;
                };
            }[];
            STAR: number;
            STER: number;
            OTAR: number;
        }
    ];
};

export type IterationPsrResult = {
    markupId: string;
    third: boolean;
    metrics: {
        M1: number;
        M2: number;
        M3: number;
        M4: number;
        M5: number;
        M6: number;
        M7: number;
        MTotal: number;
    };
    STAR: number;
    STER: number;
};

export type MetaInPsr = {
    theme: string;
    subject: string;
    [key: string]: string | number;
};

export type MetricObj = {
    M1: number;
    M2: number;
    M3: number;
    M4: number;
    M5: number;
    M6: number;
    M7: number;
};

export type MetricEnum = number;

export type LotsOf = {
    start: number;
    end: number;
    determFactor: string;
}[];
