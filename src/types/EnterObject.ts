export type EnterObject = {
    essay: {
        metas: {
            [key: string]: string
        },
        markUp: [
            {
                id: number
                isExpert: boolean
                criterions: {
                    [key: string]: number
                }
                selections: [
                    {
                        [key: string]: string
                    }
                ]
            }
        ]
    }
}

export type ReturnObject = {
    metrics: {
        markUpId: number
        enum: {
            M1: number
            M2: number
            M3: number
            M4: number
            M5: number
            M6: number
            M7: number
        },
    }
}

export type MetricEnum = number
