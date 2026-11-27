import { POSTER_THEMES } from '../data/initialAwards';
import { AwardPost } from '../types/award';

export function formatSocialCaption(post: AwardPost): string {
  const advisorStr = post.advisor ? `\n指導老師：${post.advisor}` : '';
  const rankStr = post.rank ? `\n得獎名次：${post.rank}` : '';
  const tags = post.hashtags.length > 0 ? `\n\n${post.hashtags.join(' ')}` : '';
  return `🏆 【最新獲獎紀錄公告｜${post.serialNo}】\n得獎項目：${post.awardTitle}\n得獎者：${post.recipient}${advisorStr}${rankStr}\n頒獎單位：${post.issuer}\n\n✨ 獲獎事蹟：\n${post.achievementSummary}\n\n🎤 幽默得獎感言：\n「${post.acceptanceSpeech}」${tags}\n\n— 發佈於 獎不完公社`;
}

export function encodeSharePayload(post: AwardPost): string {
  try {
    const json = JSON.stringify({
      serialNo: post.serialNo,
      awardTitle: post.awardTitle,
      issuer: post.issuer,
      recipient: post.recipient,
      advisor: post.advisor,
      rank: post.rank,
      category: post.category,
      achievementSummary: post.achievementSummary,
      acceptanceSpeech: post.acceptanceSpeech,
      posterTheme: post.posterTheme,
      artworkId: post.artworkId,
      customPhoto: post.customPhoto,
      hashtags: post.hashtags,
      createdAt: post.createdAt,
    });
    const bytes = new TextEncoder().encode(json);
    let binary = '';
    for (let i = 0; i < bytes.length; i += 1) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  } catch {
    return '';
  }
}

