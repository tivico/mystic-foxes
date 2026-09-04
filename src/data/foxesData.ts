import { FoxSpecies, ColdFact, QuizQuestion } from '../types';

export const FOX_SPECIES_LIST: FoxSpecies[] = [
  {
    id: 'red-fox',
    name: '赤狐',
    englishName: 'Red Fox',
    scientificName: 'Vulpes vulpes',
    category: 'real',
    habitat: 'forest',
    habitatLabel: '深林灌木 / 溫帶丘陵',
    themeColor: 'from-amber-500 to-orange-600',
    accentBg: 'bg-orange-50 text-orange-700 border-orange-200',
    avatarEmoji: '🦊',
    subtitle: '森林中的機敏行者與大尾巴魔術師',
    description: '赤狐是地球上分佈最廣泛的肉食哺乳動物之一，以其標誌性的紅褐色毛皮、白胸膛與雪白尾尖著稱。牠們擁有極高的智商與環境適應力，是童話與寓言故事中最常見的狐狸主角！',
    personalityTraits: ['機靈聰穎', '好奇心旺盛', '適應力極強', '活潑調皮'],
    stats: {
      cuteness: 92,
      fluffiness: 95,
      agility: 96,
      curiosity: 98,
    },
    passiveSkill: {
      name: '地磁躍殺 (Magnetic Pounce)',
      badge: '定向狩獵',
      description: '赤狐跳入雪地捕捉獵物時，會利用地球磁場來精確定位雪層下的聲響，朝向東北方撲擊時成功率高達 73%！'
    },
    diet: '小型鼠類、漿果、鳥蛋、甲蟲與甜美野果（雜食性）',
    sizeWeight: '體長 45~90 cm · 體重約 3.5~8 kg',
    lifespan: '野外約 2~5 年 · 人工照護可達 12~15 年',
    vocalization: {
      soundText: 'Gekk-gekk! (咯咯聲) & 尖銳高亢的夜吠',
      soundDesc: '興奮打招呼時會發出像笑聲般的咯咯輕叫，警戒時則會發出穿越森林的高音嘯叫。'
    },
    funFacts: [
      '赤狐蓬鬆的大尾巴不僅是平衡桿，在冬天睡覺時更是一條裹住口鼻的天然保暖羊毛圍巾。',
      '牠們的腳底肉墊長滿細軟毛髮，讓牠們踩在落葉與積雪上時能幾乎不發出任何聲響。',
      '赤狐能識別彼此獨特的呼喚聲，每一隻狐狸都有專屬的「聲音指紋」。'
    ],
    cuteQuote: '「不管雪有多深，我的大尾巴都能給我最溫暖的擁抱！」'
  },
  {
    id: 'arctic-fox',
    name: '北極狐',
    englishName: 'Arctic Fox',
    scientificName: 'Vulpes lagopus',
    category: 'real',
    habitat: 'snow',
    habitatLabel: '極地苔原 / 終年冰原',
    themeColor: 'from-sky-400 to-blue-600',
    accentBg: 'bg-sky-50 text-sky-700 border-sky-200',
    avatarEmoji: '❄️',
    subtitle: '零下50度冰天雪地裡的雪白絨球',
    description: '北極狐生活在極度嚴寒的北極凍原，擁有哺乳動物中最保暖的毛皮之一。為了減少熱量散失，牠們的耳朵小而圓圓、四肢短而結實，縮成一團時就像一個無害的奶油雪球。',
    personalityTraits: ['堅韌不拔', '安靜溫和', '超強禦寒', '毛絨軟萌'],
    stats: {
      cuteness: 99,
      fluffiness: 100,
      agility: 88,
      curiosity: 90,
    },
    passiveSkill: {
      name: '雙季換裝術 (Seasonal Camouflage)',
      badge: '完美偽裝',
      description: '冬天時全身覆蓋純淨雪白厚毛融入冰雪；到了夏季則會奇蹟般換成灰褐色毛皮，與苔原岩石完美融為一體！'
    },
    diet: '旅鼠、海鳥蛋、凍原漿果與海豹殘食',
    sizeWeight: '體長 46~68 cm · 體重約 2.5~5 kg',
    lifespan: '野外約 3~6 年 · 極地環境考驗極大',
    vocalization: {
      soundText: 'Yip-yap! (清脆短促的極地高頻叫聲)',
      soundDesc: '在暴風雪的呼嘯中，牠們用短促高音的哨音與同伴在茫茫白雪中確認位置。'
    },
    funFacts: [
      '直到氣溫驟降到零下 -50°C 以下時，北極狐的代謝率才會開始上升以產生更多熱量。',
      '牠們連腳掌底部都覆蓋著厚厚的毛皮（如同穿了雪靴），在光滑冰面奔跑時完全不會打滑。',
      '旅鼠繁衍爆發的年份，一隻北極狐家庭夏天可以捕獲超過一千隻旅鼠並儲藏在永久凍土「天然冰箱」中。'
    ],
    cuteQuote: '「外面零下四十度？正適合來一場甜甜的雪窩午睡呢！」'
  },
  {
    id: 'fennec-fox',
    name: '耳廓狐',
    englishName: 'Fennec Fox',
    scientificName: 'Vulpes zerda',
    category: 'real',
    habitat: 'desert',
    habitatLabel: '撒哈拉沙漠 / 乾旱荒漠',
    themeColor: 'from-amber-400 to-yellow-600',
    accentBg: 'bg-amber-50 text-amber-800 border-amber-200',
    avatarEmoji: '👂',
    subtitle: '沙丘上的超大雷達耳小精靈',
    description: '耳廓狐是世界上體型最小的狐狸，體重甚至比家貓還要輕！牠最醒目的標誌就是一對長達 15 公分的巨型大耳朵，在金黃沙丘中宛如兩面敏銳的微型雷達天線。',
    personalityTraits: ['迷你可愛', '超高警覺', '撒嬌黏人', '敏捷靈動'],
    stats: {
      cuteness: 100,
      fluffiness: 90,
      agility: 98,
      curiosity: 95,
    },
    passiveSkill: {
      name: '巨耳熱輻射 (Radiator Ears)',
      badge: '天然空調',
      description: '耳朵表面密布微血管，能在熾熱沙漠中快速向空氣散熱降溫；同時能聽見地底數公分深處沙蟲爬行的微弱震動！'
    },
    diet: '甲蟲、蜥蜴、小型齧齒類、沙生植物根莖與果實',
    sizeWeight: '體長 24~41 cm · 體重僅約 1~1.5 kg',
    lifespan: '野外約 10 年 · 人工環境可長達 14 年',
    vocalization: {
      soundText: 'Squeak-purr! (如貓咪咕嚕聲與小鳥啾鳴)',
      soundDesc: '情緒放鬆時會發出像小貓踩奶般的咕嚕呼嚕聲，開心時會有連珠炮般軟萌的嘰嘰聲。'
    },
    funFacts: [
      '牠們可以在完全不直接喝水的情況下存活很久，身體能從食物與露水中榨取全部水分。',
      '腳掌長滿濃密剛毛，避免踩在攝氏 70 度的灼熱沙漠沙粒上被燙傷。',
      '彈跳力驚人！身高只有 20 公分的牠們，原地起跳高度可以輕鬆超過 60 公分。'
    ],
    cuteQuote: '「雖然我只有巴掌大，但我能聽見你心裡悄悄說我可愛的聲音喔！」'
  },
  {
    id: 'tibetan-fox',
    name: '藏狐',
    englishName: 'Tibetan Sand Fox',
    scientificName: 'Vulpes ferrilata',
    category: 'real',
    habitat: 'plateau',
    habitatLabel: '青藏高原 / 高山草甸 (海拔3500m+)',
    themeColor: 'from-stone-500 to-amber-700',
    accentBg: 'bg-stone-100 text-stone-800 border-stone-300',
    avatarEmoji: '😐',
    subtitle: '自帶生無可戀厭世表情的高原哲學家',
    description: '藏狐因其標誌性的「方臉、瞇瞇眼」在網路上爆紅，表情宛如參透宇宙無常的冷靜大師。然而牠其實是高原生態系不可或缺的捕鼠頂尖高手，對維持高原草甸平衡功不可沒。',
    personalityTraits: ['看破紅塵', '沉著冷靜', '默默守護', '表情帝'],
    stats: {
      cuteness: 89,
      fluffiness: 94,
      agility: 85,
      curiosity: 82,
    },
    passiveSkill: {
      name: '厭世定力凝視 (Unfazed Stare)',
      badge: '絕對專注',
      description: '強大而方正的下顎骨架提供了驚人的咬合肌力；其經典的方臉其實是適應高山強風與獵捕高原鼠兔的演化結晶！'
    },
    diet: '高原鼠兔（佔食譜 95% 以上）、小型鳥類、高原野果',
    sizeWeight: '體長 50~70 cm · 體重約 4~5.5 kg',
    lifespan: '野外約 8~10 年',
    vocalization: {
      soundText: 'Low bark (低沉沙啞的單音節短吠)',
      soundDesc: '極度不愛叫，通常只在非常必要時發出一聲沉穩短促的低哼，極有大師沉著風範。'
    },
    funFacts: [
      '藏狐一生恪守嚴格的一夫一妻制，伴侶之間會共同巡邏高原領地並撫育小狐狸，感情非常專一。',
      '牠們經常尾隨在旱獺（土撥鼠）後面，趁著鼠兔被旱獺驚擾跑出洞口時撿現成，是懂「借力使力」的智者。',
      '看起來像個大方臉，其實把蓬鬆腮毛壓平後，裡面的骨骼頭部非常秀氣！'
    ],
    cuteQuote: '「我不是不高興，我只是正在思考宇宙終極真理與今天第幾隻鼠兔。」'
  },
  {
    id: 'gray-fox',
    name: '灰狐',
    englishName: 'Gray Fox',
    scientificName: 'Urocyon cinereoargenteus',
    category: 'real',
    habitat: 'forest',
    habitatLabel: '混交林地 / 峽谷岩地',
    themeColor: 'from-slate-500 to-emerald-700',
    accentBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    avatarEmoji: '🌲',
    subtitle: '犬科中絕無僅有的垂直樹冠忍者',
    description: '灰狐擁有灰黑交錯的椒鹽色背脊與溫暖的紅褐色腹側，是美洲最古老的現存犬科動物之一。最神奇的是，牠們是極少數具備「爬樹」超能力的狐狸！',
    personalityTraits: ['神秘敏捷', '隱居山林', '忍者特質', '善於攀爬'],
    stats: {
      cuteness: 88,
      fluffiness: 86,
      agility: 99,
      curiosity: 91,
    },
    passiveSkill: {
      name: '壁虎攀樹爪 (Arboreal Claws)',
      badge: '飛簷走壁',
      description: '擁有強壯微彎的半可收縮爪爪與靈活的旋轉前肢，可以垂直抱住樹幹直衝樹頂，並倒掛在枝頭躲避掠食者！'
    },
    diet: '小型哺乳動物、鳥類、松鼠、昆蟲以及大量樹棲漿果',
    sizeWeight: '體長 53~66 cm · 體重約 3~5 kg',
    lifespan: '野外約 6~8 年',
    vocalization: {
      soundText: 'Bark-howl (類似小狗又帶點貓感的混合叫聲)',
      soundDesc: '在幽暗森林樹冠間穿梭時，會發出輕快的呼嘯聲。'
    },
    funFacts: [
      '牠們常常直接在離地數公尺高的大樹空洞中築巢育幼，寶寶一出生就是「住在樹上的狐狸」。',
      '灰狐的血統極為古老，基因分析顯示牠們是現代所有狐狸物種中最原始的基底分支之一。',
      '下樹時牠們可以倒退著爬下來，或是像貓一樣直接在樹枝間飛身跳躍。'
    ],
    cuteQuote: '「樹上的松果和風景，可比地面上好看多啦！」'
  },
  {
    id: 'bat-eared-fox',
    name: '大耳狐',
    englishName: 'Bat-eared Fox',
    scientificName: 'Otocyon megalotis',
    category: 'real',
    habitat: 'desert',
    habitatLabel: '東非與南非稀樹草原 / 灌叢荒野',
    themeColor: 'from-amber-600 to-stone-700',
    accentBg: 'bg-amber-50 text-amber-900 border-amber-300',
    avatarEmoji: '🦇',
    subtitle: '草原地下聲納白蟻終結者',
    description: '大耳狐擁有一雙像蝙蝠翼般巨大的耳朵與酷炫的眼罩面斑。與其他捕食肉類的大多數狐狸不同，牠們幾乎完全以昆蟲（尤其是多汁的大收穫白蟻）為主食！',
    personalityTraits: ['家庭至上', '溫順友善', '超級大胃王', '耳朵偵探'],
    stats: {
      cuteness: 91,
      fluffiness: 87,
      agility: 90,
      curiosity: 97,
    },
    passiveSkill: {
      name: '白蟻聽音辨位 (Termite Sonar)',
      badge: '微聲探測',
      description: '低著頭在草地上巡邏時，耳朵能捕捉到地下數十公分處數百萬隻白蟻在巢穴內咀嚼草葉的沙沙聲，精準下鏟！'
    },
    diet: '白蟻（一年可吃上百萬隻！）、甲蟲、幼蟲、偶爾吃多汁野果',
    sizeWeight: '體長 46~66 cm · 體重約 3~5 kg',
    lifespan: '野外約 9 年',
    vocalization: {
      soundText: 'Soft chitter & whistle (溫和的唧唧聲與呼哨)',
      soundDesc: '非常重視家庭通訊，家庭成員間會用如鳥鳴般細碎溫柔的音調互相交流。'
    },
    funFacts: [
      '擁有最多達 50 顆牙齒！牙齒形狀演化成特殊的微型剪切臼齒，能在一秒內咀嚼高達 5 次快速粉碎白蟻外骨骼。',
      '狐爸爸是動物界的「超級暖男奶爸」，會花費絕大部分時間陪伴、清潔、守護幼崽玩耍。',
      '白天大多在陰涼的土穴中全家聚在一起互相梳理毛皮，社會性非常高。'
    ],
    cuteQuote: '「聽！地底下有一窩美味的下午茶在跟我打招呼呢～」'
  },
  {
    id: 'starfall-fox',
    name: '星月夜狐',
    englishName: 'Starfall Fox',
    scientificName: 'Vulpes stellaris',
    category: 'mythical',
    habitat: 'mystic',
    habitatLabel: '奇幻秘境 / 永夜星宿森林',
    themeColor: 'from-indigo-500 via-purple-500 to-pink-500',
    accentBg: 'bg-purple-50 text-purple-800 border-purple-200',
    avatarEmoji: '✨',
    subtitle: '踏著星光漫步的夢境引路精靈',
    description: '傳說棲息在只有在滿月與流星雨相遇時才會開啟的星界森林。牠的毛皮宛如倒映著銀河的幽藍夜空，足跡落下之處會綻放發光的星塵花朵，是失路旅人最溫柔的嚮導。',
    personalityTraits: ['夢幻神秘', '溫柔守護', '洞悉心靈', '星輝療癒'],
    stats: {
      cuteness: 97,
      fluffiness: 98,
      agility: 95,
      curiosity: 99,
      magicPower: 96,
    },
    passiveSkill: {
      name: '星塵織夢步 (Stardust Dreamweave)',
      badge: '夢境守護',
      description: '尾尖凝聚星芒微光，夜深時能在森林與好孩子的夢鄉之間自由穿梭，驅散噩夢並留下香甜的好夢泡泡。'
    },
    diet: '純淨月華露水、星光結晶、甜美的薰衣草露珠',
    sizeWeight: '約小鹿般纖巧 · 腳步輕盈得如同羽毛無重力',
    lifespan: '與星夜同在 · 隨星辰週期循環輪轉',
    vocalization: {
      soundText: 'Crystal chiming (如水晶風鈴般清脆的微音)',
      soundDesc: '呼喚時會伴隨宛如微風吹過銀鈴般清透悅耳的音律，聽見的人會心神安定。'
    },
    funFacts: [
      '據說在流星雨夜閉上眼睛許願，若聽見遠處一聲輕靈的風鈴狐鳴，願望就一定會實現。',
      '牠的尾巴蓬鬆如同抱住了一小片縮小的夜空星系，裡面的星點會跟著呼吸微微明滅。',
      '當牠輕輕碰觸凋謝的花朵時，花瓣會重新泛起柔和的淡紫螢光再次盛開。'
    ],
    cuteQuote: '「不要害怕黑夜的漫長，每一顆星星，都是我為你點亮的小夜燈。」'
  },
  {
    id: 'celestial-kitsune',
    name: '九尾仙狐',
    englishName: 'Celestial Kitsune',
    scientificName: 'Vulpes novemcaudae',
    category: 'mythical',
    habitat: 'mystic',
    habitatLabel: '奇幻秘境 / 蓬萊青丘靈境',
    themeColor: 'from-rose-400 via-amber-400 to-orange-500',
    accentBg: 'bg-rose-50 text-rose-800 border-rose-200',
    avatarEmoji: '⛩️',
    subtitle: '通曉天地萬物之理的千年靈獸',
    description: '源於東方傳說的祥瑞靈狐，歷經千年修行方能凝聚九條象徵圓滿的蓬鬆仙尾。牠們身披金白相間的仙霞羽緞，掌握大自然四季轉化與祈福幻術，常出沒於霧氣氤氳的古神社神木下。',
    personalityTraits: ['高雅睿智', '祥瑞庇佑', '傲嬌可愛', '法力無邊'],
    stats: {
      cuteness: 96,
      fluffiness: 100,
      agility: 97,
      curiosity: 94,
      magicPower: 100,
    },
    passiveSkill: {
      name: '九尾祥瑞結界 (Nine-Tail Ward)',
      badge: '百福庇佑',
      description: '九條仙尾同時舒展時，可在方圓數里內降下清風細雨，驅散陰霾晦氣，帶來豐收與安寧的奇蹟守護。'
    },
    diet: '仙桃仙露、甜滋滋的特製油豆腐、甘泉晨曦',
    sizeWeight: '可自由幻化大小 · 原型雍容尊貴如雪山神鹿',
    lifespan: '壽與天齊 · 萬年靈韻長存',
    vocalization: {
      soundText: 'Melodic spirit song (似歌似琴的仙音靈語)',
      soundDesc: '聲音帶有淡淡空靈回響，能直接在純潔心靈之人的心湖中輕聲低語。'
    },
    funFacts: [
      '每長出一條尾巴需要歷經百年修行，到了第九尾時全身毛色會化為純淨耀眼的乳白金光。',
      '雖然是得道仙獸，但據說如果奉上熱騰騰、吸滿甘甜柴魚高湯的「稻荷油豆腐」，牠會立刻心花怒放搖尾巴。',
      '九條尾巴每條都有獨立的想法和舒適溫度，天冷時全捲起來就是世上最奢華暖和的仙家被窩。'
    ],
    cuteQuote: '「吾乃執掌乾坤之仙狐……等等，你手裡那塊油豆腐聞起來好香啊？！」'
  }
];

