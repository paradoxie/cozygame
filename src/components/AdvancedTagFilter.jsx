import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * 高级标签筛选组件
 * @param {Object} props
 * @param {Array} props.games - 游戏数组
 * @param {Array} props.selectedTags - 当前选中的标签数组
 * @param {Function} props.onTagSelect - 标签选中状态变化时的回调
 * @param {Boolean} props.showTagCount - 是否显示每个标签对应的游戏数量
 * @param {String} props.filterLogic - 筛选逻辑，'AND'表示同时满足所有标签，'OR'表示满足任一标签
 * @param {Function} props.onLogicChange - 筛选逻辑变化时的回调
 * @param {Function} props.onClearTags - 清除所有标签时的回调
 */
const AdvancedTagFilter = ({ 
  games, 
  selectedTags = [], 
  onTagSelect, 
  showTagCount = true,
  filterLogic = 'AND',
  onLogicChange,
  onClearTags
}) => {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language;
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [tagCategoryFilter, setTagCategoryFilter] = useState('all');
  const MAX_VISIBLE_TAGS = 20; // 默认显示的标签数量

  // 从所有游戏中提取唯一标签和分类
  const { uniqueTags, tagCategories } = useMemo(() => {
    const tagMap = new Map(); // 使用Map存储标签及其出现次数
    const categories = new Set(['all']); // 使用Set存储标签分类

    // 根据某些常见标签类型对标签进行分类
    const categoryMap = {
      '1-player': 'player',
      '2-player': 'player',
      '3-player': 'player',
      'multiplayer': 'player',
      '2d': 'graphics',
      '3d': 'graphics',
      'mobile': 'platform',
      'mouse': 'control',
      'racing': 'genre',
      'arcade': 'genre',
      'card': 'genre',
      'puzzle': 'genre',
      'action': 'genre',
      'shooter': 'genre',
      'sport': 'genre',
      'strategy': 'genre',
      'html5': 'tech',
      'unity': 'tech',
      'webgl': 'tech',
      'free': 'access',
      'vip': 'access'
    };

    // 遍历所有游戏，收集标签和对应的游戏数量
    games.forEach(game => {
      const tags = game.tags?.[currentLang] || game.tags?.en || [];
      tags.forEach(tag => {
        if (tagMap.has(tag)) {
          tagMap.set(tag, {
            count: tagMap.get(tag).count + 1,
            category: tagMap.get(tag).category
          });
        } else {
          // 判断标签所属分类
          let category = 'other';
          for (const [key, value] of Object.entries(categoryMap)) {
            if (tag.toLowerCase().includes(key.toLowerCase())) {
              category = value;
              break;
            }
          }
          
          tagMap.set(tag, { count: 1, category });
          categories.add(category);
        }
      });
    });

    // 转换为数组并按游戏数量降序排序
    return {
      uniqueTags: Array.from(tagMap.entries())
        .sort((a, b) => b[1].count - a[1].count) // 按游戏数量降序
        .map(([tag, data]) => ({ tag, count: data.count, category: data.category })),
      tagCategories: Array.from(categories).sort()
    };
  }, [games, currentLang]);

  // 处理标签点击事件
  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      // 如果已选中，则移除
      onTagSelect(selectedTags.filter(t => t !== tag));
    } else {
      // 如果未选中，则添加
      onTagSelect([...selectedTags, tag]);
    }
  };

  // 清除所有选中的标签
  const clearAllTags = () => {
    if (onClearTags) {
      onClearTags();
    } else {
      onTagSelect([]);
    }
  };

  // 切换筛选逻辑
  const toggleFilterLogic = () => {
    onLogicChange(filterLogic === 'AND' ? 'OR' : 'AND');
  };

  // 筛选并渲染标签列表
  const filteredTags = useMemo(() => {
    return uniqueTags.filter(({ tag, category }) => {
      // 根据搜索词筛选
      const matchesSearch = searchTerm === '' || tag.toLowerCase().includes(searchTerm.toLowerCase());
      // 根据分类筛选
      const matchesCategory = tagCategoryFilter === 'all' || category === tagCategoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [uniqueTags, searchTerm, tagCategoryFilter]);

  // 渲染标签列表
  const renderTags = () => {
    const tagsToShow = showAllTags ? filteredTags : filteredTags.slice(0, MAX_VISIBLE_TAGS);
    
    if (tagsToShow.length === 0) {
      return (
        <div className="text-center py-4 text-neutral-medium dark:text-neutral-light">
          {t('no_tags_found')}
        </div>
      );
    }
    
    return (
      <div className={`flex flex-wrap gap-2 mt-3 ${isExpanded ? '' : 'max-h-[240px] overflow-hidden'}`}>
        {tagsToShow.map(({ tag, count, category }) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`px-3 py-1.5 rounded-full text-sm transition-all duration-200 flex items-center gap-1.5 ${
              selectedTags.includes(tag)
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm hover:shadow-md hover:shadow-purple-500/20 hover:-translate-y-0.5 active:translate-y-0'
                : 'bg-white dark:bg-neutral-darkest/40 hover:bg-neutral-lightest dark:hover:bg-neutral-dark text-neutral-medium dark:text-neutral-light border border-neutral-light/50 dark:border-neutral-medium/30 hover:border-purple-500/30 dark:hover:border-purple-500/30'
            }`}
            title={`${t('category')}: ${category}`}
          >
            {selectedTags.includes(tag) && (
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            )}
            <span>{tag}</span>
            {showTagCount && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                selectedTags.includes(tag)
                  ? 'bg-white/20'
                  : 'bg-neutral-medium/10 dark:bg-neutral-medium/30'
              }`}>
                {count}
              </span>
            )}
          </button>
        ))}
        
        {filteredTags.length > MAX_VISIBLE_TAGS && !showAllTags && (
          <button
            onClick={() => setShowAllTags(true)}
            className="px-3 py-1.5 rounded-full text-sm bg-white dark:bg-neutral-darkest/40 text-purple-600 hover:bg-neutral-lightest dark:hover:bg-neutral-dark border border-purple-500/30 hover:border-purple-500/50 transition-all duration-200 hover:shadow-sm"
          >
            {t('show_more_tags', { count: filteredTags.length - MAX_VISIBLE_TAGS })}
          </button>
        )}
      </div>
    );
  };

  // 渲染分类筛选器
  const renderCategoryFilter = () => {
    return (
      <div className="flex flex-wrap gap-2 my-3">
        {tagCategories.map(category => (
          <button
            key={category}
            onClick={() => setTagCategoryFilter(category)}
            className={`px-3 py-1 text-xs rounded-full transition-all duration-200 ${
              category === tagCategoryFilter
                ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium shadow-sm'
                : 'bg-white dark:bg-neutral-darkest/40 text-neutral-medium dark:text-neutral-light border border-neutral-light/50 dark:border-neutral-medium/30 hover:border-purple-500/30'
            }`}
          >
            {category === 'all' ? t('all_categories') : t(`category_${category}`, category)}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="relative bg-gradient-to-br from-white/90 via-white/80 to-white/90 dark:from-neutral-dark/90 dark:via-neutral-dark/80 dark:to-neutral-dark/90 backdrop-blur-md rounded-xl shadow-lg p-5 mb-8 border border-neutral-light/30 dark:border-neutral-medium/30 overflow-hidden">
      {/* 装饰背景元素 */}
      <div className="absolute -left-10 -top-10 w-40 h-40 bg-purple-500/10 rounded-full blur-xl animate-pulse-subtle"></div>
      <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-orange-500/5 rounded-full blur-xl"></div>
      <div className="absolute bottom-1/3 right-1/3 w-16 h-16 bg-green-500/5 rounded-full blur-xl"></div>
      
      {/* 装饰性网格线 */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
           style={{backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)', 
                   backgroundSize: '40px 40px'}}></div>
      
      {/* 标题和控制区 */}
      <div className="relative z-10 flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-full blur-sm"></div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 relative" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h10m-5-5v10m5-5H7m10 10H7" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-neutral-darkest dark:text-white bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">
            {t('advanced_filter_by_tags')}
          </h3>
          {selectedTags.length > 0 && (
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs px-2.5 py-1 rounded-full shadow-sm animate-pulse-subtle">
              {selectedTags.length}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          {selectedTags.length > 0 && (
            <button
              onClick={clearAllTags}
              className="text-sm text-neutral-medium dark:text-neutral-light hover:text-purple-600 dark:hover:text-purple-400 transition-colors px-2 py-1 rounded-md hover:bg-neutral-lightest/80 dark:hover:bg-neutral-medium/10 flex items-center gap-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              {t('clear_all')}
            </button>
          )}
          
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-neutral-medium dark:text-neutral-light hover:text-purple-600 dark:hover:text-purple-400 transition-colors p-1.5 rounded-md hover:bg-neutral-lightest/80 dark:hover:bg-neutral-medium/10"
            aria-label={isExpanded ? t('collapse_tags') : t('expand_tags')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* 搜索框和筛选选项 */}
      <div className="relative z-10 flex flex-col md:flex-row gap-4 mb-4">
        <div className="relative md:w-[55%] flex-1">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-neutral-medium dark:text-neutral-light" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('search_tags_placeholder')}
            className="w-full pl-10 pr-4 py-2.5 bg-white/70 dark:bg-neutral-darkest/60 border border-neutral-light/50 dark:border-neutral-medium/30 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/50 transition-all dark:text-white shadow-sm"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-3 flex items-center text-neutral-medium hover:text-neutral-dark dark:text-neutral-light dark:hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        
        {/* 过滤逻辑切换 */}
        <div className="flex items-center justify-end flex-1">
          <span className="text-sm font-medium text-neutral-darkest dark:text-white mr-3 whitespace-nowrap">{t('filter_logic')}:</span>
          <div className="relative flex items-center w-full max-w-[220px] h-10 bg-white dark:bg-neutral-darkest rounded-lg border border-neutral-light/50 dark:border-neutral-medium/30 shadow-sm overflow-hidden">
            <button
              onClick={toggleFilterLogic}
              className="relative w-full h-full flex items-center justify-between"
              aria-pressed={filterLogic === 'AND'}
              title={filterLogic === 'AND' ? t('logic_and') : t('logic_or')}
            >
              {/* 滑块 */}
              <span 
                className={`absolute inset-0 w-1/2 bg-gradient-to-r ${
                  filterLogic === 'AND' 
                    ? 'from-purple-600 to-indigo-600 left-0 shadow-[0_0_10px_rgba(124,58,237,0.5)]' 
                    : 'from-amber-500 to-orange-500 translate-x-full shadow-[0_0_10px_rgba(245,158,11,0.5)]'
                } transition-all duration-300 ease-in-out z-0`}
              />
              
              {/* AND按钮 */}
              <div className={`z-10 flex-1 flex justify-center items-center py-2 ${
                filterLogic === 'AND' ? 'font-semibold' : 'font-normal'
              }`}>
                <span className={`py-1 px-1 text-xs sm:text-sm ${
                  filterLogic === 'AND' 
                    ? 'text-white' 
                    : 'text-neutral-darkest dark:text-white'
                } transition-colors duration-300`}>
                  {t('logic_and')}
                </span>
              </div>
              
              {/* OR按钮 */}
              <div className={`z-10 flex-1 flex justify-center items-center py-2 ${
                filterLogic === 'OR' ? 'font-semibold' : 'font-normal'
              }`}>
                <span className={`py-1 px-1 text-xs sm:text-sm ${
                  filterLogic === 'OR' 
                    ? 'text-white' 
                    : 'text-neutral-darkest dark:text-white'
                } transition-colors duration-300`}>
                  {t('logic_or')}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* 分类筛选 */}
      <div className="relative z-10">
        <div className="flex flex-wrap gap-2 my-3">
          {tagCategories.map(category => (
            <button
              key={category}
              onClick={() => setTagCategoryFilter(category)}
              className={`px-3 py-1 text-xs rounded-full transition-all duration-200 ${
                category === tagCategoryFilter
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium shadow-sm'
                  : 'bg-white dark:bg-neutral-darkest/40 text-neutral-medium dark:text-neutral-light border border-neutral-light/50 dark:border-neutral-medium/30 hover:border-purple-500/30'
              }`}
            >
              {category === 'all' ? t('all_categories') : t(`category_${category}`, category)}
            </button>
          ))}
        </div>
      </div>
      
      {/* 标签列表 */}
      <div className="relative z-10">
        {filteredTags.length === 0 ? (
          <div className="text-center py-4 text-neutral-medium dark:text-neutral-light">
            {t('no_tags_found')}
          </div>
        ) : (
          <div className={`flex flex-wrap gap-2 mt-3 ${isExpanded ? '' : 'max-h-[240px] overflow-hidden'}`}>
            {(showAllTags ? filteredTags : filteredTags.slice(0, MAX_VISIBLE_TAGS)).map(({ tag, count, category }) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all duration-200 flex items-center gap-1.5 ${
                  selectedTags.includes(tag)
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm hover:shadow-md hover:shadow-purple-500/20 hover:-translate-y-0.5 active:translate-y-0'
                    : 'bg-white dark:bg-neutral-darkest/40 hover:bg-neutral-lightest dark:hover:bg-neutral-dark text-neutral-medium dark:text-neutral-light border border-neutral-light/50 dark:border-neutral-medium/30 hover:border-purple-500/30 dark:hover:border-purple-500/30'
                }`}
                title={`${t('category')}: ${category}`}
              >
                {selectedTags.includes(tag) && (
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                )}
                <span>{tag}</span>
                {showTagCount && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    selectedTags.includes(tag)
                      ? 'bg-white/20'
                      : 'bg-neutral-medium/10 dark:bg-neutral-medium/30'
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            ))}
            
            {filteredTags.length > MAX_VISIBLE_TAGS && !showAllTags && (
              <button
                onClick={() => setShowAllTags(true)}
                className="px-3 py-1.5 rounded-full text-sm bg-white dark:bg-neutral-darkest/40 text-purple-600 hover:bg-neutral-lightest dark:hover:bg-neutral-dark border border-purple-500/30 hover:border-purple-500/50 transition-all duration-200 hover:shadow-sm"
              >
                {t('show_more_tags', { count: filteredTags.length - MAX_VISIBLE_TAGS })}
              </button>
            )}
          </div>
        )}
      </div>
      
      {/* 当前筛选信息 */}
      {selectedTags.length > 0 && (
        <div className="relative z-10 mt-4 p-2 bg-gradient-to-r from-purple-500/5 to-indigo-500/5 rounded-lg border border-purple-200/30 dark:border-purple-500/20">
          <p className="text-xs text-neutral-medium dark:text-neutral-light text-center">
            {filterLogic === 'AND' 
              ? t('current_filter_and', { count: selectedTags.length })
              : t('current_filter_or', { count: selectedTags.length })
            }
          </p>
        </div>
      )}
      
      {/* 标签过多时的渐变遮罩 */}
      {!isExpanded && filteredTags.length > MAX_VISIBLE_TAGS && (
        <div 
          className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/90 dark:from-neutral-dark/90 to-transparent pointer-events-none z-20"
          onClick={() => setIsExpanded(true)}
        ></div>
      )}
    </div>
  );
};

export default AdvancedTagFilter; 