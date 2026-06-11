export const meta = {
  name: 'paper-writing-workflow',
  description: '模块化论文写作全流程：从规划到投稿，8阶段可独立调用。组合 nature-skills + ARS + Omniscale 最佳能力',
  phases: [
    { title: 'Stage 1: 规划与研究地图', detail: 'ARS /ars-plan + Omniscale research-map' },
    { title: 'Stage 2: 文献调研', detail: 'nature-academic-search + ARS deep-research + summarize-paper' },
    { title: 'Stage 3: 写作初稿', detail: 'nature-writing + ARS outline + nature-polishing' },
    { title: 'Stage 4: 引文与数据', detail: 'nature-citation + ARS citation-check + nature-data' },
    { title: 'Stage 5: 图表制作', detail: 'nature-figure (Python/R)' },
    { title: 'Stage 6: 审稿自查', detail: 'nature-reviewer + ARS /ars-reviewer + critique' },
    { title: 'Stage 7: 修改与回复', detail: 'ARS revision + nature-polishing + nature-response' },
    { title: 'Stage 8: 投稿输出', detail: 'ARS format-convert + disclosure + nature-paper2ppt' },
  ],
}

// ================================================================
// 论文写作全流程工作流
//
// 用法:
//   单阶段: Workflow({scriptPath, args: {stage: 3}})
//   全流程: Workflow({scriptPath, args: {stage: "all"}})
//   从某阶段开始: Workflow({scriptPath, args: {stage: 4}})
//
// 每阶段结束后需人工确认才进入下一阶段。
// ================================================================

