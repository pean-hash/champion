import { useState } from 'react';
import { Award, Trophy } from 'lucide-react';
import { ARTWORK_ASSETS, POSTER_THEMES } from '../data/initialAwards';
import { ArtworkId, AwardCategory, PosterThemeId } from '../types/award';

interface PosterVisualHeaderProps {
  serialNo: string;
  category: AwardCategory;
  createdAt: string;
  awardTitle: string;
  recipient: string;
  advisor?: string;
  rank?: string;
  posterTheme: PosterThemeId;
  artworkId: ArtworkId;
  customPhoto?: string;
  compact?: boolean;
}

export function PosterVisualHeader({
  serialNo,
  category,
  createdAt,
  awardTitle,
  recipient,
  advisor,
  rank,
  posterTheme,
  artworkId,
  customPhoto,
  compact = false,
}: PosterVisualHeaderProps) {
  const [imgError, setImgError] = useState(false);
  const theme = POSTER_THEMES[posterTheme] ?? POSTER_THEMES['cobalt-lime'];
  const asset = artworkId !== 'typographic' ? ARTWORK_ASSETS[artworkId] : null;

  return (
    <div
      className={`border-b-[1.5px] border-[#141413] ${compact ? 'p-4' : 'p-5'}`}
      style={{ backgroundColor: theme.bgHex, color: theme.textHex }}
    >
      {/* Clean Unboxed Metadata Row */}
      <div
        className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold"
        style={{ color: theme.subTextHex }}
      >
        <div className="flex items-center gap-2 font-mono-num">
          <span>{serialNo}</span>
          <span aria-hidden="true">·</span>
          <span>{category}</span>
          {rank && (
            <>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1 font-bold">
                <Trophy className="h-3.5 w-3.5" aria-hidden="true" />
                {rank}
              </span>
            </>
          )}
        </div>
        <span className="font-mono-num">{createdAt}</span>
      </div>

      {/* Custom Photo or Artwork Asset Frame */}
      {customPhoto ? (
        <div className="mt-3 overflow-hidden rounded-xl border-[1.5px] border-[#141413] bg-[#F9F8F4] aspect-[16/10]">
          <img
            src={customPhoto}
            alt="得獎相片"
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        asset && (
          <div className="mt-3 overflow-hidden rounded-xl border-[1.5px] border-[#141413] bg-[#F9F8F4] aspect-[16/10]">
            {!imgError ? (
              <img
                src={asset.src}
                alt={awardTitle}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <div
                className="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center"
                style={{ backgroundColor: theme.accentHex, color: theme.accentTextHex }}
              >
                <Award className="h-8 w-8" aria-hidden="true" />
                <span className="font-display text-sm font-bold">{awardTitle}</span>
              </div>
            )}
          </div>
        )
      )}

      {/* Bold Poster Title */}
      <h3
        className={`font-display font-extrabold leading-tight tracking-tight ${
          compact ? 'mt-3 text-xl' : 'mt-4 text-2xl sm:text-[1.65rem]'
        }`}
        style={{ textWrap: 'balance' }}
      >
        {awardTitle || '請輸入你的專屬幽默獎項名稱'}
      </h3>

      {/* Contrast Color-Block Recipient & Advisor Strip */}
      <div
        className="mt-3 rounded-lg border-[1.5px] border-[#141413] px-3.5 py-2.5"
        style={{ backgroundColor: theme.accentHex, color: theme.accentTextHex }}
      >
        <div className="flex items-center justify-between text-[11px] font-bold opacity-80">
          <span>榮譽得主</span>
          {advisor && <span>指導老師：{advisor}</span>}
        </div>
        <p className="font-display text-sm font-extrabold leading-snug sm:text-base">
          {recipient || '神祕得獎者'}
        </p>
      </div>
    </div>
  );
}
