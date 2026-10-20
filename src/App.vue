<script setup lang="ts">
import { computed, ref } from 'vue'
import { eras, milestones, type Era } from './data'

const index = ref(2)
const switching = ref(false)
const era = computed<Era>(() => eras[index.value])

const cssVars = computed(() => {
  const p = era.value.palette
  return {
    '--bg': p.bg,
    '--surface': p.surface,
    '--surface2': p.surface2,
    '--ink': p.ink,
    '--muted': p.muted,
    '--accent': p.accent,
    '--accent2': p.accent2,
    '--line': p.line,
    '--radius': p.radius,
    '--font-body': p.fontBody,
    '--font-display': p.fontDisplay,
    '--shadow': p.shadow,
  }
})

let switchTimer: number | undefined
function selectEra(i: number) {
  if (i === index.value || i < 0 || i >= eras.length) return
  switching.value = true
  if (switchTimer) window.clearTimeout(switchTimer)
  switchTimer = window.setTimeout(() => {
    index.value = i
    switching.value = false
  }, 180)
}

function scrub(event: Event) {
  selectEra(Number((event.target as HTMLInputElement).value))
}

function prev() {
  selectEra(index.value - 1)
}
function next() {
  selectEra(index.value + 1)
}

function onKey(event: KeyboardEvent) {
  if (event.key === 'ArrowLeft') prev()
  if (event.key === 'ArrowRight') next()
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div
    class="shell"
    :class="'fx-' + era.effect"
    :style="cssVars"
    :data-era="era.id"
    tabindex="0"
    @keydown="onKey"
  >
    <div class="decor decor-crt" aria-hidden="true"></div>
    <div class="decor decor-glass" aria-hidden="true"></div>

    <header class="masthead">
      <div class="marquee" aria-hidden="true">
        <span>
          ◆ 网络化石 WEB FOSSILS · 数字考古博物馆 ◆ 拖动时间轴，让整座页面穿越年代 ◆
          每个时代都有自己的按钮、字体、配色与光 ◆
        </span>
      </div>
      <div class="masthead-row">
        <div class="brand">
          <span class="brand-mark">F</span>
          <span class="brand-text">
            <b>网络化石</b>
            <i>Web Fossils · 数字考古博物馆</i>
          </span>
        </div>
        <div class="now-badge">
          <span class="now-label">当前地层</span>
          <span class="now-year">{{ era.year }}</span>
          <span class="now-name">{{ era.en }}</span>
        </div>
      </div>
    </header>

    <section class="hero">
      <div class="hero-copy">
        <p class="kicker">DIGITAL ARCHAEOLOGY · 一场可交互的风格考古</p>
        <h1 class="hero-title">
          <span class="line1">网页也会</span>
          <span class="line2">变成化石</span>
        </h1>
        <p class="hero-sub">
          从绿磷光终端到毛玻璃界面，每一种网页风格都埋在地层里。
          拖动下方的年代时间轴，整座页面会连同时代一起复活。
        </p>
        <div class="hero-cta">
          <button class="btn btn-primary" @click="scrollToId('machine')">
            启动时间机器 ↓
          </button>
          <button class="btn btn-ghost" @click="scrollToId('strata')">
            看看地层
          </button>
        </div>
      </div>

      <div class="dig">
        <div class="dig-meta">
          <span>探方编号 / WF-1995</span>
          <span>保存状态 / 完好</span>
        </div>
        <div class="dig-window">
          <div class="dig-window-bar">
            <i></i><i></i><i></i>
            <span>{{ era.sampleTitle }}</span>
          </div>
          <div class="dig-window-body">
            <p class="dig-sample">{{ era.sampleBody }}</p>
            <div class="dig-badge-row">
              <span class="dig-badge">Y2K</span>
              <span class="dig-badge">CSS</span>
              <span class="dig-badge">HTML</span>
            </div>
          </div>
        </div>
        <div class="dig-strata" aria-hidden="true">
          <i v-for="s in 5" :key="s"></i>
        </div>
      </div>
    </section>

    <section class="machine" id="machine">
      <div class="section-head">
        <p class="kicker">SIGNATURE INTERACTION</p>
        <h2>时间机器 <span>· Time Machine</span></h2>
        <p>拖动滑杆，或点击年代刻度，整页会切换到对应的网页时代。</p>
      </div>

      <div class="machine-stage" :class="{ switching }">
        <div class="era-readout">
          <div class="era-year">{{ era.year }}</div>
          <div class="era-title">
            <h3>{{ era.name }}</h3>
            <span>{{ era.en }} · {{ era.range }}</span>
          </div>
        </div>

        <p class="era-desc">{{ era.description }}</p>

        <div class="era-traits">
          <span v-for="t in era.traits" :key="t">{{ t }}</span>
        </div>

        <div class="palette">
          <span v-for="(c, key) in [era.palette.bg, era.palette.ink, era.palette.accent, era.palette.accent2]" :key="key" class="chip" :style="{ background: c }"></span>
          <span class="palette-label">本时代的取色板</span>
        </div>

        <div class="timeline">
          <div class="timeline-ticks">
            <button
              v-for="(e, i) in eras"
              :key="e.id"
              class="tick"
              :class="{ active: i === index }"
              @click="selectEra(i)"
            >
              <span class="tick-dot"></span>
              <span class="tick-year">{{ e.year }}</span>
              <span class="tick-name">{{ e.name }}</span>
            </button>
          </div>
          <input class="scrubber" type="range" min="0" :max="eras.length - 1" step="1" :value="index" @input="scrub" />
        </div>

        <div class="machine-nav">
          <button class="btn btn-ghost" @click="prev" :disabled="index === 0">← 上一个时代</button>
          <span class="machine-hint">也试试键盘 ← → 方向键</span>
          <button class="btn btn-ghost" @click="next" :disabled="index === eras.length - 1">下一个时代 →</button>
        </div>
      </div>
    </section>

    <section class="gallery" id="gallery">
      <div class="section-head">
        <p class="kicker">MUSEUM COLLECTION</p>
        <h2>风格展柜 <span>· The Collection</span></h2>
        <p>六个时代，六件展品。点击任意一件，把整座博物馆搬进那个年代。</p>
      </div>
      <div class="cards">
        <button
          v-for="(e, i) in eras"
          :key="e.id"
          class="era-card"
          :class="{ active: i === index }"
          :style="{ '--cbg': e.palette.bg, '--cink': e.palette.ink, '--caccent': e.palette.accent, '--cline': e.palette.line, '--cradius': e.palette.radius }"
          @click="selectEra(i)"
        >
          <span class="card-year">{{ e.year }}</span>
          <span class="card-name">{{ e.name }}</span>
          <span class="card-en">{{ e.en }}</span>
          <span class="card-note">{{ e.digNote }}</span>
        </button>
      </div>
    </section>

    <section class="strata" id="strata">
      <div class="section-head">
        <p class="kicker">EXCAVATION LOG</p>
        <h2>考古地层 <span>· Stratigraphy</span></h2>
        <p>越往下，越古老。六件关键里程碑，拼出网页的来路。</p>
      </div>
      <div class="strata-list">
        <div v-for="(m, i) in milestones" :key="m.year" class="strata-item">
          <span class="strata-year">{{ m.year }}</span>
          <span class="strata-dot"></span>
          <p>{{ m.text }}</p>
        </div>
      </div>
    </section>

    <section class="about">
      <div class="about-inner">
        <h2>关于这间博物馆</h2>
        <p>
          《网络化石》是一部关于网页视觉风格演变的互动展。六个时代的配色、字体与按钮样式，依据
          各时期主流设计手法的公开共识整理，属于基础知识演示，不涉及任何真实统计数据。
          拖动时间轴即可让整页穿越年代——这是本项目最核心、也最好玩的地方。
        </p>
        <div class="about-meta">
          <span>制作 · Vue 3 + Vite</span>
          <span>全部视觉 · CSS / SVG 原创绘制</span>
          <span>无外部图片依赖</span>
        </div>
      </div>
    </section>

    <footer class="footer">
      <span>网络化石 · Web Fossils</span>
      <span>DIGITAL VISUAL LAB · 数字视觉实验室</span>
      <span>拖动时间轴，穿越到 {{ era.name }}</span>
    </footer>
  </div>
</template>

<style>
.shell {
  --font-body: system-ui, sans-serif;
  --font-display: system-ui, sans-serif;
  --radius: 0px;
  --shadow: none;
  --bg: #f4eedb;
  --surface: #fffdf3;
  --surface2: #ece3ca;
  --ink: #3a2e20;
  --muted: #7a6a52;
  --accent: #7a4d9e;
  --accent2: #1a6fc4;
  --line: #b8a884;

  position: relative;
  min-height: 100vh;
  background: var(--bg);
  color: var(--ink);
  font-family: var(--font-body);
  line-height: 1.6;
  overflow-x: hidden;
  transition: background 0.55s ease, color 0.55s ease;
}

.shell::selection {
  background: var(--accent);
  color: var(--bg);
}

.decor {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 40;
}
.decor-crt {
  display: none;
}
.fx-crt .decor-crt {
  display: block;
  background: repeating-linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0px,
    rgba(0, 0, 0, 0) 2px,
    rgba(0, 0, 0, 0.28) 3px,
    rgba(0, 0, 0, 0) 4px
  );
  mix-blend-mode: multiply;
}
.decor-glass {
  display: none;
}
.fx-glass .decor-glass {
  display: block;
  background:
    radial-gradient(38% 42% at 12% 18%, rgba(127, 214, 255, 0.28), transparent 62%),
    radial-gradient(44% 46% at 88% 34%, rgba(199, 155, 255, 0.24), transparent 64%),
    radial-gradient(52% 54% at 50% 96%, rgba(83, 210, 255, 0.18), transparent 66%);
}

