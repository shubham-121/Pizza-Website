import supabase from "./supabase";

export async function signUp({ name, email, phoneNumber, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      //optional data to add to DB
      data: { name, phoneNumber, avatar: "" },
    },
  });

  if (error) {
    alert(error.message);
    throw new Error("Error occured while logging in", error);
  }

  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert("Invalid Credentials. Please enter correct details");
    console.error(error.message);
    throw new Error("Error occured while logging in", error);
  }

  console.log(data);
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  // const { data, error } = await supabase.auth.getCurrentUser();
  const { data, error } = await supabase.auth.getUser();

  console.log(data);

  if (error) {
    console.error(error.message);
    throw new Error("Error occured while logging in", error);
  }

  return data;
}

export async function logoutUser() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error.message);
    throw new Error("Error occured while logging in", error);
  }
}
