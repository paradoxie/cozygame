import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * 标签筛选组件
 * @param {Object} props
 * @param {Array} props.games - 游戏数组
 * @param {Array} props.selectedTags - 当前选中的标签数组
 * @param {Function} props.onTagSelect - 标签选中状态变化时的回调
 * @param {Boolean} props.showTagCount - 是否显示每个标签对应的游戏数量
 */
const TagFilter = ({ games, selectedTags = [], onTagSelect, showTagCount = true }) => {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language;
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);
  const MAX_VISIBLE_TAGS = 12; // 默认显示的标签数量

  // 从所有游戏中提取唯一标签
  const uniqueTags = useMemo(() => {
    const tagMap = new Map(); // 使用Map存储标签及其出现次数

    // 遍历所有游戏，收集标签和对应的游戏数量
    games.forEach(game => {
      const tags = game.tags?.[currentLang] || game.tags?.en || [];
      tags.forEach(tag => {
        if (tagMap.has(tag)) {
          tagMap.set(tag, tagMap.get(tag) + 1);
        } else {
          tagMap.set(tag, 1);
        }
      });
    });

    // 转换为数组并按游戏数量降序排序
    return Array.from(tagMap.entries())
      .sort((a, b) => b[1] - a[1]) // 按游戏数量降序
      .map(([tag, count]) => ({ tag, count }));
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
    onTagSelect([]);
  };

  // 切换展开/收起状态
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // 渲染标签列表
  const renderTags = () => {
    const tagsToShow = showAllTags ? uniqueTags : uniqueTags.slice(0, MAX_VISIBLE_TAGS);
    
    return (
      <div className={`flex flex-wrap gap-2 mt-2 ${isExpanded ? '' : 'max-h-[120px] overflow-hidden'}`}>
        {tagsToShow.map(({ tag, count }) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`px-3 py-1.5 rounded-full text-sm transition-all duration-200 flex items-center gap-1.5 ${
              selectedTags.includes(tag)
                ? 'bg-primary-blue text-white hover:bg-primary-blue-dark'
                : 'bg-neutral-lightest dark:bg-neutral-dark hover:bg-neutral-light dark:hover:bg-neutral-medium/30 text-neutral-medium'
            }`}
          >
            <span>{tag}</span>
            {showTagCount && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                selectedTags.includes(tag)
                  ? 'bg-white/20'
                  : 'bg-neutral-medium/20'
              }`}>
                {count}
              </span>
            )}
          </button>
        ))}
        
        {uniqueTags.length > MAX_VISIBLE_TAGS && !showAllTags && (
          <button
            onClick={() => setShowAllTags(true)}
            className="px-3 py-1.5 rounded-full text-sm bg-neutral-lightest dark:bg-neutral-dark text-primary-blue hover:bg-neutral-light dark:hover:bg-neutral-medium/30 transition-all duration-200"
          >
            {t('show_more_tags', { count: uniqueTags.length - MAX_VISIBLE_TAGS })}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">{t('filter_by_tags')}</h3>
          {selectedTags.length > 0 && (
            <span className="bg-primary-blue text-white text-xs px-2 py-0.5 rounded-full">
              {selectedTags.length}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {selectedTags.length > 0 && (
            <button
              onClick={clearAllTags}
              className="text-sm text-neutral-medium hover:text-primary-blue transition-colors"
            >
              {t('clear_all')}
            </button>
          )}
          
          <button 
            onClick={toggleExpand}
            className="text-neutral-medium hover:text-primary-blue transition-colors"
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
      
      {renderTags()}
      
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-neutral-lightest dark:border-neutral-medium/20">
          <div className="text-sm text-neutral-medium mr-2">{t('selected_tags')}:</div>
          {selectedTags.map(tag => (
            <div 
              key={tag}
              className="bg-primary-blue/10 text-primary-blue text-sm px-2 py-1 rounded-full flex items-center gap-1"
            >
              <span>{tag}</span>
              <button
                onClick={() => handleTagClick(tag)}
                className="hover:bg-primary-blue/20 rounded-full p-0.5 transition-colors"
                aria-label={`${t('remove_tag')} ${tag}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagFilter; 