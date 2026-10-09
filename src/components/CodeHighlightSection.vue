<template>
  <v-card elevation="1" rounded="lg" class="pa-4">
    <h2 class="text-h5 font-weight-bold mb-2">
      <v-icon color="primary" class="mr-2">mdi-code-tags</v-icon>
      {{ title }}
    </h2>
    <p v-if="subtitle" class="text-body-2 text-medium-emphasis mb-4">{{ subtitle }}</p>

    <div v-for="(item, i) in items" :key="i" class="highlight-item">
      <!-- 条目标题 -->
      <div class="d-flex align-center flex-wrap mb-2">
        <span class="hl-no">#{{ item.no }}</span>
        <h3 class="text-h6 font-weight-bold mx-2">{{ item.name }}</h3>
        <v-chip size="x-small" variant="tonal" color="secondary">
          <v-icon start size="12">mdi-file-code-outline</v-icon>
          {{ item.location }}
        </v-chip>
      </div>

      <!-- 亮点解析（始终可见） -->
      <ul class="feature-list mb-3">
        <li v-for="(p, pi) in item.points" :key="pi" v-html="p"></li>
      </ul>

      <!-- 代码段（默认折叠，点击标题栏展开） -->
      <div
        v-for="(c, j) in item.codes"
        :key="j"
        class="code-wrapper"
        :class="{ open: isOpen(i, j) }"
      >
        <button type="button" class="code-header" @click="toggle(i, j)">
          <v-icon size="15" class="mr-2">{{ isOpen(i, j) ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          <span class="code-label">{{ c.label || 'C#' }}</span>
          <span class="code-meta">{{ lineCount(c.code) }} 行 · 点击{{ isOpen(i, j) ? '收起' : '展开' }}</span>
        </button>
        <v-expand-transition>
          <pre v-show="isOpen(i, j)" class="code-block"><code v-html="highlight(c.code)"></code></pre>
        </v-expand-transition>
      </div>
    </div>
  </v-card>
</template>

<script setup>
import { reactive } from 'vue'

defineProps({
  title: { type: String, default: '代码亮点精选' },
  subtitle: { type: String, default: '' },
  items: { type: Array, required: true }
})

/* 折叠状态：key = `${条目下标}-${代码块下标}` */
const openMap = reactive({})
const keyOf = (i, j) => `${i}-${j}`
const isOpen = (i, j) => !!openMap[keyOf(i, j)]
const toggle = (i, j) => { openMap[keyOf(i, j)] = !openMap[keyOf(i, j)] }
const lineCount = (code) => code.split('\n').length

/* ---------- 轻量 C# 语法高亮（Monokai Pro 配色） ---------- */
const CSHARP_KEYWORDS = new Set([
  'public', 'private', 'protected', 'internal', 'static', 'readonly', 'const',
  'void', 'bool', 'byte', 'int', 'uint', 'float', 'double', 'decimal',
  'string', 'object', 'var', 'dynamic', 'new', 'return', 'if', 'else',
  'for', 'foreach', 'while', 'do', 'switch', 'case', 'break', 'continue',
  'default', 'class', 'struct', 'enum', 'interface', 'this', 'base',
  'null', 'true', 'false', 'get', 'set', 'in', 'out', 'ref', 'params',
  'using', 'namespace', 'override', 'virtual', 'abstract', 'sealed',
  'partial', 'yield', 'is', 'as', 'typeof', 'nameof',
  'try', 'catch', 'finally', 'throw', 'lock', 'async', 'await',
  'operator', 'implicit', 'explicit', 'event', 'delegate', 'where'
])

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// 依次捕获：注释 | 字符串 | 数字 | 标识符
const TOKEN_RE = /(\/\/[^\n]*)|("(?:\\.|[^"\\\n])*")|(\b\d+(?:\.\d+)?f?\b)|([A-Za-z_][A-Za-z0-9_]*)/g

const highlight = (code) => {
  let out = ''
  let last = 0
  let m
  TOKEN_RE.lastIndex = 0
  while ((m = TOKEN_RE.exec(code)) !== null) {
    out += escapeHtml(code.slice(last, m.index))
    const [, cmt, str, num, word] = m
    if (cmt) out += `<span class="tok-cmt">${escapeHtml(cmt)}</span>`
    else if (str) out += `<span class="tok-str">${escapeHtml(str)}</span>`
    else if (num) out += `<span class="tok-num">${escapeHtml(num)}</span>`
    else if (CSHARP_KEYWORDS.has(word)) out += `<span class="tok-kw">${escapeHtml(word)}</span>`
    else if (/^[A-Z]/.test(word)) out += `<span class="tok-type">${escapeHtml(word)}</span>`
    else if (/^\s*\(/.test(code.slice(TOKEN_RE.lastIndex))) out += `<span class="tok-fn">${escapeHtml(word)}</span>`
    else out += escapeHtml(word)
    last = TOKEN_RE.lastIndex
  }
  out += escapeHtml(code.slice(last))
  return out
}
</script>

<style scoped>
/* 条目分隔 */
.highlight-item + .highlight-item {
  margin-top: 18px;
  padding-top: 18px;
  border-top: 1px dashed rgba(0, 0, 0, 0.12);
}

/* 序号徽标 */
.hl-no {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 34px;
  height: 26px;
  padding: 0 6px;
  border-radius: 7px;
  background: rgba(167, 105, 172, 0.12);
  color: #a769ac;
  font-weight: 800;
  font-size: 0.8rem;
  font-family: ui-monospace, Consolas, monospace;
}

/* 亮点解析列表 */
.feature-list {
  list-style: none;
  padding: 0;
  margin: 0 0 4px;
}

.feature-list li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.6rem;
  line-height: 1.7;
  font-size: 0.92rem;
}

.feature-list li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: #a769ac;
  font-weight: bold;
}

