import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import SearchInput from './SearchInput';
import AuthButton from './AuthButton';
import MenuIcon from '../assets/icons/menu.svg';
import CloseIcon from '../assets/icons/close.svg';
import GamepadIcon from '../assets/icons/gamepad.svg';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // 检测页面滚动，为导航栏添加滚动效果
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigateToHome = () => {
    navigate(`/${i18n.language}`);
  };
  
  return (
    <header className={`sticky top-0 z-40 transition-all duration-500 ${scrolled ? 'bg-white/90 dark:bg-neutral-dark/90 backdrop-blur-md shadow-md' : 'bg-white dark:bg-neutral-dark'}`}>
      {/* 顶部渐变光条 */}
      <div className="h-1 w-full bg-gradient-to-r from-purple-600 via-indigo-500 to-accent-yellow"></div>
      
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo和网站名称 - 带游戏手柄图标 */}
          <div 
            className="flex items-center cursor-pointer transition-all duration-300 hover:translate-x-1 active:translate-x-0 active:scale-95" 
            onClick={navigateToHome}
          >
            <div className="relative mr-2">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/30 to-accent-yellow/30 rounded-full blur-sm opacity-0 group-hover:opacity-100"></div>
              <img 
                src={GamepadIcon} 
                className="h-8 w-8 text-purple-600 animate-pulse-subtle" 
                alt="GamePad Icon" 
              />
            </div>
            
            <h1 className="text-xl font-bold relative">
              <span className="bg-gradient-to-r from-purple-600 via-indigo-500 to-accent-yellow bg-clip-text text-transparent">
                CozyGame
              </span>
              {/* 装饰性元素 */}
              <span className="absolute -top-2 -right-3 text-[10px] text-accent-yellow font-normal">fun</span>
            </h1>
          </div>
          
          {/* 桌面导航链接 - 居中 - 隐藏在移动端 */}
          <div className="hidden md:flex items-center justify-center space-x-10">
            <Link 
              to={`/${i18n.language}`}
              className={`relative text-base font-medium py-1 ${
                location.pathname === `/${i18n.language}` || location.pathname === `/${i18n.language}/` 
                  ? 'text-purple-600' 
                  : 'text-neutral-medium hover:text-purple-600'
              } transition-colors duration-200`}
            >
              {t('nav_home')}
              {(location.pathname === `/${i18n.language}` || location.pathname === `/${i18n.language}/`) && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-purple-600 rounded-full"></span>
              )}
            </Link>
            
            <Link 
              to={`/${i18n.language}/all-games`}
              className={`relative text-base font-medium py-1 ${
                location.pathname.includes('/all-games') 
                  ? 'text-purple-600' 
                  : 'text-neutral-medium hover:text-purple-600'
              } transition-colors duration-200`}
            >
              {t('nav_all_games')}
              {location.pathname.includes('/all-games') && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-purple-600 rounded-full"></span>
              )}
            </Link>
            
            <Link 
              to={`/${i18n.language}/about`}
              className={`relative text-base font-medium py-1 ${
                location.pathname.includes('/about') 
                  ? 'text-purple-600' 
                  : 'text-neutral-medium hover:text-purple-600'
              } transition-colors duration-200`}
            >
              {t('nav_about')}
              {location.pathname.includes('/about') && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-purple-600 rounded-full"></span>
              )}
            </Link>
          </div>
          
          {/* 右侧操作区 */}
          <div className="flex items-center space-x-4">
            {/* 桌面搜索框 */}
            <div className="hidden md:block">
              <SearchInput />
            </div>
            
            <LanguageSwitcher />
            <AuthButton />
          </div>
          
          {/* 移动端菜单按钮 */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-medium hover:text-purple-600 hover:bg-purple-500/20 transition-all duration-300"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <img 
                  src={CloseIcon} 
                  className="h-6 w-6 transform rotate-90 scale-110 transition-transform duration-300 ease-out" 
                  alt="Close menu" 
                />
              ) : (
                <img 
                  src={MenuIcon} 
                  className="h-6 w-6 transition-transform duration-300 ease-out" 
                  alt="Open menu" 
                />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* 移动端菜单 - 带动画效果 */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 py-3 space-y-3 bg-white/90 dark:bg-neutral-dark/90 backdrop-blur-sm border-t border-neutral-light/20 dark:border-neutral-medium/20">
          <SearchInput isMobile />
          
          <nav className="space-y-2 py-2">
            <Link 
              to={`/${i18n.language}`}
              className={`block px-3 py-2 rounded-lg ${
                location.pathname === `/${i18n.language}` || location.pathname === `/${i18n.language}/` 
                  ? 'bg-purple-500/10 text-purple-600 font-medium' 
                  : 'text-neutral-medium hover:bg-neutral-lightest dark:hover:bg-neutral-medium/10'
              } transition-colors duration-200`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav_home')}
            </Link>
            
            <Link 
              to={`/${i18n.language}/all-games`}
              className={`block px-3 py-2 rounded-lg ${
                location.pathname.includes('/all-games') 
                  ? 'bg-purple-500/10 text-purple-600 font-medium' 
                  : 'text-neutral-medium hover:bg-neutral-lightest dark:hover:bg-neutral-medium/10'
              } transition-colors duration-200`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav_all_games')}
            </Link>
            
            <Link 
              to={`/${i18n.language}/vip-zone`}
              className={`block px-3 py-2 rounded-lg ${
                location.pathname.includes('/vip-zone') 
                  ? 'bg-purple-500/10 text-purple-600 font-medium' 
                  : 'text-neutral-medium hover:bg-neutral-lightest dark:hover:bg-neutral-medium/10'
              } transition-colors duration-200`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav_vip_zone')}
            </Link>
            
            <Link 
              to={`/${i18n.language}/about`}
              className={`block px-3 py-2 rounded-lg ${
                location.pathname.includes('/about') 
                  ? 'bg-purple-500/10 text-purple-600 font-medium' 
                  : 'text-neutral-medium hover:bg-neutral-lightest dark:hover:bg-neutral-medium/10'
              } transition-colors duration-200`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav_about')}
            </Link>
          </nav>
          
          <div className="flex items-center justify-between py-2">
            <LanguageSwitcher />
            <AuthButton isMobile />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar; 