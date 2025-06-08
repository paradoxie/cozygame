import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useGameData } from '../hooks/useGameData';
import { useUserPreferences } from '../hooks/useUserPreferences';
import { currentSupportedLngs, defaultLng } from '../i18n-config';
import GamePlayer from '../components/GamePlayer';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import BookmarkPrompt from '../components/BookmarkPrompt';
import CrownIcon from '../assets/icons/crown.svg';
import ArrowLeftIcon from '../assets/icons/arrow-left.svg';
import GamepadIcon from '../assets/icons/gamepad.svg';

const GameDetailPage = () => {
  const { gameId } = useParams();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { games, loading, error, getGameById } = useGameData();
  const { addRecentlyPlayed } = useUserPreferences();
  
  const game = getGameById(gameId);
  const currentLang = i18n.language;
  
  useEffect(() => {
    // 如果游戏不存在且数据已加载完成，则重定向到首页
    if (!loading && !error && games.length > 0 && !game) {
      navigate(`/${currentLang}`);
    }
  }, [game, games, loading, error, navigate, currentLang]);
  
  const handleGameLoad = (id) => {
    addRecentlyPlayed(id);
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <img src="https://i.imgur.com/87O7k5o.gif" alt="Loading" className="animate-spin h-10 w-10 mx-auto mb-4" />
        </div>
      </div>
    );
  }
  
  if (error || !game) {
    return (
      <div className="text-center py-12">
        <p className="text-error-red mb-4">{t('game_not_found')}</p>
        <Link 
          to={`/${currentLang}`}
          className="btn btn-primary"
        >
          {t('back_button')}
        </Link>
      </div>
    );
  }
  
  const title = game.title[currentLang] || game.title.en;
  const description = game.description[currentLang] || game.description.en;
  const tags = game.tags && game.tags[currentLang] ? game.tags[currentLang] : (game.tags.en || []);
  
  // 构建结构化数据
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": title,
    "description": description,
    "inLanguage": currentLang,
    "image": game.thumbnailUrl,
    "keywords": tags ? tags.join(", ") : "",
    "gamePlatform": "Web Browser",
    "applicationCategory": "Game",
    "genre": tags ? tags.slice(0, 3).join(", ") : "",
    "url": typeof window !== 'undefined' ? window.location.href : `https://cozygame.fun/${currentLang}/game/${gameId}`,
    "isPartOf": {
      "@type": "WebSite",
      "@id": "https://cozygame.fun/#website"
    },
    "potentialAction": {
      "@type": "PlayAction",
      "target": typeof window !== 'undefined' ? window.location.href : `https://cozygame.fun/${currentLang}/game/${gameId}`
    }
  };

  if (game.vip) {
    structuredData.additionalProperty = {
      "@type": "PropertyValue",
      "name": "VIP",
      "value": "true"
    };
  }

  // 构建 hreflang 链接
  const hreflangLinks = currentSupportedLngs.map(lang => ({
    rel: 'alternate',
    hrefLang: lang,
    href: `https://cozygame.fun/${lang}/game/${gameId}`
  }));
  
  // 添加默认语言链接
  hreflangLinks.push({
    rel: 'alternate',
    hrefLang: 'x-default',
    href: `https://cozygame.fun/${defaultLng}/game/${gameId}`
  });

  const metaDescription = description && description.length > 160 
    ? description.substring(0, 157) + '...' 
    : description || '';
  
  return (
    <>
      <Helmet>
        {/* 基础SEO元数据 */}
        <title>{t('game_detail_page_title', { gameTitle: title, siteName: t('site_name') })}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={tags ? tags.join(', ') : ''} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://cozygame.fun/${currentLang}/game/${gameId}`} />
        
        {/* Open Graph 元数据 */}
        <meta property="og:title" content={`${title} - ${t('site_name')}`} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={game.thumbnailUrl} />
        <meta property="og:url" content={`https://cozygame.fun/${currentLang}/game/${gameId}`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={t('site_name')} />
        <meta property="og:locale" content={currentLang} />
        
        {/* Twitter Card 元数据 */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${title} - ${t('site_name')}`} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={game.thumbnailUrl} />
        
        {/* Hreflang 链接 */}
        {hreflangLinks.map((link, index) => (
          <link
            key={index}
            rel={link.rel}
            hrefLang={link.hrefLang}
            href={link.href}
          />
        ))}
        
        {/* 预加载关键资源 */}
        <link rel="preload" href={game.thumbnailUrl} as="image" />
        
        {/* JSON-LD 结构化数据 */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        {/* 返回按钮 */}
        <div className="mb-6">
          <Link 
            to={`/${currentLang}`}
            className="inline-flex items-center text-neutral-medium hover:text-primary-blue transition-colors"
          >
            <img src={ArrowLeftIcon} alt="" className="w-5 h-5 mr-2" aria-hidden="true" />
            {t('back_button')}
          </Link>
        </div>
        
        {/* 游戏信息 */}
        <div className="flex items-center mb-6">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold flex items-center">
              {title}
              {game.vip && (
                <img src={CrownIcon} alt="VIP" className="w-6 h-6 ml-2 inline-block" />
              )}
            </h1>
            <div className="flex flex-wrap items-center mt-2 text-sm text-neutral-medium">
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-neutral-lightest dark:bg-neutral-medium/20 rounded-md text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="hidden md:flex space-x-3">
            <FavoriteButton gameId={game.id} size="lg" />
            <ShareButton gameId={game.id} />
          </div>
        </div>
        
        {/* 游戏描述 */}
        <p className="text-neutral-medium mb-6">{description}</p>
        
        {/* 游戏嵌入 */}
        <div className="relative bg-neutral-lightest dark:bg-neutral-dark rounded-lg overflow-hidden shadow-md mb-8">
          <div className="absolute top-4 left-4 z-10 flex items-center bg-black/50 text-white px-3 py-1 rounded-full">
            <img src={GamepadIcon} alt="" className="w-4 h-4 mr-1" aria-hidden="true" />
            <span className="text-sm font-medium">{t('playing_now')}</span>
          </div>
          <GamePlayer 
            iframeUrl={game.iframeUrl} 
            title={title}
            onLoad={() => handleGameLoad(game.id)}
          />
        </div>
        
        {/* 移动端操作按钮 */}
        <div className="flex md:hidden space-x-4 mb-6">
          <FavoriteButton gameId={game.id} size="lg" />
          <ShareButton gameId={game.id} />
        </div>
        
        {/* 书签提示 */}
        <BookmarkPrompt />
      </div>
    </>
  );
};

export default GameDetailPage; 