.masthead {
  border-bottom: 1px solid var(--line);
  padding: 0;
}
.marquee {
  overflow: hidden;
  white-space: nowrap;
  border-bottom: 1px solid var(--line);
  padding: 6px 0;
  font-size: 12px;
  letter-spacing: 1px;
  color: var(--muted);
}
.marquee span {
  display: inline-block;
  animation: marquee 28s linear infinite;
}
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.masthead-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px clamp(18px, 4vw, 56px);
}
.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}
.brand-mark {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border: 2px solid var(--ink);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 24px;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}
.brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}
.brand-text b {
  font-size: 18px;
  letter-spacing: 2px;
}
.brand-text i {
  font-style: normal;
  font-size: 11px;
  color: var(--muted);
  letter-spacing: 0.5px;
}
.now-badge {
  display: flex;
  align-items: baseline;
  gap: 10px;
  border: 1px solid var(--line);
  padding: 8px 14px;
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow: var(--shadow);
}
.now-label {
  font-size: 11px;
  color: var(--muted);
}
.now-year {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 700;
  color: var(--accent);
}
.now-name {
  font-size: 12px;
  letter-spacing: 1px;
}

.hero {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: clamp(24px, 5vw, 80px);
  align-items: center;
  padding: clamp(48px, 8vh, 110px) clamp(18px, 4vw, 56px);
  max-width: 1280px;
  margin: 0 auto;
}
.kicker {
  font-size: 12px;
  letter-spacing: 3px;
  color: var(--accent);
  margin: 0 0 14px;
  text-transform: uppercase;
}
.hero-title {
  font-family: var(--font-display);
  font-weight: 800;
  line-height: 0.98;
  letter-spacing: -0.02em;
  margin: 0;
  font-size: clamp(52px, 10vw, 136px);
}
.hero-title span {
  display: block;
}
.hero-title .line2 {
  color: var(--accent);
}
.hero-sub {
  max-width: 46ch;
  font-size: clamp(15px, 1.6vw, 18px);
  color: var(--muted);
  margin: 22px 0 0;
}
.hero-cta {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 30px;
}
.btn {
  border: 1px solid var(--line);
  background: var(--surface);
  color: var(--ink);
  padding: 12px 22px;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: transform 0.18s ease, filter 0.18s ease;
}
.btn:hover {
  filter: brightness(1.04);
}
.btn:active {
  transform: translateY(2px) scale(0.98);
}
.btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.btn-primary {
  background: var(--accent);
  color: #fff;
  border-color: transparent;
}
.fx-crt .btn-primary {
  background: transparent;
  color: var(--accent);
  border: 1px solid var(--accent);
}
.fx-glass .btn-primary {
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px);
  border-color: var(--line);
}

