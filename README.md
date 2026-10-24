# Configurator tablouri electrice — V1.6

Versiune profesională cu React, Vite, TypeScript, Supabase și GitHub Pages.

## Configurare

1. Copiază `.env.example` în `.env`.
2. Completează `VITE_SUPABASE_URL` și `VITE_SUPABASE_ANON_KEY`.
3. Rulează `npm install`.
4. Rulează `npm run dev`.

## Baza de date

Rulează fișierul `supabase/migrations/001_initial_schema.sql` în SQL Editor din Supabase.

## Deploy

1. Creează repository-ul `configurator-tablouri-v1-6`.
2. Încarcă proiectul.
3. În GitHub, setează Secrets:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. În Settings → Pages, alege Source: GitHub Actions.
5. Push pe `main`.
