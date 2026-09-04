import { FoxAccessory, GardenSnackItem, GardenToyItem } from '../types';

export const FOX_ACCESSORIES: FoxAccessory[] = [
  {
    id: 'none',
    name: '原生純真',
    icon: '✨',
    category: 'head',
    description: '保持最天然毛茸茸的自然姿態',
  },
  {
    id: 'shrine-ribbon',
    name: '稻荷朱砂御守結',
    icon: '⛩️',
    category: 'neck',
    description: '伏見稻荷神使傳承的朱紅結，提升靈性庇佑',
  },
  {
    id: 'sakura-crown',
    name: '春櫻花冠',
    icon: '🌸',
    category: 'head',
    description: '以初春掉落的粉櫻花瓣編織的花環，散發甜香',
  },
  {
    id: 'clover-leaf',
    name: '幸運四葉草',
    icon: '🍀',
    category: 'head',
    description: '在晨曦森林中採集的幸運葉片，插在頭頂呆萌無比',
  },
  {
    id: 'round-glasses',
    name: '學者金絲圓鏡',
    icon: '👓',
    category: 'head',
    description: '讓小狐狸看起來像個飽讀狐狸古籍的小學士',
  },
  {
    id: 'explorer-cape',
    name: '後山探險家斗篷',
    icon: '🧭',
    category: 'neck',
    description: '防風防雨的精緻小斗篷，背上就想四處冒險',
  },
  {
    id: 'celestial-aura',
    name: '九天星宿神環',
    icon: '💫',
    category: 'aura',
    description: '唯有覺醒仙狐才能配戴的流光星河光暈',
  },
];

export const GARDEN_SNACKS: GardenSnackItem[] = [
  {
    id: 'sweet-berries',
    name: '森林甜野莓',
    emoji: '🍓',
    attractionBonus: '吸引好奇寶寶與活潑狐狸',
    desc: '清晨採摘的多汁野莓，散發酸甜的果香',
  },
  {
    id: 'fried-tofu',
    name: '酥炸金黃油豆腐',
    emoji: '🧈',
    attractionBonus: '神話仙狐的最愛（高吸引率！）',
    desc: '香氣四溢的特製油豆腐，狐狸們完全無法抗拒的究極美味',
  },
  {
    id: 'aurora-salmon',
    name: '冰川極光三文魚',
    emoji: '🐟',
    attractionBonus: '極地與高山狐狸的特產美食',
    desc: '來自極北冰川的鮮美魚肉，富含Omega-3讓毛色發光',
  },
  {
    id: 'fluffy-mochi',
    name: '甜香豆沙小草餅',
    emoji: '🍡',
    attractionBonus: '吸引安靜害羞的林間隱狐',
    desc: '軟糯香甜的小點心，咬下去滿滿幸福感',
  },
];

export const GARDEN_TOYS: GardenToyItem[] = [
  {
    id: 'bell-yarn-ball',
    name: '叮噹毛線球',
    emoji: '🧶',
    desc: '會發出清脆鈴鐺聲的彩虹毛線球，小狐狸最喜歡用爪子撥弄',
  },
  {
    id: 'warm-cushion',
    name: '暖洋洋蒲團軟墊',
    emoji: '🛏️',
    desc: '曬過午後陽光的厚軟坐墊，吸引喜歡打盹的慵懶狐狸',
  },
  {
    id: 'feather-teaser',
    name: '逗狐羽毛棒',
    emoji: '🪶',
    desc: '輕盈飄動的雉雞羽毛，能瞬間激發狐狸撲跳的捕獵本能',
  },
  {
    id: 'crystal-fountain',
    name: '山泉小流水台',
    emoji: '⛲',
    desc: '潺潺流淌的甘甜泉水台，吸引靈狐前來駐足飲水',
  },
];

export const ADVENTURE_LOCATIONS = [
  {
    id: 'starlight-lake',
    name: '星光湖畔',
    icon: '✨',
    minLevel: 1,
    desc: '微波粼粼的神秘湖泊，夜晚會有星宿倒映在水中。',
    treasures: ['星光螢石 💎', '夜光水草 🌿', '湖畔藍羽毛 🪶', '銀白貝殼 🐚'],
    stories: [
      '在湖邊追逐螢火蟲時，從小水窪裡撈到了亮晶晶的石頭！',
      '趴在岸邊喝水時，遇到了一隻發光的藍色水鳥，送了它漂亮的羽毛！',
      '好奇對著湖面看著自己的倒影搖尾巴，還撿到了漂亮的貝殼！',
    ],
  },
  {
    id: 'maple-trail',
    name: '楓紅落葉小徑',
    icon: '🍁',
    minLevel: 3,
    desc: '鋪滿金色與火紅落葉的浪漫小山坡，充滿松鼠藏起來的寶藏。',
    treasures: ['巨大甜松果 🌰', '金箔楓葉 🍁', '琥珀蜜糖石 🍯', '橡實風鈴 🎐'],
    stories: [
      '在一堆厚厚的落葉堆裡玩打滾，意外刨出了松鼠藏下的甜松果！',
      '跟著一陣秋風奔跑，接住了一片閃耀金光的奇特楓葉！',
      '跳上樹樁曬太陽，在樹洞裡找到了一顆晶瑩剔透的琥珀！',
    ],
  },
  {
    id: 'cloud-shrine',
    name: '雲海神社秘境',
    icon: '⛩️',
    minLevel: 6,
    desc: '隱藏在雲海之上的古老稻荷神社，充滿祥瑞仙氣與靈力。',
    treasures: ['稻荷神靈玉 🔮', '古老狐火符 📜', '仙靈金鈴 🔔', '九天甘露 🍶'],
    stories: [
      '登上神社千本鳥居之巔，神壇前的神使雕像突然綻放微光，賜予了神靈玉！',
      '在參道旁的石燈籠下撿到了散發微溫的古老符咒，靈力大增！',
      '聆聽風吹過神社簷角的鈴聲，在祈願繪馬架下發現了被遺忘的仙鈴！',
    ],
  },
];
