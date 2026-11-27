import { useEffect, useState } from 'react';
import { Shuffle, X, Check, Upload, Image as ImageIcon } from 'lucide-react';
import {
  ARTWORK_ASSETS,
  CATEGORIES,
  POSTER_THEMES,
  WIT_INSPIRATIONS,
} from '../data/initialAwards';
import {
  ArtworkId,
  AwardCategory,
  AwardPost,
  PosterThemeId,
  WitInspiration,
} from '../types/award';
import { PosterVisualHeader } from './PosterVisualHeader';

interface AwardComposerModalProps {
  isOpen: boolean;
  nextSerialNo: string;
  preset?: WitInspiration | null;
  onClose: () => void;
  onPublish: (newPost: AwardPost) => void;
}

export function AwardComposerModal({
  isOpen,
  nextSerialNo,
  preset,
  onClose,
  onPublish,
}: AwardComposerModalProps) {
  const [awardTitle, setAwardTitle] = useState('');
  const [recipient, setRecipient] = useState('');
  const [advisor, setAdvisor] = useState('');
  const [rank, setRank] = useState('');
  const [issuer, setIssuer] = useState('國際幽默自肥委員會');
  const [category, setCategory] = useState<AwardCategory>('職場求生');
  const [achievementSummary, setAchievementSummary] = useState('');
  const [acceptanceSpeech, setAcceptanceSpeech] = useState('');
  const [hashtagsInput, setHashtagsInput] = useState('#獎不完全國賽 #官方認證幽默');
  const [posterTheme, setPosterTheme] = useState<PosterThemeId>('cobalt-lime');
  const [artworkId, setArtworkId] = useState<ArtworkId>('hero');
  const [customPhoto, setCustomPhoto] = useState<string | undefined>(undefined);
  const [errorMsg, setErrorMsg] = useState('');
  const [inspirationIndex, setInspirationIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    if (preset) {
      setAwardTitle(preset.awardTitle);
      setIssuer(preset.issuer);
      setRecipient(preset.recipient);
      setAdvisor(preset.advisor ?? '');
      setRank(preset.rank ?? '');
      setCategory(preset.category);
      setAchievementSummary(preset.achievementSummary);
      setAcceptanceSpeech(preset.acceptanceSpeech);
      setPosterTheme(preset.posterTheme);
      setArtworkId(preset.artworkId);
      setCustomPhoto(undefined);
      setHashtagsInput(preset.hashtags.join(' '));
      setErrorMsg('');
    }
  }, [isOpen, preset]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const todayFormatted = new Date().toISOString().slice(0, 10).replace(/-/g, '.');

  const handleShuffleInspiration = () => {
    const nextIdx = (inspirationIndex + 1) % WIT_INSPIRATIONS.length;
    setInspirationIndex(nextIdx);
    const sample = WIT_INSPIRATIONS[nextIdx];
    setAwardTitle(sample.awardTitle);
    setIssuer(sample.issuer);
    setRecipient(sample.recipient);
    setAdvisor(sample.advisor ?? '');
    setRank(sample.rank ?? '');
    setCategory(sample.category);
    setAchievementSummary(sample.achievementSummary);
    setAcceptanceSpeech(sample.acceptanceSpeech);
    setPosterTheme(sample.posterTheme);
    setArtworkId(sample.artworkId);
    setCustomPhoto(undefined);
    setHashtagsInput(sample.hashtags.join(' '));
    setErrorMsg('');
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string;
      if (result) {
        setCustomPhoto(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!awardTitle.trim() || !recipient.trim() || !acceptanceSpeech.trim()) {
      setErrorMsg('請至少填寫「獎項名稱」、「得主名稱」與「幽默得獎感言」，才能完成頒獎！');
      return;
    }

    const parsedTags = hashtagsInput
      .split(/\s+/)
      .map((t) => t.trim())
      .filter(Boolean)
      .map((t) => (t.startsWith('#') ? t : `#${t}`))
      .slice(0, 5);

    const createdPost: AwardPost = {
      id: `custom-${Date.now()}`,
      serialNo: nextSerialNo,
      awardTitle: awardTitle.trim(),
      issuer: issuer.trim() || '私人頒獎典禮委員會',
      recipient: recipient.trim(),
      advisor: advisor.trim() || undefined,
      rank: rank.trim() || undefined,
      category,
      achievementSummary:
        achievementSummary.trim() || '憑藉無可挑剔的幽默感與日常毅力，現場無異議一致通過獲獎。',
      acceptanceSpeech: acceptanceSpeech.trim(),
      posterTheme,
      artworkId,
      customPhoto,
      hashtags: parsedTags.length > 0 ? parsedTags : ['#獎不完公社'],
      createdAt: todayFormatted,
      reactions: { clap: 1, laugh: 0, real: 0 },
      comments: [],
      isCustom: true,
    };

    onPublish(createdPost);
    setAwardTitle('');
    setRecipient('');
    setAdvisor('');
    setRank('');
    setAchievementSummary('');
    setAcceptanceSpeech('');
    setCustomPhoto(undefined);
    setErrorMsg('');
  };

  const parsedPreviewTags = hashtagsInput
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => (t.startsWith('#') ? t : `#${t}`));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#141413]/70 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="composer-title"
    >
      <div className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border-[1.5px] border-[#141413] bg-[#F9F8F4] shadow-[8px_8px_0px_#141413]">
        {/* Modal Header */}
        <div className="flex items-center justify-between gap-4 border-b-[1.5px] border-[#141413] bg-white px-6 py-4">
          <div>
            <h2 id="composer-title" className="font-display text-xl font-extrabold text-[#141413]">
              頒發新獎項 · 自訂獎項、指導老師、名次與相片
            </h2>
            <p className="text-xs text-[#57534E]">
              自由填寫四大核心欄位，左側即時預覽你的專屬潮流海報
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleShuffleInspiration}
              className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg border-[1.5px] border-[#141413] bg-[#FACC15] px-3 py-2 text-xs font-bold text-[#141413] transition-transform duration-150 hover:-translate-y-0.5 whitespace-nowrap shrink-0"
            >
              <Shuffle className="h-3.5 w-3.5" aria-hidden="true" />
              <span>抽一組幽默靈感</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="關閉創作視窗"
              className="cursor-pointer rounded-lg border-[1.5px] border-[#141413] bg-white p-2 text-[#141413] hover:bg-[#141413] hover:text-white transition-colors"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Modal Body: Split Preview + Form */}
        <div className="grid grid-cols-1 overflow-y-auto lg:grid-cols-12">
          {/* Left Live Preview */}
          <div className="border-b-[1.5px] border-[#141413] bg-[#EFECE4] p-6 lg:col-span-5 lg:border-r-[1.5px] lg:border-b-0">
            <p className="mb-3 font-mono-num text-xs font-bold text-[#57534E]">
              LIVE POSTER PREVIEW · 即時預覽
            </p>
            <div className="overflow-hidden rounded-2xl border-[1.5px] border-[#141413] bg-white shadow-[5px_5px_0px_#141413]">
              <PosterVisualHeader
                serialNo={nextSerialNo}
                category={category}
                createdAt={todayFormatted}
                awardTitle={awardTitle || '年度最佳準時收工金獎'}
                recipient={recipient || '得主姓名'}
                advisor={advisor || undefined}
                rank={rank || undefined}
                posterTheme={posterTheme}
                artworkId={artworkId}
                customPhoto={customPhoto}
                compact
              />
              <div className="space-y-3 p-4">
                {advisor && (
                  <p className="text-xs font-semibold text-[#57534E]">指導老師：{advisor}</p>
                )}
                <div>
                  <p className="text-[11px] font-bold text-[#57534E]">獲獎關鍵事蹟</p>
                  <p className="mt-1 text-xs leading-relaxed text-[#141413]">
                    {achievementSummary ||
                      '在這裡寫下得獎者最荒謬、最寫實或最令人敬佩的輝煌事蹟。'}
                  </p>
                </div>
                <div className="rounded-lg border border-[#141413]/15 bg-[#F9F8F4] p-3">
                  <p className="text-[11px] font-bold text-[#57534E]">幽默得獎感言</p>
                  <p className="mt-1 text-xs leading-relaxed text-[#141413]">
                    「{acceptanceSpeech || '謝謝一路支持我的咖啡因與還沒放棄我的鬧鐘。'}」
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#57534E]">
                  <span>頒獎：{issuer || '私人頒獎委員會'}</span>
                  <span className="font-semibold text-[#2563EB] truncate max-w-full">
                    {parsedPreviewTags.join(' ')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-4 p-6 lg:col-span-7">
            {errorMsg && (
              <div
                role="alert"
                className="rounded-xl border-[1.5px] border-[#DC2626] bg-[#FEF2F2] px-4 py-3 text-sm font-semibold text-[#B91C1C]"
              >
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="award-title" className="block text-xs font-bold text-[#141413]">
                  1. 獎項名稱 <span className="text-[#DC2626]">*</span>
                </label>
                <input
                  id="award-title"
                  type="text"
                  maxLength={40}
                  value={awardTitle}
                  onChange={(e) => setAwardTitle(e.target.value)}
                  placeholder="例如：全國高中職黑客松金牌獎"
                  className="mt-1.5 w-full rounded-xl border-[1.5px] border-[#141413] bg-white px-3.5 py-2.5 text-sm text-[#141413] focus:outline-2 focus:outline-[#2563EB]"
                />
              </div>

              <div>
                <label htmlFor="award-recipient" className="block text-xs font-bold text-[#141413]">
                  得主 / 獲獎團隊 <span className="text-[#DC2626]">*</span>
                </label>
                <input
                  id="award-recipient"
                  type="text"
                  maxLength={32}
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="例如：王小明（資管三A）"
                  className="mt-1.5 w-full rounded-xl border-[1.5px] border-[#141413] bg-white px-3.5 py-2.5 text-sm text-[#141413] focus:outline-2 focus:outline-[#2563EB]"
                />
              </div>

              <div>
                <label htmlFor="award-advisor" className="block text-xs font-bold text-[#141413]">
                  2. 指導老師
                </label>
                <input
                  id="award-advisor"
                  type="text"
                  maxLength={32}
                  value={advisor}
                  onChange={(e) => setAdvisor(e.target.value)}
                  placeholder="例如：陳大山 教授"
                  className="mt-1.5 w-full rounded-xl border-[1.5px] border-[#141413] bg-white px-3.5 py-2.5 text-sm text-[#141413] focus:outline-2 focus:outline-[#2563EB]"
                />
              </div>

              <div>
                <label htmlFor="award-rank" className="block text-xs font-bold text-[#141413]">
                  3. 名次
                </label>
                <input
                  id="award-rank"
                  type="text"
                  maxLength={24}
                  value={rank}
                  onChange={(e) => setRank(e.target.value)}
                  placeholder="例如：第一名 / 金牌 / 特優 / 最佳人氣獎"
                  className="mt-1.5 w-full rounded-xl border-[1.5px] border-[#141413] bg-white px-3.5 py-2.5 text-sm text-[#141413] focus:outline-2 focus:outline-[#2563EB]"
                />
              </div>

              <div>
                <label htmlFor="award-issuer" className="block text-xs font-bold text-[#141413]">
                  頒獎單位
                </label>
                <input
                  id="award-issuer"
                  type="text"
                  maxLength={32}
                  value={issuer}
                  onChange={(e) => setIssuer(e.target.value)}
                  placeholder="例如：教育部 / 資訊學會"
                  className="mt-1.5 w-full rounded-xl border-[1.5px] border-[#141413] bg-white px-3.5 py-2.5 text-sm text-[#141413] focus:outline-2 focus:outline-[#2563EB]"
                />
              </div>
            </div>

            {/* 4. Photo Upload & Artwork Options */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#141413]">
                4. 相片 / 圖卡選擇與上傳
              </label>
              <div className="flex flex-wrap items-center gap-3">
                <label className="cursor-pointer inline-flex items-center gap-2 rounded-xl border-[1.5px] border-[#141413] bg-[#BEF264] px-4 py-2.5 text-xs font-bold text-[#141413] hover:bg-[#a3e635] transition-colors">
                  <Upload className="h-4 w-4" aria-hidden="true" />
                  <span>上傳自訂相片 (JPG/PNG)</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
                {customPhoto && (
                  <button
                    type="button"
                    onClick={() => setCustomPhoto(undefined)}
                    className="cursor-pointer rounded-xl border-[1.5px] border-[#141413] bg-white px-3 py-2 text-xs font-bold text-[#DC2626] hover:bg-[#FEF2F2]"
                  >
                    移除自訂相片
                  </button>
                )}
              </div>
            </div>

            {/* Category Selector */}
            <div>
              <span className="block text-xs font-bold text-[#141413]">貼文分類</span>
              <div className="mt-1.5 flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`cursor-pointer rounded-lg border-[1.5px] px-3 py-1.5 text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                      category === cat
                        ? 'border-[#141413] bg-[#141413] text-white'
                        : 'border-[#141413]/25 bg-white text-[#57534E] hover:border-[#141413] hover:text-[#141413]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Achievement Summary */}
            <div>
              <label htmlFor="award-summary" className="block text-xs font-bold text-[#141413]">
                得獎事蹟 / 參賽亮點
              </label>
              <textarea
                id="award-summary"
                rows={2}
                maxLength={140}
                value={achievementSummary}
                onChange={(e) => setAchievementSummary(e.target.value)}
                placeholder="例如：歷經 72 小時不斷電開發，終於在最後一秒順利完成 Demo。"
                className="mt-1.5 w-full rounded-xl border-[1.5px] border-[#141413] bg-white px-3.5 py-2.5 text-sm text-[#141413] focus:outline-2 focus:outline-[#2563EB]"
              />
            </div>

            {/* Acceptance Speech */}
            <div>
              <label htmlFor="award-speech" className="block text-xs font-bold text-[#141413]">
                幽默得獎感言 <span className="text-[#DC2626]">*</span>
              </label>
              <textarea
                id="award-speech"
                rows={3}
                maxLength={220}
                value={acceptanceSpeech}
                onChange={(e) => setAcceptanceSpeech(e.target.value)}
                placeholder="例如：感謝指導老師沒有在我們快崩潰時放棄我們，也感謝咖啡因無限量供應！"
                className="mt-1.5 w-full rounded-xl border-[1.5px] border-[#141413] bg-white px-3.5 py-2.5 text-sm text-[#141413] focus:outline-2 focus:outline-[#2563EB]"
              />
            </div>

            {/* Poster Color Theme & Artwork Pickers */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <span className="block text-xs font-bold text-[#141413]">撞色海報主題</span>
                <div className="mt-1.5 grid grid-cols-2 gap-2">
                  {Object.values(POSTER_THEMES).map((t) => {
                    const active = posterTheme === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setPosterTheme(t.id)}
                        className={`cursor-pointer flex items-center gap-2 rounded-lg border-[1.5px] px-2.5 py-2 text-left text-xs font-bold transition-colors ${
                          active
                            ? 'border-[#141413] bg-white ring-2 ring-[#2563EB]'
                            : 'border-[#141413]/25 bg-white hover:border-[#141413]'
                        }`}
                      >
                        <span
                          className="flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-[#141413]"
                          style={{ backgroundColor: t.bgHex }}
                        >
                          <span
                            className="h-2 w-2 rounded-xs"
                            style={{ backgroundColor: t.accentHex }}
                          />
                        </span>
                        <span className="truncate">{t.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {!customPhoto && (
                <div>
                  <span className="block text-xs font-bold text-[#141413]">內建潮流海報圖卡</span>
                  <div className="mt-1.5 grid grid-cols-2 gap-2">
                    {(Object.keys(ARTWORK_ASSETS) as Exclude<ArtworkId, 'typographic'>[]).map(
                      (key) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setArtworkId(key)}
                          className={`cursor-pointer flex items-center justify-between rounded-lg border-[1.5px] px-2.5 py-2 text-xs font-bold transition-colors ${
                            artworkId === key
                              ? 'border-[#141413] bg-[#BEF264] text-[#141413]'
                              : 'border-[#141413]/25 bg-white text-[#57534E] hover:border-[#141413]'
                          }`}
                        >
                          <span className="truncate">{ARTWORK_ASSETS[key].label}</span>
                          {artworkId === key && <Check className="h-3.5 w-3.5 shrink-0" />}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="award-tags" className="block text-xs font-bold text-[#141413]">
                社群標籤（以空白分隔）
              </label>
              <input
                id="award-tags"
                type="text"
                value={hashtagsInput}
                onChange={(e) => setHashtagsInput(e.target.value)}
                placeholder="#全國金牌 #指導老師萬歲"
                className="mt-1.5 w-full rounded-xl border-[1.5px] border-[#141413] bg-white px-3.5 py-2 text-sm text-[#141413] focus:outline-2 focus:outline-[#2563EB]"
              />
            </div>

            <div className="flex items-center justify-end gap-3 border-t-[1.5px] border-[#141413]/15 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer rounded-xl border-[1.5px] border-[#141413] bg-white px-5 py-2.5 text-sm font-bold text-[#141413] hover:bg-[#EFECE4] transition-colors whitespace-nowrap shrink-0"
              >
                取消
              </button>
              <button
                type="submit"
                className="cursor-pointer rounded-xl border-[1.5px] border-[#141413] bg-[#2563EB] px-6 py-2.5 text-sm font-bold text-white shadow-[3px_3px_0px_#141413] transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap shrink-0"
              >
                發佈到獲獎動態牆
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
