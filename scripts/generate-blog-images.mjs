#!/usr/bin/env node

/**
 * TRMT Blog Image Generator v3
 *
 * Generates ONE final, ready-to-use image per blog post placeholder.
 * Default: Pollinations.ai (100% KOSTENLOS, kein API Key, kein Signup!)
 *
 * KEY DESIGN DECISION: Only generates styles that work 100% reliably:
 * - Isometric 3D scenes (tech objects, workspaces)
 * - Moody atmospheric still-lifes (hardware, gadgets)
 * - Abstract concept visualizations (gradients, shapes)
 * - NEVER: screenshots, UI mockups, infographics with text, logos
 *
 * Usage:
 *   node scripts/generate-blog-images.mjs                        # All posts (Pollinations Flux)
 *   node scripts/generate-blog-images.mjs --post slug-name       # Specific post
 *   node scripts/generate-blog-images.mjs --dry-run              # Preview prompts only
 *   node scripts/generate-blog-images.mjs --model seedream       # Use Seedream 5.0
 *   node scripts/generate-blog-images.mjs --model flux-pro       # Use Flux Pro
 *   node scripts/generate-blog-images.mjs --provider together    # Together AI (needs key)
 *   node scripts/generate-blog-images.mjs --provider gemini      # Gemini (NOT in EU!)
 *
 * Providers:
 *   pollinations (DEFAULT) — 100% free, no API key, no signup
 *   together               — Flux Schnell, free 3 months (needs TOGETHER_API_KEY)
 *   gemini                 — NOT available in EU/Germany!
 *
 * Models (Pollinations only):
 *   flux         (DEFAULT) — Best for atmospheric/moody scenes
 *   flux-pro               — Higher quality Flux
 *   seedream               — Seedream 5.0, good for objects
 *
 * Setup:
 *   NONE! Just run: node scripts/generate-blog-images.mjs
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, join } from 'path';
import { readdirSync } from 'fs';

// ─── Config ───────────────────────────────────────────────────────
const ROOT = resolve(import.meta.dirname, '..');
const BLOG_DIR = join(ROOT, 'src', 'content', 'blog');
const IMAGE_DIR = join(ROOT, 'static', 'images', 'blog');
const ENV_FILE = join(ROOT, '.env');

// Parse CLI args
const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const POST_FLAG = args.indexOf('--post');
const TARGET_POST = POST_FLAG !== -1 ? args[POST_FLAG + 1] : null;
const PROVIDER_FLAG = args.indexOf('--provider');
const PROVIDER = PROVIDER_FLAG !== -1 ? args[PROVIDER_FLAG + 1] : 'pollinations';
const MODEL_FLAG = args.indexOf('--model');
const MODEL = MODEL_FLAG !== -1 ? args[MODEL_FLAG + 1] : 'flux';

// Load .env (only needed for together/gemini providers)
function loadEnv() {
  if (!existsSync(ENV_FILE)) return;
  const lines = readFileSync(ENV_FILE, 'utf-8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIndex = trimmed.indexOf('=');
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    const value = trimmed.slice(eqIndex + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnv();

// ─── Bulletproof Prompt Engineering ────────────────────────────────
//
// WHY THIS MATTERS:
// AI image generation fails at: screenshots, specific UIs, text in images,
// brand logos, infographics, comparison charts.
//
// AI image generation excels at: moody still-lifes, isometric 3D scenes,
// atmospheric lighting, abstract tech concepts, object compositions.
//
// This transformer converts ANY TODO description into a style that
// produces professional results 100% of the time.

/**
 * Topic-to-concept mapping.
 * Maps common blog topics to visual concepts that AI renders well.
 */
