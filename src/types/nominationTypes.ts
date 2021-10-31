export type nominationReturnObject = {
    markup: {
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
        isExp: boolean | undefined;
        STAR: number;
    };
    essayId: string;
    type: string;
}[];
