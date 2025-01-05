interface PhoneticSearchComposition {
    state: string;
}

interface PhoneticSearchOptional {
    deliveryDate: Date | null;
    startDate: Date | null;
    notes: string;
    order: string;
    probability: string;
    resultsUrl: string;
}

type PhoneticSearchProperties = PhoneticSearchComposition & Partial<PhoneticSearchOptional>;

export type { PhoneticSearchProperties }