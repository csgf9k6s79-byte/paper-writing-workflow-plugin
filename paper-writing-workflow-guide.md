# 论文写作全流程 Skill 调用手册

> 适用于 Claude Code 学术写作工作流 | 基于 nature-skills + ARS + Omniscale  
> 项目目录：`D:\综述-ai修改\`  
> 更新日期：2026-06-11

---

## 快速导航

| 阶段 | 名称 | 预计耗时 | 核心 Skill |
|------|------|---------|-----------|
| [1](#stage-1-规划与研究地图) | 规划与研究地图 | 30 min | `/ars-plan` + research-map |
| [2](#stage-2-文献调研) | 文献调研 | 1-3 h | nature-academic-search + ARS deep-research |
| [3](#stage-3-写作初稿) | 写作初稿 | 2-6 h | nature-writing + nature-polishing |
| [4](#stage-4-引文与数据) | 引文与数据 | 1-2 h | nature-citation + `/ars-citation-check` |
| [5](#stage-5-图表制作) | 图表制作 | 1-4 h | nature-figure |
| [6](#stage-6-审稿自查) | 审稿自查 | 30-60 min | nature-reviewer + `/ars-reviewer` + critique |
| [7](#stage-7-修改与回复) | 修改与回复 | 2-8 h | `/ars-revision` + nature-polishing |
| [8](#stage-8-投稿输出) | 投稿输出 | 30 min | `/ars-format-convert` + nature-paper2ppt |

---

## 两种使用方式

### 方式 A：自动化工作流（推荐）

在 Claude Code 中调用 Workflow 脚本：

```
# 运行全部 8 阶段
Workflow({scriptPath: "D:\\综述-ai修改\\paper-workflow.js", args: {stage: "all"}})

