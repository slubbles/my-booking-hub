import { createClient } from "@supabase/supabase-js";
import { getEnv } from "./env.js";

export const createAdminClient = () => {
  return createClient(getEnv("SUPABASE_URL"), getEnv("SUPABASE_SERVICE_ROLE_KEY"), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
};