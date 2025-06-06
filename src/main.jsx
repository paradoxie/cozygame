import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';
import './i18n'; // 初始化 i18n
import './index.css'; // 全局CSS
import './assets/styles/global.css'; // 导入全局游戏站样式

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={<div className="flex justify-center items-center h-screen">
      <div className="animate-pulse-subtle">
        <div className="w-16 h-16 border-4 border-primary-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Suspense>
  </React.StrictMode>
); 