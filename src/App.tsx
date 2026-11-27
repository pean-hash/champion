import { useEffect, useMemo, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { AwardComposerModal } from './components/AwardComposerModal';
import { AwardPosterCard } from './components/AwardPosterCard';
import { HeroShowcase } from './components/HeroShowcase';
import { ShareDetailModal } from './components/ShareDetailModal';
import { Toast } from './components/Toast';
import { TopBar } from './components/TopBar';
import { WitInspirationSection } from './components/WitInspirationSection';
import { CATEGORIES, INITIAL_AWARDS } from './data/initialAwards';
import {
  AwardCategory,
  AwardPost,
  ReactionKey,
  WitInspiration,
} from './types/award';
import { decodeSharePayload } from './utils/posterExport';

const STORAGE_KEY = 'award_wall_posts_v1';
const REACTIONS_KEY = 'award_wall_reactions_v1';

type FilterTab = '全部' | AwardCategory | '我的創作';
type SortMode = 'newest' | 'popular';

export default function App() {
  const [posts, setPosts] = useState<AwardPost[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as AwardPost[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback to initial posts
    }
    return INITIAL_AWARDS;
  });

  const [userReactions, setUserReactions] = useState<
    Record<string, Partial<Record<ReactionKey, boolean>>>
  >(() => {
    try {
      const saved = localStorage.getItem(REACTIONS_KEY);
      if (saved) {
        return JSON.parse(saved) as Record<
          string,
          Partial<Record<ReactionKey, boolean>>
        >;
      }
    } catch {
      // Ignore storage read errors
    }
    return {};
  });

  const [activeFilter, setActiveFilter] = useState<FilterTab>('全部');
  const [sortMode, setSortMode] = useState<SortMode>('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [composerPreset, setComposerPreset] = useState<WitInspiration | null>(null);
  const [activeSharePostId, setActiveSharePostId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync URL ?award=... shared post on initial load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedEncoded = params.get('award');
    if (!sharedEncoded) return;

    const decoded = decodeSharePayload(sharedEncoded);
    if (!decoded || !decoded.awardTitle || !decoded.recipient) return;

    const sharedAwardTitle = decoded.awardTitle;
    const sharedRecipient = decoded.recipient;
    const sharedId = `shared-${decoded.serialNo ?? 'post'}-${sharedAwardTitle.slice(0, 8)}`;
    setPosts((prev) => {
      const existing = prev.find(
        (p) =>
          p.awardTitle === sharedAwardTitle && p.recipient === sharedRecipient
      );
      if (existing) {
        setActiveSharePostId(existing.id);
        return prev;
      }
      const hydrated: AwardPost = {
        id: sharedId,
        serialNo: decoded.serialNo ?? 'NO. 099',
        awardTitle: sharedAwardTitle,
        issuer: decoded.issuer ?? '友達分享頒獎委員會',
        recipient: sharedRecipient,
        category: decoded.category ?? '生活奇蹟',
        achievementSummary:
          decoded.achievementSummary ?? '透過專屬連結分享的幽默獲獎紀錄。',
        acceptanceSpeech:
          decoded.acceptanceSpeech ?? '感謝大家點開連結來幫我鼓掌！',
        posterTheme: decoded.posterTheme ?? 'cobalt-lime',
        artworkId: decoded.artworkId ?? 'hero',
        hashtags: decoded.hashtags ?? ['#獎不完公社'],
        createdAt: decoded.createdAt ?? '2026.11',
        reactions: { clap: 12, laugh: 8, real: 15 },
        comments: [],
        isCustom: true,
      };
      setActiveSharePostId(hydrated.id);
      return [hydrated, ...prev];
    });
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    } catch {
      // Ignore quota errors
    }
  }, [posts]);

  useEffect(() => {
    try {
      localStorage.setItem(REACTIONS_KEY, JSON.stringify(userReactions));
    } catch {
      // Ignore quota errors
    }
  }, [userReactions]);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(null), 2800);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const nextSerialNo = useMemo(() => {
    const num = 42 + posts.filter((p) => p.isCustom).length + 1;
    return `NO. ${String(num).padStart(3, '0')}`;
  }, [posts]);

  const totalReactions = useMemo(
    () =>
      posts.reduce(
        (sum, p) => sum + p.reactions.clap + p.reactions.laugh + p.reactions.real,
        0
      ),
    [posts]
  );

  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const list = posts.filter((post) => {
      if (activeFilter === '我的創作' && !post.isCustom) return false;
      if (
        activeFilter !== '全部' &&
        activeFilter !== '我的創作' &&
        post.category !== activeFilter
      ) {
        return false;
      }
      if (!query) return true;
      return (
        post.awardTitle.toLowerCase().includes(query) ||
        post.recipient.toLowerCase().includes(query) ||
        post.issuer.toLowerCase().includes(query) ||
        post.acceptanceSpeech.toLowerCase().includes(query) ||
        post.achievementSummary.toLowerCase().includes(query)
      );
    });

    if (sortMode === 'popular') {
      return [...list].sort((a, b) => {
        const totalA = a.reactions.clap + a.reactions.laugh + a.reactions.real;
        const totalB = b.reactions.clap + b.reactions.laugh + b.reactions.real;
        return totalB - totalA;
      });
    }
    return list;
  }, [posts, activeFilter, searchQuery, sortMode]);

  const activeSharePost = useMemo(
    () => posts.find((p) => p.id === activeSharePostId) ?? null,
    [posts, activeSharePostId]
  );

  const handleToggleReaction = (postId: string, key: ReactionKey) => {
    const currentlyActive = Boolean(userReactions[postId]?.[key]);

    setUserReactions((prev) => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        [key]: !currentlyActive,
      },
    }));

    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        const delta = currentlyActive ? -1 : 1;
        return {
          ...post,
          reactions: {
            ...post.reactions,
            [key]: Math.max(0, post.reactions[key] + delta),
          },
        };
      })
    );
  };

  const handlePublishPost = (newPost: AwardPost) => {
    setPosts((prev) => [newPost, ...prev]);
    setIsComposerOpen(false);
    setComposerPreset(null);
    setActiveFilter('全部');
    setSortMode('newest');
    setActiveSharePostId(newPost.id);
    showToast('新獎項已正式頒發！可直接下載海報或複製貼文分享');
  };

  const handleAddComment = (postId: string, author: string, content: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: `comment-${Date.now()}`,
              author,
              content,
              createdAt: '剛剛',
            },
          ],
        };
      })
    );
  };

  const handleDeleteCustom = (postId: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    if (activeSharePostId === postId) {
      setActiveSharePostId(null);
    }
    showToast('已刪除該則自訂獲獎貼文');
  };

  const handleUseInspiration = (inspiration: WitInspiration) => {
    setComposerPreset(inspiration);
    setIsComposerOpen(true);
  };

  const handleOpenBlankComposer = () => {
    setComposerPreset(null);
    setIsComposerOpen(true);
  };

  const filterTabs: FilterTab[] = ['全部', ...CATEGORIES, '我的創作'];

  return (
    <div className="min-h-screen bg-[#F9F8F4] text-[#141413]">
      <TopBar onOpenComposer={handleOpenBlankComposer} />

      <main>
        <HeroShowcase
          totalPosts={posts.length}
          totalReactions={totalReactions}
          onOpenComposer={handleOpenBlankComposer}
        />

        {/* Interactive Award Feed Wall */}
        <section id="award-wall" className="mx-auto max-w-[1200px] px-6 py-14">
          <div className="flex flex-col justify-between gap-6 border-b-[1.5px] border-[#141413]/15 pb-6 lg:flex-row lg:items-end">
            <div>
              <p className="font-mono-num text-xs font-bold text-[#57534E]">
                AWARD FEED · 互動式獲獎動態牆
              </p>
              <h2 className="font-display mt-1 text-2xl font-extrabold tracking-tight text-[#141413] sm:text-3xl">
                最新得獎紀錄與幽默感言牆
              </h2>
            </div>

            {/* Search & Sort Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 sm:flex-initial">
                <Search
                  className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#57534E]"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜尋獎項、得主或關鍵字..."
                  aria-label="搜尋獲獎貼文"
                  className="w-full rounded-xl border-[1.5px] border-[#141413] bg-white py-2 pr-3 pl-9 text-sm text-[#141413] sm:w-64 focus:outline-2 focus:outline-[#2563EB]"
                />
              </div>

              <select
                aria-label="貼文排序方式"
                value={sortMode}
                onChange={(e) => setSortMode(e.target.value as SortMode)}
                className="cursor-pointer rounded-xl border-[1.5px] border-[#141413] bg-white px-3.5 py-2 text-sm font-bold text-[#141413] focus:outline-2 focus:outline-[#2563EB]"
              >
                <option value="newest">最新頒發</option>
                <option value="popular">最多爆笑拍手</option>
              </select>
            </div>
          </div>

          {/* Segmented Category Filter Tabs */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div
              role="tablist"
              aria-label="獲獎分類篩選"
              className="flex flex-wrap items-center gap-2"
            >
              {filterTabs.map((tab) => {
                const isActive = activeFilter === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveFilter(tab)}
                    className={`cursor-pointer rounded-lg border-[1.5px] px-3.5 py-2 text-xs font-bold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] ${
                      isActive
                        ? 'border-[#141413] bg-[#141413] text-white'
                        : 'border-[#141413]/20 bg-white text-[#57534E] hover:border-[#141413] hover:text-[#141413]'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleOpenBlankComposer}
              className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg border-[1.5px] border-[#141413] bg-[#BEF264] px-3.5 py-2 text-xs font-bold text-[#141413] transition-colors hover:bg-[#a3e635] whitespace-nowrap shrink-0"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              <span>我也要頒獎</span>
            </button>
          </div>

          {/* Poster Wall Grid */}
          {filteredPosts.length === 0 ? (
            <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border-[1.5px] border-dashed border-[#141413]/35 bg-white px-6 py-16 text-center">
              <p className="font-display text-xl font-extrabold text-[#141413]">
                目前這個分類還沒有得獎貼文
              </p>
              <p className="mt-2 max-w-md text-sm text-[#57534E]">
                {activeFilter === '我的創作'
                  ? '你還沒有發佈過自己的專屬獎項，現在就花 30 秒頒發人生第一座荒謬大獎吧！'
                  : '試著清除搜尋關鍵字，或是親自為這個分類頒發第一張潮流海報。'}
              </p>
              <button
                type="button"
                onClick={handleOpenBlankComposer}
                className="cursor-pointer mt-6 rounded-xl border-[1.5px] border-[#141413] bg-[#FF6B35] px-5 py-2.5 text-sm font-bold text-[#141413] shadow-[3px_3px_0px_#141413]"
              >
                立即建立專屬獲獎貼文
              </button>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-7 lg:grid-cols-2">
              {filteredPosts.map((post) => (
                <AwardPosterCard
                  key={post.id}
                  post={post}
                  userReactions={userReactions[post.id] ?? {}}
                  onToggleReaction={handleToggleReaction}
                  onOpenShare={(selected) => setActiveSharePostId(selected.id)}
                  onDeleteCustom={handleDeleteCustom}
                />
              ))}
            </div>
          )}
        </section>

        <WitInspirationSection onUseInspiration={handleUseInspiration} />
      </main>

      {/* Clean Editorial Footer */}
      <footer className="border-t-[1.5px] border-[#141413] bg-[#141413] py-10 text-[#F9F8F4]">
        <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-6 px-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-lg font-extrabold">獎不完公社</p>
            <p className="mt-1 text-xs text-[#A8A29E]">
              獻給每個值得幽默紀念的生活片刻 · 本地自動保存創作資料
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-xs font-semibold text-[#D6D3D1]">
            <a href="#award-wall" className="hover:text-white transition-colors">
              回到動態牆
            </a>
            <a href="#wit-inspirations" className="hover:text-white transition-colors">
              幽默靈感庫
            </a>
            <button
              type="button"
              onClick={handleOpenBlankComposer}
              className="cursor-pointer text-[#BEF264] hover:underline"
            >
              立即頒發新獎項
            </button>
          </div>
        </div>
      </footer>

      <AwardComposerModal
        isOpen={isComposerOpen}
        nextSerialNo={nextSerialNo}
        preset={composerPreset}
        onClose={() => {
          setIsComposerOpen(false);
          setComposerPreset(null);
        }}
        onPublish={handlePublishPost}
      />

      <ShareDetailModal
        post={activeSharePost}
        userReactions={activeSharePost ? userReactions[activeSharePost.id] ?? {} : {}}
        onClose={() => setActiveSharePostId(null)}
        onToggleReaction={handleToggleReaction}
        onAddComment={handleAddComment}
        onNotify={showToast}
      />

      <Toast message={toastMessage} />
    </div>
  );
}
