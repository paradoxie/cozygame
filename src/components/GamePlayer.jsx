import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import FullscreenButton from './FullscreenButton';

const GamePlayer = ({ game, iframeUrl, title, onGameLoad, onLoad }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const gameContainerRef = useRef(null);
  const timeoutRef = useRef(null);
  const onGameLoadRef = useRef(onGameLoad);
  const onLoadRef = useRef(onLoad);

  // 更新回调函数的引用
  useEffect(() => {
    onGameLoadRef.current = onGameLoad;
    onLoadRef.current = onLoad;
  });

  // 兼容旧版本和新版本的props
  const gameUrl = iframeUrl || (game && game.iframeUrl);
  const gameTitle = title || (game && game.title && (typeof game.title === 'object' ? game.title.en : game.title));
  const gameId = game && game.id;

  useEffect(() => {
    // 兼容旧版本和新版本的回调
    if (gameId && onGameLoadRef.current) {
      onGameLoadRef.current(gameId);
    } else if (onLoadRef.current) {
      onLoadRef.current();
    }
    // 重置状态
    setLoading(true);
    setError(false);
    
    // 设置加载超时(30秒)
    timeoutRef.current = setTimeout(() => {
      console.warn('游戏加载超时:', gameUrl);
      setLoading(false);
      setError(true);
    }, 30000);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [gameId, gameUrl]); // 只依赖于稳定的值

  const handleIframeLoad = () => {
    console.log('游戏iframe加载完成:', gameUrl);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setLoading(false);
  };

  const handleIframeError = () => {
    console.error('游戏iframe加载失败:', gameUrl);
    setLoading(false);
    setError(true);
  };

  if (!gameUrl) {
    return (
      <div className="w-full bg-neutral-darkest rounded-lg overflow-hidden shadow-lg p-8 text-center text-white">
        {t('game_url_missing')}
      </div>
    );
  }

  return (
    <div ref={gameContainerRef} className="w-full bg-neutral-darkest rounded-lg overflow-hidden shadow-lg">
      <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 比例 */ }}>
        {/* 全屏按钮 */}
        <div className="absolute top-3 right-3 z-20">
          <FullscreenButton targetElement={gameContainerRef.current} />
        </div>

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-dark z-10">
            <div className="text-center">
              <svg className="animate-spin h-10 w-10 text-primary-blue mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-white">{t('loading_game')}</p>
            </div>
          </div>
        )}
        
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-dark z-10">
            <div className="text-center p-4">
              <svg className="h-12 w-12 text-error-red mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-white mb-4">{t('game_load_fail')}</p>
              <div className="space-y-2">
                <button 
                  onClick={() => {
                    setLoading(true);
                    setError(false);
                    // 强制重新加载iframe
                    const iframe = document.querySelector(`iframe[src="${gameUrl}"]`);
                    if (iframe) {
                      iframe.src = iframe.src;
                    }
                  }}
                  className="btn btn-primary mr-2"
                >
                  {t('retry_game', { defaultValue: '重试游戏' })}
                </button>
                <button 
                  onClick={() => window.location.reload()}
                  className="btn btn-secondary"
                >
                  {t('refresh')}
                </button>
              </div>
            </div>
          </div>
        )}
        
        <iframe
          src={gameUrl}
          title={gameTitle}
          className="absolute inset-0 w-full h-full border-0"
          allowFullScreen
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          allow="fullscreen; gamepad; microphone; camera"
        ></iframe>
      </div>
    </div>
  );
};

export default GamePlayer; 