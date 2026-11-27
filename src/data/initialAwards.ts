import { ArtworkId, AwardCategory, AwardPost, PosterTheme, PosterThemeId, WitInspiration } from '../types/award';

export const ARTWORK_ASSETS: Record<Exclude<ArtworkId, 'typographic'>, { src: string; label: string }> = {
  hero: {
    src: '/src/assets/images/hero_award_poster_1795760906932.jpg',
    label: '撞色金盃大獎',
  },
  coffee: {
    src: '/src/assets/images/award_workplace_coffee_1795760906423.jpg',
    label: '冰美式求生獎牌',
  },
  snack: {
    src: '/src/assets/images/award_midnight_snack_1795760907849.jpg',
    label: '宵夜桂冠珍奶杯',
  },
  friendship: {
    src: '/src/assets/images/award_friendship_crown_1795760908336.jpg',
    label: '擊掌封神金盃',
  },
};

export const POSTER_THEMES: Record<PosterThemeId, PosterTheme> = {
  'cobalt-lime': {
    id: 'cobalt-lime',
    name: '電光藍 × 青檸綠',
    bgHex: '#1D4ED8',
    accentHex: '#BEF264',
    textHex: '#FFFFFF',
    accentTextHex: '#141413',
    subTextHex: '#DBEAFE',
    badgeBgHex: '#1E3A8A',
  },
  'tangerine-cream': {
    id: 'tangerine-cream',
    name: '焦糖橘 × 奶油白',
    bgHex: '#FF6B35',
    accentHex: '#F9F8F4',
    textHex: '#141413',
    accentTextHex: '#141413',
    subTextHex: '#292524',
    badgeBgHex: '#EA580C',
  },
  'sunflower-ink': {
    id: 'sunflower-ink',
    name: '檸檬黃 × 墨曜黑',
    bgHex: '#FACC15',
    accentHex: '#141413',
    textHex: '#141413',
    accentTextHex: '#FACC15',
    subTextHex: '#292524',
    badgeBgHex: '#EAB308',
  },
  'berry-mint': {
    id: 'berry-mint',
    name: '墨曜黑 × 霓虹粉',
    bgHex: '#141413',
    accentHex: '#F472B6',
    textHex: '#FFFFFF',
    accentTextHex: '#141413',
    subTextHex: '#D6D3D1',
    badgeBgHex: '#292524',
  },
};

export const CATEGORIES: AwardCategory[] = ['職場求生', '生活奇蹟', '友情封神', '專業光環'];

