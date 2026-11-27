import { Hand, Laugh, Flame, MessageSquare, Share2, Trash2 } from 'lucide-react';
import { AwardPost, ReactionKey } from '../types/award';
import { PosterVisualHeader } from './PosterVisualHeader';

interface AwardPosterCardProps {
  post: AwardPost;
  userReactions: Partial<Record<ReactionKey, boolean>>;
  onToggleReaction: (postId: string, key: ReactionKey) => void;
  onOpenShare: (post: AwardPost) => void;
  onDeleteCustom?: (postId: string) => void;
}

const REACTION_META: { key: ReactionKey; label: string; Icon: typeof Hand }[] = [
  { key: 'clap', label: '拍手', Icon: Hand },
  { key: 'laugh', label: '笑翻', Icon: Laugh },
  { key: 'real', label: '太真實', Icon: Flame },
];

export function AwardPosterCard({
  post,
  userReactions,
  onToggleReaction,
  onOpenShare,
  onDeleteCustom,
}: AwardPosterCardProps) {
  return (
    <article className="flex flex-col justify-between overflow-hidden rounded-2xl border-[1.5px] border-[#141413] bg-white shadow-[5px_5px_0px_#141413] transition-transform duration-150 hover:-translate-y-0.5">
      <div>
        <PosterVisualHeader
          serialNo={post.serialNo}
          category={post.category}
          createdAt={post.createdAt}
          awardTitle={post.awardTitle}
          recipient={post.recipient}
          advisor={post.advisor}
          rank={post.rank}
          posterTheme={post.posterTheme}
          artworkId={post.artworkId}
          customPhoto={post.customPhoto}
        />

        {/* Editorial Body Content */}
        <div className="space-y-4 p-5">
          {post.advisor && (
            <div className="flex items-center gap-2 text-xs font-semibold text-[#57534E]">
              <span>指導老師：{post.advisor}</span>
            </div>
          )}

          <div>
            <p className="text-xs font-bold text-[#57534E]">獲獎關鍵事蹟</p>
            <p className="mt-1 text-sm leading-relaxed text-[#141413]">
              {post.achievementSummary}
            </p>
          </div>

          <div className="rounded-xl border border-[#141413]/15 bg-[#F9F8F4] p-4">
            <p className="text-xs font-bold text-[#57534E]">幽默得獎感言</p>
            <p className="mt-1.5 text-sm leading-relaxed text-[#141413]">
              「{post.acceptanceSpeech}」
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#57534E]">
            <span>頒獎：{post.issuer}</span>
            {post.hashtags.length > 0 && (
              <span className="font-medium text-[#2563EB] truncate max-w-full">
                {post.hashtags.join(' ')}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Footer Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t-[1.5px] border-[#141413]/15 bg-[#F9F8F4] px-5 py-3.5">
        <div className="flex flex-wrap items-center gap-2">
          {REACTION_META.map(({ key, label, Icon }) => {
            const isActive = Boolean(userReactions[key]);
            return (
              <button
                key={key}
                type="button"
                onClick={() => onToggleReaction(post.id, key)}
                aria-pressed={isActive}
                className={`cursor-pointer inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-bold transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] ${
                  isActive
                    ? 'border-[#141413] bg-[#FACC15] text-[#141413]'
                    : 'border-[#141413]/20 bg-white text-[#57534E] hover:border-[#141413] hover:text-[#141413]'
                }`}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{label}</span>
                <span className="font-mono-num">{post.reactions[key]}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          {post.isCustom && onDeleteCustom && (
            <button
              type="button"
              onClick={() => onDeleteCustom(post.id)}
              aria-label="刪除自訂貼文"
              className="cursor-pointer inline-flex items-center justify-center rounded-lg border border-[#141413]/20 bg-white p-2 text-[#57534E] transition-colors hover:border-[#DC2626] hover:text-[#DC2626] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DC2626]"
            >
              <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          )}
          <button
            type="button"
            onClick={() => onOpenShare(post)}
            className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg border-[1.5px] border-[#141413] bg-white px-3 py-1.5 text-xs font-bold text-[#141413] transition-colors duration-150 hover:bg-[#141413] hover:text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
          >
            <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="font-mono-num">{post.comments.length}</span>
            <span aria-hidden="true">·</span>
            <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
            <span>留言與分享</span>
          </button>
        </div>
      </div>
    </article>
  );
}
