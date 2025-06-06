import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

const PrivacyPage = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <Helmet>
        <title>{t('privacy_page_title', { siteName: t('site_name') })}</title>
        <meta name="description" content={t('privacy_page_description')} />
      </Helmet>

      <h1 className="text-3xl font-bold mb-6">{t('privacy_policy')}</h1>
      
      <div className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6 mb-8">
        <p className="mb-4">{t('privacy_last_updated', { date: '2023-10-01' })}</p>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{t('privacy_introduction')}</h2>
          <p className="mb-4">{t('privacy_introduction_text')}</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{t('privacy_information_collection')}</h2>
          <p className="mb-4">{t('privacy_information_collection_text')}</p>
          
          <h3 className="text-lg font-medium mb-2 mt-4">{t('privacy_personal_information')}</h3>
          <p className="mb-2">{t('privacy_personal_information_text')}</p>
          <ul className="list-disc list-inside mb-4 ml-4 space-y-1">
            <li>{t('privacy_info_account')}</li>
            <li>{t('privacy_info_contact')}</li>
            <li>{t('privacy_info_preferences')}</li>
          </ul>
          
          <h3 className="text-lg font-medium mb-2 mt-4">{t('privacy_automatic_information')}</h3>
          <p className="mb-2">{t('privacy_automatic_information_text')}</p>
          <ul className="list-disc list-inside mb-4 ml-4 space-y-1">
            <li>{t('privacy_info_device')}</li>
            <li>{t('privacy_info_usage')}</li>
            <li>{t('privacy_info_location')}</li>
            <li>{t('privacy_info_cookies')}</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{t('privacy_information_use')}</h2>
          <p className="mb-4">{t('privacy_information_use_text')}</p>
          <ul className="list-disc list-inside mb-4 ml-4 space-y-1">
            <li>{t('privacy_use_provide_services')}</li>
            <li>{t('privacy_use_improve_services')}</li>
            <li>{t('privacy_use_communication')}</li>
            <li>{t('privacy_use_analytics')}</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{t('privacy_information_sharing')}</h2>
          <p className="mb-4">{t('privacy_information_sharing_text')}</p>
          <ul className="list-disc list-inside mb-4 ml-4 space-y-1">
            <li>{t('privacy_sharing_consent')}</li>
            <li>{t('privacy_sharing_service_providers')}</li>
            <li>{t('privacy_sharing_legal')}</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{t('privacy_security')}</h2>
          <p className="mb-4">{t('privacy_security_text')}</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{t('privacy_user_rights')}</h2>
          <p className="mb-4">{t('privacy_user_rights_text')}</p>
          <ul className="list-disc list-inside mb-4 ml-4 space-y-1">
            <li>{t('privacy_rights_access')}</li>
            <li>{t('privacy_rights_rectification')}</li>
            <li>{t('privacy_rights_erasure')}</li>
            <li>{t('privacy_rights_restriction')}</li>
            <li>{t('privacy_rights_object')}</li>
            <li>{t('privacy_rights_portability')}</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{t('privacy_children')}</h2>
          <p className="mb-4">{t('privacy_children_text')}</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{t('privacy_changes')}</h2>
          <p className="mb-4">{t('privacy_changes_text')}</p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-4">{t('privacy_contact')}</h2>
          <p className="mb-4">{t('privacy_contact_text')}</p>
          <p className="text-primary-blue">privacy@cozygame.fun</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPage; 