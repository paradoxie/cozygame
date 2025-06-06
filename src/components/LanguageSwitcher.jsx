import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { currentSupportedLngs, defaultLng } from '../i18n';

// 定义语言与国旗emoji的映射
const languageFlags = {
  'en': '🇺🇸',      // 美国
  'zh-CN': '🇨🇳',   // 中国
  'es': '🇪🇸',      // 西班牙
  'fr': '🇫🇷',      // 法国
  'de': '🇩🇪',      // 德国
  'ru': '🇷🇺',      // 俄罗斯
  'ja': '🇯🇵',      // 日本
  'ko': '🇰🇷',      // 韩国
  'id': '🇮🇩',      // 印度尼西亚
  'pt-BR': '🇧🇷',   // 巴西
};

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 从URL路径获取当前语言
  const getCurrentLanguageFromPath = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    if (pathSegments.length > 0 && currentSupportedLngs.includes(pathSegments[0])) {
      return pathSegments[0];
    }
    return defaultLng;
  };

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 确保i18n实例使用的语言与URL路径一致
  useEffect(() => {
    const currentLangFromPath = getCurrentLanguageFromPath();
    if (i18n.resolvedLanguage !== currentLangFromPath) {
      i18n.changeLanguage(currentLangFromPath);
    }
  }, [location.pathname, i18n]);

  const changeLanguage = (lng) => {
    // 先手动更改语言，确保翻译立即生效
    i18n.changeLanguage(lng);
    
    const currentPath = location.pathname;
    const currentLangInPath = currentSupportedLngs.find(supportedLang => currentPath.startsWith(`/${supportedLang}`));

    let newPath;
    if (currentLangInPath) {
      // 将当前语言前缀替换为新的
      newPath = `/${lng}${currentPath.substring(currentLangInPath.length + 1)}`;
    } else {
      // 没有语言前缀（例如根路径重定向到默认，或某些错误）
      // 添加新语言前缀
      newPath = `/${lng}${currentPath === '/' ? '' : currentPath}`;
    }
    
    // 特殊情况：如果currentPath是'/'，newPath应该是/lng
    if (location.pathname === `/${currentLangInPath}` && newPath === `/${lng}/`) {
        newPath = `/${lng}`;
    }

    // 添加搜索参数和哈希，确保它们被保留
    newPath = `${newPath}${location.search}${location.hash}`;

    // 使用替换模式，不创建新的历史记录
    navigate(newPath, { replace: true });
    setIsOpen(false);
    
    // 在更改语言后，可以添加一个短暂的延迟然后强制重新渲染
    setTimeout(() => {
      window.dispatchEvent(new Event('languageChanged'));
    }, 100);
  };

  // 获取特定语言的显示名称
  const getLanguageDisplayName = (langCode) => {
    // 为中文提供特殊处理
    if (langCode === 'zh-CN') {
      return '简体中文';
    }
    return t(`lang_${langCode}`);
  };

  // 获取语言的国旗emoji
  const getLanguageFlag = (langCode) => {
    return languageFlags[langCode] || '🌐';
  };

  // 检查语言是否为当前活动语言
  const isActiveLanguage = (lng) => {
    return getCurrentLanguageFromPath() === lng;
  };

  // 获取当前语言的显示名称和国旗
  const currentLang = getCurrentLanguageFromPath();
  const currentLanguageDisplayName = getLanguageDisplayName(currentLang);
  const currentLanguageFlag = getLanguageFlag(currentLang);

  return (
    <div className="language-switcher relative" ref={dropdownRef}>
      <button
        className="flex items-center space-x-2 px-3 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-neutral-light/50 hover:border-purple-500/50 dark:border-neutral-medium/30 dark:hover:border-purple-500/50 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="text-lg mr-1">{currentLanguageFlag}</span>
        <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">{currentLanguageDisplayName}</span>
        <svg 
          className={`w-4 h-4 text-neutral-medium transition-transform duration-300 ${isOpen ? 'transform rotate-180 text-purple-600' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute z-40 mt-2 w-48 bg-white/95 dark:bg-neutral-dark/95 backdrop-blur-md rounded-xl shadow-lg overflow-hidden border border-neutral-light/50 dark:border-neutral-medium/30 transform transition-all duration-300 origin-top animate-scale-in">
          <div className="py-1">
            {currentSupportedLngs.map((lng, index) => {
              const displayText = getLanguageDisplayName(lng);
              const flagEmoji = getLanguageFlag(lng);
              const isActive = isActiveLanguage(lng);
              
              return (
                <button
                  key={lng}
                  className={`w-full text-left px-4 py-3 flex items-center space-x-3 text-sm transition-all duration-200 
                    ${isActive 
                      ? 'bg-gradient-to-r from-purple-500/20 to-indigo-500/10 dark:from-purple-500/30 dark:to-indigo-500/20 font-medium' 
                      : 'hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-indigo-500/5 dark:hover:from-purple-500/20 dark:hover:to-indigo-500/10'
                    }
                  `}
                  onClick={() => changeLanguage(lng)}
                  disabled={isActive}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: 'fadeInMove 300ms ease-out forwards'
                  }}
                >
                  <span className="text-xl">{flagEmoji}</span>
                  <span className={`${isActive ? 'bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent' : 'text-neutral-darkest dark:text-white'}`}>
                    {displayText}
                  </span>
                  {isActive && (
                    <span className="ml-auto">
                      <svg className="w-4 h-4 text-purple-600 animate-pulse-subtle" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher; 