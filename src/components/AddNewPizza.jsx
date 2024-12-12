import { useState } from "react";
import { Form, Outlet, redirect, useNavigate } from "react-router";
import {
  getFileFromStorageBucket,
  insertPizzas,
  uploadToStorageBucket,
} from "../supabase/apiPizzas";
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
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  // const [ingredients, setIngredients] = useState(["cheese", "veggies"]);
  const [ingredients, setIngredients] = useState("");

  const [available, setAvailable] = useState(true);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    console.log(formData);

    //convert ingredients into array
    const ingredArr = ingredients.split(" ");
    console.log(ingredArr);

    //1- append all the form data
    formData.append("name", name);
    formData.append("price", parseInt(price));
    formData.append("image", image);
    formData.append("ingredients", ingredArr);
    formData.append("available", available);

    //2- generate unique name for each photo
    const uniqueFileName = `${Date.now()}_${image.name}`;

    //3-upload the image to storage bucket
    const uploadPizza = async () => {
      try {
        // const { data: uploadData, error: uploadError } = await supabase.storage
        //   .from("pizzas-img")
        //   .upload(`images/${uniqueFileName}`, image);

        //prettier-ignore

        const { uploadData, uploadError } = await uploadToStorageBucket(uniqueFileName,image);

        if (uploadError) {
          console.error("Upload Error:", uploadError); // Log detailed upload error
          throw new Error(`File upload failed: ${uploadError.message}`);
        }

        console.log("Upload Data:", uploadData);

        //4 get the image from the storage bucket
        // const { data: publicUrlData, error: urlError } = supabase.storage
        //   .from("pizzas-img")
        //   .getPublicUrl(`images/${uniqueFileName}`);

        //prettier-ignore
        const { publicUrlData, urlError } =await getFileFromStorageBucket(uniqueFileName);

        if (urlError) {
          console.error("URL Error:", urlError);
          throw new Error(`Error fetching public URL: ${urlError.message}`);
        }

        console.log(publicUrlData);
        const publicUrl = publicUrlData.publicUrl;

        //5- create the pizza obj along with the image url

        // function removeSpaces(str) {
        //   return str.replace(/\s/g, "");
        // }
        console.log(ingredients);
        const newPizza = {
          name,
          unitPrice: parseInt(price),
          image: publicUrl,
          soldOut: !available,
          ingredients: ingredArr, //removes whitespaces from the ingredients
        };

        //6-insert pizzas obj into DB
        await insertPizzas([newPizza]);
        console.log("Pizza inserted successfully:", newPizza);
        alert("Pizza inserted successfully:"); //create a notification here later on
        navigate("/menu");

        //
      } catch (error) {
        console.error("Error", error.message);
        alert("Failed to add the pizza", +error.message);
      }
    };

    uploadPizza();
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
              onChange={(e) => setImage(e.target.files[0])}
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
              placeholder="Enter at least 4 ingredients, in this format: x,y,z"
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
//   let pubErr;
//   try {
//     // Parse the form data
//     const formData = await request.formData();
//     console.log("Form Data:", formData); // Log the form data to check its structure
//     const data = Object.fromEntries(formData.entries());
//     console.log("Parsed Data:", data); // Log parsed data to verify form inputs

//     // Get the file from the form data
//     const file = formData.get("image");
//     console.log(file);
//     if (!file) throw new Error("No image file provided");

//     // Upload the file to Supabase Storage

//     const uniqueFileName = `${Date.now()}_${file.name}`;
//     const { data: uploadData, error: uploadError } = await supabase.storage
//       .from("pizzas-img")
//       .upload(`images/${uniqueFileName}`, file);

//     if (uploadError) {
//       console.error("Upload Error:", uploadError); // Log detailed upload error
//       throw new Error(`File upload failed: ${uploadError.message}`);
//     }

//     console.log("Upload Data:", uploadData); // Log upload data to check upload success

//     // Get the public URL of the uploaded image
//     const { publicUrl, error: urlError } = supabase.storage
//       .from("pizzas-img")
//       .getPublicUrl(`images/${uniqueFileName}`);

//     if (urlError) {
//       console.error("URL Error:", urlError); // Log detailed error if fetching URL fails
//       throw new Error(`Error fetching public URL: ${urlError.message}`);
//     }

//     console.log("Image Public URL:", publicUrl); // Log the public URL of the uploaded image

//     // Prepare the new pizza object
//     const newPizzaObj = {
//       name: data.name,
//       unitPrice: parseInt(data.price), // Ensure unitPrice is an integer
//       image: publicUrl, // Use the public URL of the image
//       soldOut: data.available === "true", // Convert available value to boolean
//       ingredients: data.ingredients.split(","), // Split ingredients into an array
//     };

//     const newPizza = [newPizzaObj];

//     // Insert the pizza data into the database
//     await insertPizzas(newPizza);
//     console.log("Pizza inserted successfully:", newPizza);
//   } catch (err) {
//     console.error("Error:", err.message); // Log the main error
//     alert("Cannot upload the pizza to the database");
//     pubErr = err;
//   }

//   if (pubErr) return 0;
//   else return redirect("/menu");
// }
