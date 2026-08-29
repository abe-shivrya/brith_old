/**
 * certStore.ts
 *
 * In-memory store for certificate records.
 * Generates QR code as a data URL (canvas-based) and provides
 * download helpers for saving QR PNG + JSON to disk.
 */

import type { CertificateFormData } from "../types";

export type CertRecord = {
  id: string;
  data: CertificateFormData;
  createdAt: string;
  qrDataUrl?: string;
};

/** In-memory store (keyed by unique ID) */
const store = new Map<string, CertRecord>();

/** Generate a short unique ID */
function generateId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 8; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

/**
 * Generate a QR code data URL using canvas.
 * Uses a minimal pure-canvas QR renderer (no dependency needed in store).
 */
async function generateQrDataUrl(text: string): Promise<string> {
  /* Dynamically import qrcode (client-side only) */
  const QRCodeCanvas = (await import("qrcode")).default;
  return new Promise((resolve) => {
    QRCodeCanvas.toCanvas(
      document.createElement("canvas"),
      text,
      { width: 300, margin: 2, color: { dark: "#000", light: "#fff" } },
      (err, canvas) => {
        if (err || !canvas) {
          resolve("");
          return;
        }
        resolve(canvas.toDataURL("image/png"));
      },
    );
  });
}

/**
 * Convert a data URL to a Blob.
 */
function dataUrlToBlob(dataUrl: string): Blob {
  const parts = dataUrl.split(",");
  const mime = parts[0].match(/:(.*?);/)?.[1] || "image/png";
  const raw = atob(parts[1]);
  const arr = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) {
    arr[i] = raw.charCodeAt(i);
  }
  return new Blob([arr], { type: mime });
}

/**
 * Save a certificate record, generate QR, and trigger downloads.
 * Returns the unique ID.
 */
export async function saveCertRecord(
  data: CertificateFormData,
): Promise<string> {
  let id = generateId();
  while (store.has(id)) {
    id = generateId();
  }

  const verifyUrl = `${window.location.origin}${window.location.pathname}#/verify/${id}`;
  const qrDataUrl = await generateQrDataUrl(verifyUrl);

  const record: CertRecord = {
    id,
    data,
    createdAt: new Date().toISOString(),
    qrDataUrl,
  };

  store.set(id, record);

  /* Trigger downloads to output/ folder */
  downloadFile(`${id}_qr.png`, dataUrlToBlob(qrDataUrl));
  downloadFile(
    `${id}_data.json`,
    new Blob([JSON.stringify({ id, ...data }, null, 2)], {
      type: "application/json",
    }),
  );

  return id;
}

/**
 * Retrieve a certificate record by its unique ID.
 */
export function getCertRecord(id: string): CertRecord | undefined {
  return store.get(id);
}

/**
 * Trigger a browser file download.
 */
function downloadFile(filename: string, blob: Blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
