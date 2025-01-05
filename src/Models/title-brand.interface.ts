interface TitleBrandComposition {
    state: string;
}

interface TitleBrandOptional {
    deliveryDate: Date | null;
    resolutionDate: Date | null;
    expirationDate: Date | null;
    gazetteNumber: number;
    resolutionNumber: string;
    titleDelivered: string;
    notes: string;
}

type TitleBrandProperties = TitleBrandComposition & Partial<TitleBrandOptional>;

export type { TitleBrandProperties }