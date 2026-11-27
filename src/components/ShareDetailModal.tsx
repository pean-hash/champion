import { useEffect, useState } from 'react';
import {
  Copy,
  Download,
  Flame,
  Hand,
  Laugh,
  Link2,
  Send,
  X,
} from 'lucide-react';
import { AwardPost, ReactionKey } from '../types/award';
import {
  downloadPosterPng,
  encodeSharePayload,
  formatSocialCaption,
} from '../utils/posterExport';
import { PosterVisualHeader } from './PosterVisualHeader';

interface ShareDetailModalProps {
  post: AwardPost | null;
  userReactions: Partial<Record<ReactionKey, boolean>>;
  onClose: () => void;
  onToggleReaction: (postId: string, key: ReactionKey) => void;
  onAddComment: (postId: string, author: string, content: string) => void;
  onNotify: (message: string) => void;
}

export function ShareDetailModal({
  post,
  userReactions,
  onClose,
  onToggleReaction,
  onAddComment,
  onNotify,
}: ShareDetailModalProps) {
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentText, setCommentText] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (!post) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [post, onClose]);

  if (!post) return null;

  const formattedCaption = formatSocialCaption(post);

  const handleCopyCaption = async () => {
    try {
      await navigator.clipboard.writeText(formattedCaption);
      onNotify('已複製幽默社群貼文文案！');
    } catch {
      onNotify('瀏覽器限制剪貼簿，請手動選取下方文案複製');
    }
  };

  const handleCopyShareLink = async () => {
    const encoded = encodeSharePayload(post);
    const shareUrl = `${window.location.origin}${window.location.pathname}?award=${encoded}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      onNotify('已複製專屬獲獎海報分享連結！');
    } catch {
      onNotify('已產生連結，請從網址列複製分享');
    }
  };

  const handleDownloadPoster = async () => {
    setIsDownloading(true);
    try {
      await downloadPosterPng(post);
      onNotify('1080×1350 潮流海報圖卡已開始下載！');
    } catch {
      onNotify('圖卡匯出失敗，請稍後再試');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(
      post.id,
      commentAuthor.trim() || '路過鼓掌的網友',
      commentText.trim()
    );
    setCommentText('');
    onNotify('已送出幽默留言！');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#141413]/75 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
    >
      <div className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border-[1.5px] border-[#141413] bg-[#F9F8F4] shadow-[8px_8px_0px_#141413]">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b-[1.5px] border-[#141413] bg-white px-6 py-4">
          <div>
            <p className="font-mono-num text-xs font-bold text-[#57534E]">
              SHARE PAGE · {post.serialNo}
            </p>
            <h2 id="share-modal-title" className="font-display text-lg font-extrabold text-[#141413]">
              獲獎海報社群分享頁
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="關閉分享視窗"
            className="cursor-pointer rounded-lg border-[1.5px] border-[#141413] bg-white p-2 text-[#141413] hover:bg-[#141413] hover:text-white transition-colors"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 overflow-y-auto lg:grid-cols-12">
          {/* Left: Full Poster & Export Actions */}
          <div className="space-y-4 border-b-[1.5px] border-[#141413] bg-[#EFECE4] p-6 lg:col-span-6 lg:border-r-[1.5px] lg:border-b-0">
            <div className="overflow-hidden rounded-2xl border-[1.5px] border-[#141413] bg-white shadow-[5px_5px_0px_#141413]">
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
              <div className="space-y-4 p-5">
                {post.advisor && (
                  <p className="text-xs font-semibold text-[#57534E]">指導老師：{post.advisor}</p>
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
                  <span>頒獎機關：{post.issuer}</span>
                  <span className="font-semibold text-[#2563EB]">
                    {post.hashtags.join(' ')}
                  </span>
                </div>
              </div>
            </div>

            {/* Export & Share Buttons */}
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <button
                type="button"
                onClick={handleDownloadPoster}
                disabled={isDownloading}
                className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl border-[1.5px] border-[#141413] bg-[#FF6B35] px-4 py-3 text-sm font-bold text-[#141413] shadow-[3px_3px_0px_#141413] transition-transform duration-150 hover:-translate-y-0.5 disabled:opacity-60 whitespace-nowrap"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                <span>{isDownloading ? '產生圖卡中...' : '下載海報 PNG'}</span>
              </button>
              <button
                type="button"
                onClick={handleCopyShareLink}
                className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl border-[1.5px] border-[#141413] bg-white px-4 py-3 text-sm font-bold text-[#141413] shadow-[3px_3px_0px_#141413] transition-transform duration-150 hover:-translate-y-0.5 whitespace-nowrap"
              >
                <Link2 className="h-4 w-4" aria-hidden="true" />
                <span>複製專屬分享連結</span>
              </button>
            </div>
          </div>

          {/* Right: Social Copy + Reactions + Comments */}
          <div className="flex flex-col justify-between gap-6 p-6 lg:col-span-6">
            {/* Reactions */}
            <div className="space-y-5">
              <div>
                <p className="text-xs font-bold text-[#57534E]">現場喝采反應</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {[
                    { key: 'clap' as ReactionKey, label: '拍手爆燈', Icon: Hand },
                    { key: 'laugh' as ReactionKey, label: '笑到並軌', Icon: Laugh },
                    { key: 'real' as ReactionKey, label: '太真實了', Icon: Flame },
                  ].map(({ key, label, Icon }) => {
                    const active = Boolean(userReactions[key]);
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => onToggleReaction(post.id, key)}
                        aria-pressed={active}
                        className={`cursor-pointer inline-flex items-center gap-2 rounded-xl border-[1.5px] px-3.5 py-2 text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                          active
                            ? 'border-[#141413] bg-[#FACC15] text-[#141413]'
                            : 'border-[#141413]/25 bg-white text-[#141413] hover:border-[#141413]'
                        }`}
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                        <span>{label}</span>
                        <span className="font-mono-num">{post.reactions[key]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Ready-to-Post Social Caption Box */}
              <div className="rounded-xl border-[1.5px] border-[#141413] bg-white p-4">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[#141413]">
                    IG / Threads 專用幽默貼文文案
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyCaption}
                    className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg border-[1.5px] border-[#141413] bg-[#BEF264] px-3 py-1.5 text-xs font-bold text-[#141413] hover:bg-[#a3e635] transition-colors whitespace-nowrap shrink-0"
                  >
                    <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>複製全文</span>
                  </button>
                </div>
                <pre className="max-h-44 overflow-y-auto whitespace-pre-wrap rounded-lg bg-[#F9F8F4] p-3 font-sans text-xs leading-relaxed text-[#141413]">
                  {formattedCaption}
                </pre>
              </div>

              {/* Live Comments Thread */}
              <div>
                <p className="text-xs font-bold text-[#57534E]">
                  親友喝采留言板（<span className="font-mono-num">{post.comments.length}</span>）
                </p>
                <div className="mt-2 max-h-48 space-y-2.5 overflow-y-auto pr-1">
                  {post.comments.length === 0 ? (
                    <p className="rounded-xl border border-dashed border-[#141413]/25 bg-white p-4 text-center text-xs text-[#57534E]">
                      還沒有人留言祝賀，搶頭香留下第一句吐槽或恭喜吧！
                    </p>
                  ) : (
                    post.comments.map((c) => (
                      <div
                        key={c.id}
                        className="rounded-xl border border-[#141413]/15 bg-white px-3.5 py-2.5"
                      >
                        <div className="flex items-center justify-between gap-2 text-xs">
                          <span className="font-bold text-[#141413]">{c.author}</span>
                          <span className="text-[#57534E]">{c.createdAt}</span>
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-[#141413]">
                          {c.content}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Add Comment Form */}
            <form
              onSubmit={handleCommentSubmit}
              className="space-y-2 border-t-[1.5px] border-[#141413]/15 pt-4"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={20}
                  value={commentAuthor}
                  onChange={(e) => setCommentAuthor(e.target.value)}
                  placeholder="你的暱稱（選填）"
                  className="w-36 shrink-0 rounded-xl border-[1.5px] border-[#141413] bg-white px-3 py-2 text-xs text-[#141413] focus:outline-2 focus:outline-[#2563EB]"
                />
                <input
                  type="text"
                  maxLength={120}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="留下一句幽默賀詞或吐槽..."
                  className="min-w-0 flex-1 rounded-xl border-[1.5px] border-[#141413] bg-white px-3 py-2 text-xs text-[#141413] focus:outline-2 focus:outline-[#2563EB]"
                />
                <button
                  type="submit"
                  aria-label="送出留言"
                  className="cursor-pointer inline-flex items-center gap-1 rounded-xl border-[1.5px] border-[#141413] bg-[#2563EB] px-4 py-2 text-xs font-bold text-white hover:bg-[#1d4ed8] transition-colors whitespace-nowrap shrink-0"
                >
                  <Send className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>送出</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
