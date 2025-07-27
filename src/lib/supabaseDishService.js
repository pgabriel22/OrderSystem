import { supabase } from "./supabaseClient";

export const saveDish = async (formData, isEditing) => {
  if (isEditing) {
    const { error } = await supabase
      .from("dishes")
      .update({
        dishName: formData.dishName,
        price: formData.price,
        dishType: formData.dishType,
        isAvailable: formData.isAvailable,
        imageUrl: formData.imageUrl,
      })
      .eq("id", formData.id);
    if (error) throw error;
    return formData;
  } else {
    const { data, error } = await supabase
      .from("dishes")
      .insert([{
        dishName: formData.dishName,
        price: formData.price,
        dishType: formData.dishType,
        isAvailable: formData.isAvailable,
        imageUrl: formData.imageUrl,
      }])
      .select()
      .single();
    if (error) throw error;
    return data;
  }
};

export const fetchDishes = async () => {
  const { data, error } = await supabase.from("dishes").select("*").order("dishName");
  if (error) throw error;
  return data;
};

export const deleteDish = async (id) => {
  const { error } = await supabase.from("dishes").delete().eq("id", id);
  if (error) throw error;
};
