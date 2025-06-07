import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams, useLocation } from 'react-router-dom';
import GamepadIcon from '../assets/icons/gamepad.svg';

const Footer = () => {
  const { t } = useTranslation();
  const { lang } = useParams();
  const location = useLocation();
  const currentYear = 2025;
  
  // 获取当前网站URL
  const siteUrl = window.location.origin;
  const currentUrl = `${siteUrl}${location.pathname}`;
  
  // 分享到社交媒体的函数
  const shareToSocial = (platform) => {
    const siteName = t('site_name');
    const shareText = t('share_text', { siteName });
    let shareUrl = '';
    
    switch(platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
        break;
      case 'instagram':
        // Instagram不支持直接分享链接，打开Instagram
        shareUrl = 'https://www.instagram.com/';
        break;
      case 'discord':
        // Discord不支持直接分享链接，打开Discord
        shareUrl = 'https://discord.com/';
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  // 热门标签列表
  const popularTags = [
    { id: 'puzzle', name: t('tag_puzzle') },
    { id: 'arcade', name: t('tag_arcade') },
    { id: 'strategy', name: t('tag_strategy') },
    { id: 'adventure', name: t('tag_adventure') },
    { id: 'action', name: t('tag_action') },
    { id: 'casual', name: t('tag_casual') }
  ];

  return (
    <footer className="relative bg-neutral-lightest dark:bg-neutral-dark pt-16 pb-8 border-t border-neutral-light/30 dark:border-neutral-medium/30 overflow-hidden">
      {/* 装饰背景元素 - 增强版 */}
      <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary-blue/10 blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-accent-yellow/10 blur-3xl"></div>
      <div className="absolute top-1/3 left-1/4 w-1 h-20 bg-gradient-to-b from-primary-blue/30 to-transparent"></div>
      <div className="absolute top-1/2 right-1/3 w-1 h-16 bg-gradient-to-b from-accent-yellow/30 to-transparent"></div>
      
      {/* 新增装饰元素 */}
      <div className="absolute top-10 left-[10%] w-8 h-8 rounded-full bg-pink-200/30 dark:bg-pink-500/10 animate-float"></div>
      <div className="absolute bottom-20 right-[15%] w-6 h-6 rounded-full bg-blue-200/30 dark:bg-blue-500/10 animate-pulse-subtle"></div>
      <div className="absolute top-1/4 right-[20%] w-4 h-4 rounded-full bg-amber-200/30 dark:bg-amber-500/10 animate-float" style={{animationDelay: '1s'}}></div>
      
      {/* 游戏元素装饰 */}
      <div className="absolute top-20 right-[30%] opacity-10 dark:opacity-5">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-accent-yellow">
          <path d="M21,6H3C1.9,6,1,6.9,1,8v8c0,1.1,0.9,2,2,2h18c1.1,0,2-0.9,2-2V8C23,6.9,22.1,6,21,6z M11,13H8v3H6v-3H3v-2h3V8h2v3h3V13z M15.5,15 c-0.83,0-1.5-0.67-1.5-1.5c0-0.83,0.67-1.5,1.5-1.5c0.83,0,1.5,0.67,1.5,1.5C17,14.33,16.33,15,15.5,15z M19.5,12c-0.83,0-1.5-0.67-1.5-1.5 c0-0.83,0.67-1.5,1.5-1.5c0.83,0,1.5,0.67,1.5,1.5C21,11.33,20.33,12,19.5,12z"/>
        </svg>
      </div>
      <div className="absolute bottom-10 left-[20%] opacity-10 dark:opacity-5">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-primary-blue">
          <path d="M21.58,16.09l-1.09-7.66C20.21,6.46,18.52,5,16.53,5H7.47C5.48,5,3.79,6.46,3.51,8.43l-1.09,7.66 C2.2,17.63,3.39,19,4.94,19h0c0.68,0,1.32-0.27,1.8-0.75L9,16h6l2.25,2.25c0.48,0.48,1.13,0.75,1.8,0.75h0 C20.61,19,21.8,17.63,21.58,16.09z M11,11H9v2H8v-2H6v-1h2V8h1v2h2V11z M15,10c-0.55,0-1-0.45-1-1c0-0.55,0.45-1,1-1s1,0.45,1,1 C16,9.55,15.55,10,15,10z M17,13c-0.55,0-1-0.45-1-1c0-0.55,0.45-1,1-1s1,0.45,1,1C18,12.55,17.55,13,17,13z"/>
        </svg>
      </div>
      
      <div className="relative z-10 max-w-screen-xl mx-auto px-4">
        {/* 顶部装饰波浪 */}
        <div className="absolute top-[-30px] left-0 right-0 h-8 overflow-hidden">
          <div className="w-full h-16 bg-gradient-to-r from-pink-200/20 via-primary-blue/20 to-accent-yellow/20 rounded-[100%] transform scale-x-110"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* 第一列：网站简介 - 增强版 */}
          <div className="md:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-accent-yellow to-pink-400 rounded-full blur-sm opacity-30 animate-pulse-subtle"></div>
                <img src={GamepadIcon} className="h-8 w-8 mr-2 relative" alt="GamePad Icon" />
              </div>
              <h2 className="text-xl font-bold">
                <span className="text-gradient-cozy">
                  CozyGame
                </span>
              </h2>
            </div>
            
            <p className="text-neutral-medium dark:text-neutral-light text-sm mb-6 max-w-xs leading-relaxed">
              {t('footer_about_site_text')}
            </p>
            
            {/* 游戏风格社交媒体按钮 */}
            <div className="flex space-x-3">
              {/* Twitter分享按钮 */}
              <button 
                onClick={() => shareToSocial('twitter')} 
                aria-label={t('share_to_twitter')}
                className="game-social-btn group"
              >
                <div className="game-social-btn-bg"></div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </button>
              
              {/* Facebook分享按钮 */}
              <button 
                onClick={() => shareToSocial('facebook')} 
                aria-label={t('share_to_facebook')}
                className="game-social-btn group"
              >
                <div className="game-social-btn-bg"></div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </button>
              
              {/* Instagram分享按钮 */}
              <button 
                onClick={() => shareToSocial('instagram')} 
                aria-label={t('share_to_instagram')}
                className="game-social-btn group"
              >
                <div className="game-social-btn-bg"></div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </button>
              
              {/* Discord分享按钮 */}
              <button 
                onClick={() => shareToSocial('discord')} 
                aria-label={t('share_to_discord')}
                className="game-social-btn group"
              >
                <div className="game-social-btn-bg"></div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.39-.444.885-.608 1.283a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.283.077.077 0 0 0-.079-.036c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z" />
                </svg>
              </button>
              
              {/* 新增游戏风格YouTube按钮 */}
              <button 
                onClick={() => window.open('https://www.youtube.com/', '_blank', 'noopener,noreferrer')} 
                aria-label="YouTube"
                className="game-social-btn group"
              >
                <div className="game-social-btn-bg"></div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </button>
            </div>
          </div>
          
          {/* 第二列：快速链接 - 增强版 */}
          <div>
            <h3 className="text-base font-semibold mb-5 relative inline-block text-neutral-darkest dark:text-white">
              <span className="text-gradient-warm">{t('footer_quick_links')}</span>
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-accent-yellow to-pink-500 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to={`/${lang}`} 
                  className="text-neutral-medium dark:text-neutral-light hover:text-primary-blue dark:hover:text-primary-blue-light transition-colors flex items-center group"
                >
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-accent-yellow to-pink-500 mr-2.5 group-hover:scale-125 transition-transform"></span>
                  {t('footer_link_home')}
                </Link>
              </li>
              <li>
                <Link 
                  to={`/${lang}/vip-zone`} 
                  className="text-neutral-medium dark:text-neutral-light hover:text-primary-blue dark:hover:text-primary-blue-light transition-colors flex items-center group"
                >
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-accent-yellow to-pink-500 mr-2.5 group-hover:scale-125 transition-transform"></span>
                  {t('footer_link_vip')}
                </Link>
              </li>
              <li>
                <Link 
                  to={`/${lang}/about`} 
                  className="text-neutral-medium dark:text-neutral-light hover:text-primary-blue dark:hover:text-primary-blue-light transition-colors flex items-center group"
                >
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-accent-yellow to-pink-500 mr-2.5 group-hover:scale-125 transition-transform"></span>
                  {t('footer_link_about')}
                </Link>
              </li>
              <li>
                <Link 
                  to={`/${lang}/contact`} 
                  className="text-neutral-medium dark:text-neutral-light hover:text-primary-blue dark:hover:text-primary-blue-light transition-colors flex items-center group"
                >
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-accent-yellow to-pink-500 mr-2.5 group-hover:scale-125 transition-transform"></span>
                  {t('footer_link_contact')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* 第三列：法律信息 - 增强版 */}
          <div>
            <h3 className="text-base font-semibold mb-5 relative inline-block text-neutral-darkest dark:text-white">
              <span className="text-gradient-fresh">{t('footer_legal')}</span>
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-500 to-primary-blue rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to={`/${lang}/terms`} 
                  className="text-neutral-medium dark:text-neutral-light hover:text-primary-blue dark:hover:text-primary-blue-light transition-colors flex items-center group"
                >
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-primary-blue mr-2.5 group-hover:scale-125 transition-transform"></span>
                  {t('footer_link_terms')}
                </Link>
              </li>
              <li>
                <Link 
                  to={`/${lang}/privacy`} 
                  className="text-neutral-medium dark:text-neutral-light hover:text-primary-blue dark:hover:text-primary-blue-light transition-colors flex items-center group"
                >
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-primary-blue mr-2.5 group-hover:scale-125 transition-transform"></span>
                  {t('footer_link_privacy')}
                </Link>
              </li>
              <li>
                <Link 
                  to={`/${lang}/disclaimer`} 
                  className="text-neutral-medium dark:text-neutral-light hover:text-primary-blue dark:hover:text-primary-blue-light transition-colors flex items-center group"
                >
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-primary-blue mr-2.5 group-hover:scale-125 transition-transform"></span>
                  {t('footer_link_disclaimer')}
                </Link>
              </li>
              <li>
                <Link 
                  to={`/${lang}/cookie-policy`} 
                  className="text-neutral-medium dark:text-neutral-light hover:text-primary-blue dark:hover:text-primary-blue-light transition-colors flex items-center group"
                >
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-primary-blue mr-2.5 group-hover:scale-125 transition-transform"></span>
                  {t('footer_cookie_policy')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* 第四列：热门标签和订阅 - 替换语言切换器 */}
          <div>
            <div className="flex flex-col space-y-6">
              {/* 订阅表单 */}
              <div>
                <h3 className="text-base font-semibold mb-3 text-neutral-darkest dark:text-white">
                  <span className="text-gradient-warm">{t('subscribe_to_updates')}</span>
                </h3>
                <div className="p-2 bg-white/30 dark:bg-neutral-darkest/30 backdrop-blur-sm rounded-lg shadow-sm border border-neutral-light/10 dark:border-neutral-medium/10">
                  <div className="input-group">
                    <input 
                      type="email" 
                      placeholder={t('your_email')} 
                      className="w-full bg-white dark:bg-neutral-darkest border border-neutral-light/50 dark:border-neutral-medium/30 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-primary-blue/50 focus:ring-2 focus:ring-primary-blue/30"
                    />
                    <button className="btn-subscribe text-sm py-1.5 px-4">
                      {t('subscribe')}
                    </button>
                  </div>
                </div>
              </div>
              
              {/* 热门标签 - 替换语言切换器 */}
              <div>
                <h3 className="text-base font-semibold mb-3 relative inline-block text-neutral-darkest dark:text-white">
                  <span className="text-gradient-cozy">{t('popular_tags')}</span>
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-accent-yellow via-pink-500 to-primary-blue rounded-full"></span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map(tag => (
                    <Link 
                      key={tag.id}
                      to={`/${lang}?tags=${tag.id}`}
                      className="inline-block px-3 py-1 text-xs rounded-full bg-white/40 dark:bg-neutral-darkest/40 backdrop-blur-sm border border-neutral-light/20 dark:border-neutral-medium/20 text-neutral-medium dark:text-neutral-light hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 hover:text-primary-blue dark:hover:text-primary-blue-light hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                    >
                      {tag.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative border-t border-neutral-light/30 dark:border-neutral-medium/30 pt-6 mt-8">
          {/* 装饰线 */}
          <div className="absolute -top-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-blue/30 to-transparent"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-neutral-medium dark:text-neutral-light text-sm">
                {t('footer_copyright', { currentYear, siteName: t('site_name') })}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Link 
                to={`/${lang}/cookie-policy`} 
                className="text-xs text-neutral-medium dark:text-neutral-light hover:text-primary-blue dark:hover:text-primary-blue-light transition-colors"
              >
                {t('footer_cookie_policy')}
              </Link>
              <span className="text-xs text-neutral-medium/50 dark:text-neutral-light/50">•</span>
              <Link 
                to={`/${lang}/sitemap`} 
                className="text-xs text-neutral-medium dark:text-neutral-light hover:text-primary-blue dark:hover:text-primary-blue-light transition-colors"
              >
                {t('footer_sitemap')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 