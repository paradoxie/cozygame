import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const GameCarousel = ({ games }) => {
  const { i18n, t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentLang = i18n.language;

  // 自动轮播
  useEffect(() => {
    if (!games || games.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % games.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [games]);
  
  if (!games || games.length === 0) return null;
  
  const currentGame = games[currentIndex];
  const title = currentGame.title[currentLang] || currentGame.title.en;
  const description = currentGame.description[currentLang] || currentGame.description.en;
  
  return (
    <div className="mb-6 overflow-hidden rounded-lg shadow-lg relative">
      <div className="relative bg-neutral-darkest" style={{ maxHeight: '400px', height: '280px' }}>
        {/* 背景图片 */}
        <img 
          src={currentGame.thumbnailUrl} 
          alt=""
          className="object-cover w-full h-full opacity-30"
        />
        
        {/* 内容叠加 */}
        <div className="absolute inset-0 flex flex-col md:flex-row items-center p-4 md:p-6">
          <div className="md:w-1/2 mb-4 md:mb-0 md:pr-6">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
              {title}
              {currentGame.vip && (
                <span className="ml-2 text-accent-yellow">👑</span>
              )}
            </h2>
            <p className="text-neutral-lightest mb-3 line-clamp-2 text-sm md:text-base">{description}</p>
            <Link 
              to={`/${currentLang}/game/${currentGame.id}`}
              className="btn btn-primary btn-sm"
            >
              {t('play_button')}
            </Link>
          </div>
          
          <div className="md:w-1/3">
            <Link to={`/${currentLang}/game/${currentGame.id}`}>
              <div className="rounded-lg overflow-hidden shadow-xl transform transition-transform duration-300 hover:scale-105">
                <img 
                  src={currentGame.thumbnailUrl} 
                  alt={t('game_thumbnail_alt', { gameTitle: title })}
                  className="w-full h-auto"
                  style={{ maxHeight: '200px', objectFit: 'cover' }}
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
      
      {/* 指示器 */}
      {games.length > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
          {games.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-primary-blue w-4' 
                  : 'bg-neutral-light hover:bg-neutral-medium'
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GameCarousel; 