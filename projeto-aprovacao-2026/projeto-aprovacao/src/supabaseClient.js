import { createClient } from "@supabase/supabase-js";

// Use as mesmas credenciais do seu formulário (Supabase > Settings > API)
const SUPABASE_URL = "https://sqdxhjlqsjqrrvhhjjzz.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxZHhoamxxc2pxcnJ2aGhqanp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5MDgyMjksImV4cCI6MjEwNDQ4NDIyOX0.Jxy4wH449iv1aRGhYmVqFpEkrlRbDS7KXeb0iINQU30";

export const supabase = createClient(
  "https://sqdxhjlqsjqrrvhhjjzz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxZHhoamxxc2pxcnJ2aGhqanp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5MDgyMjksImV4cCI6MjEwNDQ4NDIyOX0.Jxy4wH449iv1aRGhYmVqFpEkrlRbDS7KXeb0iINQU30",
);
