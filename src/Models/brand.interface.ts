import type {PersonProperties} from "./person.interface";
import type {BrandRequestProperties} from "./brand-request.interface";
import type {TitleBrandProperties} from "./title-brand.interface";
import type {PhoneticSearchProperties} from "./phonetic.interface";

interface BrandComposition {
    nameBrand: string;
}

interface BrandOptional {
    logoUrl: string;
    denomination: string;
    responsible: string;
    
    createAt: Date | null;
    titleBrand: TitleBrandProperties;
    phoneticSearchData: PhoneticSearchProperties;
    legalRepresentative: PersonProperties;
    applicant: PersonProperties;
    brandRequest: BrandRequestProperties;
}

type BrandProperties = BrandComposition & Partial<BrandOptional>;

export type {BrandProperties}