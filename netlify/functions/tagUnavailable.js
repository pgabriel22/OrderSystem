// netlify/functions/tagUnavailable.js
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Use a service role for write access
);

export const handler = async () => {
  const now = new Date();
  const hour = now.getHours();

  if (hour < 17) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Not 5PM yet. Skipped update." }),
    };
  }

  const { error } = await supabase
    .from("dishes")
    .update({ isAvailable: false })
    .eq("isAvailable", true); // only update those still marked true

  if (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "All dishes marked unavailable after 5PM.",
    }),
  };
};
