import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import StaticPageLayout from '../components/StaticPageLayout';
import CookieIcon from '../assets/icons/cookie-icon.svg';
import { Helmet } from 'react-helmet-async';

const CookiePolicyPage = () => {
  const { t } = useTranslation();
  
  // 假设的最后更新日期
  const lastUpdated = '2025-06-01';
  
  // 动画变体
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('cookie_policy')} | {t('site_name')}</title>
        <meta name="description" content={t('cookie_policy_page_description')} />
      </Helmet>
      <StaticPageLayout
        title={t('cookie_policy')}
        description={t('cookie_policy_page_description', { defaultValue: "Learn about how CozyGame.fun uses cookies and similar technologies." })}
        icon={CookieIcon}
        iconAlt={t('cookie_icon_alt', { defaultValue: "Cookie Policy Icon" })}
        lastUpdated={lastUpdated}
        gradientColors="from-amber-500/20 via-amber-300/20 to-orange-400/20"
      >
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* 介绍 */}
          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gradient-cozy">{t('cookie_introduction')}</h2>
            <div className="bg-white/60 dark:bg-neutral-dark/60 rounded-xl p-5 backdrop-blur-sm shadow-sm cozy-shadow">
              <p className="text-neutral-darkest dark:text-neutral-lightest leading-relaxed">
                {t('cookie_introduction_text')}
              </p>
              <p className="mt-4 text-neutral-darkest dark:text-neutral-lightest leading-relaxed">
                {t('cookie_introduction_text_2')}
              </p>
            </div>
          </motion.section>
          
          {/* Cookie类型 */}
          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gradient-cozy">{t('cookie_types')}</h2>
            <div className="bg-white/60 dark:bg-neutral-dark/60 rounded-xl p-5 backdrop-blur-sm shadow-sm cozy-shadow">
              <p className="mb-4 text-neutral-darkest dark:text-neutral-lightest leading-relaxed">
                {t('cookie_types_text')}
              </p>
              
              <div className="space-y-4">
                <div className="pl-4 border-l-2 border-amber-300 dark:border-amber-600">
                  <h3 className="font-medium text-amber-700 dark:text-amber-400">{t('cookie_essential')}</h3>
                  <p className="text-neutral-darkest dark:text-neutral-lightest">
                    {t('cookie_essential_text')}
                  </p>
                </div>
                
                <div className="pl-4 border-l-2 border-amber-300 dark:border-amber-600">
                  <h3 className="font-medium text-amber-700 dark:text-amber-400">{t('cookie_functionality')}</h3>
                  <p className="text-neutral-darkest dark:text-neutral-lightest">
                    {t('cookie_functionality_text')}
                  </p>
                </div>
                
                <div className="pl-4 border-l-2 border-amber-300 dark:border-amber-600">
                  <h3 className="font-medium text-amber-700 dark:text-amber-400">{t('cookie_analytics')}</h3>
                  <p className="text-neutral-darkest dark:text-neutral-lightest">
                    {t('cookie_analytics_text')}
                  </p>
                </div>
              </div>
            </div>
          </motion.section>
          
          {/* 如何控制Cookie */}
          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gradient-cozy">{t('cookie_control')}</h2>
            <div className="bg-white/60 dark:bg-neutral-dark/60 rounded-xl p-5 backdrop-blur-sm shadow-sm cozy-shadow">
              <p className="mb-4 text-neutral-darkest dark:text-neutral-lightest leading-relaxed">
                {t('cookie_control_text')}
              </p>
              <p className="text-neutral-darkest dark:text-neutral-lightest leading-relaxed">
                {t('cookie_control_text_2')}
              </p>
            </div>
          </motion.section>
          
          {/* 政策更新 */}
          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gradient-cozy">{t('cookie_updates')}</h2>
            <div className="bg-white/60 dark:bg-neutral-dark/60 rounded-xl p-5 backdrop-blur-sm shadow-sm cozy-shadow">
              <p className="text-neutral-darkest dark:text-neutral-lightest leading-relaxed">
                {t('cookie_updates_text')}
              </p>
              <p className="mt-4 text-neutral-darkest dark:text-neutral-lightest leading-relaxed">
                {t('cookie_updates_text_2')}
              </p>
            </div>
          </motion.section>
          
          {/* 联系我们 */}
          <motion.section variants={itemVariants}>
            <h2 className="text-xl font-semibold mb-4 text-gradient-cozy">{t('cookie_contact')}</h2>
            <div className="bg-white/60 dark:bg-neutral-dark/60 rounded-xl p-5 backdrop-blur-sm shadow-sm cozy-shadow">
              <p className="text-neutral-darkest dark:text-neutral-lightest leading-relaxed">
                {t('cookie_contact_text')}
              </p>
              <p className="mt-2 font-medium text-amber-700 dark:text-amber-400">
                admin@cozygame.fun
              </p>
            </div>
          </motion.section>
        </motion.div>
      </StaticPageLayout>
    </>
  );
};

export default CookiePolicyPage; 