export const FOX_HABITATS = [
  { id: 'all', label: '全部物種', icon: '🐾', count: FOX_SPECIES_LIST.length },
  { id: 'forest', label: '深林灌木', icon: '🌲', count: FOX_SPECIES_LIST.filter(f => f.habitat === 'forest').length },
  { id: 'snow', label: '極地雪原', icon: '❄️', count: FOX_SPECIES_LIST.filter(f => f.habitat === 'snow').length },
  { id: 'desert', label: '炎熱荒漠', icon: '🏜️', count: FOX_SPECIES_LIST.filter(f => f.habitat === 'desert').length },
  { id: 'plateau', label: '高山高原', icon: '🏔️', count: FOX_SPECIES_LIST.filter(f => f.habitat === 'plateau').length },
  { id: 'mystic', label: '奇幻秘境', icon: '✨', count: FOX_SPECIES_LIST.filter(f => f.habitat === 'mystic').length },
] as const;

export const COLD_FACTS: ColdFact[] = [
  {
    id: 1,
    foxName: '藏狐',
    title: '厭世大方臉的真面目',
    fact: '藏狐看起來是個方方正正的「國字臉」，但骨骼頭型其實很纖細！方臉純粹是因為常年咬硬骨鼠兔鍛鍊出極度強健的發達咀嚼肌，加上濃密的抗風腮毛造成的視覺效果。',
    category: '身體奧秘',
    tagEmoji: '😐'
  },
  {
    id: 2,
    foxName: '赤狐',
    title: '自帶天然指南針',
    fact: '赤狐是地球上已知唯一能利用「地磁場」來計算獵物距離與深度的哺乳動物。當牠們朝向磁北偏東方向躍起攻擊時，捕獵成功率是其他方向的近三倍！',
    category: '特異功能',
    tagEmoji: '🧭'
  },
  {
    id: 3,
    foxName: '北極狐',
    title: '天然低溫超導體毛皮',
    fact: '北極狐的毛皮保暖效率是所有哺乳動物之冠。即便在 -50°C 的狂暴暴風雪中，牠們也可以縮成一團安靜入睡，連心跳和體溫都維持得極其穩定。',
    category: '極限生存',
    tagEmoji: '❄️'
  },
  {
    id: 4,
    foxName: '耳廓狐',
    title: '耳朵比臉還大的秘密',
    fact: '耳廓狐的耳朵長達 15 公分，佔了身體的三分之一！這兩對大耳朵不僅是散熱板，還能隔著厚厚的沙丘，聽見地下幾公分深處一隻小甲蟲微弱的腳步聲。',
    category: '生理構造',
    tagEmoji: '👂'
  },
  {
    id: 5,
    foxName: '大耳狐',
    title: '白蟻終結者的牙齒庫',
    fact: '普通食肉動物通常只有 42 顆牙齒，但大耳狐有多達 46 至 50 顆牙齒！牠們每天要吃掉數千隻白蟻，一年下來可以吃掉超過一百萬隻白蟻。',
    category: '飲食習慣',
    tagEmoji: '🐜'
  },
  {
    id: 6,
    foxName: '灰狐',
    title: '狐狸界的爬樹大師',
    fact: '全世界只有灰狐和貉具備熟練爬樹的本領！灰狐擁有類似貓咪的彎曲利爪和靈活的旋轉前肢，能一口氣衝上數層樓高的樹冠上打盹或採野果。',
    category: '奇妙習性',
    tagEmoji: '🧗'
  },
  {
    id: 7,
    foxName: '狐狸叫聲',
    title: 'What does the fox say?',
    fact: '狐狸不是像狗那樣汪汪叫，牠們能發出超過 40 種截然不同的叫聲！包括宛如人類嬰兒尖叫的高音警告、開心時發出小母雞般的「Gekk-gekk」笑聲，以及像小鳥一般的唧唧聲。',
    category: '語言奧秘',
    tagEmoji: '🎶'
  },
  {
    id: 8,
    foxName: '尾巴物語',
    title: '大尾巴的多功能用法',
    fact: '狐狸的蓬鬆大尾巴不僅是高速急轉彎的「方向舵」，還是情緒信號旗，更是冬天的專屬「空氣過濾圍巾」——把鼻子埋在尾巴毛下睡覺能呼吸溫暖濕潤的空氣！',
    category: '身體奧秘',
    tagEmoji: '🧣'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: '在一個悠閒的週末午後，你最渴望的完美充電方式是？',
    context: '選擇最符合你心靈嚮往的情境',
    options: [
      {
        text: '躲在溫暖厚厚的被窩裡，喝熱可可看雪景或追劇',
        description: '享受極致安全感與無憂無慮的寧靜時光',
        icon: '☕',
        targetFoxId: 'arctic-fox'
      },
      {
        text: '揹起背包衝進神秘森林或新景點探險打卡',
        description: '好奇心滿滿，哪裡有趣就往哪裡鑽',
        icon: '🎒',
        targetFoxId: 'red-fox'
      },
      {
        text: '一臉淡定泡杯茶，看著窗外喧囂靜靜放空發呆',
        description: '參透人生的平靜大師，不為任何世俗瑣事起波瀾',
        icon: '🍵',
        targetFoxId: 'tibetan-fox'
      },
      {
        text: '仰望滿天星斗，沉浸在音樂與天馬行空的奇幻幻想中',
        description: '浪漫夢幻的靈魂，心中有一座發光的小宇宙',
        icon: '🌌',
        targetFoxId: 'starfall-fox'
      }
    ]
  },
  {
    id: 2,
    question: '當你在生活或工作中遇到突如其來的混亂或挑戰時：',
    context: '你的第一直覺防禦機制是？',
    options: [
      {
        text: '超級大耳朵雷達全開！迅速收集所有八卦與情報，精準應對',
        description: '機警靈活，用最快反應在夾縫中漂亮突圍',
        icon: '⚡',
        targetFoxId: 'fennec-fox'
      },
      {
        text: '一個瀟灑飛躍爬上制高點，換個高度看待問題',
        description: '不跟地面的混亂硬碰硬，尋找超常規的靈巧解法',
        icon: '🧗',
        targetFoxId: 'gray-fox'
      },
      {
        text: '保持萬年不變的冷酷撲克臉，任憑風浪起我自一口咬定',
        description: '泰山崩於前而色不變，默默以絕對實力搞定',
        icon: '🗿',
        targetFoxId: 'tibetan-fox'
      },
      {
        text: '召喚九條蓬鬆仙尾結界，優雅化解危機順便吃塊甜點',
        description: '格局大氣，用智慧與從容一笑置之',
        icon: '🌸',
        targetFoxId: 'celestial-kitsune'
      }
    ]
  },
  {
    id: 3,
    question: '如果能擁有一種神奇的狐狸特長，你最想挑選哪一個？',
    context: '發掘你內心深處的靈魂天賦',
    options: [
      {
        text: '無論走到哪裡，周圍的人都被自己的萌力和溫暖治癒',
        description: '軟萌可愛的小太陽，擁有融化冰雪的魔力',
        icon: '☀️',
        targetFoxId: 'arctic-fox'
      },
      {
        text: '耳朵能聽懂萬物心聲，在人群中永遠是最體貼的知音',
        description: '善於傾聽與同理，陪伴身邊的每一個夥伴',
        icon: '👂',
        targetFoxId: 'bat-eared-fox'
      },
      {
        text: '無拘無束自由自在，穿梭在繁星與好夢之間守護所愛',
        description: '充滿詩意與溫柔，為世界留下閃爍的星塵祝福',
        icon: '✨',
        targetFoxId: 'starfall-fox'
      },
      {
        text: '機敏過人百折不撓，在哪種環境都能混得風生水起',
        description: '充滿生命力與野性魅力，是生活的王者',
        icon: '🔥',
        targetFoxId: 'red-fox'
      }
    ]
  }
];
