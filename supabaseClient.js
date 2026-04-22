import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dsbgdhiluhwfllcvrvot.supabase.co";
const supabaseKey = "sb_publishable_ZspF9MVEfl1FOLmMnTqD1w_R1bUBdaI";

export const supabase = createClient(supabaseUrl, supabaseKey);
