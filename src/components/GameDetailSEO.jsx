import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import SEOHelmet from './SEOHelmet';

/**
 * 游戏详情页专用SEO组件，包含游戏的结构化数据
 * 
 * @param {Object} props
 * @param {Object} props.game - 游戏对象
 */
const GameDetailSEO = ({ game }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const currentLanguage = i18n.language;
  
  if (!game) return null;
  
  // 获取当前语言的游戏标题和描述，如果没有则使用默认语言
  const gameTitle = game.title[currentLanguage] || game.title['en'] || '';
  const gameDescription = game.description[currentLanguage] || game.description['en'] || '';
  
  // 获取当前语言的游戏标签，如果没有则使用默认语言
  const gameTags = game.tags && (game.tags[currentLanguage] || game.tags['en'] || []);
  
  // 构建替代语言URL
  const supportedLanguages = ['en', 'zh-CN', 'es', 'fr', 'de', 'ru', 'ja'];
  const baseUrl = 'https://cozygame.fun';
  const pathWithoutLang = location.pathname.replace(new RegExp(`^/${currentLanguage}`), '');
  
  const alternateUrls = supportedLanguages.reduce((acc, lang) => {
    acc[lang] = `${baseUrl}/${lang}${pathWithoutLang}`;
    return acc;
  }, {});
  
  // 构建游戏关键词
  const keywords = [
    gameTitle,
    ...gameTags || [],
    t('keyword_online_game', { defaultValue: 'online game' }),
    t('keyword_free_game', { defaultValue: 'free game' }),
    t('keyword_browser_game', { defaultValue: 'browser game' }),
    game.vip ? t('keyword_vip_game', { defaultValue: 'vip game' }) : '',
    t('keyword_play_online', { defaultValue: 'play online' })
  ].filter(Boolean);
  
  // 构建结构化数据 - VideoGame
  const gameStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": gameTitle,
    "description": gameDescription,
    "url": `${baseUrl}${location.pathname}`,
    "image": game.thumbnailUrl.startsWith('http') 
      ? game.thumbnailUrl 
      : `${baseUrl}${game.thumbnailUrl}`,
    "inLanguage": currentLanguage,
    "applicationCategory": "Game",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  };
  
  // 如果有标签，添加到结构化数据中
  if (gameTags && gameTags.length > 0) {
    gameStructuredData.genre = gameTags;
  }
  
  // 如果是VIP游戏，添加特殊标记
  if (game.vip) {
    gameStructuredData.specialFeatures = ["VIP Game", "Premium Content"];
  }
  
  // 构建页面标题和描述
  const pageTitle = t('game_detail_page_title', { gameTitle });
  const pageDescription = gameDescription.length > 160 
    ? `${gameDescription.substring(0, 157)}...` 
    : gameDescription;

  return (
    <SEOHelmet
      title={pageTitle}
      description={pageDescription}
      type="product"
      keywords={keywords}
      structuredData={gameStructuredData}
      alternateUrls={alternateUrls}
      image={game.thumbnailUrl.startsWith('http') 
        ? game.thumbnailUrl 
        : `${baseUrl}${game.thumbnailUrl}`}
    />
  );
};

export default GameDetailSEO; 