const TOPIC_VISUALS = {
  // Software/Tools → workspace/device scenes
  'n8n': 'interconnected glowing nodes and pathways on a dark circuit board, representing workflow automation',
  'home assistant': 'smart home devices (temperature sensor, light bulb, motion detector) arranged on a dark surface with subtle ambient glow',
  'obsidian': 'a glowing crystal brain made of interconnected nodes and links, floating above an open notebook',
  '3d-druck': 'a 3D printer nozzle creating a detailed miniature object, with filament spool and finished prints nearby',
  'fotografie': 'a camera lens with light rays passing through it, surrounded by editing tools and color swatches',
  'lightroom': 'a camera lens splitting light into warm and cool tones, with before/after gradient',
  'photoshop': 'digital paint brush strokes transforming a photo, with layers floating in 3D space',
  'cursor': 'a glowing code editor floating in dark space with AI suggestion highlights in amber',
  'claude': 'an AI assistant visualization with flowing data streams and code blocks in warm amber light',
  'copilot': 'a pair of hands typing on a keyboard with AI code suggestions floating above in holographic style',
  'sora': 'a film reel transforming into flowing digital video particles, cinematic lighting',
  'runway': 'a movie clapperboard dissolving into AI-generated video frames, dramatic lighting',
  'kling': 'video frames morphing and blending in mid-air, with a cinematic film grain texture',
  'esp32': 'a small microcontroller board with colorful wires, sensors, and LEDs on a dark workbench',
  'arduino': 'electronic components (resistors, LEDs, wires) arranged artistically on a dark breadboard',
  'v0': 'a blank canvas transforming into a website wireframe with AI sparkle effects',
  'bolt': 'website components assembling themselves like building blocks in isometric view',
  'lovable': 'a smartphone screen showing a clean app interface being assembled by invisible hands',
  'ollama': 'a glowing AI brain running inside a transparent computer case, with RAM and GPU visible',
  'lm studio': 'a workstation with multiple monitors showing AI model outputs, warm desk lamp lighting',
  'smart home': 'connected home devices floating in a dark room with ambient sensor glows in teal and amber',
  'raspberry pi': 'a Raspberry Pi board with connected cables and sensors on a dark surface, LED status lights glowing',
  'zigbee': 'a mesh network visualization with glowing connection points between small devices',
  'automatisierung': 'interlocking gears and conveyor belts made of light, processing data packets',
  'workflow': 'a flowing river of connected steps and checkpoints, glowing pathways on dark background',
  'produktivitaet': 'a clean minimal desk with notebook, pen, and digital timer, warm focused lighting',
  'vergleich': 'two objects on opposite sides of a balanced scale, dramatic side lighting',
  'benchmark': 'a racing track with data visualization bars rising from the lanes, competitive aesthetic',
  'kosten': 'coins and price tags arranged artistically with a calculator, warm amber lighting',
};

/**
 * Detect if the description asks for something AI can't do well.
 * Returns a transformed description that AI CAN do.
 */
function transformToReliableStyle(description) {
  const lower = description.toLowerCase();

  // Screenshot/UI requests → atmospheric device/workspace scene
  if (lower.includes('screenshot') || lower.includes('interface') || lower.includes('ui ')) {
    return description
      .replace(/screenshot:?\s*/gi, '')
      .replace(/interface:?\s*/gi, '')
      + ' — as an atmospheric workspace scene, no actual UI elements';
  }

  // Infographic/chart requests → abstract data visualization
  if (lower.includes('infografik') || lower.includes('chart') || lower.includes('grafik') || lower.includes('vergleich')) {
    return description
      .replace(/infografik:?\s*/gi, '')
      .replace(/chart:?\s*/gi, '')
      + ' — as abstract visual comparison with shapes and colors, no text';
  }

  // Logo/brand requests → generic concept
  if (lower.includes('logo') || lower.includes('brand')) {
    return description
      .replace(/logo[s]?:?\s*/gi, '')
      + ' — as abstract geometric shapes representing the concept';
  }

  // Foto requests → keep but enhance
  if (lower.includes('foto:') || lower.includes('photo:')) {
    return description.replace(/foto:?\s*/gi, '').replace(/photo:?\s*/gi, '');
  }

  return description;
}