.dig {
  position: relative;
}
.dig-meta {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  font-size: 11px;
  letter-spacing: 1px;
  color: var(--muted);
  margin-bottom: 12px;
}
.dig-window {
  border: 1px solid var(--line);
  background: var(--surface);
  box-shadow: var(--shadow);
  border-radius: var(--radius);
  overflow: hidden;
}
.dig-window-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 9px 12px;
  border-bottom: 1px solid var(--line);
  background: var(--surface2);
}
.dig-window-bar i {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--accent);
}
.dig-window-bar i:nth-child(2) { background: var(--accent2); }
.dig-window-bar i:nth-child(3) { background: var(--muted); }
.dig-window-bar span {
  margin-left: 8px;
  font-size: 12px;
  color: var(--muted);
}
.dig-window-body {
  padding: 22px 20px;
}
.dig-sample {
  font-family: var(--font-display);
  font-size: 17px;
  margin: 0 0 16px;
}
.dig-badge-row {
  display: flex;
  gap: 8px;
}
.dig-badge {
  font-size: 10px;
  letter-spacing: 1px;
  border: 1px solid var(--line);
  padding: 2px 8px;
  border-radius: 999px;
  color: var(--muted);
}
.dig-strata {
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-top: 14px;
}
.dig-strata i {
  height: 7px;
  border-radius: 2px;
  background: var(--surface2);
  width: 100%;
}
.dig-strata i:nth-child(2) { width: 86%; background: var(--accent); }
.dig-strata i:nth-child(3) { width: 92%; }
.dig-strata i:nth-child(4) { width: 78%; }
.dig-strata i:nth-child(5) { width: 64%; background: var(--accent2); }

