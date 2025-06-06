import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 手动导入 i18n 配置以获取支持的语言
// 这是一种简化的方式；在实际设置中，您可能会有一个共享的配置
const supportedLanguages = ['en', 'zh-CN', 'es', 'fr', 'de', 'ru', 'ja']; // 与 src/i18n.js 保持同步
const defaultLanguage = 'en';

const DOMAIN = 'https://cozygame.fun'; // 替换为您的实际域名

async function generateSitemap() {
  let gamesData;
  try {
    const gamesJsonPath = path.resolve(__dirname, '../public/games.json');
    gamesData = JSON.parse(fs.readFileSync(gamesJsonPath, 'utf8'));
  } catch (error) {
    console.error("无法读取或解析 games.json:", error);
    return;
  }

  const links = [];

  // 为每种语言添加静态页面
  const staticPages = [
    '', // 首页
    'all-games',
    'vip-zone',
    'about',
    'contact',
    'privacy',
    'terms',
    'disclaimer',
    'cookie-policy',
    'sitemap'
  ];
  
  supportedLanguages.forEach(lang => {
    staticPages.forEach(pagePath => {
      const url = `/${lang}${pagePath ? `/${pagePath}` : ''}`;
      const xhtmlLinks = supportedLanguages.map(lng => ({
        rel: 'alternate',
        hrefLang: lng,
        href: `${DOMAIN}/${lng}${pagePath ? `/${pagePath}` : ''}`,
      }));
      xhtmlLinks.push({
        rel: 'alternate',
        hrefLang: 'x-default',
        href: `${DOMAIN}/${defaultLanguage}${pagePath ? `/${pagePath}` : ''}`,
      });

      links.push({
        url: url,
        changefreq: pagePath === '' ? 'daily' : 'weekly',
        priority: pagePath === '' ? 1.0 : 0.8,
        xhtmlLinks: xhtmlLinks,
      });
    });
  });

  // 为每种语言添加游戏详情页
  if (gamesData && gamesData.games) {
    gamesData.games.forEach(game => {
      supportedLanguages.forEach(lang => {
        const gameUrlSegment = `/game/${game.id}`;
        const url = `/${lang}${gameUrlSegment}`;
        
        const xhtmlLinks = supportedLanguages.map(lng => ({
          rel: 'alternate',
          hrefLang: lng,
          href: `${DOMAIN}/${lng}${gameUrlSegment}`,
        }));
        xhtmlLinks.push({
          rel: 'alternate',
          hrefLang: 'x-default',
          href: `${DOMAIN}/${defaultLanguage}${gameUrlSegment}`,
        });
        
        const imgEntry = game.thumbnailUrl ? [{
            url: game.thumbnailUrl.startsWith('http') 
              ? game.thumbnailUrl 
              : `${DOMAIN}${game.thumbnailUrl}`,
            title: game.title[lang] || game.title[defaultLanguage] || game.title['en'],
        }] : undefined;

        links.push({
          url: url,
          changefreq: 'monthly',
          priority: 0.7,
          xhtmlLinks: xhtmlLinks,
          img: imgEntry, // 如果有缩略图则添加图片站点地图条目
        });
      });
    });
  } else {
    console.warn("gamesData.games 未定义或为空。未将游戏页面添加到站点地图中。");
  }

  const stream = new SitemapStream({ hostname: DOMAIN });
  try {
    const xml = await streamToPromise(Readable.from(links).pipe(stream)).then((data) =>
      data.toString()
    );
    const sitemapPath = path.resolve(__dirname, '../public/sitemap.xml');
    fs.writeFileSync(sitemapPath, xml);
    console.log(`站点地图已成功生成，位于 ${sitemapPath}！包含 ${links.length} 个 URL。`);
  } catch (error) {
    console.error("生成站点地图时出错:", error);
  }
}

generateSitemap(); 
