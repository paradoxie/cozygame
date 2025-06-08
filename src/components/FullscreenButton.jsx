import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const FullscreenButton = ({ targetElement }) => {
  const { t } = useTranslation();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // 检测是否为移动设备
      const checkMobile = () => {
        const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        setIsMobile(isMobileDevice);
      };
      
      checkMobile();
      window.addEventListener('resize', checkMobile);

      // 监听全屏状态变化
      const handleFullscreenChange = () => {
        setIsFullscreen(!!document.fullscreenElement);
      };

      // 监听屏幕方向变化 (移动端)
      const handleOrientationChange = () => {
        if (typeof window.orientation !== 'undefined') {
          const isLandscape = window.orientation === 90 || window.orientation === -90;
          setIsFullscreen(isLandscape && !!document.fullscreenElement);
        }
      };

      document.addEventListener('fullscreenchange', handleFullscreenChange);
      // 只在支持orientation的设备上添加监听器
      if (typeof window.orientation !== 'undefined') {
        window.addEventListener('orientationchange', handleOrientationChange);
      }

      return () => {
        window.removeEventListener('resize', checkMobile);
        document.removeEventListener('fullscreenchange', handleFullscreenChange);
        if (typeof window.orientation !== 'undefined') {
          window.removeEventListener('orientationchange', handleOrientationChange);
        }
      };
    } catch (err) {
      console.error('FullscreenButton useEffect error:', err);
      setError(err.message);
    }
  }, []); // 移除isMobile依赖，避免循环

  const enterFullscreen = async () => {
    const element = targetElement && targetElement.nodeType ? targetElement : document.documentElement;
    
    try {
      if (isMobile) {
        // 移动端：请求全屏并尝试旋转到横屏
        if (element.requestFullscreen) {
          await element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) { // Safari
          await element.webkitRequestFullscreen();
        } else if (element.mozRequestFullScreen) { // Firefox
          await element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) { // IE/Edge
          await element.msRequestFullscreen();
        }

        // 尝试锁定屏幕方向为横屏
        if (screen && screen.orientation && screen.orientation.lock) {
          try {
            await screen.orientation.lock('landscape');
          } catch (err) {
            console.log('无法锁定屏幕方向:', err);
          }
        }
      } else {
        // 桌面端：普通全屏
        if (element.requestFullscreen) {
          await element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
          await element.webkitRequestFullscreen();
        } else if (element.mozRequestFullScreen) {
          await element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          await element.msRequestFullscreen();
        }
      }
    } catch (err) {
      console.error('进入全屏失败:', err);
    }
  };

  const exitFullscreen = async () => {
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        await document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        await document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        await document.msExitFullscreen();
      }

      // 移动端：解锁屏幕方向
      if (isMobile && screen && screen.orientation && screen.orientation.unlock) {
        try {
          screen.orientation.unlock();
        } catch (err) {
          console.log('无法解锁屏幕方向:', err);
        }
      }
    } catch (err) {
      console.error('退出全屏失败:', err);
    }
  };

  const toggleFullscreen = () => {
    if (isFullscreen) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  };

  // 如果有错误，返回null（不显示按钮）
  if (error) {
    console.warn('FullscreenButton error:', error);
    return null;
  }

  return (
    <button
      onClick={toggleFullscreen}
      className="fullscreen-btn bg-black/60 hover:bg-black/80 text-white p-2 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-sm"
      title={isFullscreen ? t('exit_fullscreen', { defaultValue: '退出全屏' }) : t('enter_fullscreen', { defaultValue: '全屏' })}
      aria-label={isFullscreen ? t('exit_fullscreen', { defaultValue: '退出全屏' }) : t('enter_fullscreen', { defaultValue: '全屏' })}
    >
      {isFullscreen ? (
        // 退出全屏图标
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 9V4.5M9 9H4.5M9 9L3.5 3.5M15 15v4.5M15 15h4.5M15 15l5.5 5.5M15 9h4.5M15 9V4.5M15 9l5.5-5.5M9 15H4.5M9 15v4.5M9 15l-5.5 5.5" 
          />
        </svg>
      ) : (
        // 进入全屏图标
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4 8V4m0 0h4M4 4l5 5M20 8V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5M20 16v4m0 0h-4m4 0l-5-5" 
          />
        </svg>
      )}
      
      {/* 移动端横屏提示 */}
      {isMobile && !isFullscreen && (
        <span className="sr-only">{t('mobile_fullscreen_hint', { defaultValue: '横屏全屏' })}</span>
      )}
    </button>
  );
};

export default FullscreenButton; 