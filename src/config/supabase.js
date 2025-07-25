import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://waawofaxbwrwpuysblxu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhYXdvZmF4Yndyd3B1eXNibHh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0NzU1NTYsImV4cCI6MjA2OTA1MTU1Nn0.kQsYKo-MkH7Cvl-hsXTqOf8LoroZRZx4tYUsVB3vIzo";

export const supabase = createClient(supabaseUrl, supabaseKey);
