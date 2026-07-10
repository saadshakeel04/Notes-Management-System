# Notely - Notes Management System

Notely is a modern note-taking dashboard built with React, Vite, Tailwind CSS, and Supabase. It delivers a polished productivity experience for managing ideas, tasks, and personal knowledge with powerful organization tools and a clean interface.

## Project Idea

This project is designed as a complete notes management system that helps users:
- capture thoughts quickly,
- organize notes with categories and color labels,
- mark important items as favorites or pinned,
- archive notes for later,
- safely trash and restore content,
- manage personal profile and theme preferences.

It blends productivity features with a smooth UI, making note-taking feel intuitive and responsive.

## Core Features

- **User authentication**
  - Email/password sign up and sign in
  - Session management via Supabase
  - Profile editing with name and bio updates

- **Note creation and editing**
  - Rich note cards with title, body, tags, category, and color label
  - Inline actions for favorite, pin, archive, and trash
  - Edit notes on a dedicated note page

- **Note lifecycle management**
  - Active note workspace for current content
  - Favorites for quick access to important notes
  - Pin notes to keep them at the top of lists
  - Archive notes to declutter without deleting them
  - Trash view to restore or permanently delete notes

- **Organization and discovery**
  - Custom categories with color labels
  - Category management and grouping
  - Search across note titles and content
  - Filters for category and color on the All Notes page
  - Sorting options for note lists

- **Dashboard insights**
  - Overview cards for total notes, favorites, pinned, and archived counts
  - Recent notes preview
  - Category breakdown visualization
  - Pinned notes summary

- **Appearance and settings**
  - Light, dark, and system theme support
  - Theme selector and toggle available globally
  - Settings page with account sign out and reset data options

## Application Pages

- **Landing** — marketing homepage with feature highlights and calls to action
- **Login** — user sign-in page
- **Register** — new user sign-up page
- **Dashboard** — personalized home page with stats, recent notes, and pinned notes
- **All Notes** — searchable, sortable, filterable list of active notes
- **Create Note** — note creation interface
- **Edit Note** — full note editing experience
- **Favorites** — curated list of starred notes
- **Archive** — archived notes view with restore capability
- **Trash** — trashed notes management and permanent deletion
- **Categories** — custom categories list and deletion
- **Profile** — user profile details, edit name/bio, and note statistics
- **Settings** — theme controls, storage info, reset and sign-out actions

## Architecture

- **React** — component-based UI for pages, forms, dialogs, and cards
- **Vite** — fast development experience with modern bundling
- **Tailwind CSS** — utility-first styling for responsive, polished layout
- **Supabase** — backend for authentication, notes, and categories
- **Context providers**
  - `AuthContext` manages auth state and profile updates
  - `NotesContext` handles notes, categories, statistics, and note actions
  - `ThemeContext` manages theme persistence and system mode

## Data and Behavior

- Notes and categories are persisted in Supabase
- Default categories are seeded for new users
- Notes support metadata fields such as:
  - `isFavorite`, `isPinned`, `isArchived`, `isTrashed`
  - `tags`, `color`, `category`
- Trash operations are non-destructive until permanent delete
- Archived notes remain accessible separately from active notes
- Category deletion reassigns affected notes to a fallback category

## Design and UI

- Card-based note browsing with motion and hover interactions
- Responsive dashboard and sidebar layout
- Badge and label styling for categories, colors, and note metadata
- Intuitive dropdown actions for note controls
- Empty states and loading skeletons for better UX

## Tech Stack

- React
- Vite
- Tailwind CSS
- Supabase JS
- Framer Motion
- Lucide React
- ESLint

## Database Migration

The repository includes a Supabase migration file under `supabase/migrations/` for setting up the `notes` and `categories` schema.

## What Makes This Project Strong

- Real-world note management workflows with favorites, pinning, archive, and trash
- Fully authenticated experience with profile and secure session handling
- Clean, accessible UI that scales from landing page to full dashboard
- Well-structured state management through React context providers
- Value for both personal note-taking and lightweight productivity use cases
