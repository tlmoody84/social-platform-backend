import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || "https://cyvcifcqinckwvseafiz.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5dmNpZmNxaW5ja3d2c2VhZml6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcyOTUzODQsImV4cCI6MjA0Mjg3MTM4NH0.rdZaFuBna6CC1-4GqPK06tA61jQ_myMPXH2vMuvN8jg';

export const supabase = createClient(supabaseUrl, supabaseKey);
