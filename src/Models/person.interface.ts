interface PersonOptional {
    lastName: string;
    address: string;
    dni: string;
    names: string;
    notes: string;
    phone: string;
}

type PersonProperties = Partial<PersonOptional>;

export type {PersonProperties}