.machine,
.gallery,
.strata,
.about {
  padding: clamp(56px, 9vh, 110px) clamp(18px, 4vw, 56px);
  max-width: 1280px;
  margin: 0 auto;
}
.section-head {
  margin-bottom: clamp(28px, 5vh, 52px);
  max-width: 60ch;
}
.section-head h2 {
  font-family: var(--font-display);
  font-size: clamp(30px, 5vw, 58px);
  margin: 0 0 10px;
  letter-spacing: -0.01em;
}
.section-head h2 span {
  color: var(--muted);
  font-weight: 400;
}
.section-head p:last-child {
  color: var(--muted);
  margin: 0;
}

.machine-stage {
  border: 1px solid var(--line);
  background: var(--surface);
  box-shadow: var(--shadow);
  border-radius: var(--radius);
  padding: clamp(24px, 4vw, 52px);
  transition: opacity 0.16s ease, filter 0.16s ease;
}
.machine-stage.switching {
  opacity: 0.25;
  filter: saturate(0.4) blur(1px);
}
.era-readout {
  display: flex;
  align-items: flex-end;
  gap: clamp(16px, 3vw, 34px);
  flex-wrap: wrap;
}
.era-year {
  font-family: var(--font-display);
  font-size: clamp(64px, 12vw, 150px);
  line-height: 0.9;
  font-weight: 800;
  color: var(--accent);
}
.era-title h3 {
  font-size: clamp(24px, 3.4vw, 42px);
  margin: 0;
  letter-spacing: 2px;
}
.era-title span {
  color: var(--muted);
  font-size: 13px;
  letter-spacing: 1px;
}
.era-desc {
  max-width: 58ch;
  font-size: clamp(15px, 1.7vw, 18px);
  margin: 22px 0;
}
.era-traits {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 26px;
}
.era-traits span {
  font-size: 12px;
  letter-spacing: 1px;
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 5px 12px;
}
.palette {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 34px;
}
.chip {
  width: 46px;
  height: 46px;
  border-radius: 6px;
  border: 1px solid var(--line);
}
.palette-label {
  margin-left: 10px;
  font-size: 12px;
  color: var(--muted);
}

