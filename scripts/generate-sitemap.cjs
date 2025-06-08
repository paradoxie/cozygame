const fs = require('fs');
const path = require('path');
const { currentSupportedLngs, defaultLng } = require('./i18n-config.cjs');

const supportedLanguages = currentSupportedLngs;
const defaultLanguage = defaultLng;
const DOMAIN = 'https://cozygame.fun';

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
      const links_alternate = [];
      
      // 为每种支持的语言生成hreflang链接
      supportedLanguages.forEach(altLang => {
        const hrefUrl = `${DOMAIN}/${altLang}${pagePath ? `/${pagePath}` : ''}`;
        links_alternate.push({
          rel: 'alternate',
          hreflang: altLang,
          href: hrefUrl,
        });
      });
      
      // 添加x-default链接
      const defaultHref = `${DOMAIN}/${defaultLanguage}${pagePath ? `/${pagePath}` : ''}`;
      links_alternate.push({
        rel: 'alternate',
        hreflang: 'x-default',
        href: defaultHref,
      });

      links.push({
        url: url,
        changefreq: pagePath === '' ? 'daily' : 'weekly',
        priority: pagePath === '' ? 1.0 : 0.8,
        alternateRefs: links_alternate,
      });
    });
  });

  // 为每种语言添加游戏详情页
  if (gamesData && gamesData.games) {
    gamesData.games.forEach(game => {
      supportedLanguages.forEach(lang => {
        const gameUrlSegment = `/game/${game.id}`;
        const url = `/${lang}${gameUrlSegment}`;
        
        const links_alternate = [];
        
        // 为每种支持的语言生成hreflang链接
        supportedLanguages.forEach(altLang => {
          links_alternate.push({
            rel: 'alternate',
            hreflang: altLang,
            href: `${DOMAIN}/${altLang}${gameUrlSegment}`,
          });
        });
        
        // 添加x-default链接
        links_alternate.push({
          rel: 'alternate',
          hreflang: 'x-default',
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
          alternateRefs: links_alternate,
          img: imgEntry, // 如果有缩略图则添加图片站点地图条目
        });
      });
    });
  } else {
    console.warn("gamesData.games 未定义或为空。未将游戏页面添加到站点地图中。");
  }

  // 手动生成XML sitemap
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ';
  xml += 'xmlns:xhtml="http://www.w3.org/1999/xhtml" ';
  xml += 'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';
  
  links.forEach(link => {
    xml += '  <url>\n';
    xml += `    <loc>${link.url.startsWith('http') ? link.url : DOMAIN + link.url}</loc>\n`;
    xml += `    <changefreq>${link.changefreq}</changefreq>\n`;
    xml += `    <priority>${link.priority}</priority>\n`;
    
    // 添加hreflang链接
    if (link.alternateRefs && Array.isArray(link.alternateRefs)) {
      link.alternateRefs.forEach(altRef => {
        xml += `    <xhtml:link rel="${altRef.rel}" hreflang="${altRef.hreflang}" href="${altRef.href}" />\n`;
      });
    }
    
    // 添加图片信息
    if (link.img && Array.isArray(link.img)) {
      link.img.forEach(image => {
        xml += '    <image:image>\n';
        xml += `      <image:loc>${image.url}</image:loc>\n`;
        if (image.title) {
          xml += `      <image:title><![CDATA[${image.title}]]></image:title>\n`;
        }
        xml += '    </image:image>\n';
      });
    }
    
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  try {
    const sitemapPath = path.resolve(__dirname, '../public/sitemap.xml');
    fs.writeFileSync(sitemapPath, xml);
    console.log(`站点地图已成功生成，位于 ${sitemapPath}！包含 ${links.length} 个 URL。`);
  } catch (error) {
    console.error("生成站点地图时出错:", error);
  }
}

generateSitemap(); 
