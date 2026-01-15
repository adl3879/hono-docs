import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

export type CacheEntry = {
  hash: string;
};

export type CacheData = Record<string, CacheEntry>;

const CACHE_DIR = path.resolve(process.cwd(), "node_modules/.cache/hono-docs");
const CACHE_FILE = path.join(CACHE_DIR, "cache.json");

export function loadCache(): CacheData {
  if (!fs.existsSync(CACHE_FILE)) {
    return {};
  }
  try {
    return JSON.parse(fs.readFileSync(CACHE_FILE, "utf-8"));
  } catch {
    return {};
  }
}

export function saveCache(cache: CacheData) {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), "utf-8");
}

export function calculateHash(content: string): string {
  return crypto.createHash("sha256").update(content).digest("hex");
}

export function getFileHash(filePath: string): string | null {
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, "utf-8");
  return calculateHash(content);
}

export function getCacheKey(apiName: string, prefix: string): string {
  return `${apiName}:${prefix}`;
}

export function clearCache() {
  if (fs.existsSync(CACHE_DIR)) {
    fs.rmSync(CACHE_DIR, { recursive: true, force: true });
    console.log(`✅ Cache cleared: ${CACHE_DIR}`);
  } else {
    console.log(`ℹ️ Cache not found: ${CACHE_DIR}`);
  }
}
