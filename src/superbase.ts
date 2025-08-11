import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kkxmxpgroyksjlohkdaj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtreG14cGdyb3lrc2psb2hrZGFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1ODU1NTIsImV4cCI6MjA2ODE2MTU1Mn0.Zho-kA2pC2gb00AXgV5tjX5jfKQ90MuIgE8NJO5arnc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
