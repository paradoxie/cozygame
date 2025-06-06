import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

const ContactPage = () => {
  const { t } = useTranslation();
  const [formStatus, setFormStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 这里可以添加实际的表单提交逻辑
    // 目前仅模拟成功提交
    setFormStatus('success');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <Helmet>
        <title>{t('contact_page_title', { siteName: t('site_name') })}</title>
        <meta name="description" content={t('contact_page_description')} />
      </Helmet>

      <h1 className="text-3xl font-bold mb-6">{t('contact_us')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">{t('contact_info')}</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">{t('contact_email')}:</h3>
              <p className="text-primary-blue">support@cozygame.fun</p>
            </div>
            
            <div>
              <h3 className="font-medium">{t('contact_response_time')}:</h3>
              <p>{t('contact_response_time_text')}</p>
            </div>

            <div className="pt-4">
              <h3 className="font-medium mb-2">{t('contact_follow_us')}:</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-primary-blue hover:text-primary-blue-dark transition-colors">
                  Twitter
                </a>
                <a href="#" className="text-primary-blue hover:text-primary-blue-dark transition-colors">
                  Facebook
                </a>
                <a href="#" className="text-primary-blue hover:text-primary-blue-dark transition-colors">
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">{t('contact_form_title')}</h2>
          
          {formStatus === 'success' ? (
            <div className="bg-success-green bg-opacity-10 text-success-green p-4 rounded-full mb-4">
              {t('contact_form_success')}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-1 font-medium">
                  {t('contact_form_name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="search-input w-full px-3 py-2 dark:bg-neutral-dark focus:outline-none"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block mb-1 font-medium">
                  {t('contact_form_email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="search-input w-full px-3 py-2 dark:bg-neutral-dark focus:outline-none"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block mb-1 font-medium">
                  {t('contact_form_subject')}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="search-input w-full px-3 py-2 dark:bg-neutral-dark focus:outline-none"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-1 font-medium">
                  {t('contact_form_message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="search-input w-full px-3 py-2 dark:bg-neutral-dark focus:outline-none"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="btn btn-primary"
              >
                {t('contact_form_submit')}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 