export const INITIAL_AWARDS: AwardPost[] = [
  {
    id: 'award-001',
    serialNo: 'NO. 042',
    awardTitle: '年度準時關機手速金像獎',
    issuer: '社畜勞動尊嚴促進會',
    recipient: '林阿宅（18:00:01 已在電梯口）',
    advisor: '咖啡因大師',
    rank: '金牌第一名',
    category: '職場求生',
    achievementSummary: '連續 248 個工作天在 17:59 完成存檔，並在秒針歸零瞬間將筆電闔上發出清脆響聲。',
    acceptanceSpeech:
      '感謝那杯每天早上九點支撐我靈魂的大冰美，也感謝主管總是在 17:58 突然想不起要問我什麼。這個獎獻給所有還沒下班卻已經把心留在捷運站的人，明天見，但不要太早見！',
    posterTheme: 'cobalt-lime',
    artworkId: 'coffee',
    hashtags: ['#準時下班金牌得主', '#大冰美贊助播出', '#職場求生大師'],
    createdAt: '2026.11.24',
    reactions: { clap: 184, laugh: 96, real: 241 },
    comments: [
      {
        id: 'c-101',
        author: '茶水間觀察員',
        content: '那聲清脆的闔筆電聲根本是整層樓的自由鐘聲。',
        createdAt: '2小時前',
      },
      {
        id: 'c-102',
        author: '還在改簡報的艾倫',
        content: '請問手速訓練班還有名額嗎？我通常 18:02 還會被叫住。',
        createdAt: '45分鐘前',
      },
    ],
  },
  {
    id: 'award-002',
    serialNo: 'NO. 041',
    awardTitle: '深夜鹽酥雞與全糖珍奶雙料冠軍',
    issuer: '國際熱量無視聯盟',
    recipient: '王大胃（自稱在減醣）',
    advisor: '宵夜阿嬤',
    rank: '特優金獎',
    category: '生活奇蹟',
    achievementSummary: '於週五深夜 23:45 成功說服自己「明天再跑五公里」，創下單週連吃四次宵夜卻體重持平之醫學奇蹟。',
    acceptanceSpeech:
      '很多人問我為什麼半夜點九層塔要加辣還要配珍珠奶茶？我只能說：白天已經夠苦了，晚上甜一點、鹹一點怎麼了！感謝外送員風雨無阻的守護，減肥的事我們明年春天再從長計議。',
    posterTheme: 'sunflower-ink',
    artworkId: 'snack',
    hashtags: ['#熱量歸零奇蹟', '#九層塔必須多一點', '#明天再減肥協會'],
    createdAt: '2026.11.22',
    reactions: { clap: 132, laugh: 215, real: 178 },
    comments: [
      {
        id: 'c-201',
        author: '外送平台VIP',
        content: '吃飽才有力氣減肥，這邏輯無懈可擊。',
        createdAt: '昨天',
      },
    ],
  },
  {
    id: 'award-003',
    serialNo: 'NO. 040',
    awardTitle: '最佳已讀不回心理輔導金獎',
    issuer: '週五約局永遠缺一角委員會',
    recipient: '陳失蹤（訊息總是顯示三天前上線）',
    advisor: '已讀不回大叔',
    rank: '首獎特優',
    category: '友情封神',
    achievementSummary: '歷經 19 次聚餐邀約已讀、27 次「下次一定」承諾後，終於在半年後奇蹟現身且自願買單第一輪飲料。',
    acceptanceSpeech:
      '能拿到這座獎杯我非常意外，畢竟我連通知頒獎典禮的群組訊息都還沒點開。感謝朋友們的不離不棄，雖然我常說「看情況」，但我心裡是真的有想出門——只是床單的重力今天特別強。',
    posterTheme: 'tangerine-cream',
    artworkId: 'friendship',
    hashtags: ['#下次一定基金會', '#出門需要勇氣', '#友情長存'],
    createdAt: '2026.11.20',
    reactions: { clap: 98, laugh: 164, real: 153 },
    comments: [
      {
        id: 'c-301',
        author: '主揪小美',
        content: '他能準時出現我們差點直接放煙火慶祝！',
        createdAt: '2天前',
      },
    ],
  },
  {
    id: 'award-004',
    serialNo: 'NO. 039',
    awardTitle: '跨部門需求翻譯與通靈特等獎',
    issuer: '亞洲設計與工程和平基金會',
    recipient: '張通靈（看著「想要感覺大一點但又不要太滿」點頭）',
    advisor: '通靈大師',
    rank: '全國第一名',
    category: '專業光環',
    achievementSummary: '憑藉 3 個字元以下的模糊回饋，成功精準推算出客戶真正想要的五彩斑斕黑配色，零返工一次過稿。',
    acceptanceSpeech:
      '剛入行時我以為這份工作靠的是技術與美感，現在我明白了，靠的是第六感跟穩定的血壓。把這座獎獻給螢幕前每個問過「請問 Logo 可以再大一點但整體再簡約一點嗎」的靈魂。',
    posterTheme: 'berry-mint',
    artworkId: 'hero',
    hashtags: ['#一次過稿傳說', '#通靈系專業人才', '#五彩斑斕的黑'],
    createdAt: '2026.11.18',
    reactions: { clap: 267, laugh: 149, real: 312 },
    comments: [
      {
        id: 'c-401',
        author: '資深前端工程師',
        content: '能把「感覺要有高級感」翻譯成具體規格的人都應該直接進名人堂。',
        createdAt: '3天前',
      },
    ],
  },
];

