import Database from 'better-sqlite3'
import path from 'node:path'
import fs from 'node:fs'

const dataDir = path.join(process.cwd(), 'data')
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })

const dbPath = path.join(dataDir, 'invoices.sqlite')
export const db = new Database(dbPath)
db.pragma('journal_mode = WAL')

db.exec(`
  CREATE TABLE IF NOT EXISTS invoices (
    id TEXT PRIMARY KEY,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('draft','pending','paid')),
    paymentDue TEXT NOT NULL,
    description TEXT NOT NULL,
    paymentTerms INTEGER NOT NULL,
    clientName TEXT NOT NULL,
    clientEmail TEXT NOT NULL,
    senderAddress TEXT NOT NULL, -- JSON string
    clientAddress TEXT NOT NULL, -- JSON string
    items TEXT NOT NULL,         -- JSON string
    total INTEGER NOT NULL       -- stored in cents
  );

  CREATE INDEX IF NOT EXISTS invoices_status_idx ON invoices(status);
  CREATE INDEX IF NOT EXISTS invoices_updatedAt_idx ON invoices(updatedAt);
`)

export function withTxn(fn) {
  const tx = db.transaction(fn)
  return tx
}

