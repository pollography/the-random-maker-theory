import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, extname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { extractLocalImagePaths } from '../src/lib/utils/image-sitemap.js';

const SUPPORTED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

function readUInt24LE(buffer, offset) {
	return buffer[offset] | (buffer[offset + 1] << 8) | (buffer[offset + 2] << 16);
}

function readPngDimensions(buffer) {
	if (buffer.length < 24 || buffer.toString('ascii', 1, 4) !== 'PNG') return null;
	return {
		width: buffer.readUInt32BE(16),
		height: buffer.readUInt32BE(20),
		format: 'png'
	};
}

function readJpegDimensions(buffer) {
	if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) return null;
	let offset = 2;
	while (offset + 9 < buffer.length) {
		if (buffer[offset] !== 0xff) {
			offset += 1;
			continue;
		}
		const marker = buffer[offset + 1];
		if (marker === 0xd8 || marker === 0xd9) {
			offset += 2;
			continue;
		}
		const size = buffer.readUInt16BE(offset + 2);
		if (size < 2) return null;
		if (
			(marker >= 0xc0 && marker <= 0xc3) ||
			(marker >= 0xc5 && marker <= 0xc7) ||
			(marker >= 0xc9 && marker <= 0xcb) ||
			(marker >= 0xcd && marker <= 0xcf)
		) {
			return {
				width: buffer.readUInt16BE(offset + 7),
				height: buffer.readUInt16BE(offset + 5),
				format: 'jpeg'
			};
		}
		offset += size + 2;
	}
	return null;
}

function readWebpDimensions(buffer) {
	if (
		buffer.length < 30 ||
		buffer.toString('ascii', 0, 4) !== 'RIFF' ||
		buffer.toString('ascii', 8, 12) !== 'WEBP'
	) return null;

	let offset = 12;
	while (offset + 8 <= buffer.length) {
		const chunkType = buffer.toString('ascii', offset, offset + 4);
		const chunkSize = buffer.readUInt32LE(offset + 4);
		const dataOffset = offset + 8;
		if (dataOffset + chunkSize > buffer.length) return null;

		if (chunkType === 'VP8X' && chunkSize >= 10) {
			return {
				width: readUInt24LE(buffer, dataOffset + 4) + 1,
				height: readUInt24LE(buffer, dataOffset + 7) + 1,
				format: 'webp'
			};
		}

		if (chunkType === 'VP8L' && chunkSize >= 5 && buffer[dataOffset] === 0x2f) {
			const b1 = buffer[dataOffset + 1];
			const b2 = buffer[dataOffset + 2];
			const b3 = buffer[dataOffset + 3];
			const b4 = buffer[dataOffset + 4];
			return {
				width: 1 + (b1 | ((b2 & 0x3f) << 8)),
				height: 1 + ((b2 >> 6) | (b3 << 2) | ((b4 & 0x0f) << 10)),
				format: 'webp'
			};
		}

		if (
			chunkType === 'VP8 ' &&
			chunkSize >= 10 &&
			buffer[dataOffset + 3] === 0x9d &&
			buffer[dataOffset + 4] === 0x01 &&
			buffer[dataOffset + 5] === 0x2a
		) {
			return {
				width: buffer.readUInt16LE(dataOffset + 6) & 0x3fff,
				height: buffer.readUInt16LE(dataOffset + 8) & 0x3fff,
				format: 'webp'
			};
		}

		offset = dataOffset + chunkSize + (chunkSize % 2);
	}
	return null;
}

export function readImageDimensions(filePath) {
	const buffer = readFileSync(filePath);
	const extension = extname(filePath).toLowerCase();
	const dimensions = extension === '.png'
		? readPngDimensions(buffer)
		: extension === '.jpg' || extension === '.jpeg'
			? readJpegDimensions(buffer)
			: extension === '.webp'
				? readWebpDimensions(buffer)
				: null;

	if (!dimensions?.width || !dimensions?.height) {
		throw new Error(`Bildabmessungen konnten nicht gelesen werden: ${filePath}`);
	}
	return dimensions;
}

function walkImages(directory) {
	const files = [];
	for (const entry of readdirSync(directory, { withFileTypes: true })) {
		const path = join(directory, entry.name);
		if (entry.isDirectory()) files.push(...walkImages(path));
		else if (entry.isFile() && SUPPORTED_EXTENSIONS.has(extname(entry.name).toLowerCase())) files.push(path);
	}
	return files;
}

