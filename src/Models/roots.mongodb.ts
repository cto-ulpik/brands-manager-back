import type { PhoneticSearchProperties } from './phonetic.interface';
import type { TitleBrandProperties } from './title-brand.interface';
import type { PersonProperties } from './person.interface';
import type { BrandRequestProperties } from './brand-request.interface';
import type { BrandProperties } from './brand.interface';
import type { AprobadaMarcaProperties } from './aprobadaMarca.interface';

const mongoose = require('mongoose');


class PhonethicSearchData {
    public state: string = "";
    public deliveryDate: Date | string = "";
    public startDate: Date | string = "";
    public notes: string = "";
    public order: string = "";
    public probability: string = "";
    public resultsUrl: string = "";

    constructor(props: PhoneticSearchProperties){
        this.state = props.state;
    }
}

class TitleBrand {
    public state: string = "";
    public deliveryDate: Date | null = new Date();
    public resolutionDate: Date | null = new Date();
    public expirationDate: Date | null = new Date();
    public notes: string = "";
    public gazetteNumber: string = "";
    public resolutionNumber: string = "";
    public titleDelivered: string = "";

    constructor(props: TitleBrandProperties){
        this.state = props.state;
    }
}

class Person {
    public lastName: string = "";
    public dni: string = "";
    public address: string = "";
    public names: string = "";
    public notes: string = "";
    public phone: string = "";

    constructor(props: PersonProperties){
        
    }
}

// class LegalRepresentative extends Person {
//     constructor(props: PersonProperties){
//         super(props);
//     }
// }

class Applicant extends Person {
    constructor(props: PersonProperties){
        super(props);
    }
}

class BrandRequest {
    public class: string="";
    public state: string="";
    public requestState: string="";
    public startDate: string="";
    public nature: string="";
    public notes: string="";
    public requestNumber: string="";
    public order: string="";

    constructor(props: BrandRequestProperties){
    }

}

class AprobadaMarca {
    public estado: string = "false";
    public fechaEntregaTitulo: string = "";
    public fechaResolucion: string = "";
    public fechaVencimiento: string = "";
    public notas: string = "";
    public numeroGaceta: string = "";
    public numeroresolucion: string = "";
    public tituloEntregado: string = "";

    constructor(props: AprobadaMarcaProperties){}
}

class Brand {
    public phoneticSearchData: PhonethicSearchData = new PhonethicSearchData({state:""});
    public applicant: Applicant = new Applicant({});
    public brandRequest: BrandRequest = new BrandRequest({});
    public aprobadaMarca: AprobadaMarca = new AprobadaMarca({});

    public logoUrl: string = "";
    public createAt: Date = new Date();
    public denomination: string = "";
    public nameBrand: string = "";
    public responsible: string = "";

    constructor(props: BrandProperties){
        Object.assign(this, props);
    }
}

export {Brand};