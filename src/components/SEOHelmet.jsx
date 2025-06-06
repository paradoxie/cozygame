import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

/**
 * SEO优化组件，用于设置页面的元数据和结构化数据
 * 
 * @param {Object} props
 * @param {string} props.title - 页面标题
 * @param {string} props.description - 页面描述
 * @param {string} props.type - 页面类型，如'website'、'article'、'game'等
 * @param {string} props.image - 页面分享图片URL（可选）
 * @param {Object} props.structuredData - 结构化数据对象（可选）
 * @param {Object} props.alternateUrls - 替代语言URL对象，格式为{lang: url}（可选）
 * @param {Array} props.keywords - 页面关键词数组（可选）
 * @param {boolean} props.noindex - 是否禁止索引（可选，默认false）
 */
const SEOHelmet = ({ 
  title, 
  description, 
  type = 'website', 
  image,
  structuredData,
  alternateUrls,
  keywords,
  noindex = false
}) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const currentLanguage = i18n.language;
  
  // 构建完整标题，包含网站名称
  const fullTitle = `${title} | ${t('site_name')}`;
  
  // 构建规范URL
  const baseUrl = 'https://cozygame.fun';
  const currentUrl = `${baseUrl}${location.pathname}`;
  
  // 构建Open Graph和Twitter卡片的图片URL
  const ogImage = image || `${baseUrl}/og-image.jpg`; // 默认OG图片
  
  // 获取当前语言的网站名称
  const siteName = t('site_name');
  
  // 构建关键词字符串
  const keywordsString = keywords ? keywords.join(', ') : 'cozy games, online games, free games, relaxing games, fun games';

  return (
    <Helmet>
      {/* 基本元标签 */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywordsString} />}
      <meta name="language" content={currentLanguage} />
      <meta property="og:locale" content={currentLanguage} />
      
      {/* 规范链接 */}
      <link rel="canonical" href={currentUrl} />
      
      {/* 替代语言链接 */}
      {alternateUrls && Object.entries(alternateUrls).map(([lang, url]) => (
        <link 
          key={lang} 
          rel="alternate" 
          hrefLang={lang} 
          href={url} 
        />
      ))}
      {/* x-default 链接 */}
      {alternateUrls && alternateUrls['en'] && (
        <link 
          rel="alternate" 
          hrefLang="x-default" 
          href={alternateUrls['en']} 
        />
      )}
      
      {/* Open Graph 标签 */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={title} />
      
      {/* Twitter 卡片 */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* 移动端优化 */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#3B82F6" />
      
      {/* 禁止索引（如果需要） */}
      {noindex && (
        <meta name="robots" content="noindex, nofollow" />
      )}
      
      {/* 结构化数据 */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHelmet; 