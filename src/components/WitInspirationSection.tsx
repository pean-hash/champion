import { ArrowUpRight, Palette, Share2, Sparkles } from 'lucide-react';
import { POSTER_THEMES, WIT_INSPIRATIONS } from '../data/initialAwards';
import { WitInspiration } from '../types/award';

interface WitInspirationSectionProps {
  onUseInspiration: (item: WitInspiration) => void;
}

export function WitInspirationSection({
  onUseInspiration,
}: WitInspirationSectionProps) {
  return (
    <>
      {/* Wit Inspirations Library */}
      <section
        id="wit-inspirations"
        className="border-t-[1.5px] border-[#141413] bg-white py-14"
      >
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono-num text-xs font-bold text-[#57534E]">
                INSPIRATION DECK · 幽默靈感抽屜
              </p>
              <h2 className="font-display mt-1 text-2xl font-extrabold tracking-tight text-[#141413] sm:text-3xl">
                靈感枯竭？一鍵套用現成梗王範本再改寫
              </h2>
            </div>
            <p className="max-w-sm text-sm text-[#57534E]">
              點擊任一張靈感卡，所有獎項名稱與得獎感言都會直接帶入編輯器供您自由改造。
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            {WIT_INSPIRATIONS.map((item) => {
              const theme = POSTER_THEMES[item.posterTheme];
              return (
                <div
                  key={item.awardTitle}
                  className="flex flex-col justify-between rounded-2xl border-[1.5px] border-[#141413] bg-[#F9F8F4] p-6 transition-transform duration-150 hover:-translate-y-0.5"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-bold text-[#57534E]">
                        {item.category} · {item.issuer}
                      </span>
                      <span
                        className="h-4 w-8 rounded-sm border border-[#141413]"
                        style={{ backgroundColor: theme.bgHex }}
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="font-display mt-3 text-xl font-extrabold text-[#141413]">
                      {item.awardTitle}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#57534E]">
                      {item.achievementSummary}
                    </p>
                    <p className="mt-3 rounded-xl border border-[#141413]/15 bg-white p-3.5 text-xs leading-relaxed text-[#141413]">
                      「{item.acceptanceSpeech}」
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-4">
                    <span className="text-xs font-semibold text-[#2563EB] truncate">
                      {item.hashtags.join(' ')}
                    </span>
                    <button
                      type="button"
                      onClick={() => onUseInspiration(item)}
                      className="cursor-pointer inline-flex items-center gap-1.5 rounded-xl border-[1.5px] border-[#141413] bg-[#BEF264] px-4 py-2 text-xs font-bold text-[#141413] transition-colors hover:bg-[#a3e635] whitespace-nowrap shrink-0"
                    >
                      <span>套用改寫</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Poster Craft & How to Share Guide */}
      <section
        id="poster-craft"
        className="border-t-[1.5px] border-[#141413] bg-[#F9F8F4] py-14"
      >
        <div className="mx-auto max-w-[1200px] px-6">
          <div id="how-to-share" className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border-[1.5px] border-[#141413] bg-white p-6">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border-[1.5px] border-[#141413] bg-[#2563EB] text-white">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="font-display mt-4 text-lg font-extrabold text-[#141413]">
                01. 浮誇反差就是笑點
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#57534E]">
                把平凡的小事包裝成國際級頒獎典禮：越正經的「頒獎單位」搭配越真實的「微不足道事蹟」，幽默感就越強烈。
              </p>
            </div>

            <div className="rounded-2xl border-[1.5px] border-[#141413] bg-white p-6">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border-[1.5px] border-[#141413] bg-[#FACC15] text-[#141413]">
                <Palette className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="font-display mt-4 text-lg font-extrabold text-[#141413]">
                02. 撞色海報一秒吸睛
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#57534E]">
                內建四組經對比度校準的潮流撞色組合，滑過社群動態牆時不用靠濾鏡，大字報版型就能直接抓住朋友視線。
              </p>
            </div>

            <div className="rounded-2xl border-[1.5px] border-[#141413] bg-white p-6">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border-[1.5px] border-[#141413] bg-[#FF6B35] text-[#141413]">
                <Share2 className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="font-display mt-4 text-lg font-extrabold text-[#141413]">
                03. 圖卡、文案與連結三合一
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#57534E]">
                發佈後可隨時點擊貼文的「留言與分享」，直接下載 1080×1350 高畫質海報 PNG 發 IG，或複製編碼網址傳給朋友圍觀。
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
