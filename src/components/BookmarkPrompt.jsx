import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import BookmarkIcon from '../assets/icons/bookmark.svg';

const BookmarkPrompt = () => {
  const { t } = useTranslation();
  const [showPrompt, setShowPrompt] = useState(false);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  useEffect(() => {
    // 检查是否已经显示过提示
    const hasShownBookmarkPrompt = localStorage.getItem('hasShownBookmarkPrompt');
    
    if (!hasShownBookmarkPrompt) {
      // 延迟显示提示，让用户先浏览一会儿网站
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 10000); // 10秒后显示
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  const dismissPrompt = () => {
    setShowPrompt(false);
    localStorage.setItem('hasShownBookmarkPrompt', 'true');
  };
  
  if (!showPrompt) return null;
  
  return (
    <div className={`fixed ${isMobile ? 'bottom-4 left-4 right-4' : 'bottom-4 right-4 max-w-xs'} bg-gradient-to-br from-purple-600/90 to-indigo-600/90 backdrop-blur-md text-white rounded-xl shadow-lg ${isMobile ? 'p-3' : 'p-4'} z-40 animate-slide-up border border-white/20`}>
      {/* 装饰性元素 */}
      <div className="absolute -right-4 -top-4 w-16 h-16 bg-accent-yellow/20 rounded-full blur-xl"></div>
      <div className="absolute -left-4 -bottom-4 w-16 h-16 bg-primary-blue/20 rounded-full blur-xl"></div>
      
      <div className={`relative z-10 ${isMobile ? 'flex flex-col space-y-2' : 'flex items-start'}`}>
        <div className={`flex items-center ${isMobile ? 'mb-2' : 'flex-shrink-0 mr-3'}`}>
          <div className="text-white bg-white/20 p-2 rounded-full mr-2">
            <img src={BookmarkIcon} className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} alt="Bookmark" />
          </div>
          <h3 className={`font-semibold text-white/90 ${isMobile ? 'text-sm' : ''}`}>{t('bookmark_prompt_title')}</h3>
        </div>
        
        <div className={isMobile ? '' : 'flex-1'}>
          <p className={`text-white/80 mb-3 ${isMobile ? 'text-xs' : 'text-sm'}`}>
            {isMobile ? t('bookmark_prompt_text_mobile') : t('bookmark_prompt_text_desktop')}
          </p>
          
          <div className={`${isMobile ? 'flex space-x-2' : ''}`}>
            <button 
              onClick={dismissPrompt}
              className={`bg-white/20 hover:bg-white/30 text-white transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 rounded-full ${isMobile ? 'text-xs py-1.5 px-3 flex-1' : 'text-sm py-1.5 px-4'}`}
            >
              {t('bookmark_prompt_dismiss')}
            </button>
            
            {isMobile && (
              <button 
                onClick={() => {
                  // 在移动端提供PWA安装提示
                  if ('serviceWorker' in navigator) {
                    // 触发PWA安装横幅
                    window.dispatchEvent(new Event('beforeinstallprompt'));
                  }
                  dismissPrompt();
                }}
                className="bg-primary-blue/80 hover:bg-primary-blue text-white text-xs py-1.5 px-3 rounded-full transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 flex-1"
              >
                {t('add_to_home_screen', { defaultValue: '添加到主屏' })}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookmarkPrompt; 