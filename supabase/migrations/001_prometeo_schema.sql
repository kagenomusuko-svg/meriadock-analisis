CREATE TABLE cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  discipline text,
  description text,
  status text DEFAULT 'draft'
);

CREATE TABLE evidence_maps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id uuid NOT NULL REFERENCES cases(id),
  mapa_json jsonb NOT NULL,
  author_decisions_json jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE motor_outputs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id uuid NOT NULL REFERENCES cases(id),
  formula text,
  inputs jsonb,
  result jsonb,
  trace jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE declarations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id uuid NOT NULL REFERENCES cases(id),
  type char(1) CHECK (type IN ('A','B','C','D')),
  text text,
  generated_at timestamptz DEFAULT now()
);
