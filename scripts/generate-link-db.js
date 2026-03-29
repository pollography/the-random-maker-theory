#!/usr/bin/env node
/**
 * TRMT Link Database Generator
 * Scannt alle Blog-Posts und Podcast-Episoden und erstellt
 * eine JSON-Datenbank für interne Verlinkung.
 *
 * Usage: node scripts/generate-link-db.js
 * Output: ../../config/link-database.json (Claude_Code/config/)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TRMT_ROOT = path.join(__dirname, '..');
const CLAUDE_CODE_ROOT = path.join(TRMT_ROOT, '..');

const BLOG_DIR = path.join(TRMT_ROOT, 'src/content/blog');
const PODCAST_DIR = path.join(TRMT_ROOT, 'src/content/podcast');
const OUTPUT_FILE = path.join(CLAUDE_CODE_ROOT, 'config/link-database.json');

const BASE_URL = 'https://therandommakertheory.com';

// Parst Frontmatter aus Markdown ohne externe Dependencies
function parseFrontmatter(content) {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!match) return null;

  const fm = {};
  const lines = match[1].split('\n');

  for (const line of lines) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;

    const key = line.substring(0, colonIdx).trim();
    let value = line.substring(colonIdx + 1).trim();

    // Anführungszeichen entfernen
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    // Arrays parsen: ["tag1", "tag2"]
    if (value.startsWith('[')) {
      try {
        fm[key] = JSON.parse(value.replace(/'/g, '"'));
      } catch {
        fm[key] = [];
      }
    } else if (value === 'true') {
      fm[key] = true;
    } else if (value === 'false') {
      fm[key] = false;
    } else if (value !== '' && !isNaN(Number(value))) {
      fm[key] = Number(value);
    } else {
      fm[key] = value;
    }
  }

  return fm;
}

function processDirectory(dir, type) {
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
  const entries = [];

  for (const file of files) {
    const content = fs.readFileSync(path.join(dir, file), 'utf-8');
    const fm = parseFrontmatter(content);

    if (!fm || fm.draft === true) continue;

    const slug = fm.slug || path.basename(file, '.md');
    const urlPath = type === 'blog' ? `/blog/${slug}` : `/podcast/${slug}`;

    // Wortanzahl für Lesezeit
    const bodyMatch = content.match(/^---[\s\S]*?---\s*([\s\S]*)$/);
    const body = bodyMatch ? bodyMatch[1] : '';
    const wordCount = body.trim().split(/\s+/).length;
    const readingTime = fm.readingTime || Math.ceil(wordCount / 200);

    entries.push({
      slug,
      title: fm.title || '',
      titleAccent: fm.titleAccent || '',
      description: fm.description || '',
      url: urlPath,
      fullUrl: `${BASE_URL}${urlPath}`,
      date: fm.date || '',
      category: fm.category || 'general',
      tags: Array.isArray(fm.tags) ? fm.tags : [],
      readingTime,
      heroImage: fm.heroImage || null,
      type,
    });
  }

  return entries.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Datenbank aufbauen
const posts = processDirectory(BLOG_DIR, 'blog');
const podcasts = processDirectory(PODCAST_DIR, 'podcast');
const all = [...posts, ...podcasts];

// Indizes für schnelle Lookups
const byCategory = {};
const byTag = {};

for (const item of all) {
  if (item.category) {
    if (!byCategory[item.category]) byCategory[item.category] = [];
    byCategory[item.category].push(item.slug);
  }
  for (const tag of item.tags) {
    if (!byTag[tag]) byTag[tag] = [];
    byTag[tag].push(item.slug);
  }
}

const allTags = Object.keys(byTag).sort();
const allCategories = Object.keys(byCategory).sort();

const db = {
  generated: new Date().toISOString(),
  baseUrl: BASE_URL,
  stats: {
    totalPosts: posts.length,
    totalPodcasts: podcasts.length,
    totalEntries: all.length,
    categories: allCategories.length,
    tags: allTags.length,
  },
  posts,
  podcasts,
  byCategory,
  byTag,
  allTags,
  allCategories,
};

// Output sicherstellen
const outputDir = path.dirname(OUTPUT_FILE);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(db, null, 2), 'utf-8');

console.log(`✓ Link-Datenbank generiert:`);
console.log(`  ${posts.length} Blog-Posts, ${podcasts.length} Podcasts`);
console.log(`  ${allCategories.length} Kategorien: ${allCategories.join(', ')}`);
console.log(`  ${allTags.length} Tags: ${allTags.join(', ')}`);
console.log(`  Gespeichert: ${OUTPUT_FILE}`);
