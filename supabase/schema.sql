-- Invoice Management App (Supabase / Postgres)
-- Run this in Supabase SQL editor (or via supabase migrations).

-- Optional: status enum
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'invoice_status') THEN
    CREATE TYPE invoice_status AS ENUM ('draft', 'pending', 'paid');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.invoices (
  id text PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  status invoice_status NOT NULL,
  payment_due date NOT NULL,
  description text NOT NULL,
  payment_terms integer NOT NULL CHECK (payment_terms >= 1 AND payment_terms <= 365),
  client_name text NOT NULL,
  client_email text NOT NULL,
  sender_address jsonb NOT NULL,
  client_address jsonb NOT NULL,
  items jsonb NOT NULL,
  total_cents integer NOT NULL CHECK (total_cents >= 0)
);

CREATE INDEX IF NOT EXISTS invoices_status_idx ON public.invoices(status);
CREATE INDEX IF NOT EXISTS invoices_updated_at_idx ON public.invoices(updated_at DESC);

-- Keep updated_at current on updates
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS invoices_set_updated_at ON public.invoices;
CREATE TRIGGER invoices_set_updated_at
BEFORE UPDATE ON public.invoices
FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();

-- Notes:
-- - Status transition rules are enforced in the API layer (same as current app).
-- - `items` is stored as JSONB array [{name, quantity, price}] where price is in currency units.
-- - `total_cents` is stored as integer cents.

