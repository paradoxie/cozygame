import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

const DisclaimerPage = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <Helmet>
        <title>{t('disclaimer_page_title', { siteName: t('site_name') })}</title>
        <meta name="description" content={t('disclaimer_page_description')} />
      </Helmet>

      <h1 className="text-3xl font-bold mb-6">{t('disclaimer')}</h1>
      
      <div className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6 mb-8">
        <p className="mb-4">{t('disclaimer_last_updated', { date: '2023-10-01' })}</p>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{t('disclaimer_introduction')}</h2>
          <p className="mb-4">{t('disclaimer_introduction_text')}</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{t('disclaimer_interpretation')}</h2>
          <p className="mb-4">{t('disclaimer_interpretation_text')}</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{t('disclaimer_external_links')}</h2>
          <p className="mb-4">{t('disclaimer_external_links_text')}</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{t('disclaimer_game_content')}</h2>
          <p className="mb-4">{t('disclaimer_game_content_text')}</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{t('disclaimer_errors_inaccuracies')}</h2>
          <p className="mb-4">{t('disclaimer_errors_inaccuracies_text')}</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{t('disclaimer_fair_use')}</h2>
          <p className="mb-4">{t('disclaimer_fair_use_text')}</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{t('disclaimer_views_expressed')}</h2>
          <p className="mb-4">{t('disclaimer_views_expressed_text')}</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{t('disclaimer_no_responsibility')}</h2>
          <p className="mb-4">{t('disclaimer_no_responsibility_text')}</p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-4">{t('disclaimer_contact')}</h2>
          <p className="mb-4">{t('disclaimer_contact_text')}</p>
          <p className="text-primary-blue">legal@cozygame.fun</p>
        </section>
      </div>
    </div>
  );
};

export default DisclaimerPage; 