export function decodeSharePayload(encoded: string): Partial<AwardPost> | null {
  try {
    const normalized = encoded.replace(/-/g, '+').replace(/_/g, '/');
    const pad = normalized.length % 4 === 0 ? '' : '='.repeat(4 - (normalized.length % 4));
    const binary = atob(normalized + pad);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) {
      bytes[i] = binary.charCodeAt(i);
    }
    const json = new TextDecoder().decode(bytes);
    const parsed = JSON.parse(json) as Partial<AwardPost>;
    if (!parsed.awardTitle || !parsed.recipient) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function wrapCanvasText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const lines: string[] = [];
  const paragraphs = text.split('\n');

  for (const para of paragraphs) {
    if (!para) {
      lines.push('');
      continue;
    }
    let currentLine = '';
    for (const char of para) {
      const testLine = currentLine + char;
      if (ctx.measureText(testLine).width > maxWidth && currentLine.length > 0) {
        lines.push(currentLine);
        currentLine = char;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      lines.push(currentLine);
    }
  }
  return lines;
}

export async function downloadPosterPng(post: AwardPost): Promise<void> {
  const width = 1080;
  const height = 1350;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('無法建立畫布繪圖環境');
  }

  const theme = POSTER_THEMES[post.posterTheme] ?? POSTER_THEMES['cobalt-lime'];

  // Outer warm cream paper frame
  ctx.fillStyle = '#F9F8F4';
  ctx.fillRect(0, 0, width, height);

  const margin = 48;
  const cardW = width - margin * 2;
  const cardH = height - margin * 2;

  // Offset shadow
  ctx.fillStyle = '#141413';
  ctx.fillRect(margin + 14, margin + 14, cardW, cardH);

  // Main poster background
  ctx.fillStyle = theme.bgHex;
  ctx.fillRect(margin, margin, cardW, cardH);

  // Thick ink border
  ctx.strokeStyle = '#141413';
  ctx.lineWidth = 6;
  ctx.strokeRect(margin, margin, cardW, cardH);

  const innerX = margin + 64;
  const contentW = cardW - 128;

  // Top metadata line
  ctx.fillStyle = theme.subTextHex;
  ctx.font = '700 24px "JetBrains Mono", "Noto Sans TC", monospace';
  const rankTag = post.rank ? ` · 名次：${post.rank}` : '';
  ctx.fillText(`${post.serialNo}  ·  ${post.category}${rankTag}`, innerX, margin + 80);

  // Accent block top right
  ctx.fillStyle = theme.accentHex;
  ctx.fillRect(margin + cardW - 220, margin + 42, 156, 50);
  ctx.strokeStyle = '#141413';
  ctx.lineWidth = 4;
  ctx.strokeRect(margin + cardW - 220, margin + 42, 156, 50);

  ctx.fillStyle = theme.accentTextHex;
  ctx.font = '700 20px "Noto Sans TC", sans-serif';
  ctx.fillText('官方認證幽默', margin + cardW - 208, margin + 76);

  // Divider
  ctx.strokeStyle = theme.textHex;
  ctx.globalAlpha = 0.28;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(innerX, margin + 116);
  ctx.lineTo(innerX + contentW, margin + 116);
  ctx.stroke();
  ctx.globalAlpha = 1;

  // Award Title
  ctx.fillStyle = theme.textHex;
  ctx.font = '900 62px "Outfit", "Noto Sans TC", sans-serif';
  const titleLines = wrapCanvasText(ctx, post.awardTitle, contentW).slice(0, 2);
  let cursorY = margin + 196;
  for (const line of titleLines) {
    ctx.fillText(line, innerX, cursorY);
    cursorY += 76;
  }

  // Recipient & Advisor Block
  cursorY += 8;
  const infoBoxH = 110;
  ctx.fillStyle = theme.accentHex;
  ctx.fillRect(innerX, cursorY, contentW, infoBoxH);
  ctx.strokeStyle = '#141413';
  ctx.lineWidth = 5;
  ctx.strokeRect(innerX, cursorY, contentW, infoBoxH);

  ctx.fillStyle = theme.accentTextHex;
  ctx.font = '700 18px "Noto Sans TC", sans-serif';
  ctx.fillText('榮譽得主', innerX + 24, cursorY + 32);
  ctx.font = '900 32px "Noto Sans TC", sans-serif';
  const recipientAdvisorText = post.advisor
    ? `${post.recipient}  (指導老師：${post.advisor})`
    : post.recipient;
  const infoLine = wrapCanvasText(ctx, recipientAdvisorText, contentW - 48)[0] || recipientAdvisorText;
  ctx.fillText(infoLine, innerX + 24, cursorY + 78);

  cursorY += infoBoxH + 42;

  // Achievement Summary
  ctx.fillStyle = theme.subTextHex;
  ctx.font = '700 22px "Noto Sans TC", sans-serif';
  ctx.fillText('獲獎關鍵事蹟', innerX, cursorY);
  cursorY += 38;

  ctx.fillStyle = theme.textHex;
  ctx.font = '500 26px "Noto Sans TC", sans-serif';
  const summaryLines = wrapCanvasText(ctx, post.achievementSummary, contentW).slice(0, 3);
  for (const line of summaryLines) {
    ctx.fillText(line, innerX, cursorY);
    cursorY += 36;
  }

  cursorY += 24;

  // Speech Quote Box
  const quoteBoxH = 280;
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(innerX, cursorY, contentW, quoteBoxH);
  ctx.strokeStyle = '#141413';
  ctx.lineWidth = 4;
  ctx.strokeRect(innerX, cursorY, contentW, quoteBoxH);

  ctx.fillStyle = '#57534E';
  ctx.font = '700 20px "Noto Sans TC", sans-serif';
  ctx.fillText('幽默得獎感言', innerX + 28, cursorY + 40);

  ctx.fillStyle = '#141413';
  ctx.font = '500 26px "Noto Sans TC", sans-serif';
  const speechLines = wrapCanvasText(ctx, `「${post.acceptanceSpeech}」`, contentW - 56).slice(0, 5);
  let speechY = cursorY + 88;
  for (const line of speechLines) {
    ctx.fillText(line, innerX + 28, speechY);
    speechY += 36;
  }

  // Footer issuer & branding
  const footerY = margin + cardH - 52;
  ctx.fillStyle = theme.subTextHex;
  ctx.font = '500 22px "Noto Sans TC", sans-serif';
  ctx.fillText(`頒獎機關：${post.issuer}`, innerX, footerY);

  ctx.fillStyle = theme.textHex;
  ctx.font = '800 24px "Outfit", "Noto Sans TC", sans-serif';
  const brandLabel = '獎不完公社';
  const brandWidth = ctx.measureText(brandLabel).width;
  ctx.fillText(brandLabel, innerX + contentW - brandWidth, footerY);

  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = `award-poster-${post.serialNo.replace(/\s+/g, '')}.png`;
  link.href = dataUrl;
  link.click();
}
