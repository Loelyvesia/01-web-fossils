export interface EraPalette {
  bg: string
  surface: string
  surface2: string
  ink: string
  muted: string
  accent: string
  accent2: string
  line: string
  radius: string
  fontBody: string
  fontDisplay: string
  shadow: string
}

export interface Era {
  id: string
  year: string
  range: string
  name: string
  en: string
  effect: 'retro' | 'crt' | 'y2k' | 'skeuo' | 'flat' | 'glass'
  tagline: string
  description: string
  palette: EraPalette
  traits: string[]
  digNote: string
  sampleTitle: string
  sampleBody: string
}

const serif = 'Georgia, "Times New Roman", "Noto Serif SC", "Songti SC", SimSun, serif'
const sans = 'system-ui, -apple-system, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif'
const mono = '"Cascadia Mono", Consolas, "Courier New", monospace'

export const eras: Era[] = [
  {
    id: 'crt',
    year: '1983',
    range: '1970s — 1980s',
    name: '绿磷光终端',
    en: 'CRT Terminal',
    effect: 'crt',
    tagline: '在发光管与扫描线里，文字就是图形。',
    description:
      '网页诞生之前，信息由字符构成。绿色磷光打在厚重的阴极射线管上，每一行命令都像一句发光的咒语。这个时代教会我们：内容本身就是界面。',
    palette: {
      bg: '#040806',
      surface: '#07130c',
      surface2: '#0b2014',
      ink: '#7dffa0',
      muted: '#45c877',
      accent: '#39ff7a',
      accent2: '#20d98c',
      line: '#176038',
      radius: '0px',
      fontBody: mono,
      fontDisplay: mono,
      shadow: '0 0 18px rgba(57,255,122,.25)',
    },
    traits: ['等宽字体', '扫描线', '闪烁光标', 'ASCII 装饰', '黑底绿字'],
    digNote: '地层最深处的残片：一块还亮着的荧光屏。',
    sampleTitle: 'BBS 公告板',
    sampleBody: '> login: visitor\n> 欢迎来到 1983 年的网络前夜…',
  },
  {
    id: 'retro',
    year: '1995',
    range: '1993 — 1998',
    name: '早期网页',
    en: 'The Dawn',
    effect: 'retro',
    tagline: '米色背景、蓝色链接与永远在建的站点。',
    description:
      '第一个网页编辑器把表格当画布，把 GIF 当砖块。米色的底、紫色的访客计数、还在施工的小黄牌——那是互联网最天真的一段青春期。',
    palette: {
      bg: '#f4eedb',
      surface: '#fffdf3',
      surface2: '#ece3ca',
      ink: '#3a2e20',
      muted: '#7a6a52',
      accent: '#7a4d9e',
      accent2: '#1a6fc4',
      line: '#b8a884',
      radius: '0px',
      fontBody: serif,
      fontDisplay: serif,
      shadow: 'none',
    },
    traits: ['衬线字体', '表格布局', '蓝色链接', '访客计数器', 'marquee 跑马灯'],
    digNote: '地层里的琥珀：一张写着「建设中」的米色网页。',
    sampleTitle: '我的个人主页',
    sampleBody: '欢迎光临！本站 800×600 分辨率最佳，计数器：00042',
  },
  {
    id: 'y2k',
    year: '2000',
    range: '1999 — 2004',
    name: '千禧年',
    en: 'Y2K',
    effect: 'y2k',
    tagline: '金属质感、渐变蓝与一颗永远旋转的地球。',
    description:
      '千禧年钟声敲响，界面突然学会反光。银色的立体按钮、蓝色的渐变导航、无处不在的闪光与 88×31 徽章——未来被包装成一颗亮晶晶的糖果。',
    palette: {
      bg: '#dfe9f6',
      surface: '#f2f7fd',
      surface2: '#c9dcf2',
      ink: '#12325b',
      muted: '#4d6c91',
      accent: '#0a5fd0',
      accent2: '#f0a41c',
      line: '#9fb8d8',
      radius: '8px',
      fontBody: sans,
      fontDisplay: sans,
      shadow: '0 4px 12px rgba(20,60,120,.35)',
    },
    traits: ['金属渐变', '玻璃反光', '88×31 徽章', '闪光特效', '蓝色导航条'],
    digNote: '一件镀铬的化石：光滑、反光、充满乐观。',
    sampleTitle: '酷站导航',
    sampleBody: '★ 新站推荐 ★ 加入收藏夹 | 友情链接 | 设为首页',
  },
  {
    id: 'skeuo',
    year: '2008',
    range: '2007 — 2012',
    name: '拟物化',
    en: 'Skeuomorphism',
    effect: 'skeuo',
    tagline: '皮纹、木纹与一颗能按下去的按钮。',
    description:
      '触屏时代来临，界面开始模仿真实世界的质感。皮革缝线、金属拉丝、玻璃高光——按钮看起来真的可以被按下去，数字世界第一次有了触感。',
    palette: {
      bg: '#cbbfa8',
      surface: '#d8ccb4',
      surface2: '#b9a987',
      ink: '#2b261e',
      muted: '#6b6152',
      accent: '#5d8a3f',
      accent2: '#b07f35',
      line: '#94866d',
      radius: '14px',
      fontBody: sans,
      fontDisplay: sans,
      shadow: '0 8px 20px rgba(60,45,20,.4), inset 0 1px 0 rgba(255,255,255,.55)',
    },
    traits: ['皮革纹理', '缝线装饰', '立体按钮', '高光渐变', '拟物图标'],
    digNote: '一块缝着线的皮革化石，上面嵌着立体的图标。',
    sampleTitle: '我的桌面便签',
    sampleBody: '把重要的东西，贴在皮革桌面上。',
  },
  {
    id: 'flat',
    year: '2014',
    range: '2013 — 2017',
    name: '扁平化',
    en: 'Flat Design',
    effect: 'flat',
    tagline: '去掉高光与阴影，只留下最清楚的形状。',
    description:
      '拟物的喧闹过后，界面被剥到只剩颜色与形状。亮丽的色块、克制的排版、干净的长投影——信息第一次不再需要假装成别的东西。',
    palette: {
      bg: '#f7f8fa',
      surface: '#ffffff',
      surface2: '#eceff4',
      ink: '#243447',
      muted: '#6b7889',
      accent: '#e6483d',
      accent2: '#20b486',
      line: '#dfe4eb',
      radius: '2px',
      fontBody: sans,
      fontDisplay: sans,
      shadow: 'none',
    },
    traits: ['纯色色块', '无阴影', '长投影', '清晰排版', '圆形头像'],
    digNote: '一片被压平的化石，薄得只剩下一层颜色。',
    sampleTitle: '移动应用界面',
    sampleBody: '一张卡片，一个动作，没有多余的东西。',
  },
  {
    id: 'glass',
    year: '2022',
    range: '2020 — 至今',
    name: '玻璃拟态',
    en: 'Glassmorphism',
    effect: 'glass',
    tagline: '半透明的光，在毛玻璃上散开。',
    description:
      '深色背景上浮起一层层半透明的玻璃。模糊、通透、层叠的渐变光斑——界面不再是一张纸，而是一块能看见后方景深的冰。',
    palette: {
      bg: '#131c31',
      surface: 'rgba(255,255,255,.08)',
      surface2: 'rgba(255,255,255,.14)',
      ink: '#f2f6ff',
      muted: '#9fb0d0',
      accent: '#7fd6ff',
      accent2: '#c79bff',
      line: 'rgba(255,255,255,.22)',
      radius: '20px',
      fontBody: sans,
      fontDisplay: sans,
      shadow: '0 12px 40px rgba(0,0,0,.35)',
    },
    traits: ['毛玻璃', '背景模糊', '渐变光斑', '通透层叠', '柔和描边'],
    digNote: '一块刚刚凝固的冰，里面封着流动的光。',
    sampleTitle: '系统控制面板',
    sampleBody: '浮在渐变之上的，是半透明的设置面板。',
  },
]

export const milestones = [
  { year: '1991', text: '第一个网页上线，只有文字与链接，却打开了整座博物馆的大门。' },
  { year: '1995', text: '表格布局流行，设计师开始用「看不见的网格」排布版面。' },
  { year: '1998', text: 'CSS 被广泛采用，内容与样式第一次可以分开。' },
  { year: '2007', text: 'iPhone 发布，手指取代鼠标，界面开始为触摸而设计。' },
  { year: '2014', text: '响应式设计与扁平化成为主流，一个页面适配所有屏幕。' },
  { year: '2023', text: '玻璃拟态与动态渐变流行，界面重新变得有质感。' },
]
