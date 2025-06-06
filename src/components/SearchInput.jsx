import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGameData } from '../hooks/useGameData';
import SearchIcon from '../assets/icons/search.svg';
import CrownIcon from '../assets/icons/crown.svg';

const SearchInput = ({ isMobile = false, isCentered = false }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { games } = useGameData();
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef(null);
  const resultsRef = useRef(null);

  // 处理点击外部关闭搜索结果
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target) && 
          inputRef.current && !inputRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim().length > 0) {
      setIsSearching(true);
      
      // 模拟搜索延迟，增加用户体验
      setTimeout(() => {
        // 简单的客户端搜索
        const results = games.filter(game => {
          const title = game.title[i18n.language] || game.title.en || '';
          const description = game.description[i18n.language] || game.description.en || '';
          const tags = game.tags?.[i18n.language] || game.tags?.en || [];
          
          const matchInTags = tags.some(tag => 
            tag.toLowerCase().includes(value.toLowerCase())
          );
          
          return title.toLowerCase().includes(value.toLowerCase()) || 
                 description.toLowerCase().includes(value.toLowerCase()) ||
                 matchInTags;
        }).slice(0, 6); // 限制结果数量
        
        setSearchResults(results);
        setShowResults(true);
        setIsSearching(false);
      }, 300);
    } else {
      setSearchResults([]);
      setShowResults(false);
      setIsSearching(false);
    }
  };

  const handleResultClick = (gameId) => {
    navigate(`/${i18n.language}/game/${gameId}`);
    setQuery('');
    setShowResults(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (query.trim().length > 0 && searchResults.length > 0) {
      setShowResults(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setShowResults(false);
    } else if (e.key === 'Enter' && searchResults.length > 0) {
      handleResultClick(searchResults[0].id);
    }
  };

  return (
    <div className={`relative ${isMobile ? 'w-full' : isCentered ? 'w-full' : 'w-64'}`}>
      <div className="relative">
        {/* 搜索框 */}
        <div className="flex items-center relative">
          <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-all duration-300 ${isFocused ? 'text-purple-600' : 'text-neutral-medium'}`}>
            <img 
              src={SearchIcon} 
              alt="Search" 
              className={`h-5 w-5 transition-transform duration-300 ${isFocused ? 'scale-110' : ''} ${isSearching ? 'animate-pulse' : ''}`} 
            />
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder={t('search_placeholder')}
            value={query}
            onChange={handleSearch}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            className={`search-input block w-full pl-10 pr-3 py-2 leading-5 bg-white dark:bg-neutral-dark focus:outline-none
              ${isFocused ? 'shadow-[0_0_8px_rgba(124,58,237,0.5)]' : ''}
              transition-all duration-300
              ${isCentered ? 'centered-search' : ''}
            `}
          />
          
          {/* 搜索中指示器 */}
          {isSearching && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 loading-wave">
              <div></div>
              <div></div>
              <div></div>
            </div>
          )}
        </div>
        
        {/* 搜索结果弹出框 */}
        {showResults && (
          <div 
            ref={resultsRef}
            className={`absolute z-40 mt-2 w-full bg-white/95 dark:bg-neutral-dark/95 backdrop-blur-sm shadow-xl rounded-xl overflow-hidden border border-neutral-light/30 dark:border-neutral-medium/30 transition-all duration-300 transform ${searchResults.length > 0 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
          >
            {searchResults.length > 0 ? (
              <>
                <div className="px-4 py-2 bg-gradient-to-r from-purple-500/10 to-transparent border-b border-neutral-light/30 dark:border-neutral-medium/30">
                  <p className="text-sm text-neutral-medium dark:text-neutral-light">
                    {t('search_results', { count: searchResults.length })}
                  </p>
                </div>
                
                <div className="max-h-[350px] overflow-y-auto">
                  {searchResults.map((game, index) => (
                    <div
                      key={game.id}
                      className={`px-4 py-3 hover:bg-purple-500/10 cursor-pointer transition-all duration-200 ${index !== searchResults.length - 1 ? 'border-b border-neutral-light/20 dark:border-neutral-medium/20' : ''}`}
                      onClick={() => handleResultClick(game.id)}
                    >
                      <div className="flex items-center">
                        {/* 游戏缩略图 */}
                        <div className="w-12 h-12 rounded-md overflow-hidden mr-3 flex-shrink-0">
                          <img 
                            src={game.thumbnailUrl} 
                            alt={game.title[i18n.language] || game.title.en}
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center">
                            <h4 className="font-medium text-neutral-darkest dark:text-white truncate">{game.title[i18n.language] || game.title.en}</h4>
                            
                            {/* VIP标识 */}
                            {game.vip && (
                              <div className="ml-2 flex-shrink-0">
                                <img src={CrownIcon} alt="VIP" className="w-4 h-4" />
                              </div>
                            )}
                          </div>
                          
                          {/* 游戏描述摘要 */}
                          <p className="text-xs text-neutral-medium dark:text-neutral-light truncate">
                            {(game.description[i18n.language] || game.description.en || '').substring(0, 60)}...
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : query.trim().length > 0 ? (
              <div className="p-4 text-center text-neutral-medium dark:text-neutral-light">
                {t('no_search_results')}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchInput; 