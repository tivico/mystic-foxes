// Postcard destinations, spiritual messages, and collectible relics
export interface PostcardDestination {
  id: string;
  name: string;
  durationMs: number; // in milliseconds
  durationLabel: string;
  sceneryDescription: string;
  bgGradient: string;
  svgIcon: string;
}

export interface PostcardStory {
  id: string;
  title: string;
  destination: string;
  poemText: string;
  warmLetter: string;
  relicName: string;
  relicEmoji: string;
  relicDesc: string;
  photoPalette: {
    skyTop: string;
    skyBottom: string;
    mountainColor: string;
    sunColor: string;
    treesColor: string;
    accentEmoji: string;
  };
}

export const POSTCARD_DESTINATIONS: PostcardDestination[] = [
  {
    id: 'flower-path',
    name: '🌸 櫻雨花見小徑',
    durationMs: 2 * 60 * 1000, // 2 minutes for immediate cozy gratification
    durationLabel: '2 分鐘 (輕快小憩)',
    sceneryDescription: '粉色櫻花如雪片般飄零的靜謐石階小徑。',
    bgGradient: 'from-pink-100 via-rose-50 to-amber-50',
    svgIcon: '🌸',
  },
  {
    id: 'moss-valley',
    name: '🌲 綠苔古木幽谷',
    durationMs: 15 * 60 * 1000, // 15 minutes
    durationLabel: '15 分鐘 (深林靜思)',
    sceneryDescription: '林木扶疏、古老巨木生長著柔軟青苔與林間晨露。',
    bgGradient: 'from-emerald-100 via-teal-50 to-stone-50',
    svgIcon: '🌲',
  },
  {
    id: 'starry-peak',
    name: '🌌 雲海千星仙峰',
    durationMs: 60 * 60 * 1000, // 1 hour
    durationLabel: '1 小時 (雲海遠行)',
    sceneryDescription: '破曉時分俯瞰翻湧的雲海與尚未褪去的漫天繁星。',
    bgGradient: 'from-indigo-900 via-purple-900 to-amber-900',
    svgIcon: '🌌',
  },
];

export const POSTCARD_COLLECTION: PostcardStory[] = [
  {
    id: 'post-1',
    title: '晨霧中的微光石',
    destination: '櫻雨花見小徑',
    poemText: '晨光穿透櫻瓣落，風撫狐耳步輕挪；世間萬事皆有期，且待花開且高歌。',
    warmLetter: '「主人～我在小徑旁的石階上撿到這顆透著晨光的鵝卵石，上面還沾著一瓣櫻花。今天在外面吹風時，我好想把這份溫柔分享給你！」',
    relicName: '櫻雨晨曦石',
    relicEmoji: '🌸',
    relicDesc: '散發淡淡櫻花甘甜香氣的溫潤粉晶石。',
    photoPalette: {
      skyTop: '#fed7aa',
      skyBottom: '#fbcfe8',
      mountainColor: '#f472b6',
      sunColor: '#fff1f2',
      treesColor: '#db2777',
      accentEmoji: '🌸',
    },
  },
  {
    id: 'post-2',
    title: '幽谷裡的琥珀松脂',
    destination: '綠苔古木幽谷',
    poemText: '古樹千年生翠碧，林間深處水潺潺；心若止水無塵染，自得青山伴月眠。',
    warmLetter: '「在老杉樹的樹洞裡，我發現了這滴凝固了百年的清透琥珀！谷裡好安靜，我趴在青苔上打了個小盹，醒來時整隻狐都充滿了草木清香呢～」',
    relicName: '古林松香琥珀',
    relicEmoji: '🪵',
    relicDesc: '封存了古老森林芬多精的晶亮琥珀。',
    photoPalette: {
      skyTop: '#bbf7d0',
      skyBottom: '#99f6e4',
      mountainColor: '#14b8a6',
      sunColor: '#fef08a',
      treesColor: '#0f766e',
      accentEmoji: '🌲',
    },
  },
  {
    id: 'post-3',
    title: '千星雲海的夜明螢石',
    destination: '雲海千星仙峰',
    poemText: '雲上長風吹廣袖，星河倒瀉入心胸；莫道長夜無光引，掌中微爍即明燈。',
    warmLetter: '「登上山巔的時候，雲海就像巨大的棉花糖在腳下翻騰！我在星空下找到了這枚散發螢藍幽光的星屑。請收下我的這份禮物，夜裡它會替你照亮好夢喔！」',
    relicName: '千星之淚螢石',
    relicEmoji: '💎',
    relicDesc: '在黑暗中會發出如同深邃銀河般柔藍光芒的神奇礦石。',
    photoPalette: {
      skyTop: '#1e1b4b',
      skyBottom: '#312e81',
      mountainColor: '#4338ca',
      sunColor: '#fef08a',
      treesColor: '#3730a3',
      accentEmoji: '✨',
    },
  },
  {
    id: 'post-4',
    title: '湖畔紅楓的思念',
    destination: '櫻雨花見小徑',
    poemText: '一葉紅楓順水漂，遠山如黛水迢迢；若逢人間煩憂事，且看秋色意蕭蕭。',
    warmLetter: '「看到湖面飄著這片完好無損的赤色楓葉，我用嘴巴小心翼翼地把它銜回來了！不管是陰天還是晴天，小狐狸永遠都在這裡陪著你呀。」',
    relicName: '金赤流光楓葉',
    relicEmoji: '🍁',
    relicDesc: '永不凋萎的金黃赤色琉璃楓葉書籤。',
    photoPalette: {
      skyTop: '#ffedd5',
      skyBottom: '#fed7aa',
      mountainColor: '#fb923c',
      sunColor: '#fff7ed',
      treesColor: '#c2410c',
      accentEmoji: '🍁',
    },
  },
  {
    id: 'post-5',
    title: '雪頂初霽的冰晶花',
    destination: '雲海千星仙峰',
    poemText: '冬雪消融春意近，冰凌倒掛待朝曦；莫畏朔風摧寒草，冰心一點映春暉。',
    warmLetter: '「高山上的雪花落在大石頭上，居然凝結成了一朵小小的冰晶花！哪怕再冷的天氣，只要一想到回到主人身邊有暖洋洋的摸摸，我心裡就一點都不冷了～」',
    relicName: '不融千層冰晶花',
    relicEmoji: '❄️',
    relicDesc: '觸感涼爽、在陽光下泛著七彩虹光的冰晶工藝品。',
    photoPalette: {
      skyTop: '#e0f2fe',
      skyBottom: '#bae6fd',
      mountainColor: '#38bdf8',
      sunColor: '#ffffff',
      treesColor: '#0284c7',
      accentEmoji: '❄️',
    },
  },
];
