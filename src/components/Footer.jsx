import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import GamepadIcon from '../assets/icons/gamepad.svg';

const Footer = () => {
  const { t } = useTranslation();
  const { lang } = useParams();
  const currentYear = 2025;

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
            
            <div className="flex space-x-3">
              <a href="#" aria-label="Twitter" className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-neutral-darkest shadow-md text-neutral-medium hover:text-primary-blue dark:text-neutral-light dark:hover:text-primary-blue transition-colors hover:shadow-lg hover:-translate-y-1 active:translate-y-0 cozy-shadow">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-neutral-darkest shadow-md text-neutral-medium hover:text-primary-blue dark:text-neutral-light dark:hover:text-primary-blue transition-colors hover:shadow-lg hover:-translate-y-1 active:translate-y-0 cozy-shadow">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-neutral-darkest shadow-md text-neutral-medium hover:text-primary-blue dark:text-neutral-light dark:hover:text-primary-blue transition-colors hover:shadow-lg hover:-translate-y-1 active:translate-y-0 cozy-shadow">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.54 15.42a6.1 6.1 0 01-.34 1.15 7.41 7.41 0 01-4.35 4.35 9.42 9.42 0 01-3.35.63c-1.25.05-1.65.06-4.85.06s-3.6-.01-4.85-.06a9.42 9.42 0 01-3.35-.63 7.41 7.41 0 01-4.35-4.35 6.1 6.1 0 01-.34-1.15c-.05-.25-.06-.52-.06-.78V8.58c0-.26.01-.53.06-.78a6.1 6.1 0 01.34-1.15 7.41 7.41 0 014.35-4.35 9.42 9.42 0 013.35-.63c1.25-.05 1.65-.06 4.85-.06s3.6.01 4.85.06a9.42 9.42 0 013.35.63 7.41 7.41 0 014.35 4.35 6.1 6.1 0 01.34 1.15c.05.25.06.52.06.78v6.06c0 .26-.01.53-.06.78z" />
                </svg>
              </a>
              <a href="#" aria-label="Discord" className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-neutral-darkest shadow-md text-neutral-medium hover:text-primary-blue dark:text-neutral-light dark:hover:text-primary-blue transition-colors hover:shadow-lg hover:-translate-y-1 active:translate-y-0 cozy-shadow">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
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
          
          {/* 第四列：语言选择器与订阅 - 增强版 */}
          <div>
            <h3 className="text-base font-semibold mb-5 relative inline-block text-neutral-darkest dark:text-white">
              <span className="text-gradient-cozy">{t('footer_language')}</span>
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-accent-yellow via-pink-500 to-primary-blue rounded-full"></span>
            </h3>
            <div className="p-2 bg-white/30 dark:bg-neutral-darkest/30 backdrop-blur-sm rounded-lg shadow-sm border border-neutral-light/10 dark:border-neutral-medium/10">
              <LanguageSwitcher />
            </div>
            
            {/* 订阅表单 - 增强版 */}
            <div className="mt-6">
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