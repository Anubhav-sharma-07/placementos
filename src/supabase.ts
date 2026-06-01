import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://xizcvcsahhthtfvkmumo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpemN2Y3NhaGh0aHRmdmttdW1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyODA4MzUsImV4cCI6MjA5NTg1NjgzNX0.U_yVc-wR0aDA2Lvf1X867Vjun5FCY5gy5OtlaMCjLgQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);