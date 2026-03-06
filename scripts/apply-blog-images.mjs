#!/usr/bin/env node

/**
 * TRMT Blog Image Applier
 *
 * After generating images with generate-blog-images.mjs and choosing
 * the best variant (A or B) for each placeholder, this script replaces
 * TODO comments in blog posts with actual image markdown.
 *
 * Usage:
 *   node scripts/apply-blog-images.mjs                    # Interactive mode
 *   node scripts/apply-blog-images.mjs --auto a           # Auto-pick variant A for all
 *   node scripts/apply-blog-images.mjs --post slug-name   # Process specific post
 *   node scripts/apply-blog-images.mjs --dry-run          # Preview changes
 *
 * What it does:
 *   1. Scans blog posts for TODO: Bild placeholders
 *   2. Checks if corresponding images exist in static/images/blog/
 *   3. Asks you to pick variant A or B (or auto-picks)
 *   4. Replaces TODO comments with markdown image syntax
 *   5. Renames chosen image to clean filename (without -a/-b suffix)
 */

import { readFileSync, writeFileSync, existsSync, renameSync, unlinkSync } from 'fs';
import { resolve, join } from 'path';
import { readdirSync } from 'fs';
import { createInterface } from 'readline';

const ROOT = resolve(import.meta.dirname, '..');
const BLOG_DIR = join(ROOT, 'src', 'content', 'blog');
const IMAGE_DIR = join(ROOT, 'static', 'images', 'blog');

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const POST_FLAG = args.indexOf('--post');
const TARGET_POST = POST_FLAG !== -1 ? args[POST_FLAG + 1] : null;
const AUTO_FLAG = args.indexOf('--auto');
const AUTO_PICK = AUTO_FLAG !== -1 ? args[AUTO_FLAG + 1] : null;

function extractImageTodos(content) {
  const lines = content.split('\n');
  const todos = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const todoMatch = line.match(/<!--\s*TODO:\s*Bild\s*[—–-]\s*(.+?)\s*-->/i);
    if (todoMatch) {
      const description = todoMatch[1].trim();
      let altText = '';
      let hasAltLine = false;

      if (i + 1 < lines.length) {
        const altMatch = lines[i + 1].trim().match(/<!--\s*Alt:\s*"(.+?)"\s*-->/i);
        if (altMatch) {
          altText = altMatch[1].trim();
          hasAltLine = true;
        }
      }

      todos.push({
        description,
        altText: altText || description,
        lineIndex: i,
        hasAltLine
      });
    }
  }
  return todos;
}

function getPostSlug(content) {
  const slugMatch = content.match(/^slug:\s*"(.+?)"/m);
  return slugMatch ? slugMatch[1] : 'unknown';
}

function getPostTitle(content) {
  const titleMatch = content.match(/^title:\s*"(.+?)"/m);
  return titleMatch ? titleMatch[1] : 'Blog Post';
}

async function askUser(question) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => {
    rl.question(question, answer => {
      rl.close();
      resolve(answer.trim().toLowerCase());
    });
  });
}

