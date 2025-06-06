import React from 'react';
import { useTranslation } from 'react-i18next';
import { useUserPreferences } from '../hooks/useUserPreferences';
import HeartIcon from '../assets/icons/heart.svg';
import HeartFilledIcon from '../assets/icons/heart-filled.svg';

const FavoriteButton = ({ gameId, size = 'md' }) => {
  const { t } = useTranslation();
  const { favorites, toggleFavorite } = useUserPreferences();
  const isFavorite = !!favorites[gameId];
  
  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(gameId);
  };
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };
  
  return (
    <button 
      onClick={handleToggleFavorite}
      className={`favorite-button ${isFavorite ? 'favorite' : ''} focus:outline-none`}
      aria-label={isFavorite ? t('favorite_button_remove') : t('favorite_button_add')}
      title={isFavorite ? t('favorite_button_remove') : t('favorite_button_add')}
    >
      {isFavorite ? (
        <img 
          src={HeartFilledIcon} 
          alt="Filled Heart"
          className={`${sizeClasses[size]} text-error-red transition-all duration-300 hover:scale-110`} 
        />
      ) : (
        <img 
          src={HeartIcon} 
          alt="Heart"
          className={`${sizeClasses[size]} text-neutral-light hover:text-neutral-medium transition-all duration-300 hover:scale-110`} 
        />
      )}
    </button>
  );
};

export default FavoriteButton; 