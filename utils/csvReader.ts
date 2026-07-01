import * as fs from 'fs';
import * as path from 'path';

/**
 * Simple CSV reader for small datasets. It reads a CSV file, expects a
 * header row with comma‑separated column names, and returns an array of
 * objects keyed by the header names. Numeric fields will be cast to
 * numbers when possible.
 *
 * Note: This implementation does not handle quoted fields or complex CSV
 * semantics. It is sufficient for simple demonstration purposes as shown
 * in the accompanying tests【848719906771145†L174-L233】.
 */
export function readCsv<T extends Record<string, any>>(relativePath: string): T[] {
  const absPath = path.resolve(__dirname, '..', relativePath);
  const content = fs.readFileSync(absPath, 'utf-8').trim();
  const lines = content.split(/\r?\n/);
  const headers = lines.shift()!.split(',').map(h => h.trim());
  return lines.map(line => {
    const values = line.split(',').map(v => v.trim());
    const record: any = {};
    headers.forEach((header, index) => {
      const raw = values[index];
      // Attempt to cast numeric strings to numbers
      const num = Number(raw);
      record[header] = isNaN(num) ? raw : num;
    });
    return record as T;
  });
}
