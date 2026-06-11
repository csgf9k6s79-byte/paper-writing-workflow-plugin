---
name: paper-writing-workflow
description: >
  Modular 8-stage academic paper writing workflow — from planning to submission.
  Combines nature-skills + ARS + Omniscale best capabilities.
  Supports single-stage invocation or full pipeline automation.
  Trigger when user asks about paper writing workflow, 论文写作流程,
  academic writing pipeline, or wants to start/continue a structured paper project.
version: 1.0.0
author: xyy
license: MIT
tags:
  - academic
  - writing
  - workflow
  - paper
  - research
---

# Paper Writing Full-Pipeline Workflow

## Overview

This skill provides a modular 8-stage academic paper writing workflow that combines
the best capabilities of installed Claude Code skills:

- **nature-skills**: polishing, writing, citation, figures, reviewer, response, reader
- **ARS (Academic Research Skills)**: deep-research, academic-paper, reviewer, pipeline
- **Omniscale**: critique, summarize-paper, research-map

## When to Use

Trigger this skill when the user:
- Asks about paper writing workflow / 论文写作流程
- Wants to start a structured paper project
- Needs guidance on which skill to use at which stage
- Wants to run a specific stage (e.g., "润色我的论文", "审稿自查")
- Asks "如何写论文" / "写论文的流程"

## 8-Stage Workflow

| Stage | Name | Key Skills |
|-------|------|-----------|
| 1 | Planning & Research Map | `/ars-plan`, research-map |
| 2 | Literature Survey | nature-academic-search, ARS deep-research, summarize-paper |
| 3 | Writing First Draft | nature-writing, `/ars-outline`, nature-polishing |
| 4 | Citations & Data | nature-citation, `/ars-citation-check`, nature-data |
| 5 | Figures & Charts | nature-figure (Python/R) |
| 6 | Review & Self-Check | nature-reviewer, `/ars-reviewer`, critique |
| 7 | Revision & Response | `/ars-revision`, nature-polishing, nature-response |
| 8 | Submission Output | `/ars-format-convert`, `/ars-disclosure`, nature-paper2ppt |

## Usage

### Quick Start

The workflow script is at `paper-workflow.js`. Invoke via:

```
Workflow({scriptPath: "path/to/paper-workflow.js", args: {stage: 3}})
```

Set `stage` to 1-8 for a single stage, or `"all"` for the full pipeline.

### Manual Stage Execution

Each stage can also be run manually using the slash commands and Skill calls
documented in `paper-writing-workflow-guide.md`.

### Recommended Order for Existing Drafts

If you already have a draft:
1. Stage 3 (polishing) → fix language issues
2. Stage 5 (figures) → optimize charts
3. Stage 4 (citations) → verify and supplement references
4. Stage 6 (review) → pre-submission self-check
5. Stage 7 (revision) → address findings
6. Stage 8 (output) → format and package

## Design Principles

- **Human-in-the-loop**: Every stage has a checkpoint before proceeding
- **Skill complementarity**: ARS excels at pipeline automation; nature-skills excel at language/figures/citations
- **Flexible invocation**: Run any stage independently or the full pipeline
- **Degradation strategy**: If a required skill is missing, manual alternatives are provided

## Files

- `paper-workflow.js` — Executable workflow script
- `paper-writing-workflow-guide.md` — Complete user manual with slash commands and checklists
- `paper-writing-skill-workflow.png` — Visual flowchart (300 DPI)
- `paper-writing-skill-workflow.svg` — Editable vector version
- `paper-writing-skill-workflow.pdf` — PDF version for embedding
