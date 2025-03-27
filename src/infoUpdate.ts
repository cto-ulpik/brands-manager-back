import brandsFirebaseTemplate from "./brands-firebase.json";
import getBrands from "./Services/getBrands";
import editBrand from "./Services/editBrand";

async function updateBrand(id: string, app: any) {
  try {
    await editBrand(id, app);
    console.log(`Actualizada: ${id}`);
  } catch (e) {
    console.error(`Error al actualizar ${id}:`, e);
  }
}

async function main() {
  const brandsMongoDB = await getBrands();
  const brandsFirebase = Object.values(brandsFirebaseTemplate);

  for (const element of brandsFirebase) {
    for (const item of brandsMongoDB) {
      if (item.nameBrand === element.nameBrand) {
        const id = String(item._id);
        const app = {
          aprobadaMarca: element.aprobadaMarca,
        };
        await updateBrand(id, app);
      }
    }
  }
}

main();