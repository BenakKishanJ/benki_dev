// ─────────────────────────────────────────────────────────────────────────────
// src/data/projects.ts
// Single source of truth for all projects.
// Both the listing page (/projects) and detail pages (/projects/[slug])
// pull from this file — so you only ever edit one place.
// ─────────────────────────────────────────────────────────────────────────────

export type Status = 'live' | 'wip' | 'archived';

export type Section =
  | { type: 'text';     content: string }
  | { type: 'heading';  content: string }
  | { type: 'code';     lang: string; filename?: string; code: string }
  | { type: 'image';    src: string; alt: string; caption?: string }
  | { type: 'gallery';  images: { src: string; alt: string }[] }
  | { type: 'video';    url: string; caption?: string }   // YouTube embed URL
  | { type: 'callout';  icon: string; content: string };  // icon is an emoji

export interface Project {
  slug: string;          // URL key — must be unique, URL-safe
  title: string;
  description: string;   // one-liner for cards
  longDesc: string;      // two-sentence card body
  status: Status;
  tags: string[];
  color: string;         // CSS variable or hex
  github: string | null;
  demo: string | null;

  // ── detail-page fields ──────────────────────────────────────────────────
  heroTagline?: string;           // bold sub-heading under title in detail hero
  sections: Section[];            // ordered content blocks
  timeline?: string;              // e.g. "Jan 2024 – present"
  role?: string;                  // e.g. "Solo developer"
}

