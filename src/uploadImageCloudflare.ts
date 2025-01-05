import FormData from 'form-data';
import fs from 'fs';
import axios from 'axios';

async function getUrlUploadImageCloudflare(){
    
    const endPoint = `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`
    const options ={
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
            }
    }

    return fetch(endPoint,options)
        .then(response => response.json())
        .catch(error => console.log(error))

}

async function uploadImage(filePath:string) {
  const formData = new FormData();
  formData.append('file', fs.createReadStream(filePath)); // Leer la imagen local

  if(filePath.includes(".pdf")){
    return "af765bea-23ed-4c33-d67c-cdb69917db00";
  }
  
  const url = (await getUrlUploadImageCloudflare()).result.uploadURL;
  
  return (await axios.post(
    url,
    formData,
    {
      headers: {
        ...formData.getHeaders(), // Obtener los encabezados necesarios para `multipart/form-data`
      },
    }
  )).data.result.id;

}


// let a = await uploadImage('./logos/logo_VAMOS_MÁS_DISEÑO_DE_LETRAS_86.jpg');
// console.log(a);

export default uploadImage;
