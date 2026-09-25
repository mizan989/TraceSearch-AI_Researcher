-- TraceSearch Seed Data
-- Provides reference test research session for local development

INSERT INTO research_sessions (
  id,
  query,
  title,
  summary,
  status,
  session_data,
  created_at
) VALUES (
  'rs_demo_cybersecurity_2026',
  'How is artificial intelligence changing cybersecurity in 2026?',
  'AI and Cybersecurity in 2026: Defensive Automation, Autonomous Exploitation, and the Resilient Perimeter',
  'The cybersecurity landscape in 2026 is defined by an accelerating arms race between autonomous defensive reasoning engines and automated adversarial exploit pipelines. Enterprise security operations centers are rapidly transitioning from manual alert triage to agentic co-analysts capable of orchestrating immediate containment.',
  'completed',
  '{}'::jsonb,
  NOW()
) ON CONFLICT (id) DO NOTHING;
