import {Brand} from "./Models/roots.mongodb";
import brandsFirebase from "./brands-firebase.json";
import createBrand from "./Services/createBrand";
import fs from 'fs';
import uploadImage from "./uploadImageCloudflare";

const axios = require("axios");


function validateDate(date:string):Date{

  if(date==undefined || date==""){
    return new Date();
  }

  if(date.includes('-')){
      let tempDate = date.split('-');
      let year = parseInt(tempDate[0]);
      let month = parseInt(tempDate[1]);
      let day = parseInt(tempDate[2]);

      return new Date(year, month, day)
  }


  let fechaTexto = date.split(",");
  let dateImportant;
  let timeImportant;
    if(fechaTexto.length == 3){
      fechaTexto.shift();
    }
    
    dateImportant = fechaTexto[0].replaceAll(" ","").split('de');
    const [day, month, year]:[string, string, string] = [dateImportant[0],dateImportant[1],dateImportant[2]];
    timeImportant = fechaTexto[1];

    // Crear un objeto de fecha a partir del texto
    const meses = {
      "ene": 0, "feb": 1, "mar": 2, "abr": 3, "may": 4, "jun": 5,
      "jul": 6, "ago": 7, "sep": 8, "oct": 9, "nov": 10, "dic": 11,
      "sept":8,
      "enero": 0, "febrero": 1, "marzo": 2, "abril": 3, "mayo": 4, "junio": 5,
      "julio": 6, "agosto": 7, "septiembre": 8, "octubre": 9, "noviembre": 10, "diciembre": 11
    };

    // Obtener las partes de la fecha
    const tempTime = timeImportant.replaceAll(" ","").split(":");

    const [tempDay, tempMonth, tempYear, tempHours, tempMinutes] = [parseInt(day), meses[month], parseInt(year), parseInt(tempTime[0]),parseInt(tempTime[1])];

    return new Date(tempDay, tempMonth, tempYear, tempHours, tempMinutes);
}


function changeData(marca:any){
  let brand = new Brand(
    {
      logoUrl: validateText(marca.urlLogo),
      createAt: validateDate(marca.createAt),
      denomination: validateText(marca.denominacion),
      nameBrand: validateText(marca.nameBrand),
      responsible: validateText(marca.responsable),

      brandRequest: {
        class: validateText(marca.solicitudMarca.clase),
        state: validateStateBrand(marca.solicitudMarca.estado),
        startDate: validateDate(marca.solicitudMarca.fechaInicio),
        nature: validateText(marca.solicitudMarca.naturaleza),
        notes: validateNotes(marca.solicitudMarca.notes),
        requestNumber: validateText(marca.solicitudMarca.numeroSolicitud)
      },

      applicant: {
        names: validateText(marca.solicitante.nombres),
        lastName: validateText(marca.solicitante.apellidos),
        dni: validateText(marca.solicitante.cedula),
        address: validateText(marca.solicitante.direccion),
        phone: validateText(marca.solicitante.telefono),
        notes: validateNotes(marca.solicitante.notas)
      },

      phoneticSearchData: {
        state: validateStateBrand(marca.busquedaFonetica.estadi),
        deliveryDate: validateDate(marca.busquedaFonetica.fechaEntrega),
        probability: validateText(marca.busquedaFonetica.probabilidad),
        resultsUrl: validateText(marca.busquedaFonetica.urlResultados)
      }
    });
  return brand
} 

function validateText(str: string | undefined){
  return (str == undefined || str == null) ? "" : str;
}

function validateStateBrand(state:string|undefined){
  let stateBrand = (state == undefined || state == "") ? 'None' : state;
  let stateAvailable = ["None","Process","Finished"];

  if(stateBrand=='None' || stateBrand=='Ninguno'){
    return stateAvailable[0]
  }else if(stateBrand=='En Tramite'){
    return stateAvailable[1]
  }else if(stateBrand=='Finalizado'){
    return stateAvailable[2]
  }else{
    return stateAvailable[0]
  }
}

function validateNotes(notes:string|undefined){
  return (notes == undefined ) ? '' : notes;
}

function main(){
  let newBrands:any = []

  Object.values(brandsFirebase).forEach((item)=>{
    newBrands.push(changeData(item));
  });

  // console.log(newBrands)

  let brandsComplete = new Map();

  // Quito marcas similares
  newBrands.forEach((item:any)=>{
    if(!brandsComplete.has(item.nameBrand)){
      brandsComplete.set(item.nameBrand, item);
    }else{
      let dateExistent = brandsComplete.get(item.nameBrand).createAt;
      if(item.createAt > dateExistent){
        brandsComplete.set(item.nameBrand, item);
        console.log(item.nameBrand);
      }
    }
  })

  let normalizeBrands = Array.from(brandsComplete.values());
  console.log(`Inicial: ${ newBrands.length }`);
  console.log(`Final: ${ normalizeBrands.length }`)

  // downloadAllImages(normalizeBrands);
  // const jsonData = JSON.stringify(news);
  // console.log(newBrands);
//   fs.writeFile("data.json", jsonData, (err) => {
//     if (err) {
//         console.error("Error al escribir el archivo JSON:", err);
//     } else {
//         console.log("Archivo JSON creado exitosamente.");
//     }
//   });


}

// Function to download a single image
const downloadImage = async (url:any, filepath:any) => {
  try {
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
    });
    response.data.pipe(fs.createWriteStream(filepath));
    // console.log(`Downloaded: ${filepath}`);
  } catch (error) {
    console.error(`Failed to download image: ${url}`, error);
  }
};

// Download all images
const downloadAllImages = async (brands:any) => {
  for (let i = 0; i < brands.length; i++) {

    if(brands[i].logoUrl == "" || brands[i].logoUrl == "http://147.182.139.172:3000/imagen-1689661199714.jpg"){
      brands[i].logoUrl = "af765bea-23ed-4c33-d67c-cdb69917db00";
      await createBrand(brands[i]).then(()=>{
        console.log(`Created: ${brands[i].nameBrand} with idImage ${brands[i].logoUrl}`);
      });
    }else{
      const name = brands[i].nameBrand.replaceAll(" ","_");
      const filepath = `./logos/logo_${name}_${i + 1}.jpg`; // Save as a file

     
        await downloadImage(brands[i].logoUrl, filepath);
        brands[i].logoUrl = await uploadImage(filepath).catch((error)=>{
          console.log(error);
          return "af765bea-23ed-4c33-d67c-cdb69917db00";
        });
        await createBrand(brands[i]).then(()=>{
          console.log(`Created: ${brands[i].nameBrand} with idImage ${brands[i].logoUrl}`);
        });
    
    }

  }
};


// Call the function


(()=>{
  main();
})();