# 仅运行某一阶段
Workflow({scriptPath: "D:\\综述-ai修改\\paper-workflow.js", args: {stage: 6}})
```

### 方式 B：手动逐阶段执行

下面的每个阶段都列出了可以直接使用的 slash command 和 Skill 调用方式。

---

## Stage 1: 规划与研究地图

### 目标
明确论文核心论点、目标期刊、章节结构，创建研究项目全景图。

### 调用方式

**步骤 1.1 — Socratic 规划对话**
```
/ars-plan
```
或直接说："引导我规划论文"

AI 会逐一询问：
1. 核心论点 → *"海藻提取物促进可持续农业的文献计量全景分析"*
2. 目标期刊 → *Frontiers in Plant Science / Scientometrics*
3. 论文类型 → *文献计量学综述*
4. 章节结构 → *IMRaD + Discussion*
5. 每章关键证据
6. 已有材料清单

**步骤 1.2 — 研究地图**
```
Skill: research-map
```
或直接说："为我的SEPA论文项目创建研究地图"

### 检查清单
- [ ] 核心论点一句话能说清楚
- [ ] 目标期刊的作者指南已下载
- [ ] 章节大纲已确定
- [ ] 研究地图清晰标注了已完成/待完成项

---

## Stage 2: 文献调研

### 目标
系统检索最新相关文献，深度阅读关键论文，建立文献矩阵。

### 调用方式

**步骤 2.1 — 多库文献检索**
```
Skill: nature-skills:nature-academic-search
```
输入：检索关键词、数据库范围、时间范围、筛选标准

**步骤 2.2 — 深度研究（13-agent 团队）**
```
/ars-lit-review
```
或直接说："做SEPA领域的系统性文献综述"

**步骤 2.3 — 单篇精读**
```
Skill: summarize-paper
```
对关键论文逐篇提取：论点、方法、数据、可引用语句

### 检查清单
- [ ] 文献矩阵覆盖最近 5-10 年核心论文
- [ ] 每篇关键论文有结构化笔记
- [ ] 研究缺口已明确标注
- [ ] 排除了不相关领域论文

---

## Stage 3: 写作初稿

### 目标
从大纲/草稿到完整初稿，包含摘要、各章节、参考文献。

### 调用方式

**步骤 3.1 — 大纲细化**
```
/ars-outline
```
或直接说："为SEPA论文生成详细大纲"

**步骤 3.2 — 摘要生成（双语）**
```
/ars-abstract
```
或直接说："写双语摘要"

**步骤 3.3 — 章节写作**
```
Skill: nature-skills:nature-writing
```
传入：你的中文笔记/大纲 + 文献矩阵 + 图注

提示词示例：
> 请根据以下大纲撰写 SEPA 论文的 Discussion 部分。  
> 大纲：[粘贴大纲]  
> 文献矩阵：[粘贴关键文献笔记]  
> 要求：Nature 期刊风格，IMRaD 结构，英文

**步骤 3.4 — 语言润色**
```
Skill: nature-skills:nature-polishing
```
传入：你的英文草稿段落

### 检查清单
- [ ] 所有章节已完成（不要求完美）
- [ ] Abstract 完整（背景-方法-结果-结论-展望）
- [ ] 参考文献已用 Zotero/EndNote 管理
- [ ] 图表初版已插入正文

---

## Stage 4: 引文与数据

### 目标
补充缺失引用、验证已有引文的真实性、撰写数据可用性声明。

### 调用方式

**步骤 4.1 — 自动配引用**
```
Skill: nature-skills:nature-citation
```
传入：需要支撑的段落文本
AI 返回：Nature/CNS 及子刊中匹配的参考文献（EndNote/RIS 格式）

**步骤 4.2 — 引文真实性验证**
```
/ars-citation-check
```
AI 会通过 Semantic Scholar API 验证每条引用，输出：
- ✅ VERIFIED — 引用正确
- ⚠️ MISMATCH — 信息不匹配
- ❌ NOT_FOUND — 引用不存在

**步骤 4.3 — 数据可用性声明**
```
Skill: nature-skills:nature-data
```

### 检查清单
- [ ] 所有关键论断都有文献支撑
- [ ] 引文验证通过率 > 95%
- [ ] 不匹配的引用已修正或替换
- [ ] 数据可用性声明已写好

---

## Stage 5: 图表制作

### 目标
按 Nature 投稿标准制作/优化所有图表。

### 调用方式

**步骤 5.1 — 图表审计**
直接说："审计我的论文图表质量"

**步骤 5.2 — 图表制作**
```
Skill: nature-skills:nature-figure
```
首先选择后端（Python 或 R），然后：
- 传入数据
- 说明图表类型和要表达的结论
- 指定输出格式（SVG + PDF + TIFF）

### 检查清单
- [ ] 所有图片分辨率 ≥ 300 DPI
- [ ] 图中字号 ≥ 8pt
- [ ] 配色专业（Nature 风格色板）
- [ ] 布局规整，无文字重叠
- [ ] 图注完整（标题、单位、n值、统计方法、缩写说明）
- [ ] 保存为可编辑 SVG + PDF

---

## Stage 6: 审稿自查

### 目标
从多视角模拟审稿，发现逻辑漏洞和不足之处。

### 调用方式

**步骤 6.1 — Nature 标准审稿**
```
Skill: nature-skills:nature-reviewer
```
获得 3 位审稿人 + 交叉综合意见

**步骤 6.2 — ARS 强化审稿（5-reviewer + Devil's Advocate）**
```
/ars-reviewer
```
或直接说："审稿我的论文"

**步骤 6.3 — 逻辑漏洞检测**
```
Skill: critique
```
或直接说："critique my paper"

专门查找：
- 逻辑漏洞
- 循环论证
- 因果推断错误
- 过度宣称
- 遗漏变量

### 检查清单
- [ ] 所有审稿意见已汇总到一张表
- [ ] 意见按严重程度分类（Blocker > Major > Minor）
- [ ] 每条意见有明确的修改方案或 rebuttal 策略
- [ ] Devil's Advocate 发现的问题已特别标注

---

## Stage 7: 修改与回复

### 目标
根据审稿意见逐点修改论文，撰写 rebuttal letter。

### 调用方式

**步骤 7.1 — 解析审稿意见**
```
/ars-revision-coach
```
或直接说："解析审稿意见，生成修改路线图"

**步骤 7.2 — 逐点修改**
```
/ars-revision
```
或直接说："根据审稿意见修改论文"

**步骤 7.3 — 最终润色**
```
Skill: nature-skills:nature-polishing
```

**步骤 7.4 — 撰写 Rebuttal Letter**
```
Skill: nature-skills:nature-response
```
传入：审稿意见 + 你的修改说明

### 检查清单
- [ ] 每条审稿意见都有回应
- [ ] Rebuttal letter 语气专业、尊敬
- [ ] 不修改的意见有充分理由
- [ ] 最终稿完成全文拼写/语法检查

---

## Stage 8: 投稿输出

### 目标
格式转换、AI声明、答辩PPT、最终打包。

### 调用方式

**步骤 8.1 — 格式转换**
```
/ars-format-convert
```
支持：LaTeX / DOCX / PDF / Markdown

**步骤 8.2 — AI 使用声明**
```
/ars-disclosure
```
自动生成符合 ICLR/NeurIPS/Nature/Science 各期刊要求的 AI 使用声明

**步骤 8.3 — 答辩/组会 PPT**
```
Skill: nature-skills:nature-paper2ppt
```
或直接说："把这篇论文做成PPT"

### 检查清单
- [ ] Cover letter 已写好
- [ ] Highlights (3-5条) 已准备
- [ ] 作者贡献声明完整
- [ ] 利益冲突声明已签署
- [ ] 数据可用性声明已写
- [ ] AI 使用声明已添加
- [ ] 所有文件已打包到 submission-package 文件夹

---

## 🎯 针对 SEPA 论文的实操示例

### 当前状态
- ✅ 完整初稿（含修订版）
- ✅ 导师 12 条批注
- ✅ 170+ 参考文献
- ⚠️ 图表需优化
- ⚠️ 语言需润色
- ⚠️ 少数引文需补充

### 推荐执行顺序

```
现在立刻可以做：
  Stage 3 (polish)  → 全文语言润色（解决导师批注中的语法问题）
  Stage 5 (figure)  → 重制图表（解决导师批注 #252）
  Stage 4 (citation)→ 补充引文 + 验证（解决导师批注 #114, #288）

