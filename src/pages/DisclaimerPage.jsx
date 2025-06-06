import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import StaticPageLayout from '../components/StaticPageLayout';
import DisclaimerIcon from '../assets/icons/disclaimer-icon.svg';

const DisclaimerPage = () => {
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
    <StaticPageLayout
      title={t('disclaimer')}
      description={t('disclaimer_page_description')}
      icon={DisclaimerIcon}
      iconAlt={t('disclaimer_icon_alt')}
      lastUpdated={lastUpdated}
      gradientColors="from-green-500/20 via-blue-400/20 to-teal-500/20"
    >
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        <motion.section variants={itemVariants}>
          <h2 className="text-xl font-semibold mb-4 text-gradient-cozy">{t('disclaimer_introduction')}</h2>
          <div className="bg-white/60 dark:bg-neutral-dark/60 rounded-xl p-5 backdrop-blur-sm shadow-sm cozy-shadow">
            <p className="text-neutral-darkest dark:text-neutral-lightest leading-relaxed">
              {t('disclaimer_introduction_text')}
            </p>
          </div>
        </motion.section>
        
        <motion.section variants={itemVariants}>
          <h2 className="text-xl font-semibold mb-4 text-gradient-cozy">{t('disclaimer_interpretation')}</h2>
          <div className="bg-white/60 dark:bg-neutral-dark/60 rounded-xl p-5 backdrop-blur-sm shadow-sm cozy-shadow">
            <p className="text-neutral-darkest dark:text-neutral-lightest leading-relaxed">
              {t('disclaimer_interpretation_text')}
            </p>
          </div>
        </motion.section>
        
        <motion.section variants={itemVariants}>
          <h2 className="text-xl font-semibold mb-4 text-gradient-cozy">{t('disclaimer_external_links')}</h2>
          <div className="bg-white/60 dark:bg-neutral-dark/60 rounded-xl p-5 backdrop-blur-sm shadow-sm cozy-shadow">
            <p className="text-neutral-darkest dark:text-neutral-lightest leading-relaxed">
              {t('disclaimer_external_links_text')}
            </p>
          </div>
        </motion.section>
        
        <motion.section variants={itemVariants}>
          <h2 className="text-xl font-semibold mb-4 text-gradient-cozy">{t('disclaimer_game_content')}</h2>
          <div className="bg-white/60 dark:bg-neutral-dark/60 rounded-xl p-5 backdrop-blur-sm shadow-sm cozy-shadow">
            <p className="text-neutral-darkest dark:text-neutral-lightest leading-relaxed">
              {t('disclaimer_game_content_text')}
            </p>
            
            <div className="p-4 bg-gradient-to-r from-amber-50/50 to-orange-50/50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-lg border border-amber-100/50 dark:border-amber-800/20 my-6">
              <p className="text-sm text-amber-800 dark:text-amber-300">
                {t('disclaimer_game_content_note')}
              </p>
            </div>
          </div>
        </motion.section>
        
        <motion.section variants={itemVariants}>
          <h2 className="text-xl font-semibold mb-4 text-gradient-cozy">{t('disclaimer_errors_inaccuracies')}</h2>
          <div className="bg-white/60 dark:bg-neutral-dark/60 rounded-xl p-5 backdrop-blur-sm shadow-sm cozy-shadow">
            <p className="text-neutral-darkest dark:text-neutral-lightest leading-relaxed">
              {t('disclaimer_errors_inaccuracies_text')}
            </p>
          </div>
        </motion.section>
        
        <motion.section variants={itemVariants}>
          <h2 className="text-xl font-semibold mb-4 text-gradient-cozy">{t('disclaimer_fair_use')}</h2>
          <div className="bg-white/60 dark:bg-neutral-dark/60 rounded-xl p-5 backdrop-blur-sm shadow-sm cozy-shadow">
            <p className="text-neutral-darkest dark:text-neutral-lightest leading-relaxed">
              {t('disclaimer_fair_use_text')}
            </p>
          </div>
        </motion.section>
        
        <motion.section variants={itemVariants}>
          <h2 className="text-xl font-semibold mb-4 text-gradient-cozy">{t('disclaimer_views_expressed')}</h2>
          <div className="bg-white/60 dark:bg-neutral-dark/60 rounded-xl p-5 backdrop-blur-sm shadow-sm cozy-shadow">
            <p className="text-neutral-darkest dark:text-neutral-lightest leading-relaxed">
              {t('disclaimer_views_expressed_text')}
            </p>
          </div>
        </motion.section>
        
        <motion.section variants={itemVariants}>
          <h2 className="text-xl font-semibold mb-4 text-gradient-cozy">{t('disclaimer_no_responsibility')}</h2>
          <div className="bg-white/60 dark:bg-neutral-dark/60 rounded-xl p-5 backdrop-blur-sm shadow-sm cozy-shadow">
            <p className="text-neutral-darkest dark:text-neutral-lightest leading-relaxed">
              {t('disclaimer_no_responsibility_text')}
            </p>
          </div>
        </motion.section>
        
        <motion.section variants={itemVariants}>
          <h2 className="text-xl font-semibold mb-4 text-gradient-cozy">{t('disclaimer_contact')}</h2>
          <div className="bg-white/60 dark:bg-neutral-dark/60 rounded-xl p-5 backdrop-blur-sm shadow-sm cozy-shadow">
            <p className="text-neutral-darkest dark:text-neutral-lightest leading-relaxed">
              {t('disclaimer_contact_text')}
            </p>
            <p className="mt-2 font-medium text-teal-700 dark:text-teal-400">
              admin@cozygame.fun
            </p>
          </div>
        </motion.section>
      </motion.div>
    </StaticPageLayout>
  );
};

export default DisclaimerPage; 