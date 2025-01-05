import { BrandSchema, BrandModel } from "../schema/brand.schema";

const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

/**
 * Esta función busca una marca en la base de datos
 * @param idBrand ID de la marca a buscar
 * @returns Devolver toda la información de la marca
 */
async function findBrand(idBrand:string){
    try {
        await mongoose.connect(uri, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        let brand = await  BrandModel.findOne({_id:idBrand})
        // console.log(brand);
        return brand
      } finally {
        await mongoose.disconnect();
      }
}

export default findBrand;