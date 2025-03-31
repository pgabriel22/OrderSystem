import { supabase } from "../supabaseClient.jsx";

export const testSupabaseConnection = async () => {
  const response = await fetch("/.netlify/functions/supabase-client");
  const data = await response.json();

  if (error) {
    console.error("Error connecting to Supabase:", error);
  } else {
    console.log("Supabase data:", data);
  }
};

testSupabaseConnection();
