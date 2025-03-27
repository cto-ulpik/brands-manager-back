const mongoose = require('mongoose');

const BrandSchema = {
    phoneticSearchData: {
      state: String,
      deliveryDate: String,
      startDate: String,
      notes: String,
      order: String,
      probability: String,
      resultsUrl: String,
    },
    legalRepresentative: {
      lastName: String,
      dni: String,
      address: String,
      names: String,
      notes: String,
      phone: String,
    },
    applicant: {
      lastName: String,
      dni: String,
      address: String,
      names: String,
      notes: String,
      phone: String,
    },
    brandRequest: {
        class: String,
        state: String,
        requestState: String,
        startDate: String,
        nature: String,
        notes: String,
        requestNumber: String,
        order: String,
      },
      logoUrl: String,
      createAt: { type: Date, default: Date.now },
      denomination: String,
      nameBrand: { type: String, default: "mi marca" },
      responsible: String,

      aprobadaMarca: {
        estado: String,
        fechaEntregaTitulo: String,
        fechaResolucion: String,
        fechaVencimiento: String,
        notas: String,
        numeroGaceta: String,
        numeroresolucion: String,
        tituloEntregado: String
      },

    };

const BrandModel = mongoose.model('brands', BrandSchema);

export {BrandSchema, BrandModel}