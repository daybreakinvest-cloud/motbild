import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://mcglpgfmyqscmemeszgd.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_NWVbRb1w62MTcMmW0ImfNg_-N4vaTj6";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