const STAGES = {
  1: {
    name: '规划与研究地图',
    description: '明确论文核心论点，生成章节大纲，创建研究项目全景图',
    agents: [
      {
        label: 'ars-plan',
        prompt: `你是一位学术写作导师。请以苏格拉底式对话引导我规划论文。

请逐一询问并帮我明确以下内容：
1. 论文的核心论点（one-sentence claim）
2. 目标期刊和读者群
3. 论文类型（原创研究/综述/方法论/案例研究）
4. 章节结构（IMRaD 或其他）
5. 每章需要的关键证据/数据
6. 已有材料清单（数据、图表、草稿）

对每个问题，先听我的回答，再给出针对性建议。最后输出一份结构化的论文大纲。

我的论文主题是：海藻提取物及其衍生物促进可持续农业的文献计量分析（SEPA）`,
        phase: 'Stage 1: 规划与研究地图',
      },
      {
        label: 'research-map',
        prompt: `为以下研究项目创建一份全景地图（research map），包括：
- 核心研究问题层级树
- 已完成 vs 待完成的任务清单
- 关键依赖关系（如"文献综述完成 → 方法部分可写"）
- 风险点与缓解策略
- 建议的时间线

项目：海藻提取物促进可持续农业的文献计量分析（SEPA）
已有材料：1590篇WoS文献数据、CiteSpace/VOSviewer分析结果、完整英文初稿、导师12条批注
目标期刊：Frontiers in Plant Science 或 Scientometrics`,
        phase: 'Stage 1: 规划与研究地图',
      },
    ],
    checkpoint: '确认论文大纲和研究地图满意后，进入 Stage 2',
  },

  2: {
    name: '文献调研',
    description: '系统检索文献、深度阅读关键论文、建立文献矩阵',
    agents: [
      {
        label: 'lit-search',
        prompt: `为以下综述主题执行系统文献检索：

主题：Seaweed extracts and their derivatives as plant biostimulants in sustainable agriculture

检索要求：
1. 在 Web of Science、PubMed、Scopus 中检索
2. 关键词包括：seaweed extract, algal polysaccharide, biostimulant, abiotic stress, drought, salinity, crop yield, soil health
3. 时间范围：2020-2026（近5年高影响力论文优先）
4. 重点关注：多组学技术应用、田间试验、监管政策
5. 排除纯生化表征、非农业应用的论文
6. 输出文献矩阵（作者、年份、期刊、IF、核心发现、方法、与本研究相关性评分）`,
        phase: 'Stage 2: 文献调研',
      },
      {
        label: 'deep-read-key',
        prompt: `对以下 SEPA 领域的关键文献进行深度阅读和结构化提取：

请关注以下核心论文（在Web of Science中检索并精读）：
1. Craigie (2011) - Seaweed extract stimuli in plant science and agriculture
2. du Jardin (2015) - Plant biostimulants: Definition, concept, main categories and regulation
3. Battacharyya et al. (2015) - Seaweed extracts as biostimulants in horticulture
4. Shukla et al. (2019) - Ascophyllum nodosum-based biostimulants
5. Yakhin et al. (2017) - Biostimulants in plant science: A global perspective
6. European Union (2019) - Regulation (EU) 2019/1009
7. EL Boukhari et al. (2020) - Trends in seaweed extract based biostimulants
8. Mughunth et al. (2024) - A review of seaweed extract's potential

对每篇论文提取：
- 核心论点和方法
- 可引用的关键数据/结论
- 与本研究的关联
- 可引用的具体句子（带页码）`,
        phase: 'Stage 2: 文献调研',
      },
    ],
    checkpoint: '文献矩阵和精读笔记完成后，进入 Stage 3',
  },

  3: {
    name: '写作初稿',
    description: '从大纲到完整初稿，包含摘要、各章节、参考文献',
    agents: [
      {
        label: 'write-sections',
        prompt: `请帮我撰写/润色以下论文章节。稿件路径：D:\\综述-ai修改\\SEPA-5.6-Liu - 修订版.docx

需要重点处理的章节（按导师批注优先）：
1. Abstract — 已重写，请检查逻辑流畅度
2. Introduction — Para 8-9 已重写，检查文献引用是否充分
3. Methods (2.1-2.2) — 已重写，检查是否还有第一人称或工具介绍语
4. Results 3.1.1 — 已重写，检查评估性语句是否已移除
5. Discussion 4.4 — 五个未来建议是否足够具体
6. Conclusions — 是否呼应了 Abstract

对每个部分输出：修改建议 + 修改后文本`,
        phase: 'Stage 3: 写作初稿',
      },
      {
        label: 'polish-language',
        prompt: `对以下论文进行全文语言润色：
文件路径：D:\\综述-ai修改\\SEPA-5.6-Liu - 修订版.docx

润色要求：
1. Nature 期刊级学术英文
2. 修正所有语法错误和不完整句子
3. 统一时态（Methods用过去时，Results用过去时，Discussion用现在时）
4. 消除中式英语表达
5. 确保术语一致性（如"plant biostimulants" vs "biostimulants"）
6. 保持原意不变，不添加新内容
7. 输出修改对照（原文 → 修改后）`,
        phase: 'Stage 3: 写作初稿',
      },
    ],
    checkpoint: '初稿润色完成后，进入 Stage 4',
  },

  4: {
    name: '引文与数据',
    description: '补充缺失引用、验证引文真实性、撰写数据可用性声明',
    agents: [
      {
        label: 'find-citations',
        prompt: `为以下论文段落查找支撑文献。文件：D:\\综述-ai修改\\SEPA-5.6-Liu - 修订版.docx

导师指出以下位置需要文献支撑：
1. Discussion 4.1 — 多组学技术应用段落（需要 2-3 篇近期 miRNA/转录组/代谢组研究）
2. Discussion 4.2 — 土壤微生态段落（需要宏基因组研究引用）
3. Results 3.3.3 — keyword burst 解释（需要方法论引用）
4. Introduction — 海藻生物活性物质列表（已有部分，检查是否充分）

对每处：找到 2-3 篇合适文献，输出 BibTeX 格式 + 建议插入位置`,
        phase: 'Stage 4: 引文与数据',
      },
      {
        label: 'verify-citations',
        prompt: `对论文现有参考文献列表进行引文真实性抽检。文件：D:\\综述-ai修改\\SEPA-5.6-Liu - 修订版.docx

抽检范围：
1. 前 20 条参考文献
2. 关键论点所引的 10 条文献（Craigie 2011, du Jardin 2015, Battacharyya 2015, Calvo 2014, Bulgari 2015 等）
3. 2024-2026 年的新引用

对每条验证：
- DOI 是否存在
- 作者/标题/期刊/年份是否匹配
- 引用内容是否确实支撑文中论点
输出：VERIFIED / MISMATCH / NOT_FOUND 分类`,
        phase: 'Stage 4: 引文与数据',
      },
    ],
    checkpoint: '引文补充和验证完成后，进入 Stage 5',
  },

  5: {
    name: '图表制作',
    description: '按 Nature 投稿标准制作/优化所有图表',
    agents: [
      {
        label: 'figure-audit',
        prompt: `审计论文中所有图表的质量。文件：D:\\综述-ai修改\\SEPA-5.6-Liu - 修订版.docx

论文包含约 11 张图表（Figure 1-11, Table 1-6）。导师批注 #252 指出：
- 图中文字太小
- 图难看
- 需要"方正"布局

请对每张图/表评估：
1. 分辨率是否≥300 DPI
2. 字号是否≥8pt
3. 配色是否专业
4. 布局是否规整
5. 图注是否完整（标题、单位、缩写说明、n值、统计方法）
6. 是否为可编辑矢量格式

输出优先级修复清单（按严重程度排序）`,
        phase: 'Stage 5: 图表制作',
      },
      {
        label: 'remake-figures',
        prompt: `基于审计结果，用 nature-figure skill 重新制作以下图表：

优先重制（导师明确指出的问题）：
1. Figure 1 (Workflow) — 重新设计为专业流程图
2. Figure 2 (Publication trends) — 优化配色和字号
3. Figure 9 (Keyword co-occurrence) — 确保节点标签可读
4. Figure 10 (Keyword clustering) — 优化配色方案

要求：Nature 投稿标准、可编辑 SVG、中文/英文双语标注

输出文件保存到 D:\\综述-ai修改\\figures\\`,
        phase: 'Stage 5: 图表制作',
      },
    ],
    checkpoint: '图表重制完成后，进入 Stage 6',
  },

  6: {
    name: '审稿自查',
    description: '多视角模拟审稿，发现逻辑漏洞和不足',
    agents: [
      {
        label: 'nature-review',
        prompt: `以 Nature 审稿人标准对以下论文进行模拟审稿：
文件：D:\\综述-ai修改\\SEPA-5.6-Liu - 修订版.docx

请按 nature-reviewer skill 的标准流程：
1. 3 位审稿人分别侧重：技术严谨性、原创性/重要性、跨学科可读性
2. 交叉综合意见
3. 标注所有需要修改的技术缺陷

重点关注：
- 文献计量方法的规范性（检索策略、去重、关键词清洗）
- 结论是否有统计检验支撑
- Discussion 是否与 Results 有清晰边界
- SEPA 这个 acronym 的合理性`,
        phase: 'Stage 6: 审稿自查',
      },
      {
        label: 'devils-advocate',
        prompt: `以魔鬼代言人身份，用 Omniscale /critique 模式严格审查这篇论文：

文件：D:\\综述-ai修改\\SEPA-5.6-Liu - 修订版.docx

请主动寻找以下问题：
1. 逻辑漏洞：哪些结论不能从数据中合理推出？
2. 循环论证：是否用文献计量结果证明文献计量方法的有效性？
3. 数据泄露：训练集和测试集是否有混淆？（如适用）
4. 因果推断错误：相关性是否被当作因果性？
5. 遗漏变量：是否有重要的混杂因素未讨论？
6. 过度宣称：哪些声明显得过于绝对？

对每个问题，给出具体位置（段落/句子）和严重程度评分（1-5）。`,
        phase: 'Stage 6: 审稿自查',
      },
    ],
    checkpoint: '审稿意见汇总后，进入 Stage 7',
  },

  7: {
    name: '修改与回复',
    description: '根据审稿意见逐点修改，撰写 rebuttal letter',
    agents: [
      {
        label: 'revision-plan',
        prompt: `根据 Stage 6 的审稿意见，制定修改路线图。

审稿意见来源：
- nature-reviewer 的 3 份审稿报告
- devil's-advocate 的逻辑漏洞清单
- 原始导师 12 条批注

请：
1. 将所有意见按严重程度排序（Blocker > Major > Minor > Suggestion）
2. 对每条意见给出修改方案（具体到段落/句子级别）
3. 标注哪些意见可以快速解决、哪些需要深入修改
4. 建议哪些意见可以有理有据地 rebut（不修改）

输出格式：Markdown 表格`,
        phase: 'Stage 7: 修改与回复',
      },
      {
        label: 'polish-final',
        prompt: `对修改后的论文进行最终语言润色。

文件：D:\\综述-ai修改\\SEPA-5.6-Liu - 修订版.docx

这是投稿前最后一次润色，请：
1. 逐句检查语法、拼写、标点
2. 确保全篇术语一致
3. 检查参考文献格式（作者-年份是否与文末列表一致）
4. 检查图表引用编号是否连续正确
5. 输出最终修改对照`,
        phase: 'Stage 7: 修改与回复',
      },
    ],
    checkpoint: '修改完成 + rebuttal letter 就绪后，进入 Stage 8',
  },

  8: {
    name: '投稿输出',
    description: '格式转换、AI声明、答辩PPT、最终检查',
    agents: [
      {
        label: 'format-prep',
        prompt: `为论文准备投稿就绪文件包。

文件：D:\\综述-ai修改\\SEPA-5.6-Liu - 修订版.docx

需要准备：
1. 目标期刊格式检查（Frontiers in Plant Science / Scientometrics）
2. Cover letter 草稿（强调：首篇75年跨度的SEPA文献计量分析、实用政策价值）
3. Highlights（3-5条）
4. 作者贡献声明
5. 利益冲突声明
6. 数据可用性声明（WoS数据可通过DOI获取原始检索式）
7. AI 使用声明（使用了 Claude Code 辅助写作和润色）

输出所有文件到 D:\\综述-ai修改\\submission-package\\`,
        phase: 'Stage 8: 投稿输出',
      },
      {
        label: 'make-slides',
        prompt: `为这篇论文制作组会/答辩 PPT。

论文：海藻提取物促进可持续农业的文献计量分析（SEPA）
文件：D:\\综述-ai修改\\SEPA-5.6-Liu - 修订版.docx

要求：
1. 15-20 页
2. Nature 风格简洁设计
3. 中英文双语
4. 包含：背景、方法、关键结果（4-5张核心图）、讨论亮点、未来方向
5. 每页有演讲者备注
6. 输出 PPTX 格式

保存到 D:\\综述-ai修改\\SEPA-presentation.pptx`,
        phase: 'Stage 8: 投稿输出',
      },
    ],
    checkpoint: '🎉 投稿文件包完成！可以提交了。',
  },
}

