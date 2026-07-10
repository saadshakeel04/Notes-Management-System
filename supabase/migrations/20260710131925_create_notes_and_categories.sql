/*
# Create notes and categories tables (multi-user, owner-scoped)

1. Purpose
   - Stores per-user notes and categories for the Notely app.
   - Each user only sees and modifies their own data via RLS.

2. New Tables
   - `notes`
     - `id` (uuid, PK, default gen_random_uuid())
     - `user_id` (uuid, NOT NULL, default auth.uid(), FK to auth.users ON DELETE CASCADE)
     - `title` (text, not null, default 'Untitled')
     - `content` (text, default '')
     - `category` (text, default 'personal')
     - `tags` (text[], default '{}')
     - `color` (text, default 'default')
     - `is_favorite` (boolean, default false)
     - `is_pinned` (boolean, default false)
     - `is_archived` (boolean, default false)
     - `is_trashed` (boolean, default false)
     - `trashed_at` (timestamptz, nullable)
     - `created_at` (timestamptz, default now())
     - `updated_at` (timestamptz, default now())
   - `categories`
     - `id` (uuid, PK, default gen_random_uuid())
     - `user_id` (uuid, NOT NULL, default auth.uid(), FK to auth.users ON DELETE CASCADE)
     - `name` (text, not null)
     - `color` (text, default 'blue')
     - `created_at` (timestamptz, default now())

3. Security
   - Enable RLS on both tables.
   - Owner-scoped CRUD: each authenticated user can only SELECT/INSERT/UPDATE/DELETE rows they own (auth.uid() = user_id).
   - user_id defaults to auth.uid() so inserts that omit it still pass the WITH CHECK constraint.

4. Indexes
   - Index on user_id for both tables for fast per-user queries.
*/

CREATE TABLE IF NOT EXISTS notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL DEFAULT 'Untitled',
  content text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'personal',
  tags text[] NOT NULL DEFAULT '{}',
  color text NOT NULL DEFAULT 'default',
  is_favorite boolean NOT NULL DEFAULT false,
  is_pinned boolean NOT NULL DEFAULT false,
  is_archived boolean NOT NULL DEFAULT false,
  is_trashed boolean NOT NULL DEFAULT false,
  trashed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_notes_user_id ON notes(user_id);

ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_notes" ON notes;
CREATE POLICY "select_own_notes" ON notes FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_notes" ON notes;
CREATE POLICY "insert_own_notes" ON notes FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_notes" ON notes;
CREATE POLICY "update_own_notes" ON notes FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_notes" ON notes;
CREATE POLICY "delete_own_notes" ON notes FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  color text NOT NULL DEFAULT 'blue',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_categories_user_id ON categories(user_id);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_categories" ON categories;
CREATE POLICY "select_own_categories" ON categories FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_categories" ON categories;
CREATE POLICY "insert_own_categories" ON categories FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_categories" ON categories;
CREATE POLICY "update_own_categories" ON categories FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_categories" ON categories;
CREATE POLICY "delete_own_categories" ON categories FOR DELETE
  TO authenticated USING (auth.uid() = user_id);
