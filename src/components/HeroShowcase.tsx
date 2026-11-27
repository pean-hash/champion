import { useState } from 'react';
import { Award, ArrowRight, Sparkles } from 'lucide-react';
import { ARTWORK_ASSETS } from '../data/initialAwards';

interface HeroShowcaseProps {
  totalPosts: number;
  totalReactions: number;
  onOpenComposer: () => void;
}

export function HeroShowcase({
  totalPosts,
  totalReactions,
  onOpenComposer,
}: HeroShowcaseProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="top" className="border-b-[1.5px] border-[#141413]">
      <div className="mx-auto max-w-[1200px] px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Left Column: Editorial Typographic Hierarchy */}
          <div className="flex flex-col justify-between gap-8 lg:col-span-7">
            <div className="space-y-5">
              <p className="font-mono-num text-xs font-bold tracking-wide text-[#57534E]">
                ISSUE 2026 · 潮流撞色幽默獲獎公告牆
              </p>
              <h1
                className="font-display text-4xl font-extrabold leading-[1.12] tracking-tight text-[#141413] sm:text-5xl lg:text-[3.5rem]"
                style={{ textWrap: 'balance' }}
              >
                把生活大小荒謬，頒成一座潮流大獎。
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-[#57534E] sm:text-lg">
                不管是「連續 248 天準時關機手速金像獎」，還是「深夜鹽酥雞熱量無視冠軍」，自由命名你的獎項與得獎事蹟，搭配撞色潮流海報一鍵分享到社群動態。
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenComposer}
                className="cursor-pointer inline-flex items-center gap-2 rounded-xl border-[1.5px] border-[#141413] bg-[#FF6B35] px-6 py-3.5 text-base font-bold text-[#141413] shadow-[4px_4px_0px_#141413] transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141413]"
              >
                <span>立即自訂一個獎</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <a
                href="#wit-inspirations"
                className="inline-flex items-center gap-2 rounded-xl border-[1.5px] border-[#141413] bg-white px-5 py-3.5 text-sm font-bold text-[#141413] transition-colors duration-150 hover:bg-[#FACC15] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
              >
                瀏覽幽默靈感庫
              </a>
            </div>
          </div>

          {/* Right Column: Color-Block Poster Artwork Frame */}
          <div className="lg:col-span-5 flex">
            <div className="flex w-full flex-col justify-between rounded-2xl border-[1.5px] border-[#141413] bg-[#1D4ED8] p-5 shadow-[6px_6px_0px_#141413]">
              <div className="mb-4 flex items-center justify-between text-xs font-bold text-[#DBEAFE]">
                <span className="font-mono-num">FEATURED POSTER · 2026</span>
                <span>年度精選主視覺</span>
              </div>

              <div className="relative overflow-hidden rounded-xl border-[1.5px] border-[#141413] bg-[#F9F8F4] aspect-[4/3]">
                {!imgError ? (
                  <img
                    src={ARTWORK_ASSETS.hero.src}
                    alt="撞色幾何金盃潮流海報插畫"
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[#FACC15] p-6 text-center text-[#141413]">
                    <Award className="h-12 w-12" aria-hidden="true" />
                    <p className="font-display text-lg font-extrabold">年度撞色潮流金盃</p>
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between gap-4 rounded-xl border-[1.5px] border-[#141413] bg-[#BEF264] px-4 py-3 text-[#141413]">
                <div>
                  <p className="text-xs font-bold">本期主題範例</p>
                  <p className="font-display text-base font-extrabold">
                    任何微小成就都值得辦典禮
                  </p>
                </div>
                <Sparkles className="h-5 w-5 shrink-0" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Metrics Strip below Split */}
        <div className="mt-10 grid grid-cols-2 gap-4 border-t-[1.5px] border-[#141413]/15 pt-8 md:grid-cols-4">
          <div className="rounded-xl border-[1.5px] border-[#141413] bg-white p-4">
            <p className="text-xs font-semibold text-[#57534E]">動態牆獲獎數</p>
            <p className="font-mono-num mt-1 text-2xl font-bold text-[#141413]">
              {totalPosts} 座
            </p>
          </div>
          <div className="rounded-xl border-[1.5px] border-[#141413] bg-white p-4">
            <p className="text-xs font-semibold text-[#57534E]">累計爆笑與拍手</p>
            <p className="font-mono-num mt-1 text-2xl font-bold text-[#2563EB]">
              {totalReactions.toLocaleString()} 次
            </p>
          </div>
          <div className="rounded-xl border-[1.5px] border-[#141413] bg-white p-4">
            <p className="text-xs font-semibold text-[#57534E]">撞色潮流海報組</p>
            <p className="font-mono-num mt-1 text-2xl font-bold text-[#141413]">4 款配色</p>
          </div>
          <div className="rounded-xl border-[1.5px] border-[#141413] bg-white p-4">
            <p className="text-xs font-semibold text-[#57534E]">社群圖卡匯出</p>
            <p className="font-mono-num mt-1 text-2xl font-bold text-[#141413]">1080 × 1350</p>
          </div>
        </div>
      </div>

      {/* Editorial Marquee Ribbon Divider */}
      <div className="overflow-hidden border-t-[1.5px] border-[#141413] bg-[#FACC15] py-2.5 text-[#141413]">
        <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap text-xs font-bold tracking-wide">
          <span>獲獎動態牆</span>
          <span aria-hidden="true">·</span>
          <span>完全自訂獎項與荒謬事蹟</span>
          <span aria-hidden="true">·</span>
          <span>活潑撞色潮流海報</span>
          <span aria-hidden="true">·</span>
          <span>一鍵複製 IG 與 Threads 幽默文案</span>
          <span aria-hidden="true">·</span>
          <span>即時產生高畫質海報圖卡</span>
          <span aria-hidden="true">·</span>
          <span>獲獎動態牆</span>
          <span aria-hidden="true">·</span>
          <span>完全自訂獎項與荒謬事蹟</span>
          <span aria-hidden="true">·</span>
          <span>活潑撞色潮流海報</span>
          <span aria-hidden="true">·</span>
          <span>一鍵複製 IG 與 Threads 幽默文案</span>
          <span aria-hidden="true">·</span>
          <span>即時產生高畫質海報圖卡</span>
          <span aria-hidden="true">·</span>
        </div>
      </div>
    </section>
  );
}