// ================================================================
// 主流程
// ================================================================

const targetStage = args?.stage || 'all'

if (targetStage === 'all') {
  // 全流程：逐阶段执行
  log('=== 论文写作全流程启动 ===')
  log('共 8 个阶段，每阶段完成需人工确认')

  for (let s = 1; s <= 8; s++) {
    const stage = STAGES[s]
    phase(`Stage ${s}: ${stage.name}`)

    log(`\n📋 Stage ${s}: ${stage.name}`)
    log(`   ${stage.description}`)

    await parallel(
      stage.agents.map(a => () =>
        agent(a.prompt, { label: a.label, phase: `Stage ${s}: ${stage.name}` })
      )
    )

    log(`\n✅ Stage ${s} 完成`)
    log(`🔍 检查点: ${stage.checkpoint}`)

    if (s < 8) {
      log('⏸️  请人工审核后继续下一阶段')
    }
  }

  log('\n🎉 全流程完成！投稿文件包已就绪。')

} else {
  // 单阶段执行
  const s = parseInt(targetStage)
  if (!STAGES[s]) {
    log(`❌ 无效的阶段编号: ${targetStage}。有效范围: 1-8`)
    return
  }

  const stage = STAGES[s]
  phase(`Stage ${s}: ${stage.name}`)

  log(`\n📋 Stage ${s}: ${stage.name}`)
  log(`   ${stage.description}`)

  await parallel(
    stage.agents.map(a => () =>
      agent(a.prompt, { label: a.label, phase: `Stage ${s}: ${stage.name}` })
    )
  )

  log(`\n✅ Stage ${s} 完成`)
  log(`🔍 检查点: ${stage.checkpoint}`)
}