.feature-list li :deep(code) {
  font-family: ui-monospace, 'Cascadia Code', Consolas, monospace;
  font-size: 0.84em;
  background: rgba(167, 105, 172, 0.09);
  padding: 1px 5px;
  border-radius: 4px;
}

/* ---------- 代码块（Monokai Pro 风格） ---------- */
.code-wrapper {
  margin-bottom: 10px;
}

.code-wrapper:last-child {
  margin-bottom: 0;
}

.code-header {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 14px;
  border: none;
  border-radius: 8px;
  background: #423f43;
  color: #c1c0bf;
  font-size: 0.78rem;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}

.code-wrapper.open .code-header {
  border-radius: 8px 8px 0 0;
}

.code-header:hover {
  background: #4a474c;
  color: #fcfcfa;
}

.code-label {
  font-family: ui-monospace, 'Cascadia Code', Consolas, monospace;
  font-weight: 700;
  color: #a9dc76;
  margin-right: 10px;
}

.code-meta {
  opacity: 0.75;
  font-size: 0.72rem;
}

.code-block {
  margin: 0;
  padding: 14px 16px;
  background: #2d2a2e;
  color: #fcfcfa;
  border-radius: 0 0 8px 8px;
  overflow-x: auto;
  font-family: ui-monospace, 'Cascadia Code', Consolas, 'Courier New', monospace;
  font-size: 0.8rem;
  line-height: 1.65;
  white-space: pre;
  tab-size: 4;
}

/* Monokai Pro 语法配色（v-html 注入，需 :deep 穿透） */
.code-block :deep(code) {
  background: none;
  padding: 0;
  color: inherit;
}

.code-block :deep(.tok-kw) { color: #ff6188; }      /* 关键字：红 */
.code-block :deep(.tok-str) { color: #ffd866; }     /* 字符串：黄 */
.code-block :deep(.tok-num) { color: #ab9df2; }     /* 数字：紫 */
.code-block :deep(.tok-type) { color: #78dce8; }    /* 类型：蓝 */
.code-block :deep(.tok-fn) { color: #a9dc76; }      /* 方法：绿 */
.code-block :deep(.tok-cmt) { color: #727072; font-style: italic; } /* 注释：灰 */
</style>
