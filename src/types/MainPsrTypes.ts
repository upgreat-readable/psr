export type EnterGlobalObject = {
    essay: {
        id: string
        meta: {
            theme: string,
            subject: string,
            [key: string]: string | number
        },
        originalText: string,
        markups:
            {
                id: string
                isExpert: boolean
                criterions: {
                    [key: string]: number
                }
                selections:
                    {
                        id: number,
                        startSelection: number,
                        endSelection: number,
                        code: string,
                        comment: string,
                        explanation: string,
                        correction: string,
                        tag: string,
                        type: string,
                        subtype: string
                    }[],
                metrics: {
                    [key: string]: number
                }
            }[]
    }
}

export type ParticipateInPsrObj = {
    id: string
    isExpert: boolean
    criterions: {
        [key: string]: number
    }
    selections:
        {
            id: number,
            startSelection: number,
            endSelection: number,
            code: string,
            comment: string,
            explanation: string,
            correction: string,
            tag: string,
            type: string,
            subtype: string
        }[],
    metrics: {
        [key: string]: number
    }
}

export type ReturnObject = {
    markups: [
        {
            id: string,
            matching: [
                {
                    markupId: string,
                    metrics: {
                        M1: number,
                        M2: number,
                        M3: number,
                        M4: number,
                        M5: number,
                        M6: number,
                        M7: number
                    },
                    STAR: number,
                    CTER: number
                }
            ]
        }
    ]
}

export type IterationPsrResult = {
    markupId: string,
    metrics: {
        M1: number,
        M2: number,
        M3: number,
        M4: number,
        M5: number,
        M6: number,
        M7: number
    },
    STAR: number,
    CTER: number
}

export type MetaInPsr = {
    theme: string,
    subject: string,
    [key: string]: string | number
}


export type MetricEnum = number
