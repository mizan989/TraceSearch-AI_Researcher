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