.timeline {
  padding: 8px 0 4px;
}
.timeline-ticks {
  display: flex;
  justify-content: space-between;
  gap: 6px;
  margin-bottom: 10px;
}
.tick {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  background: none;
  border: 0;
  color: var(--muted);
  padding: 0;
  transition: color 0.2s;
}
.tick-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid var(--line);
  background: var(--bg);
}
.tick-year {
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
}
.tick-name {
  font-size: 11px;
  white-space: nowrap;
}
.tick.active {
  color: var(--accent);
}
.tick.active .tick-dot {
  background: var(--accent);
  border-color: var(--accent);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 25%, transparent);
}
.scrubber {
  width: 100%;
  appearance: none;
  height: 28px;
  background: transparent;
  cursor: grab;
}
.scrubber:active {
  cursor: grabbing;
}
.scrubber::-webkit-slider-runnable-track {
  height: 6px;
  border-radius: 999px;
  background: linear-gradient(to right, var(--accent), var(--accent2));
}
.scrubber::-webkit-slider-thumb {
  appearance: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-top: -12px;
  background: var(--surface);
  border: 3px solid var(--ink);
  box-shadow: var(--shadow);
}
.scrubber::-moz-range-track {
  height: 6px;
  border-radius: 999px;
  background: linear-gradient(to right, var(--accent), var(--accent2));
}
.scrubber::-moz-range-thumb {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: var(--surface);
  border: 3px solid var(--ink);
}
.machine-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 28px;
}
.machine-hint {
  font-size: 12px;
  color: var(--muted);
}

.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}
.era-card {
  --cbg: #fff;
  --cink: #222;
  --caccent: #666;
  --cline: #ddd;
  --cradius: 0px;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 22px;
  border: 1px solid var(--cline);
  border-radius: var(--cradius);
  background: var(--cbg);
  color: var(--cink);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  position: relative;
  overflow: hidden;
}
.era-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.14);
}
.era-card.active {
  outline: 3px solid var(--accent);
  outline-offset: 3px;
}
.card-year {
  font-family: var(--font-display);
  font-size: 34px;
  font-weight: 800;
  color: var(--caccent);
  line-height: 1;
}
.card-name {
  font-size: 18px;
  font-weight: 700;
}
.card-en {
  font-size: 11px;
  letter-spacing: 2px;
  opacity: 0.6;
}
.card-note {
  font-size: 13px;
  opacity: 0.75;
  line-height: 1.55;
}

.strata-list {
  position: relative;
  padding-left: 8px;
}
.strata-list::before {
  content: '';
  position: absolute;
  left: 34px;
  top: 8px;
  bottom: 8px;
  width: 2px;
  background: var(--line);
}
.strata-item {
  display: grid;
  grid-template-columns: 58px 54px 1fr;
  align-items: center;
  gap: 12px;
  padding: 20px 0;
  border-bottom: 1px dashed var(--line);
}
.strata-item:last-child {
  border-bottom: 0;
}
.strata-year {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 700;
  color: var(--accent);
}
.strata-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--surface);
  border: 3px solid var(--accent);
  z-index: 1;
}
.strata-item p {
  margin: 0;
  color: var(--muted);
}

.about-inner {
  border: 1px solid var(--line);
  background: var(--surface);
  box-shadow: var(--shadow);
  border-radius: var(--radius);
  padding: clamp(24px, 4vw, 48px);
  max-width: 820px;
}
.about-inner h2 {
  font-family: var(--font-display);
  margin: 0 0 14px;
}
.about-inner p {
  color: var(--muted);
  margin: 0 0 18px;
}
.about-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 22px;
  font-size: 12px;
  letter-spacing: 1px;
  color: var(--muted);
}

.footer {
  border-top: 1px solid var(--line);
  display: flex;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
  padding: 22px clamp(18px, 4vw, 56px);
  font-size: 12px;
  letter-spacing: 1px;
  color: var(--muted);
}

@media (max-width: 860px) {
  .hero {
    grid-template-columns: 1fr;
  }
  .cards {
    grid-template-columns: 1fr;
  }
  .timeline-ticks {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    row-gap: 14px;
  }
  .now-badge {
    display: none;
  }
}
</style>
