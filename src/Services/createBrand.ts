import { Brand} from "../Models/roots.mongodb";
import { BrandSchema, BrandModel } from "../schema/brand.schema";

const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function createBrand(props: any){
    try {
        await mongoose.connect(uri, clientOptions)
        await mongoose.connection.db.admin().command({ ping: 1 });
        await BrandModel.create(new Brand(props))
        return {
          status: 200,
          message: "ok"
        }
      }
      catch(e){
        await mongoose.disconnect();
        return {
          status:500,
          message: e
        }
      }
       finally {
        await mongoose.disconnect();
      }
}

export default createBrand;