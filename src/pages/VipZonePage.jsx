import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useGameData } from '../hooks/useGameData';
import GameList from '../components/GameList';
import GameSectionHeader from '../components/GameSectionHeader';
import CrownIcon from '../assets/icons/crown.svg';

const VipZonePage = () => {
  const { t } = useTranslation();
  const { games, loading, error } = useGameData();
  const [showRechargeModal, setShowRechargeModal] = useState(false);
  
  // 筛选VIP游戏
  const vipGames = games.filter(game => game.vip);
  
  const openRechargeModal = () => {
    setShowRechargeModal(true);
  };
  
  const closeRechargeModal = () => {
    setShowRechargeModal(false);
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-primary-blue mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>{t('vip_zone_page_title', { siteName: t('site_name') })}</title>
        <meta name="description" content={t('vip_zone_page_description', { siteName: t('site_name') })} />
      </Helmet>
      
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 mb-8 shadow-lg text-white">
          <div className="flex items-center mb-4">
            <img src={CrownIcon} alt="" className="w-8 h-8 mr-3" aria-hidden="true" />
            <h1 className="text-2xl md:text-3xl font-bold">{t('vip_zone_headline')}</h1>
          </div>
          <p className="mb-6 opacity-90">{t('vip_zone_subheadline')}</p>
          <button
            onClick={openRechargeModal}
            className="btn bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-full transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
          >
            {t('recharge_button')}
          </button>
        </div>
        
        <GameSectionHeader 
          title={t('vip_exclusive_games')}
          subtitle={t('vip_games_count', { count: vipGames.length })}
        />
        
        <GameList 
          games={vipGames} 
          showTitle={false}
          emptyMessage={t('no_vip_games')} 
        />
      </div>
      
      {/* 充值弹窗 */}
      {showRechargeModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-neutral-dark rounded-lg max-w-md w-full p-6 shadow-xl transform transition-all animate-modal-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold flex items-center">
                <img src={CrownIcon} alt="" className="w-6 h-6 mr-2" aria-hidden="true" />
                {t('recharge_popup_title')}
              </h3>
              <button onClick={closeRechargeModal} className="text-neutral-medium hover:text-neutral-darkest dark:hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="mb-6">{t('recharge_popup_dev_notice')}</p>
            <div className="flex justify-end">
              <button
                onClick={closeRechargeModal}
                className="btn btn-primary"
              >
                {t('ok_button')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VipZonePage; 