/**
 * Detects the visual category from a TODO description and maps it
 * to a reliable AI-friendly visual concept.
 */
function detectVisualConcept(description, postTitle) {
  const combined = `${description} ${postTitle}`.toLowerCase();

  for (const [keyword, visual] of Object.entries(TOPIC_VISUALS)) {
    if (combined.includes(keyword.toLowerCase())) {
      return visual;
    }
  }

  // Fallback: generic tech blog visual
  return 'modern tech workspace with devices and ambient lighting on a dark surface';
}

/**
 * Creates ONE bulletproof prompt that produces a usable result every time.
 */
function createFinalPrompt(todoDescription, altText, postTitle, postCategory) {
  const safeDescription = transformToReliableStyle(todoDescription);
  const visualConcept = detectVisualConcept(todoDescription, postTitle);

  const prompt = [
    `${safeDescription}.`,
    `Visual concept: ${visualConcept}.`,
    'Style: moody tech photography with cinematic lighting.',
    'Dark charcoal background (near black).',
    'Key light in warm amber/honey tone.',
    'Accent light in cool teal.',
    'Subtle film grain texture.',
    'Sharp focus on main subject, gentle bokeh on background.',
    'Composition: clean, minimal, centered or rule-of-thirds.',
    'Wide 16:9 aspect ratio, suitable as blog header image.',
    'High resolution, professional quality.',
    'Absolutely no text, no watermarks, no logos, no UI elements, no human faces.',
    'No busy or cluttered backgrounds.',
  ].join(' ');

  return prompt;
}

// ─── API Providers ─────────────────────────────────────────────────

/**
 * Pollinations.ai — 100% FREE, no API key, no signup
 * Berlin-based, open-source, uses Flux/Seedream/GPT Image models
 * Simple URL-based API: fetch image bytes directly
 */
async function generateWithPollinations(prompt, outputPath) {
  const encodedPrompt = encodeURIComponent(prompt);

  // Map model names to Pollinations model IDs
  const modelMap = {
    'flux': 'flux',
    'flux-pro': 'flux-pro',
    'seedream': 'seedream',
  };

  const pollinationsModel = modelMap[MODEL] || 'flux';

  const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?` + new URLSearchParams({
    width: '1280',
    height: '720',
    model: pollinationsModel,
    nologo: 'true',
    enhance: 'true',
    seed: String(Math.floor(Math.random() * 999999)),
  }).toString();

  // Pollinations returns the image directly as bytes
  const response = await fetch(url, {
    headers: { 'Accept': 'image/png,image/*' },
    redirect: 'follow',
  });

  if (!response.ok) {
    throw new Error(`Pollinations error (${response.status}): ${response.statusText}`);
  }

  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('image')) {
    const text = await response.text();
    throw new Error(`Pollinations returned non-image response: ${text.substring(0, 200)}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());

  if (buffer.length < 1000) {
    throw new Error(`Image too small (${buffer.length} bytes), likely an error`);
  }

  writeFileSync(outputPath, buffer);
}

/**
 * Together AI — Flux Schnell (free 3 months, needs API key)
 */
async function generateWithFlux(prompt, outputPath) {
  const apiKey = process.env.TOGETHER_API_KEY;
  if (!apiKey) {
    throw new Error('TOGETHER_API_KEY not set. Get one free: https://api.together.ai');
  }

  const models = [
    'black-forest-labs/FLUX.1-schnell-Free',
    'black-forest-labs/FLUX.1-schnell'
  ];

  for (const model of models) {
    const response = await fetch('https://api.together.xyz/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model,
        prompt,
        width: 1280,
        height: 720,
        steps: 4,
        n: 1,
        response_format: 'b64_json'
      })
    });

    if (response.ok) {
      const data = await response.json();
      if (data.data?.[0]?.b64_json) {
        writeFileSync(outputPath, Buffer.from(data.data[0].b64_json, 'base64'));
        return;
      } else if (data.data?.[0]?.url) {
        const imgRes = await fetch(data.data[0].url);
        writeFileSync(outputPath, Buffer.from(await imgRes.arrayBuffer()));
        return;
      }
    }

    if (model.includes('Free')) {
      console.log('      Free model unavailable, trying paid...');
      continue;
    }

    throw new Error(`Flux error: ${await response.text()}`);
  }
}

