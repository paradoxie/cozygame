import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import StaticPageLayout from '../components/StaticPageLayout';
import AboutIcon from '../assets/icons/about-icon.svg';

const AboutPage = () => {
  const { t } = useTranslation();
  
  // 动画变体
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  const listVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  return (
    <StaticPageLayout
      title={t('about_us')}
      description={t('about_page_description')}
      icon={AboutIcon}
      iconAlt={t('about_icon_alt')}
      gradientColors="from-pink-500/20 via-purple-400/20 to-indigo-500/20"
    >
      <motion.section 
        className="mb-8"
        variants={itemVariants}
      >
        <h2 className="text-xl font-semibold mb-4 text-gradient-cozy">{t('about_our_mission')}</h2>
        <div className="bg-white/60 dark:bg-neutral-dark/60 rounded-xl p-5 backdrop-blur-sm shadow-sm cozy-shadow">
          <p className="mb-4 text-neutral-darkest dark:text-neutral-lightest leading-relaxed">{t('about_mission_text')}</p>
        </div>
      </motion.section>

      <motion.section 
        className="mb-8"
        variants={itemVariants}
      >
        <h2 className="text-xl font-semibold mb-4 text-gradient-cozy">{t('about_what_we_offer')}</h2>
        <div className="bg-white/60 dark:bg-neutral-dark/60 rounded-xl p-5 backdrop-blur-sm shadow-sm cozy-shadow">
          <p className="mb-4 text-neutral-darkest dark:text-neutral-lightest leading-relaxed">{t('about_offer_text')}</p>
          
          <motion.ul 
            className="space-y-3 mt-6"
            variants={listVariants}
            initial="hidden"
            animate="visible"
          >
            {[1, 2, 3, 4].map((num) => (
              <motion.li 
                key={num} 
                className="flex items-start"
                variants={itemVariants}
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-amber-500 to-pink-500 flex items-center justify-center text-white text-sm font-medium mr-3 mt-0.5 shadow-sm animate-pulse-subtle">
                  {num}
                </div>
                <p className="text-neutral-darkest dark:text-neutral-lightest">
                  {t(`about_feature_${num}`)}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </motion.section>

      <motion.section
        variants={itemVariants}
      >
        <h2 className="text-xl font-semibold mb-4 text-gradient-cozy">{t('about_our_team')}</h2>
        <div className="bg-white/60 dark:bg-neutral-dark/60 rounded-xl p-5 backdrop-blur-sm shadow-sm cozy-shadow">
          <p className="text-neutral-darkest dark:text-neutral-lightest leading-relaxed">{t('about_team_text')}</p>
          
          <motion.div 
            className="mt-6 p-4 border border-amber-200/50 dark:border-amber-700/30 rounded-lg bg-gradient-to-r from-amber-50/50 to-pink-50/50 dark:from-amber-900/10 dark:to-pink-900/10 cozy-shadow"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="text-center mb-6">
              <div className="text-xl font-medium text-gradient-warm italic">
                "{t('about_team_quote')}"
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </StaticPageLayout>
  );
};

export default AboutPage; 