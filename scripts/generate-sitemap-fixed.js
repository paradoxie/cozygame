import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 手动导入i18n配置以获取支持的语言
const currentSupportedLngs = ['en', 'zh-CN', 'es']; // 与src/i18n.js保持同步
const defaultLng = 'en';

const YOUR_DOMAIN = 'https://cozygame.fun'; // 替换为您的实际域名

async function generateSitemap() {
  let gamesData;
  try {
    const gamesJsonPath = path.resolve(__dirname, '../public/games.json');
    gamesData = JSON.parse(fs.readFileSync(gamesJsonPath, 'utf8'));
  } catch (error) {
    console.error("读取或解析games.json失败:", error);
    return;
  }

  const links = [];

  // 为每种语言添加静态页面
  const staticPages = ['', 'vip-zone']; // 相对于语言根目录的路径，''表示该语言的主页
  
  currentSupportedLngs.forEach(lang => {
    staticPages.forEach(pagePath => {
      const url = `/${lang}${pagePath ? `/${pagePath}` : ''}`;
      const xhtmlLinks = currentSupportedLngs.map(lng => ({
        rel: 'alternate',
        hreflang: lng,
        href: `${YOUR_DOMAIN}/${lng}${pagePath ? `/${pagePath}` : ''}`,
      }));
      xhtmlLinks.push({
        rel: 'alternate',
        hreflang: 'x-default',
        href: `${YOUR_DOMAIN}/${defaultLng}${pagePath ? `/${pagePath}` : ''}`,
      });

      links.push({
        url: url,
        changefreq: pagePath === '' ? 'daily' : 'weekly',
        priority: pagePath === '' ? 1.0 : 0.8,
        xhtmlLinks: xhtmlLinks, // 修正：使用 xhtmlLinks 而不是 links
      });
    });
  });

  // 为每种语言添加游戏详情页
  if (gamesData && gamesData.games) {
    gamesData.games.forEach(game => {
      currentSupportedLngs.forEach(lang => {
        const gameUrlSegment = `/game/${game.id}`;
        const url = `/${lang}${gameUrlSegment}`;
        
        const xhtmlLinks = currentSupportedLngs.map(lng => ({
          rel: 'alternate',
          hreflang: lng,
          href: `${YOUR_DOMAIN}/${lng}${gameUrlSegment}`,
        }));
        xhtmlLinks.push({
          rel: 'alternate',
          hreflang: 'x-default',
          href: `${YOUR_DOMAIN}/${defaultLng}${gameUrlSegment}`,
        });
        
        const imgEntry = game.thumbnailUrl ? [{
            url: game.thumbnailUrl.startsWith("http") ? game.thumbnailUrl : `${YOUR_DOMAIN}${game.thumbnailUrl}`,
            title: game.title[lang] || game.title[defaultLng] || game.title['en'],
        }] : undefined;

        links.push({
          url: url,
          changefreq: 'monthly',
          priority: 0.7,
          xhtmlLinks: xhtmlLinks, // 修正：使用 xhtmlLinks 而不是 links
          img: imgEntry, // 如果存在缩略图，则添加图片站点地图条目
        });
      });
    });
  } else {
    console.warn("gamesData.games未定义或为空。未将游戏页面添加到站点地图。");
  }

  const stream = new SitemapStream({ hostname: YOUR_DOMAIN });
  try {
    const xml = await streamToPromise(Readable.from(links).pipe(stream)).then((data) =>
      data.toString()
    );
    const sitemapPath = path.resolve(__dirname, '../public/sitemap.xml');
    fs.writeFileSync(sitemapPath, xml);
    console.log(`站点地图生成成功，位于${sitemapPath}！包含${links.length}个URL。`);
  } catch (error) {
    console.error("生成站点地图时出错:", error);
  }
}

generateSitemap(); 