// ─────────────────────────────────────────────────────────────────────────────
// ▼▼▼  ADD / EDIT YOUR PROJECTS BELOW  ▼▼▼
// ─────────────────────────────────────────────────────────────────────────────
export const projects: Project[] = [

  // ── 1. Kirana Sync ────────────────────────────────────────────────────────
  {
    slug: 'kirana-sync',
    title: 'Kirana Sync',
    description: 'Offline-first inventory app for corner stores built on Android + Room.',
    longDesc: '13 Room entities, delta-based sync, and conflict resolution that survives flaky 2G. Built for real kirana owners — owner + employee multi-device support included.',
    status: 'wip',
    tags: ['Kotlin', 'Android', 'Room', 'PostgreSQL', 'Ktor'],
    color: 'var(--orange)',
    github: 'https://github.com',
    demo: null,
    heroTagline: 'Inventory management for offline-first India.',
    timeline: 'Nov 2023 – present',
    role: 'Solo developer',
    sections: [
      {
        type: 'text',
        content: `Kirana stores are the backbone of Indian retail — but most of the apps built for them assume a stable internet connection. Kirana Sync starts offline and syncs opportunistically. Every transaction is stored locally first; the backend is a bonus, not a requirement.`,
      },
      {
        type: 'heading',
        content: 'The sync problem',
      },
      {
        type: 'text',
        content: `Two devices, one store, one owner and one employee — both can make changes simultaneously. Delta-based sync with a server-timestamp vector clock resolves conflicts deterministically. The rule: last write by the owner wins; employee writes are queued and merged.`,
      },
      {
        type: 'code',
        lang: 'kotlin',
        filename: 'SyncEngine.kt',
        code: `// Delta sync: only push rows changed since last sync timestamp
suspend fun pushDeltas(since: Long): SyncResult {
    val dirty = db.itemDao().getModifiedSince(since)
    if (dirty.isEmpty()) return SyncResult.NothingToSync

    val response = api.push(PushRequest(items = dirty, deviceId = deviceId))
    return when (response.status) {
        200 -> {
            db.itemDao().markSynced(dirty.map { it.id })
            SyncResult.Success(pushed = dirty.size)
        }
        409 -> SyncResult.Conflict(response.conflictIds)
        else -> SyncResult.Error(response.message)
    }
}`,
      },
      {
        type: 'callout',
        icon: '⚡',
        content: 'On a 2G connection the full sync round-trip averages 340 ms for a 200-item store. The UI is never blocked — all sync work runs in a background WorkManager job.',
      },
      {
        type: 'heading',
        content: 'Database schema',
      },
      {
        type: 'code',
        lang: 'sql',
        filename: 'schema.sql',
        code: `-- Core inventory table
CREATE TABLE items (
  id            TEXT PRIMARY KEY,
  name          TEXT NOT NULL,
  price_paise   INTEGER NOT NULL,   -- stored in paise to avoid float errors
  stock         INTEGER NOT NULL,
  category_id   TEXT REFERENCES categories(id),
  updated_at    INTEGER NOT NULL,   -- unix millis, used for delta sync
  synced_at     INTEGER,
  device_id     TEXT NOT NULL
);

-- Outbox pattern: every local write goes here first
CREATE TABLE sync_outbox (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  entity_type   TEXT NOT NULL,
  entity_id     TEXT NOT NULL,
  payload       TEXT NOT NULL,      -- JSON
  created_at    INTEGER NOT NULL
);`,
      },
      {
        type: 'video',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        caption: 'Early prototype: offline add → background sync → second device updates.',
      },
      {
        type: 'heading',
        content: 'Architecture overview',
      },
      {
        type: 'image',
        src: 'https://placehold.co/900x500/100B1A/FF6A1A?text=Architecture+diagram',
        alt: 'Kirana Sync architecture diagram',
        caption: 'Client → WorkManager → Ktor API → PostgreSQL. Offline writes go to the Room outbox first.',
      },
    ],
  },

  // ── 2. BenKi.dev ──────────────────────────────────────────────────────────
  {
    slug: 'benki-dev',
    title: 'BenKi.dev',
    description: 'This site — a dev blog built with Astro, MDX, and zero JS frameworks.',
    longDesc: 'Static-first blog with a custom terminal component, tilt/magnetic animations, and a five-colour design system. Fast by default, fun on purpose.',
    status: 'live',
    tags: ['Astro', 'MDX', 'TypeScript', 'CSS'],
    color: 'var(--purple)',
    github: 'https://github.com',
    demo: 'https://benki.dev',
    heroTagline: 'A developer blog that actually looks like a developer made it.',
    timeline: 'Jan 2024 – present',
    role: 'Designer + developer',
    sections: [
      {
        type: 'text',
        content: `Most dev blogs are generated from a starter and never touched. I wanted mine to feel intentional — a five-colour system (orange, purple, yellow, blue, lime) that's loud but coherent, and a terminal component that makes code feel like it lives in the stack rather than pasted from a docs site.`,
      },
      {
        type: 'heading',
        content: 'Design system',
      },
      {
        type: 'code',
        lang: 'css',
        filename: 'global.css',
        code: `:root {
  --orange:  #FF6A1A;
  --purple:  #9B5CF6;
  --yellow:  #FFD60A;
  --blue:    #3DA9FC;
  --lime:    #B6FF3C;

  --grad-main: linear-gradient(120deg, var(--orange), var(--purple) 55%, var(--blue));
}`,
      },
      {
        type: 'callout',
        icon: '🎨',
        content: 'All colours pass WCAG AA contrast on the dark background. The gradient is used sparingly — logo, primary button, scrollbar thumb, gradient text — so it stays impactful.',
      },
      {
        type: 'heading',
        content: 'Terminal component',
      },
      {
        type: 'code',
        lang: 'astro',
        filename: 'Terminal.astro',
        code: `---
const { title = "zsh — benki.dev" } = Astro.props;
---
<div class="terminal">
  <div class="terminal-bar">
    <span class="dot red"/>
    <span class="dot yellow"/>
    <span class="dot green"/>
    <span class="terminal-title">{title}</span>
  </div>
  <div class="terminal-body">
    <slot />
  </div>
</div>`,
      },
      {
        type: 'image',
        src: 'https://placehold.co/900x480/0D0D14/B6FF3C?text=Terminal+component+preview',
        alt: 'Terminal component in use',
        caption: 'The same Terminal component is reused on the homepage hero, About page, and project listings.',
      },
    ],
  },

  // ── 3. LeetLog ────────────────────────────────────────────────────────────
  {
    slug: 'leetlog',
    title: 'LeetLog',
    description: 'Personal CLI to log and query LeetCode solves from the terminal.',
    longDesc: 'Saves problem slug, difficulty, pattern, and notes to a local SQLite file. `leetlog stats` prints a weekly heatmap and pattern breakdown straight to stdout.',
    status: 'wip',
    tags: ['Python', 'SQLite', 'Click', 'Rich'],
    color: 'var(--blue)',
    github: 'https://github.com',
    demo: null,
    heroTagline: 'Because a spreadsheet is not a CLI tool.',
    timeline: 'Mar 2024 – present',
    role: 'Solo developer',
    sections: [
      {
        type: 'text',
        content: `I track every LeetCode solve — pattern, time taken, notes on what tripped me up. For three months I used a Google Sheet. Then I got annoyed and built LeetLog: a CLI that logs solves to SQLite and renders a heatmap straight in the terminal.`,
      },
      {
        type: 'heading',
        content: 'Usage',
      },
      {
        type: 'code',
        lang: 'bash',
        filename: 'terminal',
        code: `# log a solve
$ leetlog add two-sum --difficulty easy --pattern hash-map --time 8m \\
    --note "classic: complement lookup"

# weekly stats with Rich heatmap
$ leetlog stats --week
┌─────────────────────────────────┐
│  Week 14  ·  12 solves  ·  🔥 4 │
├────────┬───┬───┬───┬───┬───┬───┤
│ Mon    │ ✓ │ ✓ │   │ ✓ │ ✓ │   │
│ DSA    │ 3 │ 2 │ 0 │ 2 │ 3 │ 2 │
└────────┴───┴───┴───┴───┴───┴───┘

# query by pattern
$ leetlog query --pattern sliding-window
Found 7 solves  [longest-substring, min-window-sub ...]`,
      },
      {
        type: 'callout',
        icon: '🗄️',
        content: 'All data is local SQLite — no account, no API key, no internet. The binary is a single pipx-installable wheel.',
      },
      {
        type: 'heading',
        content: 'Schema',
      },
      {
        type: 'code',
        lang: 'python',
        filename: 'models.py',
        code: `from dataclasses import dataclass
from datetime import datetime

@dataclass
class Solve:
    id:         int
    slug:       str          # e.g. "two-sum"
    difficulty: str          # easy | medium | hard
    pattern:    str          # e.g. "sliding-window"
    time_min:   int          # minutes taken
    note:       str
    solved_at:  datetime`,
      },
    ],
  },

  // ── 4. DSA Flashcards ─────────────────────────────────────────────────────
  {
    slug: 'dsa-flashcards',
    title: 'DSA Flashcards',
    description: 'Spaced-repetition flashcard app focused on algorithm patterns.',
    longDesc: 'SM-2 scheduling, category filtering, and a minimal dark UI. No backend — runs fully in the browser with localStorage. Covers arrays, trees, graphs, and DP.',
    status: 'archived',
    tags: ['React', 'TypeScript', 'Vite'],
    color: 'var(--lime)',
    github: 'https://github.com',
    demo: null,
    heroTagline: 'SM-2 spaced repetition for DSA patterns. No backend, no account.',
    timeline: 'Oct 2023 – Dec 2023',
    role: 'Solo developer',
    sections: [
      {
        type: 'text',
        content: `Built to solve one problem: I kept forgetting graph patterns between sessions. SM-2 scheduling means cards I get wrong come back sooner. Cards I ace get spaced further apart. After 6 weeks my graph solve rate went from 40% to 71%.`,
      },
      {
        type: 'callout',
        icon: '📦',
        content: 'Archived because Anki + a shared deck does this better. The code is clean though — a good example of SM-2 in TypeScript.',
      },
      {
        type: 'heading',
        content: 'SM-2 implementation',
      },
      {
        type: 'code',
        lang: 'typescript',
        filename: 'sm2.ts',
        code: `export interface CardState {
  easeFactor: number;   // starts at 2.5
  interval:   number;   // days until next review
  repetitions: number;
}

// quality: 0–5 (0 = blackout, 5 = perfect)
export function sm2(state: CardState, quality: number): CardState {
  if (quality < 3) {
    return { ...state, repetitions: 0, interval: 1 };
  }
  const ef = Math.max(
    1.3,
    state.easeFactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)
  );
  const interval =
    state.repetitions === 0 ? 1 :
    state.repetitions === 1 ? 6 :
    Math.round(state.interval * ef);

  return { easeFactor: ef, interval, repetitions: state.repetitions + 1 };
}`,
      },
      {
        type: 'gallery',
        images: [
          { src: 'https://placehold.co/600x400/100B1A/B6FF3C?text=Card+front', alt: 'Flashcard front' },
          { src: 'https://placehold.co/600x400/0D0D14/3DA9FC?text=Card+back', alt: 'Flashcard back' },
          { src: 'https://placehold.co/600x400/14101F/9B5CF6?text=Stats+view', alt: 'Stats view' },
        ],
      },
    ],
  },

];
// ─────────────────────────────────────────────────────────────────────────────

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const statusConfig: Record<Status, { label: string; color: string }> = {
  live:     { label: 'Live',     color: 'var(--lime)' },
  wip:      { label: 'WIP',      color: 'var(--yellow)' },
  archived: { label: 'Archived', color: 'var(--muted)' },
};
