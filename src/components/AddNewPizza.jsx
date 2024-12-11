import { useState } from "react";
import { Form, Outlet, redirect } from "react-router";
import { insertPizzas } from "../supabase/apiPizzas";
import supabase from "../supabase/supabase";

export default function AddNewPizza() {
  return (
    <div>
      <Outlet></Outlet>
      <p className="text-center font-bold text-xl italic mt-2">
        Add your own pizza today!
      </p>
      <PizzaForm></PizzaForm>
    </div>
  );
}

function PizzaForm() {
  const [name, setName] = useState("Roasted Veggie");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState([
    "mushrooms",
    "cheese",
    "veggies",
  ]);
  const [available, setAvailable] = useState(true);

  function handleSubmit(data) {
    console.log(data);
    console.log(data.target[2].value);
  }
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <div className="flex items-center justify-center mt-2">
        <div className="flex flex-col justify-center items-center bg-white shadow-md rounded-lg p-6 w-[50%] border-2 border-gray-300">
          <div className="w-full mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Name:
            </label>
            <input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter pizza name"
            />
          </div>
          <div className="w-full mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Price:
            </label>
            <input
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter pizza price"
            />
          </div>
          <div className="w-full mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Image:
            </label>
            <input
              name="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              type="file"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="w-full mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Ingredients:
            </label>
            <input
              name="ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter ingredients (comma-separated)"
            />
          </div>
          <div className="w-full flex items-center mb-4">
            <label className="text-gray-700 font-medium mr-2">Available:</label>
            <input
              name="available"
              value={available}
              onChange={(e) => setAvailable(e.target.value)}
              type="checkbox"
              className="h-5 w-5 text-purple-500 border-gray-300 rounded focus:ring-purple-500"
            />
          </div>
          <button className="bg-purple-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400">
            Submit
          </button>
        </div>
      </div>
    </Form>
  );
}

// export async function action({ request }) {
//   try {
//     const formData = await request.formData();
//     console.log(formData);
//     const data = Object.fromEntries(formData.entries());
//     console.log(data);
//     const file = formData.get("image");
//     if (!file) throw new Error("No image file provided");

//     const { data: uploadData, error: uploadError } = await supabase.storage
//       .from("pizzas-img")
//       .upload(`images/${file.name}`, file);

//     if (uploadError) throw new Error("File upload failed");

//     // Get the public URL of the uploaded image
//     const { publicUrl, error: urlError } = supabase.storage
//       .from("pizzas-img")
//       .getPublicUrl(`images/${file.name}`);

//     if (urlError) throw new Error("Error fetching public URL");

//     //create newPizza obj with same order as in the DB

//     const newPizzaObj = {
//       name: data.name,
//       unitPrice: parseInt(data.price),
//       image: publicUrl,
//       soldOut: data.available === "true",
//       ingredients: data.ingredients.split(","),
//     };
//     const newPizza = [newPizzaObj];

//     //call the upload function to DB
//     await insertPizzas(newPizza);
//   } catch (err) {
//     alert("Cannot upload the pizza to the database");
//     console.error(err.message);
//   }

//   return redirect("/menu");
// }

export async function action({ request }) {
  try {
    // Parse the form data
    const formData = await request.formData();
    console.log("Form Data:", formData); // Log the form data to check its structure
    const data = Object.fromEntries(formData.entries());
    console.log("Parsed Data:", data); // Log parsed data to verify form inputs

    // Get the file from the form data
    const file = formData.get("image");
    if (!file) throw new Error("No image file provided");

    // Upload the file to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("pizzas-img")
      .upload(`images/${file.name}`, file);

    if (uploadError) {
      console.error("Upload Error:", uploadError); // Log detailed upload error
      throw new Error(`File upload failed: ${uploadError.message}`);
    }

    console.log("Upload Data:", uploadData); // Log upload data to check upload success

    // Get the public URL of the uploaded image
    const { publicUrl, error: urlError } = supabase.storage
      .from("pizzas-img")
      .getPublicUrl(`images/${file.name}`);

    if (urlError) {
      console.error("URL Error:", urlError); // Log detailed error if fetching URL fails
      throw new Error(`Error fetching public URL: ${urlError.message}`);
    }

    console.log("Image Public URL:", publicUrl); // Log the public URL of the uploaded image

    // Prepare the new pizza object
    const newPizzaObj = {
      name: data.name,
      unitPrice: parseInt(data.price), // Ensure unitPrice is an integer
      image: publicUrl, // Use the public URL of the image
      soldOut: data.available === "true", // Convert available value to boolean
      ingredients: data.ingredients.split(","), // Split ingredients into an array
    };

    const newPizza = [newPizzaObj];

    // Insert the pizza data into the database
    await insertPizzas(newPizza);
    console.log("Pizza inserted successfully:", newPizza);
  } catch (err) {
    console.error("Error:", err.message); // Log the main error
    alert("Cannot upload the pizza to the database");
  }

  return redirect("/menu");
}
