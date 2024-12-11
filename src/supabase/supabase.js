import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://mhvsdqhdpswhlggyasef.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1odnNkcWhkcHN3aGxnZ3lhc2VmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1NDcyMjgsImV4cCI6MjA0OTEyMzIyOH0.dAvB9_Wq0JP2qcebVP7ngGHFly-i0B1cn6le8uFt4NI";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
