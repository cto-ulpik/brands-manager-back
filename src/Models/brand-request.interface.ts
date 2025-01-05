interface BrandRequestOptional {
    class: string;
    state: string;
    requestState: string;
    startDate: Date;
    nature: string;
    notes: string;
    requestNumber: string;
    order: string;
}

type BrandRequestProperties = Partial<BrandRequestOptional>;
export type {BrandRequestProperties}