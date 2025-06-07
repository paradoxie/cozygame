import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUserPreferences } from '../hooks/useUserPreferences';
import FavoriteButton from './FavoriteButton';
import CrownIcon from '../assets/icons/crown.svg';
import GamepadIcon from '../assets/icons/gamepad.svg';

const GameCard = ({ game, showTitle = true }) => {
  const { t, i18n } = useTranslation();
  const { favorites, toggleFavorite } = useUserPreferences();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const currentLang = i18n.language;
  const isFavorite = favorites[game.id] || false;
  
  // 获取当前语言的游戏标题和描述，如果不存在则使用英语
  const title = game.title[currentLang] || game.title.en || '';
  const description = game.description?.[currentLang] || game.description?.en || '';
  const tags = game.tags?.[currentLang] || game.tags?.en || [];
  
  // 处理图片加载完成
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  
  // 处理图片加载错误
  const handleImageError = () => {
    setImageError(true);
  };

  // 根据游戏标签生成随机颜色（用于标签没有明确颜色时）
  const getTagColor = (tag) => {
    const colors = [
      'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
      'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300'
    ];
    
    // 使用字符串哈希为每个标签生成一致的颜色
    const hash = tag.split('').reduce((acc, char) => {
      return acc + char.charCodeAt(0);
    }, 0);
    
    return colors[hash % colors.length];
  };
  
  return (
    <div className="relative game-card-hover bg-white dark:bg-neutral-dark rounded-xl overflow-hidden shadow-md transition-all duration-300 flex flex-col h-full group">
      {/* 主链接 - 整个卡片可点击 */}
      <Link 
        to={`/${currentLang}/game/${game.id}`}
        className="absolute inset-0 z-10"
        aria-label={`${t('play_button')} ${title}`}
      />
      
      {/* 缩略图容器 */}
      <div className="relative aspect-w-16 aspect-h-9 overflow-hidden bg-neutral-lightest dark:bg-neutral-darkest">
        {/* 图片加载骨架屏 */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 animate-shimmer"></div>
        )}
        
        {/* 游戏缩略图 */}
        <img 
          src={imageError ? '/images/placeholder.jpg' : game.thumbnailUrl}
          alt={t('game_thumbnail_alt', { gameTitle: title })}
          className={`game-thumbnail object-cover w-full h-full transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        
        {/* VIP标识 */}
        {game.vip && (
          <div className="absolute top-2 right-2 z-20 flex items-center space-x-1 bg-gradient-to-r from-yellow-500/80 to-amber-600/80 px-2 py-1 rounded-full shadow-lg animate-pulse-subtle">
            <img src={CrownIcon} alt="VIP" className="w-4 h-4" />
            <span className="text-white text-xs font-semibold">VIP</span>
          </div>
        )}
        
        {/* 热门或推荐标识 */}
        {game.isHot && !game.vip && (
          <div className="absolute top-2 right-2 z-20 bg-gradient-to-r from-red-500/80 to-orange-500/80 px-2 py-1 rounded-full shadow-lg">
            <span className="text-white text-xs font-semibold">HOT</span>
          </div>
        )}
        
        {game.isRecommended && !game.isHot && !game.vip && (
          <div className="absolute top-2 right-2 z-20 bg-gradient-to-r from-primary-blue/80 to-blue-600/80 px-2 py-1 rounded-full shadow-lg">
            <span className="text-white text-xs font-semibold">BEST</span>
          </div>
        )}
        
        {/* 游戏图片覆盖渐变 */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-darkest/80 via-neutral-darkest/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
        
        {/* 收藏按钮 */}
        <div className="absolute top-2 left-2 z-20">
          <FavoriteButton 
            gameId={game.id} 
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
          />
        </div>
        
        {/* 游戏类型标签 - 在缩略图下方 */}
        {game.tags && game.tags[currentLang] && (
          <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-1 z-20">
            {game.tags[currentLang].slice(0, 2).map((tag, index) => (
              <span 
                key={index} 
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${getTagColor(tag)} opacity-90`}
              >
                {tag}
              </span>
            ))}
            {game.tags[currentLang].length > 2 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-neutral-200/80 text-neutral-700 dark:bg-neutral-700/80 dark:text-neutral-200">
                +{game.tags[currentLang].length - 2}
              </span>
            )}
          </div>
        )}
        
        {/* 悬停时显示游戏手柄图标 */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 transform scale-0 group-hover:scale-100 transition-transform duration-300">
            <img src={GamepadIcon} alt="Play" className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
      
      {/* 卡片内容 */}
      {showTitle && (
        <div className="flex flex-col p-3 flex-grow">
          <h3 className="font-medium text-neutral-darkest dark:text-white line-clamp-1 group-hover:text-primary-blue dark:group-hover:text-primary-blue-light transition-colors">
            {title}
          </h3>
          
          {/* 游戏简短描述 */}
          {description && (
            <p className="text-neutral-medium dark:text-neutral-light text-xs mt-1 line-clamp-2">
              {description}
            </p>
          )}
          
          {/* 卡片底部操作按钮 */}
          <div className="mt-auto pt-3 flex justify-between items-center">
            <Link 
              to={`/${currentLang}/game/${game.id}`}
              className="btn-play flex items-center justify-center gap-1 text-xs py-1.5 px-3 shadow-sm"
              aria-label={`${t('play_button')} ${title}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              {t('play_button')}
            </Link>
            
            {/* 更多标签提示 (如果有) */}
            {game.tags && game.tags[currentLang] && game.tags[currentLang].length > 2 && (
              <div className="text-xs text-neutral-medium dark:text-neutral-light">
                {game.tags[currentLang].length} {t('tags')}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameCard; 