import React, { useLayoutEffect } from 'react';
import { BrowserRouter, Routes, Route, useParams, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { currentSupportedLngs, defaultLng } from './i18n';

// Pages
import HomePage from './pages/HomePage';
import GameDetailPage from './pages/GameDetailPage';
import VipZonePage from './pages/VipZonePage';
import AllGamesPage from './pages/AllGamesPage';
import NotFoundPage from './pages/NotFoundPage';
import DebugPage from './pages/DebugPage';
import SimpleHomePage from './pages/SimpleHomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import DisclaimerPage from './pages/DisclaimerPage';
import TermsPage from './pages/TermsPage';
import CookiePolicyPage from './pages/CookiePolicyPage';
import SitemapPage from './pages/SitemapPage';

// Layout Components
import Layout from './components/Layout';
import SimpleLayout from './components/SimpleLayout';

const LanguageAwareRedirect = () => {
  const location = useLocation();
  return <Navigate to={`/${defaultLng}${location.pathname === '/' ? '' : location.pathname}${location.search}${location.hash}`} replace />;
};

const LanguageRouteHandler = ({ children }) => {
  const { lang } = useParams();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  useLayoutEffect(() => {
    const targetLang = lang || defaultLng;

    if (currentSupportedLngs.includes(targetLang)) {
      if (i18n.resolvedLanguage !== targetLang) {
        i18n.changeLanguage(targetLang);
      }
      // 如果访问根路径(如site.com/)且lang参数缺失，重定向到/en(或defaultLng)
      if (!lang && targetLang === defaultLng && location.pathname === '/') {
         navigate(`/${defaultLng}${location.search}${location.hash}`, { replace: true });
      }
    } else {
      // 路径中的语言无效，重定向到默认语言并保留其余路径
      const pathWithoutInvalidLang = lang ? location.pathname.substring(lang.length + 1) : location.pathname;
      const newPath = `/${defaultLng}${pathWithoutInvalidLang === '/' ? '' : pathWithoutInvalidLang}${location.search}${location.hash}`;
      navigate(newPath, { replace: true });
    }
  }, [lang, i18n, navigate, location]);

  // 渲染子组件(即<Layout>组件)
  return children; 
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 调试路由 - 直接访问，不需要语言前缀 */}
        <Route path="/debug" element={<DebugPage />} />
        
        {/* 极简路由 - 直接渲染SimpleHomePage */}
        <Route path="/simplepage" element={<SimpleHomePage />} />
        
        {/* 简化版路由 - 使用SimpleLayout */}
        <Route path="/simple/:lang" element={<LanguageRouteHandler><SimpleLayout /></LanguageRouteHandler>}>
          <Route index element={<SimpleHomePage />} />
          <Route path="game/:gameId" element={<GameDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        
        {/* 捕获语言参数的路由 */}
        <Route path="/:lang" element={<LanguageRouteHandler><Layout /></LanguageRouteHandler>}>
          {/* 嵌套在Layout和语言前缀下的路由 */}
          <Route index element={<HomePage />} /> {/* 例如，/en */}
          <Route path="game/:gameId" element={<GameDetailPage />} /> {/* 例如，/en/game/some-game */}
          <Route path="vip-zone" element={<VipZonePage />} /> {/* 例如，/en/vip-zone */}
          <Route path="all-games" element={<AllGamesPage />} /> {/* 例如，/en/all-games */}
          
          {/* 常规页面路由 */}
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          
          {/* 法律页面路由 */}
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="disclaimer" element={<DisclaimerPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="cookie-policy" element={<CookiePolicyPage />} />
          <Route path="sitemap" element={<SitemapPage />} />
          
          <Route path="*" element={<NotFoundPage />} /> {/* 特定语言的404 */}
        </Route>
        
        {/* 根路径或没有语言前缀的路径的回退 */}
        <Route path="/*" element={<LanguageAwareRedirect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App; 