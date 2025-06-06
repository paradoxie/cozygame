import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import StaticPageLayout from '../components/StaticPageLayout';
import SitemapIcon from '../assets/icons/sitemap-icon.svg';
import { Helmet } from 'react-helmet-async';
import { currentSupportedLngs } from '../i18n';

const SitemapPage = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  
  // 动画变体
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  // 网站地图结构
  const sections = [
    {
      title: t('sitemap_main_pages'),
      links: [
        { name: t('nav_home'), path: `/${currentLang}` },
        { name: t('nav_all_games'), path: `/${currentLang}/all-games` },
        { name: t('nav_vip_zone'), path: `/${currentLang}/vip-zone` },
        { name: t('nav_about'), path: `/${currentLang}/about` },
        { name: t('contact_us'), path: `/${currentLang}/contact` }
      ]
    },
    {
      title: t('sitemap_account'),
      links: [
        { name: t('sitemap_favorites'), path: `/${currentLang}#favorites` },
        { name: t('sitemap_recent'), path: `/${currentLang}#recent` },
        { name: t('sitemap_tag_filter'), path: `/${currentLang}#filter` }
      ]
    },
    {
      title: t('sitemap_info_pages'),
      links: [
        { name: t('privacy_policy'), path: `/${currentLang}/privacy` },
        { name: t('terms_of_service'), path: `/${currentLang}/terms` },
        { name: t('disclaimer'), path: `/${currentLang}/disclaimer` },
        { name: t('cookie_policy'), path: `/${currentLang}/cookie-policy` },
        { name: t('sitemap'), path: `/${currentLang}/sitemap` }
      ]
    },
    {
      title: t('sitemap_languages'),
      links: currentSupportedLngs.map(lng => ({
        name: t(`lang_${lng}`),
        path: `/${lng}`
      }))
    }
  ];

  return (
    <>
      <Helmet>
        <title>{t('sitemap')} | {t('site_name')}</title>
        <meta name="description" content={t('sitemap_page_description')} />
      </Helmet>
      <StaticPageLayout 
        iconSrc={SitemapIcon}
        iconAlt={t('sitemap_icon_alt')}
        title={t('sitemap')}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.p 
              className="text-center text-neutral-medium dark:text-neutral-light mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {t('sitemap_intro')}
            </motion.p>
            
            {sections.map((section, index) => (
              <motion.section 
                key={index}
                className="bg-white/60 dark:bg-neutral-dark/60 rounded-xl p-5 backdrop-blur-sm shadow-sm cozy-shadow"
                variants={itemVariants}
              >
                <h2 className="text-xl font-semibold mb-4 text-gradient-cozy">{section.title}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {section.links.map((link, linkIndex) => (
                    <motion.div
                      key={linkIndex}
                      className="relative"
                      variants={itemVariants}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link 
                        to={link.path}
                        className="block p-3 rounded-lg bg-white/70 dark:bg-neutral-darkest/40 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-900/20 dark:hover:to-purple-900/20 border border-indigo-100/50 dark:border-indigo-800/20 hover:border-indigo-300/50 dark:hover:border-indigo-700/30 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-md"
                      >
                        <span className="font-medium text-indigo-700 dark:text-indigo-300">{link.name}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            ))}
            
            <motion.div
              className="mt-8 p-4 border border-indigo-200/50 dark:border-indigo-800/30 rounded-lg bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-900/10 dark:to-purple-900/10 text-center"
              variants={itemVariants}
            >
              <p className="text-sm text-neutral-dark dark:text-neutral-light">
                {t('sitemap_note')}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </StaticPageLayout>
    </>
  );
};

export default SitemapPage; 