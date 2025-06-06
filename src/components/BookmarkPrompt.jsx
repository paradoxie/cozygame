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
    <div className="fixed bottom-4 right-4 max-w-xs bg-white dark:bg-neutral-dark rounded-lg shadow-lg p-4 z-40 animate-slide-up">
      <div className="flex items-start">
        <div className="flex-shrink-0 text-primary-blue mr-3">
          <img src={BookmarkIcon} className="w-6 h-6" alt="Bookmark" />
        </div>
        <div>
          <h3 className="font-semibold mb-1">{t('bookmark_prompt_title')}</h3>
          <p className="text-sm text-neutral-medium mb-3">
            {isMobile ? t('bookmark_prompt_text_mobile') : t('bookmark_prompt_text_desktop')}
          </p>
          <button 
            onClick={dismissPrompt}
            className="btn btn-primary text-sm py-1 px-3"
          >
            {t('bookmark_prompt_dismiss')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookmarkPrompt; 