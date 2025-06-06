import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SEOHelmet from './SEOHelmet';

/**
 * 通用静态页面布局组件
 * 
 * @param {Object} props
 * @param {string} props.title - 页面标题
 * @param {string} props.description - 页面描述（用于SEO）
 * @param {string} props.icon - 页面图标SVG路径（可选）
 * @param {string} props.iconAlt - 图标替代文本（可选）
 * @param {React.ReactNode} props.children - 页面内容
 * @param {string} props.lastUpdated - 最后更新日期（可选，用于法律页面）
 * @param {string} props.gradientColors - 自定义渐变色（可选，格式："from-color via-color to-color"）
 * @param {Array} props.keywords - 页面关键词数组（可选）
 * @param {Object} props.structuredData - 结构化数据对象（可选）
 * @param {string} props.type - 页面类型（可选，默认为'website'）
 */
const StaticPageLayout = ({ 
  title, 
  description, 
  icon, 
  iconAlt = "", 
  children, 
  lastUpdated,
  gradientColors = "from-amber-500/20 via-pink-400/20 to-indigo-500/20", // 默认使用cozy风格渐变色
  keywords,
  structuredData,
  type = 'website'
}) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  
  // 构建替代语言URL
  const supportedLanguages = ['en', 'zh-CN', 'es', 'fr', 'de', 'ru', 'ja'];
  const baseUrl = 'https://cozygame.fun';
  const pathWithoutLang = window.location.pathname.replace(new RegExp(`^/${currentLanguage}`), '');
  
  const alternateUrls = supportedLanguages.reduce((acc, lang) => {
    acc[lang] = `${baseUrl}/${lang}${pathWithoutLang}`;
    return acc;
  }, {});
  
  // 页面内容的动画变体
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };
  
  // 子元素的动画变体
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  // 装饰元素的动画变体
  const decorVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <SEOHelmet
        title={title}
        description={description}
        type={type}
        keywords={keywords}
        structuredData={structuredData}
        alternateUrls={alternateUrls}
      />
      
      <div className="relative overflow-hidden max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* 背景装饰元素 */}
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-br ${gradientColors} opacity-20 dark:opacity-10 rounded-3xl`}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.2, 0.15] }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        
        {/* 装饰性气泡 */}
        <motion.div 
          className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-300/10 dark:bg-indigo-500/5 rounded-full blur-3xl"
          variants={decorVariants}
          initial="hidden"
          animate="visible"
        />
        <motion.div 
          className="absolute -bottom-32 -left-20 w-80 h-80 bg-amber-300/10 dark:bg-amber-500/5 rounded-full blur-3xl"
          variants={decorVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        />
        
        {/* 内容容器 */}
        <motion.div 
          className="relative z-10 bg-white/80 dark:bg-neutral-dark/80 backdrop-blur-sm rounded-2xl shadow-xl dark:shadow-neutral-darkest/20 p-6 md:p-8 border border-neutral-light/20 dark:border-neutral-dark/50"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
        >
          {/* 页面标题 */}
          <motion.div 
            className="flex items-center gap-3 mb-8"
            variants={itemVariants}
          >
            {icon && (
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-amber-500/20 via-pink-400/20 to-indigo-500/20 p-2.5 cozy-shadow">
                <img src={icon} alt={iconAlt} className="w-full h-full" />
              </div>
            )}
            <h1 className="text-2xl md:text-3xl font-bold text-gradient-cozy">{title}</h1>
          </motion.div>
          
          {/* 最后更新日期（如果提供） */}
          {lastUpdated && (
            <motion.p 
              className="text-sm text-neutral-medium mb-6 italic"
              variants={itemVariants}
            >
              {t('last_updated', { date: lastUpdated })}
            </motion.p>
          )}
          
          {/* 页面内容 */}
          <motion.div variants={itemVariants}>
            {children}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default StaticPageLayout; 