import { Elysia, t } from 'elysia';
import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger'

import findBrand from '../Services/findBrand';
import editBrand from '../Services/editBrand';
import deleteBrand from '../Services/deleteBrand';
import createBrand from '../Services/createBrand';
import getBrands, {getEssentialBrands, paginationBrands} from '../Services/getBrands';

import {getUrlUploadImageCloudflare} from '../Services/upladImage';
import { get } from 'mongoose';


const brandController = new Elysia()
    .use(swagger({
        path:"/v1/swagger",
        documentation: {
            info: {
                title: 'API de marcas',
                version: '1.0.0',
                description: 'API para gestionar las marcas registradas por Ulpik'
            }
        }
    }
    ))
    .use(cors({
        // origin: /.*\.ulpik\.com$/, // Cambia esto a tu dominio de frontend
        origin: ['http://localhost:5173', 'http://localhost:4173'],
        // origin: 'http://localhost:8080',
        // origin: '*',
        credentials:true,
        allowedHeaders: ['Content-Type', 'Content-Length','Host','User-Agent','Accept','Accept-Encoding','Connection','Cookie','Set-Cookie'],
        // exposedHeaders: ['Content-Type', 'Content-Length','Host','User-Agent','Accept','Accept-Encoding','Connection','Cookie','Set-Cookie'],
        methods:['POST','GET','PUT','DELETE']
    }))
    
    .get('/api', ()=>{
        return 'API v1';
    })
    .get('/api/image',async ()=>{
        return await getUrlUploadImageCloudflare();
    })
    .get('/api/list-brands', async ()=>{
        const brands = await getBrands();
        return brands;
    })
    .get('/api/list', async ()=>{
        const brands = await getEssentialBrands();
        return brands;
    })
    .get('/api/page/:numberPage', async ({params:{numberPage}})=>{
        console.log('Intento de solicitud')
        const page = await paginationBrands({numberPage});
        console.log(page);
        return page;
    })
    .get('/api/brand/:idBrand', async ({params:{idBrand}})=>{
        const brand = await findBrand(idBrand);
        console.log(brand);
        return JSON.stringify(brand);
    })
    .put('/api/brand/:idBrand', async ({params:{idBrand}, body})=>{
        if (!idBrand) {
            return 'IdBrand is required';
        }

        if (!body) {
            return 'Body is required';
        }
        
        // const bodyString = JSON.stringify(body);
        // const update = JSON.parse(JSON.parse(bodyString));
        // return update;

        try{
            const updateBrand = await editBrand(idBrand, body);
            return updateBrand
        }catch(e){
            return e
        }
    })
    .delete('/api/brand/:idBrand', async ({params:{idBrand}})=>{

        try{
            let status = await deleteBrand(idBrand);
            console.log(status.message);
            return status;
        }catch(e){
            return e
        }

    })
    .post('/api/brand', async ({body})=>{
        try{
            let status = await createBrand(body);
            console.log(status.message)
            return status
        }catch(e){
            return e
        }
    })
    .listen(3000);

export default brandController;