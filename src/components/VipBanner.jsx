import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CrownIcon from '../assets/icons/crown.svg';

const VipBanner = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  
  const goToVipZone = () => {
    navigate(`/${i18n.language}/vip-zone`);
  };
  
  return (
    <div 
      className="mb-6 bg-gradient-to-r from-primary-blue to-accent-yellow rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-[1.01]"
      onClick={goToVipZone}
    >
      <div className="relative p-4 md:p-5 flex flex-col md:flex-row items-center">
        <div className="md:w-3/4 mb-3 md:mb-0">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-1 flex items-center">
            <img src={CrownIcon} className="w-6 h-6 mr-2 text-white" alt="VIP Crown" />
            {t('vip_zone_headline')}
          </h2>
          <p className="text-white/80 mb-3 text-sm">{t('vip_zone_subheadline')}</p>
          <button className="btn btn-sm bg-white text-primary-blue hover:bg-neutral-lightest font-semibold active:scale-95 transition-transform duration-100">
            {t('vip_zone_button')}
          </button>
        </div>
        <div className="md:w-1/4 flex justify-center">
          <div className="relative">
            <div className="absolute -inset-1 bg-white/30 rounded-full blur-md animate-pulse"></div>
            <img src={CrownIcon} className="w-16 h-16 text-accent-yellow drop-shadow-lg" alt="VIP Crown" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VipBanner; 