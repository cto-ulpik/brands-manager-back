import { BrandSchema, BrandModel } from "../schema/brand.schema";
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function deleteBrand(idBrand:string){
    try {
        await mongoose.connect(uri, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        await BrandModel.findOneAndDelete({_id:idBrand})
        return {
          status:200,
          message: "ok"
        }
      }catch(e){
        return {
          status:500,
          message:e
        }

      } finally {
        await mongoose.disconnect();
      }
}

export default deleteBrand;