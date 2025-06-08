import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useUserPreferences } from '../hooks/useUserPreferences';
import { useGameData } from '../hooks/useGameData';
import GoogleIcon from '../assets/icons/google.svg';
import CrownIcon from '../assets/icons/crown.svg';

const AuthButton = ({ isMobile = false }) => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const navigate = useNavigate();
  const { user, loading, loginWithGoogle, logout } = useAuth();
  const { favorites, recentlyPlayed } = useUserPreferences();
  const { games } = useGameData();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 获取收藏的游戏
  const favoriteGames = games.filter(game => favorites[game.id]);
  
  // 获取最近玩过的游戏
  const recentGames = recentlyPlayed
    .map(id => games.find(game => game.id === id))
    .filter(Boolean); // 过滤掉undefined

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDropdown = () => {
    if (user) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const handleLogin = () => {
    if (!user) {
      loginWithGoogle();
    }
  };

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };
  
  const navigateToVipZone = () => {
    navigate(`/${i18n.language}/vip-zone`);
    setIsDropdownOpen(false);
  };

  // 根据当前语言渲染游戏标题
  const renderGameTitle = (game) => {
    return game.title[i18n.language] || game.title.en || 'Unknown Game';
  };

  if (isMobile) {
    return (
      <div className="w-full">
        {user ? (
          <div className="space-y-1">
            <div className="flex items-center mb-1.5">
              <img src={user.photoURL} alt={user.displayName} className="w-4 h-4 rounded-full mr-1.5" />
              <span className="font-medium text-xs text-neutral-darkest dark:text-white truncate">{user.displayName}</span>
            </div>
            
            {/* VIP区域按钮 - 移动端优化 */}
            <button 
              onClick={navigateToVipZone}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs py-1 px-2 rounded-md flex items-center justify-center transition-all duration-200 active:scale-95"
            >
              <img src={CrownIcon} alt="" className="w-2.5 h-2.5 mr-1" aria-hidden="true" />
              {t('vip_zone_button')}
            </button>
            
            {recentGames.length > 0 && (
              <div>
                <h3 className="text-xs font-medium mb-0.5 text-neutral-medium dark:text-neutral-light">{t('recently_played_title')}</h3>
                <ul className="bg-neutral-lightest dark:bg-neutral-medium rounded-md p-1 space-y-0.5">
                  {recentGames.slice(0, 2).map(game => (
                    <li key={game.id}>
                      <Link 
                        to={`/${lang}/game/${game.id}`}
                        className="block text-xs hover:text-primary-blue dark:hover:text-primary-blue-light transition-colors truncate text-neutral-darkest dark:text-white py-0.5"
                      >
                        {renderGameTitle(game)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {favoriteGames.length > 0 && (
              <div>
                <h3 className="text-xs font-medium mb-0.5 text-neutral-medium dark:text-neutral-light">{t('favorites_title')}</h3>
                <ul className="bg-neutral-lightest dark:bg-neutral-medium rounded-md p-1 space-y-0.5">
                  {favoriteGames.slice(0, 2).map(game => (
                    <li key={game.id}>
                      <Link 
                        to={`/${lang}/game/${game.id}`}
                        className="block text-xs hover:text-primary-blue dark:hover:text-primary-blue-light transition-colors truncate text-neutral-darkest dark:text-white py-0.5"
                      >
                        {renderGameTitle(game)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <button
              onClick={handleLogout}
              className="w-full bg-neutral-lightest dark:bg-neutral-medium text-neutral-darkest dark:text-white text-xs py-1 px-2 rounded-md transition-all duration-200 active:scale-95 border border-neutral-light dark:border-neutral-dark"
            >
              {t('logout_button')}
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogin}
            disabled={loading}
            className="bg-gradient-to-r from-primary-blue to-primary-blue-dark text-white text-xs py-1.5 px-2.5 rounded-md flex items-center justify-center transition-all duration-200 active:scale-95 disabled:opacity-50 w-auto min-w-0"
          >
            {loading ? (
              <svg className="animate-spin h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <>
                <img src={GoogleIcon} alt="Google" className="w-3 h-3 mr-1" />
                {t('login_button')}
              </>
            )}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {user ? (
        <div>
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-neutral-lightest dark:hover:bg-neutral-medium transition-colors"
          >
            <img 
              src={user.photoURL} 
              alt={user.displayName} 
              className="w-8 h-8 rounded-full" 
            />
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-neutral-dark rounded-lg shadow-lg py-2 z-50 border border-neutral-light dark:border-neutral-medium">
              <div className="px-4 py-2 border-b border-neutral-light dark:border-neutral-medium">
                <div className="flex items-center">
                  <img src={user.photoURL} alt={user.displayName} className="w-10 h-10 rounded-full mr-3" />
                  <div>
                    <div className="font-medium">{user.displayName}</div>
                    <div className="text-xs text-neutral-medium truncate">{user.email}</div>
                  </div>
                </div>
              </div>
              
              {/* VIP区域链接 */}
              <div className="px-4 py-2 border-b border-neutral-light dark:border-neutral-medium">
                <button 
                  onClick={navigateToVipZone}
                  className="w-full flex items-center py-2 px-3 rounded-md hover:bg-neutral-lightest dark:hover:bg-neutral-medium transition-colors text-purple-600"
                >
                  <img src={CrownIcon} alt="" className="w-5 h-5 mr-2" aria-hidden="true" />
                  <span className="font-medium">{t('vip_zone_button')}</span>
                </button>
              </div>
              
              {recentGames.length > 0 && (
                <div className="px-4 py-2 border-b border-neutral-light dark:border-neutral-medium">
                  <h3 className="text-sm font-medium mb-2">{t('recently_played_title')}</h3>
                  <ul>
                    {recentGames.slice(0, 3).map(game => (
                      <li key={game.id} className="mb-1">
                        <Link 
                          to={`/${lang}/game/${game.id}`}
                          className="flex items-center py-1 px-2 rounded-md hover:bg-neutral-lightest dark:hover:bg-neutral-medium transition-colors"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <img 
                            src={game.thumbnailUrl} 
                            alt={renderGameTitle(game)} 
                            className="w-8 h-8 object-cover rounded mr-2" 
                          />
                          <span className="text-sm truncate">{renderGameTitle(game)}</span>
                        </Link>
                      </li>
                    ))}
                    {recentGames.length > 3 && (
                      <li className="mt-1 text-right">
                        <span className="text-xs text-purple-600 cursor-pointer">
                          {t('see_more')}
                        </span>
                      </li>
                    )}
                  </ul>
                </div>
              )}
              
              {favoriteGames.length > 0 && (
                <div className="px-4 py-2 border-b border-neutral-light dark:border-neutral-medium">
                  <h3 className="text-sm font-medium mb-2">{t('favorites_title')}</h3>
                  <ul>
                    {favoriteGames.slice(0, 3).map(game => (
                      <li key={game.id} className="mb-1">
                        <Link 
                          to={`/${lang}/game/${game.id}`}
                          className="flex items-center py-1 px-2 rounded-md hover:bg-neutral-lightest dark:hover:bg-neutral-medium transition-colors"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <img 
                            src={game.thumbnailUrl} 
                            alt={renderGameTitle(game)} 
                            className="w-8 h-8 object-cover rounded mr-2" 
                          />
                          <span className="text-sm truncate">{renderGameTitle(game)}</span>
                        </Link>
                      </li>
                    ))}
                    {favoriteGames.length > 3 && (
                      <li className="mt-1 text-right">
                        <span className="text-xs text-purple-600 cursor-pointer">
                          {t('see_more')}
                        </span>
                      </li>
                    )}
                  </ul>
                </div>
              )}
              
              <div className="px-4 py-2">
                <button
                  onClick={handleLogout}
                  className="w-full py-2 text-center rounded-md bg-neutral-lightest dark:bg-neutral-medium hover:bg-neutral-light dark:hover:bg-neutral-medium/80 transition-colors text-neutral-darkest dark:text-white"
                >
                  {t('logout_button')}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={handleLogin}
          disabled={loading}
          className="flex items-center space-x-2 px-3 py-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 text-sm"
        >
          {loading ? (
            <svg className="animate-spin -ml-1 mr-1.5 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <>
              <img src={GoogleIcon} alt="Google" className="w-4 h-4" />
              <span>{t('login_button')}</span>
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default AuthButton; 