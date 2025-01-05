import { BrandSchema, BrandModel } from "../schema/brand.schema";

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const uri = process.env.MONGODB_URI;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

/**
 * Get all brands with all parameters
 * @returns List of brands
 */
export default async function getBrands(){
    try {
        await mongoose.connect(uri, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        const brands = await BrandModel.find();
        return brands
      } finally {
        await mongoose.disconnect();
      }
}

/**
 * Get all brands with this scheme {id, nameBrand, idImage, createAt}
 * @returns List of essential brands with {id, nameBrand, idImage, createAt}
 */
export async function getEssentialBrands(){
    try {
        await mongoose.connect(uri, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        const brands = await BrandModel.find();
        brands.filter((brand:any)=>{
          return {
            id: brand._id,
            nameBrand: brand.nameBrand,
            idImage: brand.logoUrl,
            createAt: brand.createAt
          }
        });
        
        return brands.map((brand:any )=>{
          return {
            id: brand._id,
            nameBrand: brand.nameBrand,
            idImage: brand.logoUrl,
            createAt: brand.createAt,
            responsible: brand.responsible
          }
        })
        // return brands
      } finally {
        await mongoose.disconnect();
      }
}



const schemaBrand = new mongoose.Schema(BrandSchema);
schemaBrand.plugin(mongoosePaginate);
const modelBrand = mongoose.model('Brand', schemaBrand);

/**
 * Pagination of brands with 10 brands per page
 * @returns List of brands with 10 brands per page
 */
export async function paginationBrands(props:{numberPage:String}){
    const numberPage = Number(props.numberPage);
    try {
        await mongoose.connect(uri, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        
        

        const options = {
            page: numberPage,
            limit: 10,
            sort: { createAt: -1}
          };

        const res = await modelBrand.paginate({}, options, function(err:any, result:any){
          if(err){
            return err
          }else{
            console.log(result)
            return result
          }
        });
        return res
      } finally {
        await mongoose.disconnect();
      }
}