async function main() {
  console.log('\n🖼️  TRMT Blog Image Applier');
  console.log(`   Mode: ${DRY_RUN ? 'DRY RUN' : AUTO_PICK ? `AUTO (variant ${AUTO_PICK.toUpperCase()})` : 'INTERACTIVE'}`);
  console.log('');

  const posts = readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.md'))
    .filter(f => !TARGET_POST || f.includes(TARGET_POST));

  let applied = 0;

  for (const postFile of posts) {
    const postPath = join(BLOG_DIR, postFile);
    let content = readFileSync(postPath, 'utf-8');
    const todos = extractImageTodos(content);

    if (todos.length === 0) continue;

    const slug = getPostSlug(content);
    const title = getPostTitle(content);
    let modified = false;

    console.log(`\n📝 ${title}`);

    for (let j = 0; j < todos.length; j++) {
      const todo = todos[j];
      const baseFileName = `${slug}-${j + 1}`;
      const fileA = `${baseFileName}-a.png`;
      const fileB = `${baseFileName}-b.png`;
      const finalFile = `${baseFileName}.png`;
      const pathA = join(IMAGE_DIR, fileA);
      const pathB = join(IMAGE_DIR, fileB);
      const finalPath = join(IMAGE_DIR, finalFile);

      // Check if final image already exists (already applied)
      if (existsSync(finalPath)) {
        // Check if markdown already has the image
        if (content.includes(`/images/blog/${finalFile}`)) {
          console.log(`   ⏭️  [${j + 1}] Bereits eingebaut`);
          continue;
        }
      }

      const hasA = existsSync(pathA);
      const hasB = existsSync(pathB);

      if (!hasA && !hasB) {
        console.log(`   ⚠️  [${j + 1}] Keine Bilder gefunden für: ${todo.description}`);
        console.log(`       Erst generate-blog-images.mjs ausführen!`);
        continue;
      }

      console.log(`   🎨 [${j + 1}] ${todo.description}`);
      console.log(`       Variante A (Photo): ${hasA ? '✅' : '❌'} ${fileA}`);
      console.log(`       Variante B (Clay):  ${hasB ? '✅' : '❌'} ${fileB}`);

      let choice = AUTO_PICK;

      if (!choice) {
        if (hasA && hasB) {
          choice = await askUser('       Wähle (a/b/skip): ');
        } else {
          choice = hasA ? 'a' : 'b';
          console.log(`       Auto: ${choice.toUpperCase()} (nur eine Variante vorhanden)`);
        }
      }

      if (choice === 'skip' || choice === 's') {
        console.log('       ⏭️  Übersprungen');
        continue;
      }

      if (choice !== 'a' && choice !== 'b') {
        console.log('       ⚠️  Ungültige Wahl, überspringe');
        continue;
      }

      const chosenPath = choice === 'a' ? pathA : pathB;
      const otherPath = choice === 'a' ? pathB : pathA;

      if (!existsSync(chosenPath)) {
        console.log(`       ❌ Gewählte Variante existiert nicht`);
        continue;
      }

      if (DRY_RUN) {
        console.log(`       Would: ${choice === 'a' ? fileA : fileB} → ${finalFile}`);
        console.log(`       Would replace TODO comment with: ![${todo.altText}](/images/blog/${finalFile})`);
        continue;
      }

      // Rename chosen file to final name
      renameSync(chosenPath, finalPath);
      console.log(`       ✅ ${choice === 'a' ? fileA : fileB} → ${finalFile}`);

      // Delete other variant if exists
      if (existsSync(otherPath)) {
        unlinkSync(otherPath);
        console.log(`       🗑️  ${choice === 'a' ? fileB : fileA} gelöscht`);
      }

      // Replace TODO comment block with image markdown
      const lines = content.split('\n');
      const imgMarkdown = `![${todo.altText}](/images/blog/${finalFile})`;

      // Find and replace the TODO line(s)
      const todoLineContent = lines[todo.lineIndex];
      if (todo.hasAltLine) {
        // Replace both TODO and Alt lines
        lines.splice(todo.lineIndex, 2, imgMarkdown);
      } else {
        // Replace just the TODO line
        lines[todo.lineIndex] = imgMarkdown;
      }

      content = lines.join('\n');
      modified = true;
      applied++;

      console.log(`       ✅ Markdown aktualisiert`);
    }

    if (modified && !DRY_RUN) {
      writeFileSync(postPath, content);
      console.log(`   💾 ${postFile} gespeichert`);
    }
  }

  console.log('\n' + '─'.repeat(60));
  console.log(`\n✅ Fertig! ${applied} Bilder eingebaut.`);
}

main().catch(err => {
  console.error('\n❌ Fatal error:', err.message);
  process.exit(1);
});
