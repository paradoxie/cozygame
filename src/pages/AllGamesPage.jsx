import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useGameData } from '../hooks/useGameData';
import GameList from '../components/GameList';
import GameSectionHeader from '../components/GameSectionHeader';
import InfiniteScroll from '../components/InfiniteScroll';
import AdvancedTagFilter from '../components/AdvancedTagFilter';
import ArrowLeftIcon from '../assets/icons/arrow-left.svg';

const AllGamesPage = () => {
  const { t, i18n } = useTranslation();
  const { 
    games, allGames, loading, initialLoading, error, 
    loadMoreGames, hasMore, filterGames 
  } = useGameData();
  
  const [selectedTags, setSelectedTags] = useState([]);
  const [filterLogic, setFilterLogic] = useState('AND'); // 'AND' 或 'OR'
  const [filteredGames, setFilteredGames] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const currentLang = i18n.language;
  
  // 当标签或过滤逻辑改变时，使用Web Worker过滤游戏
  useEffect(() => {
    if (initialLoading) return;
    
    const applyFilter = async () => {
      if (selectedTags.length === 0) {
        // 如果没有选中标签，显示所有游戏
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
  const clearTags = () => {
    setSelectedTags([]);
  };
  
  // 是否显示过滤后的游戏列表
  const showFilteredGames = selectedTags.length > 0;
  
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
        <title>{t('all_games_page_title', { siteName: t('site_name') })}</title>
        <meta name="description" content={t('all_games_page_description', { siteName: t('site_name') })} />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        {/* 返回首页按钮 */}
        <div className="mb-6">
          <Link 
            to={`/${currentLang}`}
            className="inline-flex items-center text-neutral-medium hover:text-primary-blue transition-colors"
          >
            <img src={ArrowLeftIcon} alt="" className="w-5 h-5 mr-2" aria-hidden="true" />
            {t('back_to_home')}
          </Link>
        </div>
        
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">{t('all_games')}</h1>
          <p className="text-neutral-medium mt-2">{t('all_games_subtitle', { count: allGames.length })}</p>
        </div>
        
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
          // 显示所有游戏，并自动加载
          <div className="w-full pb-8">
            <GameSectionHeader 
              title={t('browse_all_games')}
              subtitle={t('all_games_count', { count: allGames.length })}
            />
            <InfiniteScroll
              onLoadMore={loadMoreGames}
              hasMore={hasMore}
              loading={loading}
            >
              <GameList 
                games={games}
                showTitle={false}
              />
            </InfiniteScroll>
          </div>
        )}
      </div>
    </>
  );
};

export default AllGamesPage; 