投稿前：
  Stage 6 (review)  → 预审自查
  Stage 7 (revision)→ 根据审稿意见修改

投稿时：
  Stage 8 (output)  → 格式转换 + 投稿文件包
```

### 快速命令

```bash
# 润色全文
Skill: nature-skills:nature-polishing
（传入修订版.docx路径）

# 重制图表  
Skill: nature-skills:nature-figure
（依次传入各图数据）

# 预审
/ars-reviewer
（传入修订版.docx路径）

# 做PPT
Skill: nature-skills:nature-paper2ppt
（传入修订版.docx路径）
```

---

## 📋 通用检查清单总表

| # | 检查项 | 涉及阶段 |
|---|--------|---------|
| 1 | 核心论点一句话清晰 | Stage 1 |
| 2 | 章节逻辑流畅、无跳跃 | Stage 3 |
| 3 | 所有论断有文献支撑 | Stage 4 |
| 4 | 无第一人称（视期刊要求） | Stage 3, 7 |
| 5 | 图表清晰、分辨率达标 | Stage 5 |
| 6 | 参考文献格式统一 | Stage 4 |
| 7 | 引文真实性已验证 | Stage 4 |
| 8 | 无语法/拼写错误 | Stage 7 |
| 9 | 摘要完整（背景-方法-结果-结论） | Stage 3 |
| 10 | Cover letter 已准备 | Stage 8 |
| 11 | AI 使用声明已添加 | Stage 8 |
| 12 | 所有补充材料已打包 | Stage 8 |

---

## 🔧 故障排除

| 问题 | 解决方案 |
|------|---------|
| ARS skill 不响应 | 检查 `claude plugin list` 确认已启用 |
| nature-figure 报字体缺失 | 已解决：使用 Microsoft YaHei |
| 引文验证大量 NOT_FOUND | 检查 DOI 格式，或手动在 Semantic Scholar 验证 |
| Workflow 脚本报错 | 确保文件路径使用双反斜杠 `\\` |
| Git 无法连接 GitHub | 已配置 Clash 代理：`git config --global http.proxy http://127.0.0.1:7890` |
