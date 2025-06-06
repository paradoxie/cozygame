import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useGameData } from '../hooks/useGameData';
import GameCarousel from '../components/GameCarousel';
import GameList from '../components/GameList';
import GameSectionHeader from '../components/GameSectionHeader';
import AdvancedTagFilter from '../components/AdvancedTagFilter';
import BookmarkPrompt from '../components/BookmarkPrompt';
import DebugInfo from '../components/DebugInfo';
import CrownIcon from '../assets/icons/crown.svg';

// 随机打乱数组的辅助函数
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const HomePage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { 
    games, allGames, loading, initialLoading, error, 
    loadMoreGames, hasMore, filterGames 
  } = useGameData();
  
  const [selectedTags, setSelectedTags] = useState([]);
  const [filterLogic, setFilterLogic] = useState('AND'); // 'AND' 或 'OR'
  const [filteredGames, setFilteredGames] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [displayCount, setDisplayCount] = useState(20); // 添加显示计数状态
  const currentLang = i18n.language;
  
  // 开发环境启用调试
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setShowDebug(true);
    }
    
    // 也可以通过URL参数启用调试
    const params = new URLSearchParams(window.location.search);
    if (params.get('debug') === 'true') {
      setShowDebug(true);
    }
  }, []);
  
  // 随机筛选推荐游戏 (使用allGames确保始终获取所有推荐游戏)
  const recommendedGames = useMemo(() => {
    const recommended = allGames.filter(game => game.isRecommended);
    return shuffleArray(recommended).slice(0, 10);
  }, [allGames]);
  
  // 筛选VIP游戏
  const vipGames = useMemo(() => {
    const vip = allGames.filter(game => game.vip);
    return shuffleArray(vip).slice(0, 6);
  }, [allGames]);
  
  // 在首页只显示随机的前N个游戏
  const displayedGames = useMemo(() => {
    // 如果正在加载更多或初始加载，保持当前顺序
    if (loading || initialLoading) return games.slice(0, displayCount);
    
    // 否则随机排序
    const hotGames = shuffleArray(games);
    return hotGames.slice(0, displayCount);
  }, [games, displayCount, loading, initialLoading]);
  
  // 当标签或过滤逻辑改变时，使用Web Worker过滤游戏
  useEffect(() => {
    if (initialLoading) return;
    
    const applyFilter = async () => {
      if (selectedTags.length === 0) {
        // 如果没有选中标签，显示热门游戏（由Hook分页加载）
        setIsFiltering(false);
        return;
      }
      
      // 正在筛选
      setIsFiltering(true);
      
      // 使用Web Worker过滤游戏
      const filtered = await filterGames(selectedTags, filterLogic, currentLang);
      setFilteredGames(filtered);
      
      setIsFiltering(false);
    };
    
    applyFilter();
  }, [selectedTags, filterLogic, currentLang, initialLoading, filterGames, allGames]);
  
  // 清除标签
  const clearTags = useCallback(() => {
    setSelectedTags([]);
  }, []);
  
  // 是否显示过滤后的游戏列表
  const showFilteredGames = selectedTags.length > 0;

  // 导航到全部游戏页面
  const navigateToAllGames = () => {
    navigate(`/${currentLang}/all-games`);
  };
  
  // 导航到VIP区域
  const navigateToVipZone = () => {
    navigate(`/${currentLang}/vip-zone`);
  };
  
  if (initialLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-primary-blue mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-error-red mb-4">{t("error_loading_games")}</p>
        <button 
          onClick={() => window.location.reload()}
          className="btn btn-primary"
        >
          {t("retry_button")}
        </button>
      </div>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>{t('home_page_title', { siteName: t('site_name') })}</title>
        <meta name="description" content={t('home_page_description', { siteName: t('site_name') })} />
      </Helmet>
      
      {/* 调试信息 */}
      <DebugInfo 
        isVisible={showDebug} 
        gameData={{ games, allGames, loading, initialLoading, hasMore }}
      />
      
      {/* 推荐游戏轮播 */}
      {recommendedGames.length > 0 && (
        <GameCarousel games={recommendedGames} />
      )}
      
      {/* 高级标签筛选器 */}
      <AdvancedTagFilter 
        games={allGames}
        selectedTags={selectedTags}
        onTagSelect={setSelectedTags}
        filterLogic={filterLogic}
        onLogicChange={setFilterLogic}
        onClearTags={clearTags}
      />
      
      {/* 根据是否有筛选条件展示不同内容 */}
      {isFiltering ? (
        <div className="flex justify-center items-center py-12">
          <svg className="animate-spin h-10 w-10 text-primary-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : showFilteredGames ? (
        // 显示过滤后的游戏
        <div className="w-full pb-8">
          <GameSectionHeader 
            title={t('filtered_games', { count: filteredGames.length })}
            subtitle={selectedTags.length > 0 ? t('filtered_by_tags', { count: selectedTags.length }) : null}
          />
          <GameList 
            games={filteredGames}
            showTitle={false}
            emptyMessage={t('no_games_match_tags')}
          />
        </div>
      ) : (
        // 显示热门游戏（前20个）和VIP区域
        <>
          <div className="w-full pb-8">
            <GameSectionHeader 
              title={t('hot_games')}
              subtitle={t('games_preview_subtitle', { count: displayedGames.length, total: allGames.length })}
            />
            <GameList 
              games={displayedGames}
              showTitle={false}
            />
            
            {/* 加载更多和全部游戏按钮 */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <button 
                onClick={() => {
                  loadMoreGames();
                  setDisplayCount(prevCount => prevCount + 20);
                }}
                disabled={loading || !hasMore}
                className="btn bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 hover:shadow-md hover:shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('loading')}
                  </span>
                ) : (
                  t('load_more')
                )}
              </button>
              
              <button 
                onClick={navigateToAllGames}
                className="btn btn-secondary px-8"
              >
                {t('view_all_games')}
              </button>
            </div>
          </div>
          
          {/* VIP专区 - 移至热门游戏下方 */}
          {vipGames.length > 0 && (
            <div className="w-full my-12">
              <GameSectionHeader 
                title={t('vip_zone_headline')}
                subtitle={t('vip_zone_subheadline')}
                icon={CrownIcon}
                iconClassName="text-accent-yellow"
              />
              
              <div className="relative overflow-hidden rounded-2xl max-w-screen-xl mx-auto bg-gradient-to-b from-white/50 to-neutral-lightest/50 dark:from-neutral-dark/50 dark:to-neutral-darkest/50 backdrop-blur-sm border border-primary-blue/10 dark:border-primary-blue/20">
                {/* 装饰性元素 */}
                <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-accent-yellow/5 rounded-full blur-xl"></div>
                <div className="absolute -left-20 -top-20 w-64 h-64 bg-primary-blue/5 rounded-full blur-xl"></div>
                <div className="absolute right-1/4 top-0 w-1 h-full bg-gradient-to-b from-accent-yellow/10 to-transparent"></div>
                <div className="absolute left-1/3 bottom-0 w-full h-1 bg-gradient-to-r from-primary-blue/10 to-transparent"></div>
                
                {/* VIP游戏预览 */}
                <div className="relative z-10 p-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                    {vipGames.map((game) => (
                      <div 
                        key={game.id} 
                        className="relative group cursor-pointer overflow-hidden rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent-yellow/10"
                        onClick={() => navigate(`/${currentLang}/game/${game.id}`)}
                      >
                        <div className="aspect-w-1 aspect-h-1 bg-neutral-lightest dark:bg-neutral-dark/30">
                          <img 
                            src={game.thumbnailUrl} 
                            alt={game.title[currentLang] || game.title.en}
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-neutral-darkest/80 to-transparent opacity-100 group-hover:opacity-80 transition-opacity"></div>
                          <div className="absolute top-1 right-1">
                            <img src={CrownIcon} className="w-4 h-4" alt="VIP" />
                          </div>
                          <div className="absolute bottom-1 left-1 right-1 text-xs text-white font-medium truncate px-1">
                            {game.title[currentLang] || game.title.en}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-center mt-6">
                    <button 
                      onClick={navigateToVipZone} 
                      className="btn btn-secondary flex items-center gap-2 px-6"
                    >
                      <img src={CrownIcon} className="w-4 h-4" alt="VIP Crown" />
                      <span>{t('view_all_vip_games')}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      
      {/* 书签提示 */}
      <BookmarkPrompt />
    </>
  );
};

export default HomePage; 