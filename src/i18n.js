import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const recommendedLngs = ['en', 'zh-CN', 'es', 'pt-BR', 'fr', 'de', 'ru', 'ja', 'ko', 'id'];
// 支持7种语言
const currentSupportedLngs = ['en', 'zh-CN', 'es', 'fr', 'de', 'ru', 'ja'];
const defaultLng = 'en';

i18n
  .use(HttpApi) // 从 public/locales 加载翻译文件
  .use(LanguageDetector) // 自动检测用户语言
  .use(initReactI18next) // 将 i18n 实例传递给 react-i18next
  .init({
    supportedLngs: currentSupportedLngs,
    fallbackLng: defaultLng, // 如果检测不到或当前语言无翻译，则使用的语言
    debug: process.env.NODE_ENV === 'development', // 开发模式下开启debug
    
    detection: {
      // 顺序: 路径 > localStorage > 浏览器设置
      order: ['path', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'], // 将检测到的语言缓存在localStorage
      lookupFromPathIndex: 0, // 语言代码在路径的第一个位置 (e.g., /en/...)
    },

    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // 翻译文件路径
    },

    react: {
      useSuspense: true, // 推荐，配合React Suspense在加载翻译时显示fallback UI
    },
  });

export { currentSupportedLngs, defaultLng, recommendedLngs };
export default i18n; 