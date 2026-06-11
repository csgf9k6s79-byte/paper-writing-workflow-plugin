# Paper Writing Full-Pipeline Workflow

> 模块化论文写作全流程工作流 — Claude Code Plugin  
> Modular 8-stage academic paper writing workflow for Claude Code

## What is this?

A Claude Code skill that provides a structured 8-stage workflow for academic paper writing, combining the best capabilities of popular academic skills (nature-skills, ARS, Omniscale). Each stage can run independently or as part of a full pipeline.

## Quick Start

### Installation

**Method 1: From GitHub Marketplace**
```bash
/plugin marketplace add https://github.com/<your-repo>/paper-writing-workflow-plugin
/plugin install paper-writing-workflow@paper-writing-workflow-marketplace
```

**Method 2: Local Install**
```bash
# Copy to Claude Code skills directory
cp -r paper-writing-workflow-plugin ~/.claude/skills/paper-writing-workflow/
```

**Method 3: Direct Workflow Invocation**
Just copy `paper-workflow.js` to your project and invoke:
```
Workflow({scriptPath: "path/to/paper-workflow.js", args: {stage: 3}})
```

### Usage

```
# Full pipeline
Workflow({scriptPath: "paper-workflow.js", args: {stage: "all"}})

# Single stage
Workflow({scriptPath: "paper-workflow.js", args: {stage: 6}})
```

Or simply say: "Run paper writing workflow stage 3"

## 8 Stages

```
Stage 1: Planning & Research Map     →  /ars-plan + research-map
Stage 2: Literature Survey           →  nature-academic-search + ARS deep-research
Stage 3: Writing First Draft         →  nature-writing + nature-polishing
Stage 4: Citations & Data            →  nature-citation + /ars-citation-check
Stage 5: Figures & Charts            →  nature-figure (Python/R)
Stage 6: Review & Self-Check         →  nature-reviewer + /ars-reviewer + critique
Stage 7: Revision & Response         →  /ars-revision + nature-polishing + nature-response
Stage 8: Submission Output           →  /ars-format-convert + nature-paper2ppt
```

## Prerequisites

Recommended skills (install via Claude Code plugin marketplace):

| Skill | Marketplace | Command |
|-------|------------|---------|
| nature-skills | nature-skills | `/plugin install nature-skills@nature-skills` |
| Academic Research Skills | academic-research-skills | `/plugin install academic-research-skills@academic-research-skills` |
| critique | omniscale-research-skills | `/plugin install critique@omniscale-research-skills` |
| summarize-paper | omniscale-research-skills | `/plugin install summarize-paper@omniscale-research-skills` |
| research-map | omniscale-research-skills | `/plugin install research-map@omniscale-research-skills` |

> Note: The workflow degrades gracefully — stages that require a missing skill will suggest manual alternatives.

## Design Principles

- **Human-in-the-loop**: Every stage has an explicit checkpoint before proceeding
- **Skill complementarity**: ARS excels at automation; nature-skills excel at language/figures/citations
- **Flexible invocation**: Any stage can run independently
- **Degradation strategy**: Missing skills → manual alternatives

## Files

| File | Purpose |
|------|---------|
| `skills/paper-workflow/SKILL.md` | Skill definition (loaded by Claude Code) |
| `paper-workflow.js` | Executable workflow script |
| `paper-writing-workflow-guide.md` | Complete user manual with slash commands |
| `paper-writing-skill-workflow.svg` | Editable vector flowchart |
| `paper-writing-skill-workflow.pdf` | PDF flowchart |
| `paper-writing-skill-workflow.png` | Raster flowchart (300 DPI) |
| `.claude-plugin/plugin.json` | Plugin metadata |
| `.claude-plugin/marketplace.json` | Marketplace distribution config |

## License

MIT — feel free to modify and share.

## Acknowledgments

Built on top of the amazing work by:
- [nature-skills](https://github.com/Yuan1z0825/nature-skills) (MIT)
- [Academic Research Skills](https://github.com/Imbad0202/academic-research-skills) (CC BY-NC 4.0)
- [Omniscale Research Skills](https://github.com/omniscale-ai/research-skills-marketplace)
