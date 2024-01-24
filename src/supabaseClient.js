import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xqdgtlvgwwfttuvaoaed.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxZGd0bHZnd3dmdHR1dmFvYWVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYwMDM3MDAsImV4cCI6MjAyMTU3OTcwMH0.DqXkLYJJS-dmBCYA6TD1aW4yMllD_R9nhJIywyIRRRM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