/**
 * Gemini API — NOT available in EU/Germany!
 */
async function generateWithGemini(prompt, outputPath) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY not set. Get one: https://aistudio.google.com/apikey');
  }

  console.log('      ⚠️  WARNUNG: Gemini Image Gen ist in der EU blockiert!');

  const { GoogleGenAI } = await import('@google/genai');
  const ai = new GoogleGenAI({ apiKey });

  const response = await ai.models.generateImages({
    model: 'imagen-4.0-generate-001',
    prompt: prompt,
    config: { numberOfImages: 1, aspectRatio: '16:9' },
  });

  if (response.generatedImages && response.generatedImages.length > 0) {
    const buffer = Buffer.from(response.generatedImages[0].image.imageBytes, 'base64');
    writeFileSync(outputPath, buffer);
    return;
  }

  throw new Error('No images in Gemini response');
}

/**
 * Route to correct provider
 */
async function generateImage(prompt, outputPath) {
  switch (PROVIDER) {
    case 'pollinations':
      return generateWithPollinations(prompt, outputPath);
    case 'together':
    case 'flux':
      return generateWithFlux(prompt, outputPath);
    case 'gemini':
      return generateWithGemini(prompt, outputPath);
    default:
      return generateWithPollinations(prompt, outputPath);
  }
}

// ─── Blog Post Scanner ─────────────────────────────────────────────

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

      todos.push({ description, altText: altText || description, lineIndex: i, hasAltLine });
    }
  }
  return todos;
}

function getPostMeta(content) {
  const title = content.match(/^title:\s*"(.+?)"/m)?.[1] || 'Blog Post';
  const slug = content.match(/^slug:\s*"(.+?)"/m)?.[1] || 'unknown';
  const category = content.match(/^category:\s*"(.+?)"/m)?.[1] || 'tech';
  return { title, slug, category };
}

// ─── Main ──────────────────────────────────────────────────────────

