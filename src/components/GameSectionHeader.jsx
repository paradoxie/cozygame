import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * 游戏区块标题组件 - 带有视觉增强效果
 * 
 * @param {Object} props
 * @param {string} props.title - 区块标题
 * @param {string} props.subtitle - 可选的副标题
 * @param {string} props.icon - 可选的图标路径
 * @param {string} props.iconClassName - 图标样式类
 * @param {Function} props.onAction - 可选的操作按钮回调
 * @param {string} props.actionLabel - 操作按钮文本
 */
const GameSectionHeader = ({ 
  title, 
  subtitle, 
  icon, 
  iconClassName = "text-primary-blue",
  onAction,
  actionLabel
}) => {
  const { t } = useTranslation();
  
  return (
    <div className="mb-6 relative">
      {/* 装饰背景元素 */}
      <div className="absolute left-0 -top-4 w-32 h-32 bg-primary-blue/5 rounded-full blur-2xl opacity-70 -z-10"></div>
      {icon && (
        <div className="absolute left-1/3 -bottom-8 w-40 h-40 bg-accent-yellow/5 rounded-full blur-3xl opacity-50 -z-10"></div>
      )}
      
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center">
          {/* 标题前的图标 */}
          {icon && (
            <div className="relative mr-2">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-primary-blue/20 to-accent-yellow/20 rounded-full blur-sm animate-pulse-subtle"></div>
              <img 
                src={icon} 
                alt="" 
                className={`w-6 h-6 relative z-10 ${iconClassName}`} 
                aria-hidden="true"
              />
            </div>
          )}
          
          {/* 主标题 - 带下划线装饰 */}
          <h2 className="text-xl md:text-2xl font-bold text-neutral-darkest dark:text-white relative">
            {title}
            <span className="absolute -bottom-1.5 left-0 w-12 h-1 bg-gradient-to-r from-primary-blue via-purple-600 to-accent-yellow rounded-full"></span>
          </h2>
        </div>
        
        {/* 操作按钮 (如果提供) */}
        {onAction && actionLabel && (
          <button 
            onClick={onAction}
            className="text-sm text-primary-blue dark:text-primary-blue-light hover:text-primary-blue-dark flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-primary-blue/10 transition-all"
          >
            <span>{actionLabel}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
      
      {/* 副标题 */}
      {subtitle && (
        <p className="text-neutral-medium dark:text-neutral-light text-sm mt-1 max-w-2xl">
          {subtitle}
        </p>
      )}
      
      {/* 底部装饰线 */}
      <div className="mt-4 h-px w-full bg-gradient-to-r from-neutral-light/80 via-neutral-light to-neutral-light/0 dark:from-neutral-medium/20 dark:via-neutral-medium/10 dark:to-transparent"></div>
    </div>
  );
};

export default GameSectionHeader; 