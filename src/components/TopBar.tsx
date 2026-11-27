interface TopBarProps {
  onOpenComposer: () => void;
}

export function TopBar({ onOpenComposer }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 border-b-[1.5px] border-[#141413] bg-[#F9F8F4]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element brand wordmark */}
        <a
          href="#top"
          className="font-display text-xl font-extrabold tracking-tight text-[#141413] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563EB]"
        >
          獎不完公社
        </a>

        {/* Zone 2: 4 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#57534E]">
          <a
            href="#award-wall"
            className="hover:text-[#141413] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            獲獎動態牆
          </a>
          <a
            href="#wit-inspirations"
            className="hover:text-[#141413] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            幽默靈感庫
          </a>
          <a
            href="#poster-craft"
            className="hover:text-[#141413] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            海報規格
          </a>
          <a
            href="#how-to-share"
            className="hover:text-[#141413] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            社群分享
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="shrink-0">
          <button
            type="button"
            onClick={onOpenComposer}
            className="cursor-pointer rounded-lg border-[1.5px] border-[#141413] bg-[#2563EB] px-4 py-2 text-sm font-bold text-white shadow-[3px_3px_0px_#141413] transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141413]"
          >
            頒發新獎項
          </button>
        </div>
      </div>
    </header>
  );
}
