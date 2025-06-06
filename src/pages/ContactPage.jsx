import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import GamepadIcon from '../assets/icons/gamepad.svg';

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

  // 动画变体
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="relative max-w-screen-xl mx-auto px-4 py-8 overflow-hidden">
      <Helmet>
        <title>{t('contact_page_title', { siteName: t('site_name') })}</title>
        <meta name="description" content={t('contact_page_description')} />
      </Helmet>

      {/* 背景装饰元素 */}
      <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary-blue/10 blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-accent-yellow/10 blur-3xl"></div>
      <div className="absolute top-1/3 left-1/4 w-1 h-20 bg-gradient-to-b from-primary-blue/30 to-transparent"></div>
      <div className="absolute top-1/2 right-1/3 w-1 h-16 bg-gradient-to-b from-accent-yellow/30 to-transparent"></div>
      
      {/* 游戏元素装饰 */}
      <div className="absolute top-20 right-[10%] opacity-10 dark:opacity-5 animate-float">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-accent-yellow">
          <path d="M21,6H3C1.9,6,1,6.9,1,8v8c0,1.1,0.9,2,2,2h18c1.1,0,2-0.9,2-2V8C23,6.9,22.1,6,21,6z M11,13H8v3H6v-3H3v-2h3V8h2v3h3V13z M15.5,15 c-0.83,0-1.5-0.67-1.5-1.5c0-0.83,0.67-1.5,1.5-1.5c0.83,0,1.5,0.67,1.5,1.5C17,14.33,16.33,15,15.5,15z M19.5,12c-0.83,0-1.5-0.67-1.5-1.5 c0-0.83,0.67-1.5,1.5-1.5c0.83,0,1.5,0.67,1.5,1.5C21,11.33,20.33,12,19.5,12z"/>
        </svg>
      </div>
      <div className="absolute bottom-10 left-[20%] opacity-10 dark:opacity-5 animate-float" style={{animationDelay: '1s'}}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-primary-blue">
          <path d="M21.58,16.09l-1.09-7.66C20.21,6.46,18.52,5,16.53,5H7.47C5.48,5,3.79,6.46,3.51,8.43l-1.09,7.66 C2.2,17.63,3.39,19,4.94,19h0c0.68,0,1.32-0.27,1.8-0.75L9,16h6l2.25,2.25c0.48,0.48,1.13,0.75,1.8,0.75h0 C20.61,19,21.8,17.63,21.58,16.09z M11,11H9v2H8v-2H6v-1h2V8h1v2h2V11z M15,10c-0.55,0-1-0.45-1-1c0-0.55,0.45-1,1-1s1,0.45,1,1 C16,9.55,15.55,10,15,10z M17,13c-0.55,0-1-0.45-1-1c0-0.55,0.45-1,1-1s1,0.45,1,1C18,12.55,17.55,13,17,13z"/>
        </svg>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="inline-block relative mb-3">
            <div className="absolute inset-0 bg-gradient-to-r from-accent-yellow to-pink-400 rounded-full blur-sm opacity-30 animate-pulse-subtle"></div>
            <img src={GamepadIcon} className="h-12 w-12 relative" alt="GamePad Icon" />
          </div>
          <h1 className="text-3xl font-bold mb-2 text-gradient-cozy">{t('contact_us')}</h1>
          <p className="text-neutral-medium dark:text-neutral-light max-w-lg mx-auto">
            {t('contact_subtitle')}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div variants={itemVariants} className="bg-white/60 dark:bg-neutral-dark/60 backdrop-blur-sm rounded-xl p-6 shadow-md cozy-shadow">
            <h2 className="text-xl font-semibold mb-6 text-gradient-warm flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              {t('contact_info')}
            </h2>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-pink-50/50 to-purple-50/50 dark:from-pink-900/10 dark:to-purple-900/10 p-4 rounded-lg border border-pink-100 dark:border-pink-900/20">
                <h3 className="text-lg font-semibold mb-2 text-gradient-warm">{t('contact_email')}</h3>
                <p className="text-primary-blue flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-pink-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  admin@cozygame.fun
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/10 dark:to-indigo-900/10 p-4 rounded-lg border border-blue-100 dark:border-blue-900/20">
                <h3 className="font-medium text-gradient-fresh">{t('contact_response_time')}:</h3>
                <p className="mt-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  {t('contact_response_time_text')}
                </p>
              </div>

              <div className="bg-gradient-to-r from-amber-50/50 to-orange-50/50 dark:from-amber-900/10 dark:to-orange-900/10 p-4 rounded-lg border border-amber-100 dark:border-amber-900/20">
                <h3 className="font-medium text-gradient-warm mb-2">{t('contact_follow_us')}:</h3>
                <div className="flex space-x-3 mt-3">
                  <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-neutral-darkest shadow-md text-neutral-medium hover:text-primary-blue dark:text-neutral-light dark:hover:text-primary-blue transition-colors hover:shadow-lg hover:-translate-y-1 active:translate-y-0 cozy-shadow">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                    </svg>
                  </a>
                  <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-neutral-darkest shadow-md text-neutral-medium hover:text-primary-blue dark:text-neutral-light dark:hover:text-primary-blue transition-colors hover:shadow-lg hover:-translate-y-1 active:translate-y-0 cozy-shadow">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                    </svg>
                  </a>
                  <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-neutral-darkest shadow-md text-neutral-medium hover:text-primary-blue dark:text-neutral-light dark:hover:text-primary-blue transition-colors hover:shadow-lg hover:-translate-y-1 active:translate-y-0 cozy-shadow">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.54 15.42a6.1 6.1 0 01-.34 1.15 7.41 7.41 0 01-4.35 4.35 9.42 9.42 0 01-3.35.63c-1.25.05-1.65.06-4.85.06s-3.6-.01-4.85-.06a9.42 9.42 0 01-3.35-.63 7.41 7.41 0 01-4.35-4.35 6.1 6.1 0 01-.34-1.15c-.05-.25-.06-.52-.06-.78V8.58c0-.26.01-.53.06-.78a6.1 6.1 0 01.34-1.15 7.41 7.41 0 014.35-4.35 9.42 9.42 0 013.35-.63c1.25-.05 1.65-.06 4.85-.06s3.6.01 4.85.06a9.42 9.42 0 013.35.63 7.41 7.41 0 014.35 4.35 6.1 6.1 0 01.34 1.15c.05.25.06.52.06.78v6.06c0 .26-.01.53-.06.78z" />
                    </svg>
                  </a>
                  <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-neutral-darkest shadow-md text-neutral-medium hover:text-primary-blue dark:text-neutral-light dark:hover:text-primary-blue transition-colors hover:shadow-lg hover:-translate-y-1 active:translate-y-0 cozy-shadow">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="bg-white/60 dark:bg-neutral-dark/60 backdrop-blur-sm rounded-xl p-6 shadow-md cozy-shadow">
            <h2 className="text-xl font-semibold mb-6 text-gradient-fresh flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              {t('contact_form_title')}
            </h2>
            
            {formStatus === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-6 rounded-lg border border-emerald-100 dark:border-emerald-800/30 text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-success-green/20 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-success-green" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-success-green mb-2">{t('contact_form_success_title')}</h3>
                <p className="text-neutral-darkest dark:text-neutral-lightest">
                  {t('contact_form_success')}
                </p>
                <button 
                  onClick={() => setFormStatus(null)} 
                  className="mt-4 btn-play text-xs py-1.5 px-4"
                >
                  {t('send_another')}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-1 font-medium text-gradient-warm">
                    {t('contact_form_name')}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-medium" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="search-input w-full pl-10 pr-3 py-2 bg-white/70 dark:bg-neutral-darkest/70 focus:outline-none focus:ring-2 focus:ring-primary-blue/30"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-1 font-medium text-gradient-warm">
                    {t('contact_form_email')}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-medium" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="search-input w-full pl-10 pr-3 py-2 bg-white/70 dark:bg-neutral-darkest/70 focus:outline-none focus:ring-2 focus:ring-primary-blue/30"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block mb-1 font-medium text-gradient-warm">
                    {t('contact_form_subject')}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-medium" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="search-input w-full pl-10 pr-3 py-2 bg-white/70 dark:bg-neutral-darkest/70 focus:outline-none focus:ring-2 focus:ring-primary-blue/30"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-1 font-medium text-gradient-warm">
                    {t('contact_form_message')}
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-medium" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="4"
                      className="search-input w-full pl-10 pr-3 py-2 bg-white/70 dark:bg-neutral-darkest/70 focus:outline-none focus:ring-2 focus:ring-primary-blue/30 rounded-2xl"
                    ></textarea>
                  </div>
                </div>
                
                <div className="pt-2">
                  <button
                    type="submit"
                    className="btn-play flex items-center gap-2 text-sm py-2 px-5 shadow-md"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                    {t('contact_form_submit')}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage; 