async function main() {
  const providerInfo = {
    pollinations: `Pollinations.ai (${MODEL}, 100% KOSTENLOS, kein API Key!)`,
    together: 'Together AI (Flux Schnell, 3 Monate kostenlos)',
    flux: 'Together AI (Flux Schnell, 3 Monate kostenlos)',
    gemini: 'Gemini (Imagen 4, NICHT verfuegbar in EU!)',
  };

  console.log('\n\u{1f5bc}\ufe0f  TRMT Blog Image Generator v3');
  console.log(`   Provider: ${providerInfo[PROVIDER] || PROVIDER}`);
  console.log(`   Output:   1 final image per placeholder`);
  console.log(`   Mode:     ${DRY_RUN ? 'DRY RUN (keine Bilder)' : 'GENERATE'}`);
  console.log('');

  if (!existsSync(IMAGE_DIR)) {
    mkdirSync(IMAGE_DIR, { recursive: true });
  }

  const posts = readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.md'))
    .filter(f => !TARGET_POST || f.includes(TARGET_POST));

  if (posts.length === 0) {
    console.log('Keine passenden Posts gefunden.');
    return;
  }

  let totalTodos = 0;
  let totalGenerated = 0;
  let totalSkipped = 0;
  let totalErrors = 0;

  for (const postFile of posts) {
    const postPath = join(BLOG_DIR, postFile);
    const content = readFileSync(postPath, 'utf-8');
    const todos = extractImageTodos(content);

    if (todos.length === 0) continue;

    const { title, slug, category } = getPostMeta(content);

    console.log(`\n\u{1f4dd} ${title}`);
    console.log(`   ${todos.length} Platzhalter`);

    for (let j = 0; j < todos.length; j++) {
      const todo = todos[j];
      totalTodos++;

      const fileName = `${slug}-${j + 1}.png`;
      const outputPath = join(IMAGE_DIR, fileName);

      // Skip if already exists
      if (existsSync(outputPath)) {
        console.log(`   \u23ed\ufe0f  [${j + 1}] ${fileName} existiert bereits`);
        totalSkipped++;
        continue;
      }

      // Build prompt
      const prompt = createFinalPrompt(todo.description, todo.altText, title, category);

      console.log(`\n   \u{1f3a8} [${j + 1}/${todos.length}] ${todo.description}`);

      if (DRY_RUN) {
        console.log(`      File:   ${fileName}`);
        console.log(`      Prompt: ${prompt.substring(0, 150)}...`);
        continue;
      }

      // Retry logic: try up to 3 times
      let success = false;
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          if (attempt > 1) console.log(`      Retry ${attempt}/3...`);
          else console.log(`      Generiere...`);

          await generateImage(prompt, outputPath);

          const sizeKB = (readFileSync(outputPath).length / 1024).toFixed(0);
          console.log(`      \u2705 ${fileName} (${sizeKB} KB)`);
          totalGenerated++;
          success = true;
          break;
        } catch (err) {
          if (attempt === 3) {
            console.error(`      \u274c ${err.message}`);
            totalErrors++;
          } else {
            console.log(`      \u26a0\ufe0f  ${err.message}, retrying...`);
            await new Promise(r => setTimeout(r, 3000));
          }
        }
      }

      // Rate limiting: be nice to free APIs
      if (success) {
        await new Promise(r => setTimeout(r, 2500));
      }
    }
  }

  // ─── Auto-apply: replace TODOs with image markdown ─────────
  if (totalGenerated > 0 && !DRY_RUN) {
    console.log('\n\n\u{1f4dd} Blog-Posts mit generierten Bildern aktualisieren...');

    for (const postFile of posts) {
      const postPath = join(BLOG_DIR, postFile);
      let content = readFileSync(postPath, 'utf-8');
      const todos = extractImageTodos(content);

      if (todos.length === 0) continue;

      const { slug } = getPostMeta(content);
      let modified = false;

      // Process in reverse order to preserve line indices
      for (let j = todos.length - 1; j >= 0; j--) {
        const todo = todos[j];
        const fileName = `${slug}-${j + 1}.png`;
        const outputPath = join(IMAGE_DIR, fileName);

        if (!existsSync(outputPath)) continue;

        const lines = content.split('\n');
        const imgMarkdown = `![${todo.altText}](/images/blog/${fileName})`;

        if (todo.hasAltLine) {
          lines.splice(todo.lineIndex, 2, imgMarkdown);
        } else {
          lines[todo.lineIndex] = imgMarkdown;
        }

        content = lines.join('\n');
        modified = true;
      }

      if (modified) {
        writeFileSync(postPath, content);
        console.log(`   \u2705 ${postFile} aktualisiert`);
      }
    }
  }

  // ─── Summary ──────────────────────────────────────────────
  console.log('\n' + '\u2500'.repeat(60));
  console.log(`\n\u2705 Fertig!`);
  console.log(`   ${totalTodos} Platzhalter gefunden`);
  if (DRY_RUN) {
    console.log(`   Ohne --dry-run ausfuehren um Bilder zu generieren.`);
  } else {
    console.log(`   ${totalGenerated} Bilder generiert`);
    console.log(`   ${totalSkipped} uebersprungen (existierten bereits)`);
    if (totalErrors > 0) console.log(`   ${totalErrors} Fehler`);
    if (totalGenerated > 0) {
      console.log(`\n   Bilder gespeichert in: static/images/blog/`);
      console.log(`   Blog-Posts automatisch aktualisiert.`);
      console.log(`\n   Naechster Schritt: git add + commit + push`);
    }
  }
}

main().catch(err => {
  console.error('\n\u274c Fatal:', err.message);
  process.exit(1);
});
