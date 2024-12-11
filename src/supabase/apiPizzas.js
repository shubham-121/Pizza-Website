import supabase from "./supabase";

export default async function getPizzas() {
  let { data: pizzas, error } = await supabase.from("pizzas").select("*");

  if (error) throw new Error("Error occured while fetching pizzas:", error);

  return pizzas;
}

export async function insertPizzas(newPizza) {
  console.log("Pizza reached", newPizza);

  // const image = newPizza.image;
  // const name = newPizza.name;
  // const unitPrice = newPizza.unitPrice;
  // const soldOut = newPizza.soldOut;
  // const ingredients = newPizza.ingredients;

  // console.log(ingredients);

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
