import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t, i18n } = useTranslation();
  
  return (
    <>
      <Helmet>
        <title>404 - {t('site_name')}</title>
        <meta name="description" content="页面未找到" />
      </Helmet>
      
      <div className="flex flex-col items-center justify-center py-16">
        <h1 className="text-6xl font-bold text-primary-blue mb-4">404</h1>
        <p className="text-xl mb-8">页面未找到</p>
        <Link 
          to={`/${i18n.language}`}
          className="btn btn-primary"
        >
          返回首页
        </Link>
      </div>
    </>
  );
};

export default NotFoundPage; 