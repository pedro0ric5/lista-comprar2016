// Importa a função de criação do client Supabase via CDN
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Cria o client com a URL e a chave fornecidas
export const supabase = createClient(

  'https://dkuorkhqpffkzsdjlmrc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrdW9ya2hxcGZma3pzZGpsbXJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxMTE5NTksImV4cCI6MjA4NzY4Nzk1OX0.uz7nd7kqavLQKcBOYorucifqfXZ3KPMkO5ce8trw5sA'
  
)