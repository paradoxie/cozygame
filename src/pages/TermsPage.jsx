import React from 'react';
import { useTranslation } from 'react-i18next';
import StaticPageLayout from '../components/StaticPageLayout';
import TermsIcon from '../assets/icons/terms.svg';

const TermsPage = () => {
  const { t } = useTranslation();

  return (
    <StaticPageLayout
      title={t('terms_page_title', { siteName: t('site_name') })}
      description={t('terms_page_description')}
      pageTitle={t('terms_of_service')}
      icon={TermsIcon}
    >
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2 text-gradient-primary">{t('terms_of_service')}</h1>
        <p className="text-neutral-medium dark:text-neutral-light">
          {t('terms_last_updated', { date: '2025-06-01' })}
        </p>
      </div>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">{t('terms_introduction')}</h2>
        <div className="bg-white/50 dark:bg-neutral-darkest/50 rounded-lg p-5 backdrop-blur-sm">
          <p className="text-neutral-darkest dark:text-neutral-lightest">{t('terms_introduction_text')}</p>
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">{t('terms_definitions')}</h2>
        <div className="bg-white/50 dark:bg-neutral-darkest/50 rounded-lg p-5 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['service', 'content', 'customer', 'third_party', 'website'].map((item) => (
              <div key={item} className="bg-gradient-to-r from-purple-500/5 to-indigo-500/5 p-4 rounded-lg border border-purple-500/10">
                <h3 className="text-lg font-medium mb-1 text-indigo-600 dark:text-indigo-400">{t(`terms_def_${item}`)}</h3>
                <p className="text-neutral-darkest dark:text-neutral-lightest text-sm">
                  {t(`terms_def_${item}_text`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">{t('terms_acknowledgment')}</h2>
        <div className="bg-white/50 dark:bg-neutral-darkest/50 rounded-lg p-5 backdrop-blur-sm">
          <p className="text-neutral-darkest dark:text-neutral-lightest">{t('terms_acknowledgment_text')}</p>
        </div>
      </section>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">{t('terms_user_accounts')}</h2>
          <div className="bg-white/50 dark:bg-neutral-darkest/50 rounded-lg p-5 backdrop-blur-sm h-full">
            <p className="mb-4 text-neutral-darkest dark:text-neutral-lightest">{t('terms_user_accounts_text')}</p>
            <p className="text-neutral-darkest dark:text-neutral-lightest">{t('terms_user_accounts_responsibility')}</p>
          </div>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">{t('terms_intellectual_property')}</h2>
          <div className="bg-white/50 dark:bg-neutral-darkest/50 rounded-lg p-5 backdrop-blur-sm h-full">
            <p className="mb-4 text-neutral-darkest dark:text-neutral-lightest">{t('terms_intellectual_property_text')}</p>
            <p className="text-neutral-darkest dark:text-neutral-lightest">{t('terms_intellectual_property_third_party')}</p>
          </div>
        </section>
      </div>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">{t('terms_user_generated_content')}</h2>
        <div className="bg-white/50 dark:bg-neutral-darkest/50 rounded-lg p-5 backdrop-blur-sm">
          <p className="mb-4 text-neutral-darkest dark:text-neutral-lightest">{t('terms_user_generated_content_text')}</p>
          <p className="text-neutral-darkest dark:text-neutral-lightest">{t('terms_user_generated_content_responsibility')}</p>
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">{t('terms_prohibited_activities')}</h2>
        <div className="bg-white/50 dark:bg-neutral-darkest/50 rounded-lg p-5 backdrop-blur-sm">
          <p className="mb-4 text-neutral-darkest dark:text-neutral-lightest">{t('terms_prohibited_activities_text')}</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {['illegal', 'violate', 'infringe', 'harm', 'impersonate', 'interfere'].map((item, index) => (
              <div key={item} className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white text-xs font-medium mr-3 mt-0.5">
                  {index + 1}
                </div>
                <p className="text-neutral-darkest dark:text-neutral-lightest">
                  {t(`terms_prohibited_${item}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">{t('terms_termination')}</h2>
          <div className="bg-white/50 dark:bg-neutral-darkest/50 rounded-lg p-5 backdrop-blur-sm h-full">
            <p className="text-neutral-darkest dark:text-neutral-lightest">{t('terms_termination_text')}</p>
          </div>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">{t('terms_limitation_liability')}</h2>
          <div className="bg-white/50 dark:bg-neutral-darkest/50 rounded-lg p-5 backdrop-blur-sm h-full">
            <p className="text-neutral-darkest dark:text-neutral-lightest">{t('terms_limitation_liability_text')}</p>
          </div>
        </section>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">{t('terms_governing_law')}</h2>
          <div className="bg-white/50 dark:bg-neutral-darkest/50 rounded-lg p-5 backdrop-blur-sm h-full">
            <p className="text-neutral-darkest dark:text-neutral-lightest">{t('terms_governing_law_text')}</p>
          </div>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">{t('terms_changes')}</h2>
          <div className="bg-white/50 dark:bg-neutral-darkest/50 rounded-lg p-5 backdrop-blur-sm h-full">
            <p className="text-neutral-darkest dark:text-neutral-lightest">{t('terms_changes_text')}</p>
          </div>
        </section>
      </div>
      
      <section>
        <h2 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">{t('terms_contact')}</h2>
        <div className="bg-white/50 dark:bg-neutral-darkest/50 rounded-lg p-5 backdrop-blur-sm">
          <p className="mb-4 text-neutral-darkest dark:text-neutral-lightest">{t('terms_contact_text')}</p>
          <div className="mb-4">
            <p className="text-gradient-primary font-medium">admin@cozygame.fun</p>
          </div>
        </div>
      </section>
    </StaticPageLayout>
  );
};

export default TermsPage; 