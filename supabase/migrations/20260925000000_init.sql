-- TraceSearch Schema Migration
-- Initializes tables for research sessions, sources, findings, and relationships

CREATE TABLE IF NOT EXISTS research_sessions (
  id TEXT PRIMARY KEY,
  user_id UUID,
  query TEXT NOT NULL,
  title TEXT NOT NULL,
  summary TEXT,
  status TEXT NOT NULL DEFAULT 'completed',
  session_data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_research_sessions_created_at ON research_sessions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_research_sessions_user_id ON research_sessions(user_id);

CREATE TABLE IF NOT EXISTS sources (
  id TEXT PRIMARY KEY,
  research_session_id TEXT REFERENCES research_sessions(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  domain TEXT NOT NULL,
  snippet TEXT,
  source_type TEXT NOT NULL,
  retrieved_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sources_session ON sources(research_session_id);

CREATE TABLE IF NOT EXISTS findings (
  id TEXT PRIMARY KEY,
  research_session_id TEXT REFERENCES research_sessions(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  uncertainty TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_findings_session ON findings(research_session_id);

CREATE TABLE IF NOT EXISTS finding_sources (
  finding_id TEXT REFERENCES findings(id) ON DELETE CASCADE,
  source_id TEXT REFERENCES sources(id) ON DELETE CASCADE,
  relationship TEXT,
  PRIMARY KEY (finding_id, source_id)
);

-- Enable Row Level Security (RLS) on all tables to prevent unauthorized data tampering
ALTER TABLE research_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE findings ENABLE ROW LEVEL SECURITY;
ALTER TABLE finding_sources ENABLE ROW LEVEL SECURITY;

-- Allow read access for public shared research reports
CREATE POLICY "Allow public read access to sessions" ON research_sessions
  FOR SELECT USING (true);

-- Restrict full write and management access to service role only
CREATE POLICY "Allow service role full access to sessions" ON research_sessions
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Sources policies
CREATE POLICY "Allow public read access to sources" ON sources
  FOR SELECT USING (true);

CREATE POLICY "Allow service role full access to sources" ON sources
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Findings policies
CREATE POLICY "Allow public read access to findings" ON findings
  FOR SELECT USING (true);

CREATE POLICY "Allow service role full access to findings" ON findings
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Finding sources policies
CREATE POLICY "Allow public read access to finding_sources" ON finding_sources
  FOR SELECT USING (true);

CREATE POLICY "Allow service role full access to finding_sources" ON finding_sources
  FOR ALL TO service_role USING (true) WITH CHECK (true);
