import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import GamepadIcon from '../assets/icons/gamepad.svg';

const Footer = () => {
  const { t } = useTranslation();
  const { lang } = useParams();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-neutral-lightest dark:bg-neutral-dark pt-12 pb-6 border-t border-neutral-light/30 dark:border-neutral-medium/30 overflow-hidden">
      {/* 装饰背景元素 */}
      <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary-blue/5 blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-accent-yellow/5 blur-3xl"></div>
      <div className="absolute top-1/3 left-1/4 w-1 h-20 bg-gradient-to-b from-primary-blue/20 to-transparent"></div>
      <div className="absolute top-1/2 right-1/3 w-1 h-16 bg-gradient-to-b from-accent-yellow/20 to-transparent"></div>
      
      <div className="relative z-10 max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* 第一列：网站简介 */}
          <div className="md:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-4">
              <img src={GamepadIcon} className="h-7 w-7 mr-2" alt="GamePad Icon" />
              <h2 className="text-xl font-bold">
                <span className="bg-gradient-to-r from-primary-blue via-purple-600 to-accent-yellow bg-clip-text text-transparent">
                  CozyGame
                </span>
              </h2>
            </div>
            
            <p className="text-neutral-medium dark:text-neutral-light text-sm mb-6 max-w-xs">
              {t('footer_about_site_text')}
            </p>
            
            <div className="flex space-x-3">
              <a href="#" aria-label="Twitter" className="flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-neutral-darkest shadow-sm text-neutral-medium hover:text-primary-blue dark:text-neutral-light dark:hover:text-primary-blue transition-colors hover:shadow-md hover:-translate-y-0.5 active:translate-y-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className="flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-neutral-darkest shadow-sm text-neutral-medium hover:text-primary-blue dark:text-neutral-light dark:hover:text-primary-blue transition-colors hover:shadow-md hover:-translate-y-0.5 active:translate-y-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-neutral-darkest shadow-sm text-neutral-medium hover:text-primary-blue dark:text-neutral-light dark:hover:text-primary-blue transition-colors hover:shadow-md hover:-translate-y-0.5 active:translate-y-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.54 15.42a6.1 6.1 0 01-.34 1.15 7.41 7.41 0 01-4.35 4.35 9.42 9.42 0 01-3.35.63c-1.25.05-1.65.06-4.85.06s-3.6-.01-4.85-.06a9.42 9.42 0 01-3.35-.63 7.41 7.41 0 01-4.35-4.35 6.1 6.1 0 01-.34-1.15c-.05-.25-.06-.52-.06-.78V8.58c0-.26.01-.53.06-.78a6.1 6.1 0 01.34-1.15 7.41 7.41 0 014.35-4.35 9.42 9.42 0 013.35-.63c1.25-.05 1.65-.06 4.85-.06s3.6.01 4.85.06a9.42 9.42 0 013.35.63 7.41 7.41 0 014.35 4.35 6.1 6.1 0 01.34 1.15c.05.25.06.52.06.78v6.06c0 .26-.01.53-.06.78z" />
                </svg>
              </a>
              <a href="#" aria-label="Discord" className="flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-neutral-darkest shadow-sm text-neutral-medium hover:text-primary-blue dark:text-neutral-light dark:hover:text-primary-blue transition-colors hover:shadow-md hover:-translate-y-0.5 active:translate-y-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* 第二列：快速链接 */}
          <div>
            <h3 className="text-base font-semibold mb-4 relative inline-block text-neutral-darkest dark:text-white">
              {t('footer_quick_links')}
              <span className="absolute -bottom-1 left-0 w-10 h-0.5 bg-primary-blue"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to={`/${lang}`} 
                  className="text-neutral-medium dark:text-neutral-light hover:text-primary-blue dark:hover:text-primary-blue-light transition-colors flex items-center"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-blue/50 mr-2"></span>
                  {t('footer_link_home')}
                </Link>
              </li>
              <li>
                <Link 
                  to={`/${lang}/vip-zone`} 
                  className="text-neutral-medium dark:text-neutral-light hover:text-primary-blue dark:hover:text-primary-blue-light transition-colors flex items-center"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-blue/50 mr-2"></span>
                  {t('footer_link_vip')}
                </Link>
              </li>
              <li>
                <Link 
                  to={`/${lang}/about`} 
                  className="text-neutral-medium dark:text-neutral-light hover:text-primary-blue dark:hover:text-primary-blue-light transition-colors flex items-center"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-blue/50 mr-2"></span>
                  {t('footer_link_about')}
                </Link>
              </li>
              <li>
                <Link 
                  to={`/${lang}/contact`} 
                  className="text-neutral-medium dark:text-neutral-light hover:text-primary-blue dark:hover:text-primary-blue-light transition-colors flex items-center"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-blue/50 mr-2"></span>
                  {t('footer_link_contact')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* 第三列：法律信息 */}
          <div>
            <h3 className="text-base font-semibold mb-4 relative inline-block text-neutral-darkest dark:text-white">
              {t('footer_legal')}
              <span className="absolute -bottom-1 left-0 w-10 h-0.5 bg-primary-blue"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to={`/${lang}/terms`} 
                  className="text-neutral-medium dark:text-neutral-light hover:text-primary-blue dark:hover:text-primary-blue-light transition-colors flex items-center"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-blue/50 mr-2"></span>
                  {t('footer_link_terms')}
                </Link>
              </li>
              <li>
                <Link 
                  to={`/${lang}/privacy`} 
                  className="text-neutral-medium dark:text-neutral-light hover:text-primary-blue dark:hover:text-primary-blue-light transition-colors flex items-center"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-blue/50 mr-2"></span>
                  {t('footer_link_privacy')}
                </Link>
              </li>
              <li>
                <Link 
                  to={`/${lang}/disclaimer`} 
                  className="text-neutral-medium dark:text-neutral-light hover:text-primary-blue dark:hover:text-primary-blue-light transition-colors flex items-center"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-blue/50 mr-2"></span>
                  {t('footer_link_disclaimer')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* 第四列：语言选择器与订阅 */}
          <div>
            <h3 className="text-base font-semibold mb-4 relative inline-block text-neutral-darkest dark:text-white">
              {t('footer_language')}
              <span className="absolute -bottom-1 left-0 w-10 h-0.5 bg-primary-blue"></span>
            </h3>
            <LanguageSwitcher />
            
            {/* 订阅表单 */}
            <div className="mt-6">
              <h3 className="text-base font-semibold mb-3 text-neutral-darkest dark:text-white">
                {t('subscribe_to_updates')}
              </h3>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder={t('your_email')} 
                  className="flex-1 bg-white dark:bg-neutral-darkest border border-neutral-light/50 dark:border-neutral-medium/30 rounded-l-full rounded-r-none px-4 py-2 text-sm focus:outline-none focus:border-primary-blue/50 focus:ring-2 focus:ring-primary-blue/30"
                />
                <button className="bg-primary-blue hover:bg-primary-blue-dark text-white text-sm font-medium px-4 py-2 rounded-r-full transition-colors">
                  {t('subscribe')}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative border-t border-neutral-light/30 dark:border-neutral-medium/30 pt-6">
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