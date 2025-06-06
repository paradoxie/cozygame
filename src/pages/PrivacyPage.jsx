import React from 'react';
import { useTranslation } from 'react-i18next';
import StaticPageLayout from '../components/StaticPageLayout';
import PrivacyIcon from '../assets/icons/privacy.svg';

const PrivacyPage = () => {
  const { t } = useTranslation();

  return (
    <StaticPageLayout
      title={t('privacy_page_title', { siteName: t('site_name') })}
      description={t('privacy_page_description')}
      pageTitle={t('privacy_policy')}
      icon={PrivacyIcon}
    >
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2 text-gradient-primary">{t('privacy_policy')}</h1>
        <p className="text-neutral-medium dark:text-neutral-light">
          {t('privacy_last_updated', { date: '2025-06-01' })}
        </p>
      </div>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">{t('privacy_introduction')}</h2>
        <div className="bg-white/50 dark:bg-neutral-darkest/50 rounded-lg p-5 backdrop-blur-sm">
          <p className="text-neutral-darkest dark:text-neutral-lightest">{t('privacy_introduction_text')}</p>
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">{t('privacy_information_collection')}</h2>
        <div className="bg-white/50 dark:bg-neutral-darkest/50 rounded-lg p-5 backdrop-blur-sm">
          <p className="mb-4 text-neutral-darkest dark:text-neutral-lightest">{t('privacy_information_collection_text')}</p>
          
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2 text-indigo-600 dark:text-indigo-400">{t('privacy_personal_information')}</h3>
            <p className="mb-3 text-neutral-darkest dark:text-neutral-lightest">{t('privacy_personal_information_text')}</p>
            <ul className="space-y-2 ml-2">
              {['account', 'contact', 'preferences'].map((item) => (
                <li key={item} className="flex items-start">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 mr-2"></div>
                  <p className="text-neutral-darkest dark:text-neutral-lightest">
                    {t(`privacy_info_${item}`)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2 text-indigo-600 dark:text-indigo-400">{t('privacy_automatic_information')}</h3>
            <p className="mb-3 text-neutral-darkest dark:text-neutral-lightest">{t('privacy_automatic_information_text')}</p>
            <ul className="space-y-2 ml-2">
              {['device', 'usage', 'location', 'cookies'].map((item) => (
                <li key={item} className="flex items-start">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 mr-2"></div>
                  <p className="text-neutral-darkest dark:text-neutral-lightest">
                    {t(`privacy_info_${item}`)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">{t('privacy_information_use')}</h2>
        <div className="bg-white/50 dark:bg-neutral-darkest/50 rounded-lg p-5 backdrop-blur-sm">
          <p className="mb-4 text-neutral-darkest dark:text-neutral-lightest">{t('privacy_information_use_text')}</p>
          <ul className="space-y-2 ml-2">
            {['provide_services', 'improve_services', 'communication', 'analytics'].map((item) => (
              <li key={item} className="flex items-start">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 mr-2"></div>
                <p className="text-neutral-darkest dark:text-neutral-lightest">
                  {t(`privacy_use_${item}`)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">{t('privacy_information_sharing')}</h2>
        <div className="bg-white/50 dark:bg-neutral-darkest/50 rounded-lg p-5 backdrop-blur-sm">
          <p className="mb-4 text-neutral-darkest dark:text-neutral-lightest">{t('privacy_information_sharing_text')}</p>
          <ul className="space-y-2 ml-2">
            {['consent', 'service_providers', 'legal'].map((item) => (
              <li key={item} className="flex items-start">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 mr-2"></div>
                <p className="text-neutral-darkest dark:text-neutral-lightest">
                  {t(`privacy_sharing_${item}`)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">{t('privacy_security')}</h2>
          <div className="bg-white/50 dark:bg-neutral-darkest/50 rounded-lg p-5 backdrop-blur-sm h-full">
            <p className="text-neutral-darkest dark:text-neutral-lightest">{t('privacy_security_text')}</p>
          </div>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">{t('privacy_children')}</h2>
          <div className="bg-white/50 dark:bg-neutral-darkest/50 rounded-lg p-5 backdrop-blur-sm h-full">
            <p className="text-neutral-darkest dark:text-neutral-lightest">{t('privacy_children_text')}</p>
          </div>
        </section>
      </div>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">{t('privacy_user_rights')}</h2>
        <div className="bg-white/50 dark:bg-neutral-darkest/50 rounded-lg p-5 backdrop-blur-sm">
          <p className="mb-4 text-neutral-darkest dark:text-neutral-lightest">{t('privacy_user_rights_text')}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {['access', 'rectification', 'erasure', 'restriction', 'object', 'portability'].map((item) => (
              <div key={item} className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white text-xs font-medium mr-3 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-neutral-darkest dark:text-neutral-lightest">
                  {t(`privacy_rights_${item}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">{t('privacy_changes')}</h2>
          <div className="bg-white/50 dark:bg-neutral-darkest/50 rounded-lg p-5 backdrop-blur-sm h-full">
            <p className="text-neutral-darkest dark:text-neutral-lightest">{t('privacy_changes_text')}</p>
          </div>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">{t('privacy_contact')}</h2>
          <div className="bg-white/50 dark:bg-neutral-darkest/50 rounded-lg p-5 backdrop-blur-sm h-full">
            <p className="mb-4 text-neutral-darkest dark:text-neutral-lightest">{t('privacy_contact_text')}</p>
            <div className="mb-4">
              <p className="text-gradient-primary font-medium">admin@cozygame.fun</p>
            </div>
          </div>
        </section>
      </div>
    </StaticPageLayout>
  );
};

export default PrivacyPage; 