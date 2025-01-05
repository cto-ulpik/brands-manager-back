import { BrandSchema, BrandModel } from "../schema/brand.schema";
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function editBrand(idBrand:string, update:any){
    try {
        const _idBrand = new mongoose.Types.ObjectId(idBrand);
        await mongoose.connect(uri, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        const updateBrand = await BrandModel.findOneAndUpdate({_id:_idBrand}, {$set: update}, {new: true});
        console.log(updateBrand);
        return (updateBrand==null) ? {status:404,message:'Brand not found'} : updateBrand;
      }catch(e){
        return {
          status: 500,
          message: e
        }
      }
      finally {
        await mongoose.disconnect();
      }
}

export default editBrand;