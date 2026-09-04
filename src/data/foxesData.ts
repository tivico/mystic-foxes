import { FoxSpecies, ColdFact, QuizQuestion } from '../types';

export const FOX_SPECIES_LIST: FoxSpecies[] = [
  // ==================== 【自然野生線 · 現實科普】 ====================
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
    diet: '小型鼠類、野兔、漿果、鳥蛋、甲蟲與甜美野果（雜食性）',
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
      name: '極地換裝術 (Seasonal Camouflage)',
      badge: '雪原隱匿',
      description: '冬季全身雪白無暇與暴風雪融為一體；夏季則蛻變成深灰褐色，完美偽裝於苔原岩石間。'
    },
    diet: '旅鼠、海鳥蛋、漿果、海豹殘羹',
    sizeWeight: '體長 46~68 cm · 體重約 2.5~5 kg',
    lifespan: '野外約 3~6 年 · 人工照護可達 10~14 年',
    vocalization: {
      soundText: 'Yip-yip! & 輕柔如氣音的咕嚕聲',
      soundDesc: '在雪窩中呼喚寶寶時發出極其溫柔的呼嚕聲，遇到陌生者會發出清脆短促的警示聲。'
    },
    funFacts: [
      '北極狐是唯一連腳底肉墊都長滿厚厚絨毛的犬科動物，走在滑溜冰面上宛如穿著防滑雪靴。',
      '牠們的神奇毛皮直到氣溫降至 -70°C 時才會開始感受到寒冷並顫抖。',
      '旅鼠大爆發年份，一對北極狐夫婦一季可以撫養多達 15 隻毛茸茸的狐狸小雪球寶寶！'
    ],
    cuteQuote: '「別看我胖乎乎的，我身上 70% 都是保暖的蓬鬆棉花糖毛毛喔！」'
  },
  {
    id: 'blue-fox',
    name: '藍狐',
    englishName: 'Blue Fox',
    scientificName: 'Vulpes lagopus mut. caerulea',
    category: 'real',
    habitat: 'snow',
    habitatLabel: '冰洋島嶼 / 岩岸海崖',
    themeColor: 'from-slate-500 to-indigo-600',
    accentBg: 'bg-slate-50 text-slate-700 border-slate-200',
    avatarEmoji: '🪨',
    subtitle: '冰洋無雪岩岸上的深藍石板灰貴族',
    description: '藍狐是北極狐的一種罕見且迷人的遺傳色型。不同於普通北極狐冬天換白毛，藍狐終年保持深炭灰至帶有淡藍光澤的石板青色，完美適應無雪覆蓋的北大西洋岩岸與冰川玄武岩。',
    personalityTraits: ['沉著優雅', '稀有罕見', '獨立冷靜', '眼神深邃'],
    stats: {
      cuteness: 94,
      fluffiness: 96,
      agility: 92,
      curiosity: 89,
    },
    passiveSkill: {
      name: '玄武岩影 (Basalt Shroud)',
      badge: '岩岸偽裝',
      description: '在黑色玄武岩與暗青海浪間宛如幽靈般無聲潛行，天生抗風能力無與倫比。'
    },
    diet: '海鳥、魚類殘食、貝類海星、凍原苔草',
    sizeWeight: '體長 48~65 cm · 體重約 3~5.2 kg',
    lifespan: '野外約 3~6 年 · 圈養約 12 年',
    vocalization: {
      soundText: 'Purr-hiss & 低音鳴啼',
      soundDesc: '面對海風時習慣發出低沉共鳴音，聲音比白北極狐更具磁性。'
    },
    funFacts: [
      '在冰島等地，藍狐才是原住民！冰島在人類定居前唯一的陸生哺乳動物就是藍狐。',
      '其毛皮在不同陽光入射角度下會泛出淡淡的藍紫色偏光，極具高級質感。',
      '藍狐具有極強的親水性，有時甚至會涉入冰冷海水捕食潮間帶的甲殼類。'
    ],
    cuteQuote: '「黑色不是冷酷，是我在北大西洋海風中沉澱出的深藍詩篇。」'
  },
  {
    id: 'fennec-fox',
    name: '耳廓狐',
    englishName: 'Fennec Fox',
    scientificName: 'Vulpes zerda',
    category: 'real',
    habitat: 'desert',
    habitatLabel: '撒哈拉大沙漠 / 滾燙沙丘',
    themeColor: 'from-amber-400 to-yellow-600',
    accentBg: 'bg-amber-50 text-amber-700 border-amber-200',
    avatarEmoji: '👂',
    subtitle: '沙海中的超大雷達耳小精靈',
    description: '世界上體型最小的犬科狐狸！最吸睛的是長達 15 公分如雷達般的超大耳朵。一雙大耳朵不僅能幫牠們在炙熱撒哈拉沙漠中散發熱量，還能精確監聽沙層底下昆蟲最細微的腳步動靜。',
    personalityTraits: ['精力充沛', '膽大黏人', '聽覺奇才', '萌度爆表'],
    stats: {
      cuteness: 100,
      fluffiness: 91,
      agility: 97,
      curiosity: 99,
    },
    passiveSkill: {
      name: '沙底聲納 (Sand Sonar)',
      badge: '超敏聽覺',
      description: '能隔著數十公分厚厚的滾燙流沙，聽見一隻小甲蟲或是蜥蜴微弱的爬行聲響。'
    },
    diet: '甲蟲、沙蜥、小鳥、植物多肉葉片與成熟椰棗',
    sizeWeight: '體長 24~41 cm (不含尾) · 體重僅約 1~1.5 kg',
    lifespan: '野外約 7~10 年 · 人工照護可達 14 年',
    vocalization: {
      soundText: 'Chirp! Squeak! (宛如小鳥的嘰喳萌叫)',
      soundDesc: '開心激動時會像小鳥般發出極度清脆的「啾啾啾」聲音，尾巴以光速瘋狂搖擺。'
    },
    funFacts: [
      '耳廓狐終生幾乎不需要直接喝液態水！牠們能從吃下的昆蟲和植物根莖中提煉出維持生命的所有水分。',
      '牠們是犬科中的「跳躍小火箭」，小小的身軀能立定向上躍起近 1 公尺高！',
      '厚厚毛茸茸的腳底板讓牠們可以直接踩在 70°C 的滾燙沙丘上奔跑而不被燙傷。'
    ],
    cuteQuote: '「嘘！別說話～我剛剛聽見三公里外有一顆沙子滾落的聲音！」'
  },
  {
    id: 'corsac-fox',
    name: '沙狐',
    englishName: 'Corsac Fox',
    scientificName: 'Vulpes corsac',
    category: 'real',
    habitat: 'grassland',
    habitatLabel: '中亞乾旱草原 / 半荒漠',
    themeColor: 'from-yellow-600 to-amber-700',
    accentBg: 'bg-amber-50 text-amber-800 border-amber-200',
    avatarEmoji: '🌾',
    subtitle: '中亞茫茫草原上的攀爬跳躍精靈',
    description: '沙狐生活在中亞的開闊乾旱草原與荒漠，體型介於赤狐與耳廓狐之間。擁有銀灰泛黃的抗沙毛色與尖俏的小臉，個性群居和睦，經常三五成群住在同一個地洞群落中。',
    personalityTraits: ['機敏警覺', '友愛群居', '攀爬高手', '善於節水'],
    stats: {
      cuteness: 91,
      fluffiness: 90,
      agility: 98,
      curiosity: 92,
    },
    passiveSkill: {
      name: '草原彈射 (Steppe Leap)',
      badge: '跳躍特化',
      description: '面對獵鷹天敵時，能在乾草原上以不可思議的之字形連續變向跳躍逃生。'
    },
    diet: '草原田鼠、跳鼠、昆蟲、野生果子',
    sizeWeight: '體長 45~65 cm · 體重約 1.6~3.2 kg',
    lifespan: '野外約 4~6 年 · 圈養約 12 年',
    vocalization: {
      soundText: 'Bark-chatter & 清脆吠叫',
      soundDesc: '家族聚集時會發出像小狗碎碎念般的連續嘰咕聲，極富社交樂趣。'
    },
    funFacts: [
      '沙狐是犬科中少見的「樹木與斜坡攀爬高手」，能靈巧地爬上低矮樹枝躲避狼群。',
      '沙狐非常愛乾淨，通常直接借用旱獺（土撥鼠）遺棄的地下豪宅並加以改造成溫馨小窩。',
      '冬季時多隻沙狐會擁抱在一起擠成一團互相取暖，形成名副其實的「狐狸球」。'
    ],
    cuteQuote: '「草原那麼大，但只要和大家擠在洞穴裡，心裡就很踏實！」'
  },
  {
    id: 'tibetan-fox',
    name: '藏狐',
    englishName: 'Tibetan Sand Fox',
    scientificName: 'Vulpes ferrilata',
    category: 'real',
    habitat: 'plateau',
    habitatLabel: '青藏高原 / 海拔 3500m 以上高山草甸',
    themeColor: 'from-amber-600 to-stone-600',
    accentBg: 'bg-stone-50 text-stone-700 border-stone-200',
    avatarEmoji: '😐',
    subtitle: '全網公認的「厭世臉」佛系表情包之神',
    description: '生活在世界屋脊青藏高原的特有狐狸，以一張極其方正、眼神慵懶冷淡的「國字臉」聞名全球。看似看破紅塵心如止水，實則是高原鼠兔聞風喪膽的高效冷血獵手！',
    personalityTraits: ['佛系淡定', '泰然自若', '專注獵食', '內心澎湃'],
    stats: {
      cuteness: 95,
      fluffiness: 98,
      agility: 86,
      curiosity: 80,
    },
    passiveSkill: {
      name: '絕對淡定 (Zen Stare)',
      badge: '佛系凝視',
      description: '以不動如山的國字臉靜止凝視獵物洞穴數小時，毫無表情破綻，等待鼠兔探頭一擊必殺。'
    },
    diet: '高原鼠兔、雪雀、高山昆蟲與漿果（鼠兔佔比高達 95%）',
    sizeWeight: '體長 50~70 cm · 體重約 4~5.5 kg',
    lifespan: '野外約 8~10 年',
    vocalization: {
      soundText: '低沉的呼嚕嚕與短促的「啵」聲',
      soundDesc: '極其少開金口，通常只有在向伴侶示愛或保護小狐狸時才發出低頻喉音。'
    },
    funFacts: [
      '藏狐的骨骼頭部其實是尖的！招牌方臉純粹是因為常年咬硬骨鼠兔練出發達咀嚼肌，加上兩頰濃密的厚絨毛造成的錯覺。',
      '藏狐一生恪守嚴格的一夫一妻制，夫妻倆會形影不離地在雪山草甸上悠閒漫步。',
      '牠們經常跟在棕熊屁股後面撿漏：棕熊挖開鼠兔洞時，漏網的鼠兔一竄出來就被守在一旁的藏狐一口叼走！'
    ],
    cuteQuote: '「我沒有不高興，我只是生來就參透了這世界的本質……（嚼鼠兔）」'
  },
  {
    id: 'darwins-fox',
    name: '達爾文狐',
    englishName: "Darwin's Fox",
    scientificName: 'Lycalopex fulvipes',
    category: 'real',
    habitat: 'rainforest',
    habitatLabel: '智利溫帶雨林 / 奇洛埃島',
    themeColor: 'from-emerald-700 to-teal-800',
    accentBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    avatarEmoji: '🌿',
    subtitle: '查爾斯·達爾文本人親手採集的南美雨林極危小隱者',
    description: '1834年由年輕的達爾文在小獵犬號航行時親手記錄的罕見小型狐。深黑雜金紅的短毛、短粗的小腿，是世界上最受威脅的極度瀕危犬科之一（全球僅剩數百隻）。性格溫馴好奇，是雨林古木中的神秘隱士。',
    personalityTraits: ['溫和害羞', '好奇心深', '極度珍稀', '雨林守護'],
    stats: {
      cuteness: 93,
      fluffiness: 88,
      agility: 91,
      curiosity: 95,
    },
    passiveSkill: {
      name: '苔蘚隱形 (Mossy Shroud)',
      badge: '雨林潛伏',
      description: '在常年細雨的溫帶古老原始林裡，與苔蘚倒木完美融為一體，幾乎不留任何氣味。'
    },
    diet: '森林小型甲蟲、兩棲類、軟果實、地棲小雀',
    sizeWeight: '體長 48~59 cm · 體重約 1.8~3.9 kg',
    lifespan: '野外約 7 年左右',
    vocalization: {
      soundText: 'Chit-chit & 溫柔微鳴',
      soundDesc: '好奇探察新事物時會發出細小如同幼貓般的探詢音。'
    },
    funFacts: [
      '當年達爾文在奇洛埃島看見牠時，牠專注看著遠方地質錘，達爾文竟然能悄悄走到牠身後輕拍牠的背！',
      '牠們只生活在智利少數未受砍伐的古老溫帶雨林中，是森林健康生態的旗艦指針。',
      '牠們非常喜愛吃南美野生漿果，是雨林深處散播種子的重要森林園丁。'
    ],
    cuteQuote: '「我很小、很安靜，但每一棵長滿青苔的老樹，都是我的好朋友。」'
  },
  {
    id: 'gray-fox',
    name: '北美灰狐',
    englishName: 'Gray Fox',
    scientificName: 'Urocyon cinereoargenteus',
    category: 'real',
    habitat: 'forest',
    habitatLabel: '北美落葉林 / 橡樹林地',
    themeColor: 'from-slate-600 to-zinc-700',
    accentBg: 'bg-zinc-50 text-zinc-700 border-zinc-200',
    avatarEmoji: '🧗',
    subtitle: '整個美洲唯一會熟練爬樹的犬科雜技大師',
    description: '擁有黑灰夾銀的華麗皮毛與紅褐色的頸部點綴。灰狐是犬科家族中最古老原始的現存分支之一，擁有類似貓科動物的彎曲半伸縮利爪，能一口氣爬上十幾公尺高的樹頂打盹！',
    personalityTraits: ['身手矯捷', '攀爬奇才', '獨立獨行', '隱密優雅'],
    stats: {
      cuteness: 90,
      fluffiness: 92,
      agility: 100,
      curiosity: 88,
    },
    passiveSkill: {
      name: '樹冠飛躍 (Canopy Scrambler)',
      badge: '攀樹特化',
      description: '能在垂直樹幹上如松鼠般迅速攀爬，並在相鄰樹枝間跳躍逃脫土狼等地面天敵。'
    },
    diet: '野兔、田鼠、橡實、甜柿子、草蜢與鳥蛋',
    sizeWeight: '體長 50~65 cm · 體重約 3.5~6 kg',
    lifespan: '野外約 6~8 年 · 人工照護可達 12 年',
    vocalization: {
      soundText: 'Yip-bark & 喉部呼嚕呼嚕',
      soundDesc: '夜間在樹冠上守望時會發出短促的「吠-叫」兩段音，放鬆時喉嚨會發出貓咪般的呼嚕聲。'
    },
    funFacts: [
      '灰狐能像貓一樣抱住樹幹「頭朝下」直接走下來，這是絕大多數狗狼完全做不到的絕技！',
      '牠們經常把家安在樹洞高處或空心樹幹裡，享受離地數公尺的安全豪宅。',
      '古老基因研究顯示，灰狐在千萬年前就與其他所有狐狸分支分道揚鑣，是犬科中的活化石。'
    ],
    cuteQuote: '「打不過地上的大狗狗沒關係，我上去樹頂摘柿子吃啦～掰掰！」'
  },
  {
    id: 'bat-eared-fox',
    name: '大耳狐',
    englishName: 'Bat-eared Fox',
    scientificName: 'Otocyon megalotis',
    category: 'real',
    habitat: 'grassland',
    habitatLabel: '東非與南非稀樹草原',
    themeColor: 'from-stone-500 to-amber-700',
    accentBg: 'bg-stone-50 text-stone-700 border-stone-200',
    avatarEmoji: '🦇',
    subtitle: '擁有 50 顆牙齒的非洲「白蟻大掃除隊長」',
    description: '長著一對宛如蝙蝠翅膀的大耳朵與深色「黑眼圈」面具。大耳狐不愛抓兔子，而是專注於在非洲大草原上清掃白蟻，一隻大耳狐一年能消滅超過一百萬隻收穫白蟻！',
    personalityTraits: ['熱愛家庭', '溫和無害', '超級吃貨', '社交達人'],
    stats: {
      cuteness: 93,
      fluffiness: 89,
      agility: 90,
      curiosity: 96,
    },
    passiveSkill: {
      name: '地下咀嚼定位 (Subterranean Hearer)',
      badge: '微音定位',
      description: '能把耳朵貼近地面，清晰聽見地下白蟻集體啃食草根的微弱沙沙聲。'
    },
    diet: '白蟻（佔80%以上）、甲蟲、蠐螬、草莓昆蟲與多汁野果',
    sizeWeight: '體長 46~66 cm · 體重約 3~5 kg',
    lifespan: '野外約 6~8 年 · 圈養可達 13 年',
    vocalization: {
      soundText: 'Chuff & 柔和的高音啾啾鳴',
      soundDesc: '家族成群漫步時持續發出如微風拂過草尖的「啾-啾」溝通音，充滿親和力。'
    },
    funFacts: [
      '普通食肉目哺乳動物通常只有 42 顆牙齒，但大耳狐有多達 46 至 50 顆特殊細密研磨齒！',
      '在大耳狐家庭中，狐狸爸爸是超稱職的「超級奶爸」，育幼陪伴時間甚至超過狐狸媽媽。',
      '牠們蓬鬆的大耳朵長度超過 13 公分，能在奔跑時瞬間急煞轉彎，捕捉空中飛蛾。'
    ],
    cuteQuote: '「今天草原上的白蟻自助餐……真是太美味啦嚼嚼嚼！」'
  },

  // ==================== 【特別彩蛋 · 偽狐特輯】 ====================
  {
    id: 'maned-wolf',
    name: '南美鬃狼',
    englishName: 'Maned Wolf',
    scientificName: 'Chrysocyon brachyurus',
    category: 'easter-egg',
    habitat: 'grassland',
    habitatLabel: '南美塞拉多草原 / 潘帕斯高草叢',
    themeColor: 'from-orange-600 via-amber-600 to-stone-800',
    accentBg: 'bg-amber-50 text-amber-900 border-amber-300',
    avatarEmoji: '🦵',
    subtitle: '【偽狐彩蛋】踩著高跟鞋的超長腿大巨人，非狼亦非狐',
    description: '長得像放大三倍的火紅狐狸、穿著黑色及膝高跟長襪、走起路來宛如伸展台名模！雖然名字叫狼、長得像狐狸，但牠在分類學上自成一屬，是南美特有的溫柔巨人。最愛吃野生番茄「狼果」，性情害羞靦腆。',
    personalityTraits: ['溫柔靦腆', '優雅高挑', '素食愛好', '反差萌神'],
    stats: {
      cuteness: 95,
      fluffiness: 86,
      agility: 99,
      curiosity: 94,
    },
    passiveSkill: {
      name: '草原俯瞰 (High Stilt Gait)',
      badge: '長腿奇觀',
      description: '高達 90 公分的驚人肩高，能讓牠輕鬆將腦袋探出浩瀚高草叢，一眼看透數公里荒野。'
    },
    diet: '狼果（Solanum lycocarpum，佔50%以上）、野生果實、小型田鼠、小雀',
    sizeWeight: '肩高約 74~90 cm · 體長 125~130 cm · 體重約 20~25 kg',
    lifespan: '野外約 10~12 年 · 圈養可達 16 年',
    vocalization: {
      soundText: 'Roar-bark (深沉響亮震撼的吼吠聲)',
      soundDesc: '黃昏或清晨時會發出極具穿透力且低沉宏大的「呼-嗷」吼吠，向幾公里外的伴侶報平安。'
    },
    funFacts: [
      '雖然體型巨大像狼，但牠們完全不會像狼群那樣成群圍捕，而是像狐狸一樣是優雅孤高的獨行俠！',
      '牠們是「同側步（Pacing）」行者——走路時左前腿與左後腿同時向前，右邊亦然，步伐無比飄逸。',
      '牠們最愛吃的水果「狼果」含有抗寄生蟲的天然草本成分，是自然界絕妙的食療互利共生！'
    ],
    cuteQuote: '「雖然大家說我像踩高跟鞋的狐狸模特兒……但其實我很害羞啦，可以分我一顆甜甜番茄嗎？」',
    isEasterEgg: true,
    easterEggNote: '【生物學彩蛋】鬃狼並非真狐屬（Vulpes）也不是狼屬（Canis），而是獨立的 Chrysocyon 屬單型種！'
  },

  // ==================== 【神話幻想線 · 傳說秘境】 ====================
  {
    id: 'celestial-kitsune',
    name: '九尾仙狐',
    englishName: 'Celestial Nine-Tailed Kitsune',
    scientificName: 'Vulpes novicaelestis',
    category: 'mythical',
    habitat: 'mystic',
    habitatLabel: '青丘仙山 / 雲頂瑤池',
    themeColor: 'from-rose-400 to-pink-600',
    accentBg: 'bg-pink-50 text-pink-700 border-pink-200',
    avatarEmoji: '🌸',
    subtitle: '祥瑞庇佑人間的千載九尾天仙之靈',
    description: '源於先秦古籍《山海經》中記載的祥瑞神獸。每歷經百年清修便生出一條蓬鬆仙尾，至第九尾時得天地五行造化，化為金光純白仙身。能調和陰陽、驅逐穢氣，庇佑大地五穀豐饒與風調雨順。',
    personalityTraits: ['優雅高貴', '慈悲溫柔', '仙氣繚繞', '偶爾貪吃'],
    stats: {
      cuteness: 99,
      fluffiness: 100,
      agility: 95,
      curiosity: 93,
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
  },
  {
    id: 'inari-fox',
    name: '稻荷神使·白狐',
    englishName: 'Inari Messenger White Fox',
    scientificName: 'Vulpes inariensis',
    category: 'mythical',
    habitat: 'mystic',
    habitatLabel: '千本鳥居 / 稻荷御神宮',
    themeColor: 'from-red-500 to-amber-600',
    accentBg: 'bg-red-50 text-red-800 border-red-200',
    avatarEmoji: '⛩️',
    subtitle: '口銜神聖寶珠與金黃稻穗的大神御眷屬',
    description: '守護在伏見稻荷千本鳥居兩側的白狐神使。牠們身披朱紅御幣與注連繩，頸佩神鈴，嘴裡分別銜著像徵財富的寶珠、代表權柄的鑰匙與賜福萬民的金黃稻穗，掌管人間五穀豐收與家宅平安。',
    personalityTraits: ['威嚴莊重', '忠誠盡職', '護佑眾生', '福氣滿滿'],
    stats: {
      cuteness: 96,
      fluffiness: 94,
      agility: 96,
      curiosity: 90,
      magicPower: 98,
    },
    passiveSkill: {
      name: '豐饒穗語 (Harvest Blessing)',
      badge: '神恩降臨',
      description: '輕輕甩動頸上神鈴，能讓身邊枯竭的植物重獲生機，稻田滿溢芬芳香氣。'
    },
    diet: '特製稻荷壽司（金黃甜油豆腐皮）、神酒、清冽神泉',
    sizeWeight: '身姿挺拔修長 · 尾如白羽流蘇',
    lifespan: '永恆神眷 · 與信仰長存',
    vocalization: {
      soundText: '神樂鈴音與空靈低鳴',
      soundDesc: '走動時伴隨著清越的神社神樂銅鈴輕響，令人心神滌淨安寧。'
    },
    funFacts: [
      '在神社裡，通常左側的白狐銜著寶珠（象徵德望），右側的白狐銜著鑰匙（象徵開啟糧倉與智慧）。',
      '日本傳統婚禮中天空突降太陽雨被稱為「狐狸出嫁（狐の嫁入り）」，據說就是白狐使者在巡境呢！',
      '白狐使者最喜歡被人類尊敬地撫摸下巴，摸對了會賜予一整天的好運氣。'
    ],
    cuteQuote: '「敬奉稻荷大神，心誠則靈～不過，多給我一塊油豆腐祈願會更靈驗喔！」'
  },
  {
    id: 'kitsunebi-fox',
    name: '狐火靈狐',
    englishName: 'Kitsunebi Wisp Fox',
    scientificName: 'Vulpes ignigena',
    category: 'mythical',
    habitat: 'mystic',
    habitatLabel: '幽夜竹林 / 逢魔之時迷霧幽谷',
    themeColor: 'from-cyan-500 to-teal-700',
    accentBg: 'bg-cyan-50 text-cyan-800 border-cyan-200',
    avatarEmoji: '🔥',
    subtitle: '周身浮游青白幽火、照亮迷茫黑夜的引路靈子',
    description: '夜幕降臨時從古木空洞中悄然現身。傳說中牠們嘴裡銜著發光的寶珠，吐息化為青藍色的冷光「狐火」。這些狐火不傷草木亦無焦味，在深山大霧中連綿成隊，宛如微光提燈，專門為走失者指引歸途。',
    personalityTraits: ['神秘莫測', '溫柔護航', '靜謐沉思', '幽火陪伴'],
    stats: {
      cuteness: 95,
      fluffiness: 93,
      agility: 98,
      curiosity: 95,
      magicPower: 99,
    },
    passiveSkill: {
      name: '幽藍引路 (Will-o-Wisp Guidance)',
      badge: '冷光破障',
      description: '在伸手不見五指的迷霧中點亮十數朵青火，驅散一切恐懼與幻象，永遠不會迷失方向。'
    },
    diet: '夜間清露、竹葉上的月光微粒、夜間微風',
    sizeWeight: '通體半透明浮游感 · 體態輕盈若雲',
    lifespan: '數百年隨夜空明滅',
    vocalization: {
      soundText: 'Crackling flame-whisper (如火花微響的細語)',
      soundDesc: '發出如營火微弱爆裂與風鈴微震的複合音，聽之令人心情安適平靜。'
    },
    funFacts: [
      '江戶時代浮世繪大師歌川廣重曾作名畫《王子裝束榎木大晦日狐火》，描繪的就是牠們在除夕夜集會的壯觀場景！',
      '現代科學證實，「狐火」的傳說靈感來自朽木上發出綠光的「發光真菌菌絲（Foxfire）」與狐狸眼睛的反光膜。',
      '牠們點燃的冷火摸起來是溫涼如玉的，冬天抱著可以當作不燙傷的柔光暖手寶。'
    ],
    cuteQuote: '「別害怕夜太黑……跟著我的小火苗，一定能找到回家的溫暖窗光。」'
  },
  {
    id: 'reynard-fox',
    name: '智狐·雷納德',
    englishName: 'Reynard the Fox',
    scientificName: 'Vulpes callidus',
    category: 'mythical',
    habitat: 'forest',
    habitatLabel: '中世紀古堡林苑 / 歐陸封建莊園',
    themeColor: 'from-amber-700 to-rose-800',
    accentBg: 'bg-rose-50 text-rose-900 border-rose-200',
    avatarEmoji: '🎩',
    subtitle: '身披貴族斗篷、以絕世機智玩弄強權的中世紀寓言之王',
    description: '源於歐洲中世紀動物史詩《列那狐的故事》（Le Roman de Renart）。這位身穿古典燕尾斗篷、頭戴羽毛軟帽的紳士狐狸，以其如簧巧舌與連環絕計，周旋在兇殘的狼王與愚鈍的獅王之間，是機智、自由與反抗權威的象徵。',
    personalityTraits: ['絕頂聰明', '紳士風度', '巧舌如簧', '幽默風趣'],
    stats: {
      cuteness: 91,
      fluffiness: 90,
      agility: 99,
      curiosity: 100,
      magicPower: 88,
    },
    passiveSkill: {
      name: '連環金蟬脫殼 (Wit Unbounded)',
      badge: '智計無雙',
      description: '任何複雜的機關、陷阱或死局，只要給牠三秒鐘轉動眼珠，就能設計出反敗為勝的絕妙解法。'
    },
    diet: '莊園風乾乳酪、烤香腸、葡萄酒浸野莓、小麵包',
    sizeWeight: '優雅修長 · 永遠保持紳士般的直立與步伐',
    lifespan: '在所有世代的傳奇故事中長生',
    vocalization: {
      soundText: 'Charming laugh & 清脆短鳴',
      soundDesc: '得意時會發出極具節奏感的「Ha-ha-gekk!」紳士笑聲，儀態翩翩。'
    },
    funFacts: [
      '在古代法語中，狐狸的原字本是「Goupil」，但因為《列那狐傳奇》太受平民喜愛，到了現代法語中，「Renard」直接取代了原字成為狐狸的正式名字！',
      '牠的口袋裡永遠藏著一把萬能骨製開鎖小工具與一本寫滿各國幽默笑話的筆記本。',
      '雖然熱愛惡作劇，但牠對待森林裡的弱小小松鼠和小鳥卻極度仗義，經常暗中接濟。'
    ],
    cuteQuote: '「力量或許能推倒一堵牆，但智慧，卻能讓牆自己開出一扇門～親愛的朋友。」'
  },
  {
    id: 'yakan-fox',
    name: '野干神狐',
    englishName: 'Yakan Mystic Fox',
    scientificName: 'Vulpes yakan',
    category: 'mythical',
    habitat: 'mystic',
    habitatLabel: '密宗古剎 / 雲深不知處禪境',
    themeColor: 'from-purple-700 to-indigo-900',
    accentBg: 'bg-purple-50 text-purple-900 border-purple-200',
    avatarEmoji: '🔮',
    subtitle: '梵音化靈、通曉過去未來的古老幻化神狐',
    description: '出自佛典翻譯《玄應音義》與密教古老傳承。原本是梵語對胡狼的音譯，東傳後與東亞狐仙文化融合，成為修行極深、能化身千百種形象、嘯聲如雷、能登神木通達天地因果的神秘大仙狐。',
    personalityTraits: ['參透因果', '神機莫測', '擅長幻形', '大慈大悲'],
    stats: {
      cuteness: 92,
      fluffiness: 94,
      agility: 97,
      curiosity: 91,
      magicPower: 100,
    },
    passiveSkill: {
      name: '千幻化身 (Infinite Metamorphosis)',
      badge: '因果鏡照',
      description: '能根據觀者的心境隨意幻化形相，時而為老衲，時而為天女，甚至能融入草木頑石之中。'
    },
    diet: '紫竹露水、檀香梵氣、深山野茯苓',
    sizeWeight: '無相無形 · 隨緣化現',
    lifespan: '超脫輪迴 · 萬古長空',
    vocalization: {
      soundText: 'Resonant Tibetan bell & 悠長清嘯',
      soundDesc: '如古寺頌缽般的長鳴共振，能瞬間撫平焦躁雜念，讓人重歸深層寧靜。'
    },
    funFacts: [
      '「野干」原是古印度對胡狼的稱呼，由於古代中原沒有胡狼，便將這份異域靈獸想像寄託在最機靈的狐狸身上。',
      '相傳野干神狐額頭有一道暗金色的第三眼符文，只有在參悟極深定境時才會浮現。',
      '牠常化作普通的小狐狸躺在古寺台階上曬太陽，聽著晨鐘暮鼓打瞌睡。'
    ],
    cuteQuote: '「萬物皆有靈，諸相皆由心生。既然你摸到了我，那這份善緣便結下了。」'
  },
  {
    id: 'starfall-fox',
    name: '幻光星狐',
    englishName: 'Celestial Starfall Fox',
    scientificName: 'Vulpes astralis',
    category: 'mythical',
    habitat: 'mystic',
    habitatLabel: '銀河星屑彼端 / 夢境邊界',
    themeColor: 'from-violet-500 via-purple-600 to-indigo-700',
    accentBg: 'bg-purple-50 text-purple-700 border-purple-200',
    avatarEmoji: '🌌',
    subtitle: '在星河流域遊弋、把流星當毛球踢的守夜者',
    description: '只在萬籟俱寂的無雲夜空中偶爾顯露身姿。牠的皮毛如深邃無垠的紫羅蘭夜空，滿綴著微微閃爍的真實星光；蓬鬆的長尾巴划過天際時，會拖曳出一條由純淨星塵構成的光帶。',
    personalityTraits: ['夢幻浪漫', '沉靜內斂', '守護好夢', '自帶光芒'],
    stats: {
      cuteness: 98,
      fluffiness: 99,
      agility: 94,
      curiosity: 97,
      magicPower: 99,
    },
    passiveSkill: {
      name: '星塵織夢 (Stardust Dream-Weave)',
      badge: '好夢守護',
      description: '睡在牠身邊時，整夜都會做甜甜的棉花糖美夢，所有白天的疲憊與焦慮都會化為金色流星消散。'
    },
    diet: '微光星塵碎片、冰鎮銀河冷萃、甜美的好夢氣泡',
    sizeWeight: '輕若一縷晨光 · 抱起來如抱著溫暖的星雲棉被',
    lifespan: '與浩瀚星空同壽',
    vocalization: {
      soundText: 'Chime of starlight (星光叮咚微鳴)',
      soundDesc: '走動時會發出細碎清脆如水晶玻璃風鈴相撞的微小鈴音。'
    },
    funFacts: [
      '當你看見天邊有一顆流星急轉彎掉落時，很可能只是星狐不小心把流星當成毛線球一腳踢偏了！',
      '牠的耳朵裡能接收全宇宙所有星球緩慢旋轉的背景交響樂。',
      '如果牠喜歡你，會在你的枕邊悄悄留下一枚小小的發光星塵碎片作為禮物。'
    ],
    cuteQuote: '「今夜的星光很溫柔，閉上眼睛吧，我會在你的夢裡點亮一盞小路燈。」'
  },
  {
    id: 'celestial-tenko',
    name: '金狐·天狐',
    englishName: 'Golden Tenko Divine Fox',
    scientificName: 'Vulpes divinus',
    category: 'mythical',
    habitat: 'mystic',
    habitatLabel: '九重天外紫霄宮 / 祥雲之巔',
    themeColor: 'from-yellow-400 via-amber-500 to-yellow-600',
    accentBg: 'bg-yellow-50 text-yellow-900 border-yellow-300',
    avatarEmoji: '✨',
    subtitle: '修行千年超越九尾、乘紫雲飛昇的天階大宗主',
    description: '在東亞狐道信仰的頂點：狐修五百年得三尾化為妖狐；修至千年得九尾化為仙狐；而超越千年得證無上正果者，則昇天為「天狐」！通體呈現至純至聖的流光金羽，四爪生祥雲，擁有通曉宇宙一切事物的超凡慧眼。',
    personalityTraits: ['大智大慧', '普度萬靈', '和光同塵', '超凡脫俗'],
    stats: {
      cuteness: 97,
      fluffiness: 98,
      agility: 99,
      curiosity: 92,
      magicPower: 100,
    },
    passiveSkill: {
      name: '金光普照 (Golden Tenko Halo)',
      badge: '無上神威',
      description: '周身散發太陽般溫煦而不刺眼的金色柔光，瞬間解開世間一切煩惱枷鎖與焦慮執念。'
    },
    diet: '天地太虛清氣、金蓮甘露、九轉紫芝',
    sizeWeight: '可大如金色行雲，亦可縮成掌心小金狐',
    lifespan: '與天地日月同壽',
    vocalization: {
      soundText: 'Golden harmonic chord (太虛梵天金聲)',
      soundDesc: '如金鐘大呂共鳴，極具安定人心力量的金色和聲。'
    },
    funFacts: [
      '古籍記載「天狐無尾」，並非沒有尾巴，而是尾巴化為七彩天虹祥雲融入了整片蔚藍天空。',
      '雖然已經位列天界大仙，但一旦聞到人間烤番薯的香甜氣味，還是會偷偷降下一縷神念來嚐嚐鮮。',
      '在民間傳奇中，天狐是所有狐狸族的共同大祖師爺，無論哪種狐狸見到牠都會乖乖低頭蹭蹭。'
    ],
    cuteQuote: '「歷經千年千劫，回首望向人間，最動人的依然是那碗熱騰騰的甜湯圓與一抹真心。」'
  },
  {
    id: 'lunar-fox',
    name: '幽夜月狐',
    englishName: 'Lunar Shadow Fox',
    scientificName: 'Vulpes lunaris',
    category: 'mythical',
    habitat: 'mystic',
    habitatLabel: '月宮清桂林 / 靜謐月海',
    themeColor: 'from-indigo-600 to-slate-900',
    accentBg: 'bg-indigo-50 text-indigo-900 border-indigo-200',
    avatarEmoji: '🌙',
    subtitle: '沐浴月華而生的靜謐守月神僕',
    description: '只在滿月時分倒映於平靜如鏡的湖面上現身。通體是深邃如夜空的暗藍色，額前長有一輪會隨月相盈虧而變化的銀白月牙印記。牠的使命是安撫夜行者焦躁的心靈，讓萬物在月光下安詳沉睡。',
    personalityTraits: ['溫柔沉靜', '內斂深情', '護佑睡眠', '月光眷屬'],
    stats: {
      cuteness: 96,
      fluffiness: 97,
      agility: 95,
      curiosity: 89,
      magicPower: 98,
    },
    passiveSkill: {
      name: '月相撫慰 (Lunar Solace)',
      badge: '安神靜心',
      description: '釋放如同銀色絲綢般的柔和月華光暈，能在幾秒鐘內降低心率，驅散失眠與深夜焦慮。'
    },
    diet: '桂花清露、月光凝結的冰霜薄片、甘甜山泉',
    sizeWeight: '輕盈無聲 · 如同一陣清涼的夜風',
    lifespan: '月亮恆存即長存',
    vocalization: {
      soundText: 'Low lullaby hum (舒緩的安眠低哼)',
      soundDesc: '如母親哼唱的搖籃曲般深沉柔和的喉音，帶有天然的助眠白噪音頻率。'
    },
    funFacts: [
      '在農曆初一新月時，牠額頭上的月牙印記會變成一條細細的金線，性格會變得超級黏人愛撒嬌。',
      '牠的尾巴摸起來像絲綢一樣涼爽細膩，在炎炎夏日是世上最棒的天然涼感抱枕！',
      '古人常看見狐狸對著明月長拜，傳說那其實就是幽夜月狐在向月亮母親致敬呢。'
    ],
    cuteQuote: '「月亮把它的溫柔託付給了我，而我，想把這份寧靜全部留給你。」'
  }
];

