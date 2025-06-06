import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ShareIcon from '../assets/icons/share.svg';

const ShareButton = ({ gameId }) => {
  const { t, i18n } = useTranslation();
  const [showToast, setShowToast] = useState(false);
  
  const handleShare = () => {
    // 构建游戏链接
    const gameUrl = `${window.location.origin}/${i18n.language}/game/${gameId}`;
    
    // 如果有Web Share API，使用它
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: gameUrl
      }).catch(err => {
        console.error('分享失败:', err);
        // 如果分享API失败，回退到复制链接
        copyToClipboard(gameUrl);
      });
    } else {
      // 否则复制到剪贴板
      copyToClipboard(gameUrl);
    }
  };
  
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      // 显示提示
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }).catch(err => {
      console.error('复制失败:', err);
    });
  };
  
  return (
    <>
      <button 
        onClick={handleShare}
        className="btn btn-secondary flex items-center"
        aria-label={t('share_button_text')}
      >
        <img src={ShareIcon} className="w-5 h-5 mr-2" alt="Share" />
        {t('share_button_text')}
      </button>
      
      {/* 提示消息 */}
      {showToast && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-neutral-dark text-white px-4 py-2 rounded-md shadow-lg z-50 animate-fade-in">
          {t('share_link_copied')}
        </div>
      )}
    </>
  );
};

export default ShareButton; 