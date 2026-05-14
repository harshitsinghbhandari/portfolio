---
title: "I Built a CLI That Compiles My Discord Into a Personal Profile for AI Agents"
description: "How I built discord-archive — a local-first Python CLI that ingests bot-populated Discord channels and produces memory-typed markdown artifacts that Hermes loads as project context. The whole thing was almost broken by an Ollama-shaped JSON problem."
date: 2026-05-14
author: Harshit Singh
tags: ["automation", "python", "cli", "ollama", "gemini", "discord", "llm", "hermes"]
readingTime: 7 min
draft: false
---

# I Built a CLI That Compiles My Discord Into a Personal Profile for AI Agents

A few weeks ago I built [Donna](https://github.com/harshitsinghbhandari/donna) — a CLI that takes my 2am Discord idea dumps and turns them into structured briefings. Then I built a [Study Buddy](https://github.com/harshitsinghbhandari/study-buddy) that watches what I'm reading and posts study summaries. Then I [automated Moodle](https://github.com/harshitsinghbhandari/moodle-automated) so I never have to open it again.

Across all of these, the output goes to one place: a private Discord server with a channel per system. `#briefings`, `#screen-summaries`, `#email-summaries`, `#moodle-info`, `#groww`. Five channels, each one a firehose of automated context about my life.

The problem: this is now an enormous wall of bot-posted text that no AI agent I work with knows about. When I talk to Hermes (Nous Research's [agent](https://github.com/NousResearch/hermes-agent)), it has no idea what I've been studying, what my grades are, what's happening in my portfolio, what Donna has flagged as important. Every conversation starts from zero.

So I built discord-archive.

## What it does

One command pulls Discord into a local archive:

```bash
discord-archive sync
```

Another command turns it into a personal profile for Hermes:

```bash
discord-archive build-context
```

The output is a directory of markdown files at `~/.discord-archive/context/`:

```text
~/.discord-archive/context/
├── profile.md              # who I am — durable
├── current-state.md        # what I'm working on — medium-term
├── memory-candidates.md    # worksheet — promote to long-term?
├── ephemeral.md            # explicit anti-list — DO NOT save
├── topics/
│   ├── projects.md
│   ├── preferences.md
│   ├── people.md
│   └── open-loops.md
└── timeline/
    └── 2026-W20.md         # one per ISO week
```

Hermes loads this directory as project context. Now every conversation starts with full context about who I am and what I'm doing — drawn from automated streams I never have to manually curate.

## The architecture

Two stages, each doing what it's good at.

```text
Discord channels → SQLite + FTS5 → Stage 1 (Ollama) → Stage 2 (Gemini) → markdown
```

**Stage 1: Ollama summarizes each `(channel, ISO week)` into terse markdown.** Why per-window? It keeps each prompt small enough for a local model, and the cache lets re-runs skip windows that haven't changed. Per channel per week is the natural granularity — Discord activity bursts in clumps.

**Stage 2: Gemini reads all the Stage 1 summaries and composes the final artifacts.** Profile, current state, ephemeral anti-list, topic files, timelines, and a structured memory-candidates worksheet. Gemini is much better at instruction-following and structured output, so it gets the heavy thinking and judgment calls.

The contract between them is a single `summary_md` text column in SQLite. Stage 1 writes it; Stage 2 reads it; the schema doesn't care what's in there as long as it's text.

## The memory-type taxonomy

Every artifact carries a `memory_type` in its YAML frontmatter:

```yaml
---
artifact: profile
memory_type: durable
generated_at: '2026-05-14T09:24:44+00:00'
source_channels: ["#briefings", "#screen-summaries"]
stage1_runs: 12
review_status: staged
stage2_model: gemini-3.1-pro-preview
---
```

The three types are the load-bearing idea:

- **`durable`** — identity, long-held preferences, stable people. Goes into Hermes long-term memory.
- **`medium_term`** — current projects, active priorities, open loops. Useful for weeks to months; refresh each build.
- **`ephemeral`** — chatter, weekly digests, transient signals. Background context only. **Never** promote to long-term.

There's also an explicit `ephemeral.md` artifact — an anti-list of things that look transient and must NOT enter Hermes's memory. This is the part I'm most paranoid about. The whole point of the taxonomy is to stop the AI from treating my mood-of-the-day as identity.

## The review gate

Discord activity is messy. I don't want every fact Gemini infers to silently land in Hermes's permanent memory. So there's a staging step:

```bash
discord-archive build-context   # writes to ~/.discord-archive/staging/
discord-archive diff            # show staging/ vs context/
$EDITOR ~/.discord-archive/staging/memory-candidates.md
discord-archive promote         # atomic copy staging/ → context/
```

The `memory-candidates.md` file is a worksheet:

```markdown
## Candidate: "harshit prefers TypeScript for tooling, Python for data work"
- suggested_type: durable
- confidence: 0.85
- importance_score: 8
- tags: [typescript, python, workflow, preference]
- status: proposed
- evidence:
    - msg:1234567 (#briefings, 2026-05-02)
    - msg:1234890 (#screen-summaries, 2026-05-09)
- gemini-note: repeated stable preference across 2 channels
```

I edit `status` to `accepted` or `rejected`. Across rebuilds, decisions persist — accepted/rejected items aren't re-proposed. Only `proposed` items get refreshed when Gemini re-runs.

## The Ollama-shaped problem

The first version of this had Ollama producing strict JSON with pydantic validation. The schema enforced citations, importance scores, stability hints — everything Stage 2 needed.

It didn't work.

I ran it against 110 real messages from my 5 channels. `channel_window_summaries` had 0 rows. Every single Ollama call had failed JSON validation, gotten retried once with stricter instructions, failed again, and gotten silently skipped.

Local Ollama models are just not reliable enough at strict JSON output. `ministral-3:14b-cloud` either wraps the response in markdown fences, hallucinates extra keys, or misses required fields. The retry-once-then-skip logic meant 100% of my windows were getting dropped.

I had it backwards. The right split is:

- **Ollama: text → text.** Free-form markdown summarization. Just preserve the signal, cite message IDs as `[msg:123]`, and skip pleasantries.
- **Gemini: text → structure.** All schema enforcement, all judgment calls, all the structured output goes here.

This flipped the failure modes. Ollama is now happy writing prose. Gemini handles JSON natively (Google's models are very good at this). The memory-candidates worksheet, which has a strict shape, is now Gemini's job to emit — and it does it cleanly.

The change took ~30 minutes:

- Drop pydantic from Stage 1
- Rewrite the Stage 1 system prompt to ask for markdown
- Change the cache column from "JSON blob" semantics to "markdown text"
- Update Stage 2 prompts to mention "markdown summaries" instead of "JSON corpus"

The lesson: pick the model for the job. Local models are great at compression and noise filtering. They are bad at strict schemas. Push schemas as late in the pipeline as possible, and give them to the model that handles them natively.

## The bot-filter trap

Another fun one. My first sync pulled exactly 1 message out of channels containing 100+ messages each.

The reason: I had a `if msg.author.bot: continue` line in the sync code. Discord marks webhook posts and bot-account posts with `author.bot == True`. My channels are populated by Donna, Summarizer Bot, Moodle Bot, Groww Portfolio Bot, and a thing called Captain Hook. All bots. All filtered.

For most Discord servers, "skip bots" is the right default — bot output is noise. For *this* use case it's the opposite: the bots ARE the signal. They post automated summaries of my life. That's exactly what I want archived.

So the filter got deleted. Two-line diff. 109 messages appeared in the next sync.

This is the kind of bug you only catch when you ship to a real use case. The unit tests all passed because they used hand-rolled fixtures where everyone was a human author.

## How it actually feels

Once you tell Hermes:

> Read `~/.discord-archive/context/` as project context. Distinguish durable from medium-term from ephemeral. Only items I've marked `status: accepted` in `memory-candidates.md` are approved for promotion to your long-term memory.

…every conversation gets dramatically better. Hermes knows what I'm studying, what my grades are, what Donna flagged this week, what's in my portfolio, who my professors are. It stops needing me to repeat myself.

And because everything cites `[msg:<id>]`, I can always trace a claim back:

```bash
discord-archive open msg:1504352657072979998
# → opens https://discord.com/channels/<guild>/<channel>/1504352657072979998 in browser
```

If Hermes says "you said X" and I want to verify, one command takes me to the original Discord message.

## The stack

- **Python 3.12** — argparse, stdlib `sqlite3`, `tomllib`
- **discord.py** — REST only, no gateway. The bot script connects, pulls, exits.
- **SQLite + FTS5** — single-file archive. WAL mode, foreign keys on, full-text search built in.
- **PyYAML** — for safe frontmatter serialization (rolled my own at first, then I tried to put `"yes"` in a value, lost an afternoon, switched to `yaml.safe_dump`).
- **Pydantic** — only in Stage 1's old life. Now gone from the hot path.
- **Ollama** — local-first by intent; I'm on Ollama Cloud's `ministral-3:14b-cloud` since I don't want to spin a fan up.
- **Gemini 3.1 Pro Preview** — for stage 2.

The CLI is 8 subcommands: `init`, `sync`, `build-context`, `diff`, `promote`, `status`, `open`, `search`. Each is its own ~30-line file under `commands/`. The CLI dispatcher itself is ~70 lines.

48 tests, mypy strict, ~1500 lines of Python total. No frameworks, no async machinery, no dependency tree.

## How discord-archive fits with everything else

This is the keystone of a pattern I keep coming back to:

```text
capture (Donna, Study Buddy, Moodle) → Discord channels → discord-archive → Hermes
```

Capture is high-frequency and lossy. Discord is the durable append-only log. discord-archive is the compiler. Hermes is the consumer.

Each layer does one thing. Each layer is a separate tool. The interfaces between them are just files and text. You can swap any layer out without touching the others.

This is the same shape as Donna (`#ideas → #briefings`), the same shape as Study Buddy (`screen → responses.jsonl → summaries.json → #screen-summaries`), the same shape as Moodle (`Chrome → daemon → Discord webhook`). Boring pipelines, durable logs, composable layers.

It's boring, which is exactly why it works.

## What's next

- **`promote-memory` command** — push `status: accepted` items from `memory-candidates.md` directly into Hermes's memory API. Right now I do this by hand.
- **Multi-guild** — currently one personal server. The architecture supports more; just hasn't been wired.
- **Daily window fallback** — when a `(channel, week)` exceeds `max_messages_per_window`, sub-chunk by day instead of skipping.
- **Embeddings + semantic search** — Hermes already does its own retrieval, so this isn't urgent. But if I ever want cross-system "find related ideas," `pgvector` slots in cleanly.
- **MCP server** — expose `archive.db` as MCP tools so other agents (not just Hermes) can query it directly.

## Try it

```bash
git clone https://github.com/harshitsinghbhandari/discord-archive
cd discord-archive
python3.12 -m venv .venv && source .venv/bin/activate
pip install -e .

export DISCORD_BOT_TOKEN=...
export GEMINI_API_KEY=...

discord-archive init --guild-id <ID> --self-user-id <ID>
$EDITOR ~/.discord-archive/config.toml   # set channel_allowlist, focus_mode

discord-archive sync
discord-archive build-context
discord-archive diff
discord-archive promote
```

Point Hermes at `~/.discord-archive/context/`. Done.

---

*Built because my AI agents should know who I am before I have to tell them.*
