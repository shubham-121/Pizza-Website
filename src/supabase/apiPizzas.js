import supabase from "./supabase";

export default async function getPizzas() {
  let { data: pizzas, error } = await supabase.from("pizzas").select("*");

  if (error) throw new Error("Error occured while fetching pizzas:", error);

  return pizzas;
}

export async function insertPizzas(newPizza) {
  console.log("Pizza reached", newPizza);

  const { data, error } = await supabase
    .from("pizzas")
    .insert(newPizza)
    .select();

  if (error) {
    console.error(error.message);
    throw new Error(
      "Error occured while uploading the pizza to the DB:",
      error
    );
  }

  console.log("Pizza inserted:", data);
  return data;
}

export async function uploadToStorageBucket(uniqueFileName, image) {
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("pizzas-img")
    .upload(`images/${uniqueFileName}`, image);

  return { uploadData, uploadError };
}

export async function getFileFromStorageBucket(uniqueFileName) {
  const { data: publicUrlData, error: urlError } = supabase.storage
    .from("pizzas-img")
    .getPublicUrl(`images/${uniqueFileName}`);

  return { publicUrlData, urlError };
}