export const WIT_INSPIRATIONS: WitInspiration[] = [
  {
    awardTitle: '會議室點頭如搗蒜奧斯卡獎',
    issuer: '週一早會求生研究院',
    recipient: '吳清醒（眼神放空但姿勢滿分）',
    advisor: '咖啡因教授',
    rank: '金牌',
    category: '職場求生',
    achievementSummary: '在長達兩小時的無結論會議中，精準掌握每 12 分鐘推一次眼鏡並說出「這方向值得再思考」的黃金節奏。',
    acceptanceSpeech:
      '其實整場會議我都在想中午要吃排骨飯還是控肉飯，沒想到大家覺得我表情非常深思熟慮。這個獎證明了：只要眉頭皺得夠深，全世界都會以為你掌握了核心關鍵。',
    posterTheme: 'cobalt-lime',
    artworkId: 'coffee',
    hashtags: ['#早會奧斯卡', '#皺眉頭的藝術', '#午餐吃什麼'],
  },
  {
    awardTitle: '購物車清倉忍住不結帳克制大獎',
    issuer: '月底吃土預防中心',
    recipient: '周省長（免運門檻前緊急煞車）',
    advisor: '省錢達人',
    rank: '特優',
    category: '生活奇蹟',
    achievementSummary: '在雙十一與黑五連環轟炸下，將 18 件「好像很需要但其實用不到」的家電全部移入收藏夾並關閉網頁。',
    acceptanceSpeech:
      '這是一場與演算法之間的孤獨戰役。當彈窗跳出「再湊 99 元即可免運」的那一刻，我差點就買了三支不需要的矽膠鍋鏟。感謝我乾癟的錢包在關鍵時刻拉了我一把！',
    posterTheme: 'tangerine-cream',
    artworkId: 'snack',
    hashtags: ['#演算法贏不了我', '#月底保衛戰', '#理性消費天花板'],
  },
  {
    awardTitle: '旅行規劃活體導航兼攝影神隊友獎',
    issuer: '朋友出遊不吵架協會',
    recipient: '許萬能（連備用電源都帶兩顆）',
    advisor: '導遊小王',
    rank: '冠軍',
    category: '友情封神',
    achievementSummary: '包辦機票住宿比價、餐廳訂位、雨天備案與全員 180 公分大長腿仰角拍攝，堪稱人類旅遊界瑞士刀。',
    acceptanceSpeech:
      '雖然旅途中大家一直問我「等一下去哪」、「這間要排多久」，但看到每個人 IG 頭貼都換成我拍的照片，一切都值得了。唯一願望：讓我當一次只要負責吃跟睡的人就好。',
    posterTheme: 'sunflower-ink',
    artworkId: 'friendship',
    hashtags: ['#神隊友本友', '#專業大長腿角度', '#旅伴天花板'],
  },
  {
    awardTitle: '不重開機直接修好神奇 Bug 終身成就獎',
    issuer: '玄學除錯科學院',
    recipient: '蔡神手（只是走過去看了一眼）',
    advisor: '伺服器守護神',
    rank: '最高榮譽獎',
    category: '專業光環',
    achievementSummary: '同事卡關三小時的靈異問題，在得主走近螢幕三步距離內奇蹟般自動恢復正常，本人甚至還沒碰到鍵盤。',
    acceptanceSpeech:
      '連我自己都不知道為什麼只要我站在旁邊問題就會消失，也許電腦也懂看臉色。感謝乖巧的伺服器與沒有半夜響起的警報器，今晚可以安心睡覺了。',
    posterTheme: 'berry-mint',
    artworkId: 'hero',
    hashtags: ['#玄學除錯', '#伺服器乖乖聽話', '#靠近即修復'],
  },
];
