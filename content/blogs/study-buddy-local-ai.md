---
title: "I Built a Local AI Study Buddy in 30 Minutes"
description: "A small local pipeline that watches what I am reading, turns it into OCR logs, summarizes the concepts, and posts study updates to Discord."
date: 2026-04-28
author: Harshit Singh
tags: ["automation", "python", "local-ai", "ollama", "discord", "study"]
readingTime: 3 min
draft: false
---

# I Built a Local AI Study Buddy in 30 Minutes

I wanted a simple thing: an AI system that knows what I am studying without me manually logging anything.

Not a productivity app. Not another dashboard. Not a chatbot I have to keep updating.

Just something running quietly on my laptop, watching what I am reading, extracting the topic, and sending me summaries later.

So I built Study Buddy v1.

## What it does

The first version is intentionally small:

```text
screen crop -> OCR -> response log -> batch summaries -> Discord
```

A Python script takes a screenshot every few seconds, crops the part of the screen I care about, hashes it, and skips it if nothing changed. If the image changed, it saves it as `img.png` and sends it to a local Ollama vision/OCR model.

The response is appended to `responses.jsonl`.

A second process watches that file. When enough new responses have arrived, it batches them, asks another local model to extract the key concepts, and posts the summary to Discord.

That is the whole system.

## Why this is useful

The important part is that I do not have to tell it what I am studying.

If I am reading about OS scheduling, it sees that. If I switch to probability, it sees that. If I spend an hour on one niche concept, the summaries start reflecting that.

It becomes a passive study log:

```text
What did I actually read?
What topics kept coming up?
What niche concepts did I touch?
What should I revise later?
```

The output is not perfect, but it is already useful. It gives me a lightweight memory of my study session without requiring discipline from me.

## Fully local

The part I care about most: no data leaves my laptop.

The screenshots are processed locally. The OCR model runs through Ollama. The summarizer also runs through Ollama. The files are local JSONL and JSON files.

I can choose the model. I can choose the prompt. I can change the crop box. I can decide what gets stored, archived, summarized, or ignored.

There is no account, no hosted backend, no vendor-specific workflow.

It is just my laptop observing my laptop.

## The architecture

The first mistake would have been to make one giant script.

Instead, I split it into processes:

**Capture process**

Watches the screen, runs OCR, and writes events to `responses.jsonl`.

**Summary watcher**

Reads `responses.jsonl`, waits for a complete batch, summarizes it, writes `summaries.json`, and posts to Discord.

**State file**

Tracks what has already been posted so restarts do not duplicate everything.

This is the same pattern I keep coming back to:

```text
capture -> append-only log -> processor -> dispatcher
```

It is boring, which is exactly why it works.

## What is next

The obvious next step is audio.

If I am watching a lecture, the screen alone is not enough. I want the system to understand what is being said too. The current plan is to add a separate audio or YouTube transcription pipeline that produces another event log, then feed that into the same summarizer.

Eventually the shape becomes:

```text
screen + camera + audio + YouTube -> local logs -> study summaries
```

But even v1 is enough to prove the idea.

In 30 minutes, I went from nothing to a local AI system that knows what I am reading, summarizes what I studied, and sends me updates.

That is a good trade.
