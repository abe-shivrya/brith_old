/**
 * githubStore.ts
 *
 * Reads and writes certificate records to a single JSON file
 * (data/validate_cert.json) in the GitHub repo using the Contents API.
 *
 * Environment variables (set in .env):
 *   VITE_GITHUB_TOKEN   — Personal Access Token with Contents: Read & Write
 *   VITE_GITHUB_OWNER   — Repo owner (user or org)
 *   VITE_GITHUB_REPO    — Repo name
 *   VITE_GITHUB_BRANCH  — Branch to read/write (default: "main")
 *   VITE_DATA_DIR       — Directory inside repo (default: "data")
 */

import type { CertificateFormData } from "../types";

const GITHUB_API = "https://api.github.com";
const FILE_NAME = "validate_cert.json";

function getConfig() {
  const token = import.meta.env.VITE_GITHUB_TOKEN as string;
  const owner = import.meta.env.VITE_GITHUB_OWNER as string;
  const repo = import.meta.env.VITE_GITHUB_REPO as string;
  const branch = (import.meta.env.VITE_GITHUB_BRANCH as string) || "main";
  const dataDir = (import.meta.env.VITE_DATA_DIR as string) || "data";

  if (!token || !owner || !repo) {
    throw new Error(
      "Missing GitHub config. Set VITE_GITHUB_TOKEN, VITE_GITHUB_OWNER, VITE_GITHUB_REPO in .env",
    );
  }

  return { token, owner, repo, branch, filePath: `${dataDir}/${FILE_NAME}` };
}

function authHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
  };
}

/** Encode a string to base64, handling UTF-8 (Marathi/Devanagari) */
function toBase64(str: string): string {
  return btoa(unescape(encodeURIComponent(str)));
}

/** Decode a base64 string to UTF-8 */
function fromBase64(b64: string): string {
  return decodeURIComponent(escape(atob(b64)));
}

/**
 * Generate a short unique ID for records.
 */
export function generateId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 8; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

export type CertRecord = {
  id: string;
  data: CertificateFormData;
  createdAt: string;
};

/**
 * Read the entire validate_cert.json from GitHub.
 * Returns the array of records (empty array if file doesn't exist).
 * Also returns the SHA needed for updates.
 */
async function readAll(): Promise<{ records: CertRecord[]; sha?: string }> {
  const { token, owner, repo, branch, filePath } = getConfig();

  try {
    const res = await fetch(
      `${GITHUB_API}/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`,
      { headers: authHeaders(token) },
    );

    if (res.status === 404) return { records: [], sha: undefined };
    if (!res.ok) {
      console.error("GitHub API read error:", res.status, await res.text());
      return { records: [], sha: undefined };
    }

    const json = await res.json();
    const decoded = fromBase64(json.content);
    const records = JSON.parse(decoded) as CertRecord[];
    return { records, sha: json.sha };
  } catch (err) {
    console.error("Failed to read from GitHub:", err);
    return { records: [], sha: undefined };
  }
}

/**
 * Write the full records array to validate_cert.json on GitHub.
 */
async function writeAll(records: CertRecord[], sha?: string): Promise<void> {
  const { token, owner, repo, branch, filePath } = getConfig();

  const content = toBase64(JSON.stringify(records, null, 2));

  const body: Record<string, unknown> = {
    message: sha
      ? `Update certificate records`
      : `Create certificate records file`,
    content,
    branch,
  };
  if (sha) body.sha = sha;

  const res = await fetch(
    `${GITHUB_API}/repos/${owner}/${repo}/contents/${filePath}`,
    {
      method: "PUT",
      headers: authHeaders(token),
      body: JSON.stringify(body),
    },
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to save to GitHub: ${res.status} ${err}`);
  }
}

/**
 * Get a single certificate record by ID.
 */
export async function getCertRecord(id: string): Promise<CertRecord | null> {
  const { records } = await readAll();
  return records.find((r) => r.id === id) || null;
}

/**
 * Save a certificate record.
 * - If existingId is provided, updates that record.
 * - Otherwise, creates a new record with a fresh ID.
 * Returns the record ID.
 */
export async function saveCertRecord(
  data: CertificateFormData,
  existingId?: string,
): Promise<string> {
  const { records, sha } = await readAll();

  let id = existingId || generateId();

  if (existingId) {
    // Update existing record
    const idx = records.findIndex((r) => r.id === existingId);
    if (idx !== -1) {
      records[idx] = { ...records[idx], data };
    } else {
      // ID not found — add as new
      records.push({ id, data, createdAt: new Date().toISOString() });
    }
  } else {
    // Add new record
    records.push({ id, data, createdAt: new Date().toISOString() });
  }

  await writeAll(records, sha);
  return id;
}
