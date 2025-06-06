import React from 'react';
import { useTranslation } from 'react-i18next';
import SEOHelmet from './SEOHelmet';

/**
 * 首页专用SEO组件，包含结构化数据
 */
const HomePageSEO = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  
  // 构建替代语言URL
  const supportedLanguages = ['en', 'zh-CN', 'es', 'fr', 'de', 'ru', 'ja'];
  const baseUrl = 'https://cozygame.fun';
  
  const alternateUrls = supportedLanguages.reduce((acc, lang) => {
    acc[lang] = `${baseUrl}/${lang}`;
    return acc;
  }, {});
  
  // 构建首页关键词
  const keywords = [
    t('keyword_cozy_games', { defaultValue: 'cozy games' }),
    t('keyword_online_games', { defaultValue: 'online games' }),
    t('keyword_free_games', { defaultValue: 'free games' }),
    t('keyword_relaxing_games', { defaultValue: 'relaxing games' }),
    t('keyword_casual_games', { defaultValue: 'casual games' }),
    t('keyword_browser_games', { defaultValue: 'browser games' }),
    t('keyword_no_download_games', { defaultValue: 'no download games' }),
    t('keyword_games_for_everyone', { defaultValue: 'games for everyone' }),
    t('keyword_vip_games', { defaultValue: 'vip games' })
  ];
  
  // 构建结构化数据 - WebSite
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    "url": baseUrl,
    "name": t('site_name'),
    "description": t('home_page_description'),
    "inLanguage": currentLanguage,
    "potentialAction": [
      {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${baseUrl}/${currentLanguage}?search={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    ]
  };
  
  // 构建结构化数据 - Organization
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    "url": baseUrl,
    "name": t('site_name'),
    "logo": {
      "@type": "ImageObject",
      "url": `${baseUrl}/logo.png`,
      "width": 192,
      "height": 192
    }
  };
  
  // 合并结构化数据
  const structuredData = [websiteStructuredData, organizationStructuredData];

  return (
    <SEOHelmet
      title={t('home_page_title')}
      description={t('home_page_description')}
      type="website"
      keywords={keywords}
      structuredData={structuredData}
      alternateUrls={alternateUrls}
      image={`${baseUrl}/images/og-image.jpg`}
    />
  );
};

export default HomePageSEO; 