function publicPath(staticImagesRoot, filePath) {
	return `/images/${relative(staticImagesRoot, filePath).split(sep).join('/')}`;
}

function candidateVariantPaths(path) {
	const extension = extname(path);
	const stem = path.slice(0, -extension.length);
	const parts = path.split('/');
	const fileName = parts.at(-1);
	const directory = parts.slice(0, -1).join('/');
	const candidates = [];

	if (directory.endsWith('/thumbs')) {
		candidates.push(`${directory.slice(0, -'/thumbs'.length)}/${fileName}`);
	} else {
		candidates.push(`${directory}/thumbs/${fileName}`);
	}
	if (stem.endsWith('-thumb')) candidates.push(`${stem.slice(0, -'-thumb'.length)}${extension}`);
	else candidates.push(`${stem}-thumb${extension}`);
	return candidates;
}

function collectVariants(path, baseEntries) {
	const candidates = [path, ...candidateVariantPaths(path)];
	const byWidth = new Map();
	const source = baseEntries[path];
	const sourceRatio = source.width / source.height;
	for (const candidate of candidates) {
		const entry = baseEntries[candidate];
		if (!entry) continue;
		const candidateRatio = entry.width / entry.height;
		if (Math.abs(candidateRatio / sourceRatio - 1) > 0.01) continue;
		const current = byWidth.get(entry.width);
		if (!current || candidate.length < current.src.length) {
			byWidth.set(entry.width, { src: candidate, width: entry.width });
		}
	}
	return [...byWidth.values()].sort((a, b) => a.width - b.width);
}

export function buildImageMetadata(staticImagesRoot) {
	const root = resolve(staticImagesRoot);
	const baseEntries = {};
	for (const filePath of walkImages(root).sort()) {
		const path = publicPath(root, filePath);
		baseEntries[path] = readImageDimensions(filePath);
	}

	const metadata = {};
	for (const path of Object.keys(baseEntries).sort()) {
		metadata[path] = {
			...baseEntries[path],
			variants: collectVariants(path, baseEntries)
		};
	}
	return metadata;
}

export function writeImageMetadata({ staticImagesRoot, outputPath }) {
	const metadata = buildImageMetadata(staticImagesRoot);
	const source = `// Generated by scripts/generate-image-metadata.mjs. Do not edit by hand.\n/** @type {Record<string, { width: number; height: number; format: string; variants: Array<{ src: string; width: number }> }>} */\nexport const imageMetadata = ${JSON.stringify(metadata, null, '\t')};\n`;
	writeFileSync(outputPath, source, 'utf8');
	return metadata;
}

export function buildBlogImageUsage(blogContentRoot) {
	const usage = {};
	for (const fileName of readdirSync(blogContentRoot).filter((name) => name.endsWith('.md')).sort()) {
		const source = readFileSync(join(blogContentRoot, fileName), 'utf8');
		const slug = source.match(/^slug:\s*["']?([^\r\n"']+)/m)?.[1]?.trim()
			?? fileName.replace(/\.md$/, '');
		const heroImage = source.match(/^heroImage:\s*["']?(\/images\/[^\r\n"']+)/m)?.[1]?.trim();
		usage[slug] = [...new Set([
			...(heroImage ? [heroImage] : []),
			...extractLocalImagePaths(source)
		])];
	}
	return usage;
}

export function writeBlogImageUsage({ blogContentRoot, outputPath }) {
	const usage = buildBlogImageUsage(blogContentRoot);
	const source = `// Generated by scripts/generate-image-metadata.mjs. Do not edit by hand.\n/** @type {Record<string, string[]>} */\nexport const blogImageUsage = ${JSON.stringify(usage, null, '\t')};\n`;
	writeFileSync(outputPath, source, 'utf8');
	return usage;
}

const currentFile = fileURLToPath(import.meta.url);
if (process.argv[1] && resolve(process.argv[1]) === currentFile) {
	const projectRoot = resolve(dirname(currentFile), '..');
	const outputPath = join(projectRoot, 'src/lib/data/image-metadata.generated.js');
	const metadata = writeImageMetadata({
		staticImagesRoot: join(projectRoot, 'static/images'),
		outputPath
	});
	const usage = writeBlogImageUsage({
		blogContentRoot: join(projectRoot, 'src/content/blog'),
		outputPath: join(projectRoot, 'src/lib/data/blog-image-usage.generated.js')
	});
	console.log(`Generated ${Object.keys(metadata).length} image metadata entries and ${Object.keys(usage).length} blog image maps.`);
}
