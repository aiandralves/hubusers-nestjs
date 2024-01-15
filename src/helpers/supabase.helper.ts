import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import envConfig from "src/config/env/env.config";
dotenv.config();

export const SupabaseHelper = createClient(envConfig().supabase.url, envConfig().supabase.key, {
    auth: {
        persistSession: false,
    },
});
