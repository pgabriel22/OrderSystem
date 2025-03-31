import { supabase } from "../supabaseClient.jsx";

export const testSupabaseConnection = async () => {
  const { data, error } = await supabase
    .from("Users") // Replace with a table name from your Supabase project
    .select("*")
    .limit(5);

  if (error) {
    console.error("Error connecting to Supabase:", error);
  } else {
    console.log("Supabase data:", data);
  }
};

testSupabaseConnection();
