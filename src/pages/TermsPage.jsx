import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

const TermsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <Helmet>
        <title>{t('terms_page_title', { siteName: t('site_name') })}</title>
        <meta name="description" content={t('terms_page_description')} />
      </Helmet>

      <h1 className="text-3xl font-bold mb-6">{t('terms_of_service')}</h1>
      
      <div className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6 mb-8">
        <p className="mb-4">{t('terms_last_updated', { date: '2023-10-01' })}</p>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{t('terms_introduction')}</h2>
          <p className="mb-4">{t('terms_introduction_text')}</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{t('terms_definitions')}</h2>
          <ul className="list-disc list-inside mb-4 ml-4 space-y-2">
            <li><strong>{t('terms_def_service')}:</strong> {t('terms_def_service_text')}</li>
            <li><strong>{t('terms_def_content')}:</strong> {t('terms_def_content_text')}</li>
            <li><strong>{t('terms_def_customer')}:</strong> {t('terms_def_customer_text')}</li>
            <li><strong>{t('terms_def_third_party')}:</strong> {t('terms_def_third_party_text')}</li>
            <li><strong>{t('terms_def_website')}:</strong> {t('terms_def_website_text')}</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{t('terms_acknowledgment')}</h2>
          <p className="mb-4">{t('terms_acknowledgment_text')}</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{t('terms_user_accounts')}</h2>
          <p className="mb-4">{t('terms_user_accounts_text')}</p>
          <p className="mb-4">{t('terms_user_accounts_responsibility')}</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{t('terms_intellectual_property')}</h2>
          <p className="mb-4">{t('terms_intellectual_property_text')}</p>
          <p className="mb-4">{t('terms_intellectual_property_third_party')}</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{t('terms_user_generated_content')}</h2>
          <p className="mb-4">{t('terms_user_generated_content_text')}</p>
          <p className="mb-4">{t('terms_user_generated_content_responsibility')}</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{t('terms_prohibited_activities')}</h2>
          <p className="mb-4">{t('terms_prohibited_activities_text')}</p>
          <ul className="list-disc list-inside mb-4 ml-4 space-y-1">
            <li>{t('terms_prohibited_illegal')}</li>
            <li>{t('terms_prohibited_violate')}</li>
            <li>{t('terms_prohibited_infringe')}</li>
            <li>{t('terms_prohibited_harm')}</li>
            <li>{t('terms_prohibited_impersonate')}</li>
            <li>{t('terms_prohibited_interfere')}</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{t('terms_termination')}</h2>
          <p className="mb-4">{t('terms_termination_text')}</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{t('terms_limitation_liability')}</h2>
          <p className="mb-4">{t('terms_limitation_liability_text')}</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{t('terms_governing_law')}</h2>
          <p className="mb-4">{t('terms_governing_law_text')}</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{t('terms_changes')}</h2>
          <p className="mb-4">{t('terms_changes_text')}</p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-4">{t('terms_contact')}</h2>
          <p className="mb-4">{t('terms_contact_text')}</p>
          <p className="text-primary-blue">terms@cozygame.fun</p>
        </section>
      </div>
    </div>
  );
};

export default TermsPage; 