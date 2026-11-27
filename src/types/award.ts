export type AwardCategory = '職場求生' | '生活奇蹟' | '友情封神' | '專業光環';

export type PosterThemeId =
  | 'cobalt-lime'
  | 'tangerine-cream'
  | 'sunflower-ink'
  | 'berry-mint';

export type ArtworkId =
  | 'hero'
  | 'coffee'
  | 'snack'
  | 'friendship'
  | 'typographic';

export type ReactionKey = 'clap' | 'laugh' | 'real';

export interface PosterTheme {
  id: PosterThemeId;
  name: string;
  bgHex: string;
  accentHex: string;
  textHex: string;
  accentTextHex: string;
  subTextHex: string;
  badgeBgHex: string;
}

export interface AwardComment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface AwardPost {
  id: string;
  serialNo: string;
  awardTitle: string;
  issuer: string;
  recipient: string;
  advisor?: string;
  rank?: string;
  category: AwardCategory;
  achievementSummary: string;
  acceptanceSpeech: string;
  posterTheme: PosterThemeId;
  artworkId: ArtworkId;
  customPhoto?: string;
  hashtags: string[];
  createdAt: string;
  reactions: Record<ReactionKey, number>;
  comments: AwardComment[];
  isCustom?: boolean;
}

export interface WitInspiration {
  awardTitle: string;
  issuer: string;
  recipient: string;
  advisor?: string;
  rank?: string;
  category: AwardCategory;
  achievementSummary: string;
  acceptanceSpeech: string;
  posterTheme: PosterThemeId;
  artworkId: ArtworkId;
  hashtags: string[];
}
