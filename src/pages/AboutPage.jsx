import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <Helmet>
        <title>{t('about_page_title', { siteName: t('site_name') })}</title>
        <meta name="description" content={t('about_page_description')} />
      </Helmet>

      <h1 className="text-3xl font-bold mb-6">{t('about_us')}</h1>
      
      <div className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">{t('about_our_mission')}</h2>
        <p className="mb-4">{t('about_mission_text')}</p>

        <h2 className="text-xl font-semibold mb-4 mt-8">{t('about_what_we_offer')}</h2>
        <p className="mb-4">{t('about_offer_text')}</p>
        
        <ul className="list-disc list-inside mb-4 ml-4 space-y-2">
          <li>{t('about_feature_1')}</li>
          <li>{t('about_feature_2')}</li>
          <li>{t('about_feature_3')}</li>
          <li>{t('about_feature_4')}</li>
        </ul>

        <h2 className="text-xl font-semibold mb-4 mt-8">{t('about_our_team')}</h2>
        <p className="mb-4">{t('about_team_text')}</p>
      </div>
    </div>
  );
};

export default AboutPage; 