export const FOX_HABITATS = [
  { id: 'all', label: '全部物種', icon: '🐾', count: FOX_SPECIES_LIST.length },
  { id: 'forest', label: '深林灌木', icon: '🌲', count: FOX_SPECIES_LIST.filter(f => f.habitat === 'forest').length },
  { id: 'snow', label: '極地雪原', icon: '❄️', count: FOX_SPECIES_LIST.filter(f => f.habitat === 'snow').length },
  { id: 'desert', label: '炎熱荒漠', icon: '🏜️', count: FOX_SPECIES_LIST.filter(f => f.habitat === 'desert').length },
  { id: 'plateau', label: '高山高原', icon: '🏔️', count: FOX_SPECIES_LIST.filter(f => f.habitat === 'plateau').length },
  { id: 'grassland', label: '原野草原', icon: '🌾', count: FOX_SPECIES_LIST.filter(f => f.habitat === 'grassland').length },
  { id: 'rainforest', label: '雨林幽境', icon: '🌿', count: FOX_SPECIES_LIST.filter(f => f.habitat === 'rainforest').length },
  { id: 'mystic', label: '奇幻神話', icon: '✨', count: FOX_SPECIES_LIST.filter(f => f.habitat === 'mystic').length },
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
    foxName: '南美鬃狼',
    title: '踩高跟鞋的偽狐之謎',
    fact: '南美鬃狼雖然名字叫狼、長得像長腿狐狸，但在分類學上既非狼也非狐，是南美特有的獨立單型屬！長達 90 公分的長腿是為了在潘帕斯深草中俯瞰獵物，而且牠最愛吃的居然是野生番茄！',
    category: '分類彩蛋',
    tagEmoji: '🦵'
  },
  {
    id: 8,
    foxName: '狐火傳奇',
    title: '妖火還是螢光菇？',
    fact: '古代傳說狐狸口中吐出青藍色「狐火」，其實是狐狸夜行眼睛照膜強烈反光，加上在森林枯木間穿梭時，皮毛沾染了會發出冷綠光芒的「發光真菌菌絲（Foxfire）」！',
    category: '傳說真相',
    tagEmoji: '🔥'
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
