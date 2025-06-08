const fs = require('fs');
const path = require('path');
const { currentSupportedLngs, defaultLng } = require('./i18n-config.cjs');

const supportedLngs = currentSupportedLngs;
const baseUrl = 'https://cozygame.fun'; // 替换为你的实际域名

// 读取翻译文件的函数
function loadTranslations(lang) {
  try {
    const translationPath = path.resolve(__dirname, `../public/locales/${lang}/translation.json`);
    return JSON.parse(fs.readFileSync(translationPath, 'utf8'));
  } catch (error) {
    console.warn(`Failed to load translations for ${lang}, using fallback`);
    return {};
  }
}

// 生成HTML模板的函数
function generateGameHTML(game, lang, translations) {
  const gameTitle = game.title[lang] || game.title[defaultLng] || game.title.en || game.id;
  const gameDescription = game.description[lang] || game.description[defaultLng] || game.description.en || '';
  const gameTags = game.tags[lang] || game.tags[defaultLng] || game.tags.en || [];
  
  const siteName = translations.site_name || 'CozyGame';
  const pageTitle = `${gameTitle} - ${siteName}`;
  const metaDescription = gameDescription.length > 160 
    ? gameDescription.substring(0, 157) + '...' 
    : gameDescription;

  // 生成hreflang链接
  const hreflangLinks = supportedLngs.map(lng => 
    `    <link rel="alternate" hreflang="${lng}" href="${baseUrl}/${lng}/game/${game.id}" />`
  ).join('\n');
  
  // 生成JSON-LD结构化数据
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": gameTitle,
    "description": gameDescription,
    "url": `${baseUrl}/${lang}/game/${game.id}`,
    "image": game.thumbnailUrl,
    "gamePlatform": "Web Browser",
    "applicationCategory": "Game",
    "operatingSystem": "Web Browser",
    "inLanguage": lang,
    "genre": gameTags.slice(0, 5).join(', '),
    "isPartOf": {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`
    },
    "potentialAction": {
      "@type": "PlayAction",
      "target": `${baseUrl}/${lang}/game/${game.id}`
    }
  };

  if (game.vip) {
    jsonLd.additionalProperty = {
      "@type": "PropertyValue",
      "name": "VIP",
      "value": "true"
    };
  }

  const html = `<!DOCTYPE html>
<html lang="${lang}" dir="ltr">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- SEO Meta Tags -->
    <title>${pageTitle}</title>
    <meta name="description" content="${metaDescription}" />
    <meta name="keywords" content="${gameTags.join(', ')}" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${baseUrl}/${lang}/game/${game.id}" />
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="${pageTitle}" />
    <meta property="og:description" content="${metaDescription}" />
    <meta property="og:image" content="${game.thumbnailUrl}" />
    <meta property="og:url" content="${baseUrl}/${lang}/game/${game.id}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${siteName}" />
    <meta property="og:locale" content="${lang}" />
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${pageTitle}" />
    <meta name="twitter:description" content="${metaDescription}" />
    <meta name="twitter:image" content="${game.thumbnailUrl}" />
    
    <!-- Hreflang Links -->
${hreflangLinks}
    <link rel="alternate" hreflang="x-default" href="${baseUrl}/${defaultLng}/game/${game.id}" />
    
    <!-- PWA Meta Tags -->
    <link rel="manifest" href="/manifest.json" />
    <meta name="theme-color" content="#1A202C" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="apple-mobile-web-app-title" content="${siteName}" />
    <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    
    <!-- Preload critical resources -->
    <link rel="preload" href="${game.thumbnailUrl}" as="image" />
    
    <!-- JSON-LD Structured Data -->
    <script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
    </script>
    
    <!-- 如果是生产环境，加载打包后的CSS -->
    <link rel="stylesheet" href="/assets/index.css" />
</head>
<body>
    <div id="root">
        <!-- 服务器端渲染内容的占位符 -->
        <!-- 这里可以放置基本的HTML结构，提供更好的首屏体验 -->
        <div class="min-h-screen bg-gray-50">
            <header class="bg-white shadow-sm">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between items-center h-16">
                        <div class="flex items-center">
                            <a href="/${lang}" class="text-xl font-bold text-gray-900">${siteName}</a>
                        </div>
                    </div>
                </div>
            </header>
            <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div class="p-6">
                        <h1 class="text-3xl font-bold text-gray-900 mb-4">${gameTitle}</h1>
                        ${game.vip ? '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mb-4">VIP</span>' : ''}
                        <p class="text-gray-600 mb-6">${gameDescription}</p>
                        <div class="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg">
                            <div class="flex items-center justify-center">
                                <p class="text-gray-500">Loading game...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
    
    <!-- React App will hydrate this content -->
    <script type="module" src="/src/main.jsx"></script>
    
    <!-- 添加结构化数据验证 -->
    <script>
        // 如果是开发环境，验证JSON-LD结构
        if (window.location.hostname === 'localhost') {
            console.log('Game structured data:', ${JSON.stringify(jsonLd)});
        }
    </script>
</body>
</html>`;

  return html;
}

async function generateStaticGamePages() {
  try {
    console.log('🚀 开始生成静态游戏页面...');
    
    // 读取游戏数据
    const gamesJsonPath = path.resolve(__dirname, '../public/games.json');
    const gamesData = JSON.parse(fs.readFileSync(gamesJsonPath, 'utf8'));
    
    if (!gamesData || !gamesData.games) {
      throw new Error('无效的游戏数据格式');
    }
    
    let totalPages = 0;
    
    // 为每种语言和每个游戏生成页面
    for (const lang of supportedLngs) {
      console.log(`📝 生成 ${lang} 语言的游戏页面...`);
      
      // 加载该语言的翻译
      const translations = loadTranslations(lang);
      
      // 创建语言目录
      const langDir = path.resolve(__dirname, '../dist', lang, 'game');
      fs.mkdirSync(langDir, { recursive: true });
      
      // 为每个游戏生成页面
      for (const game of gamesData.games) {
        const gameHtml = generateGameHTML(game, lang, translations);
        const gameFilePath = path.join(langDir, `${game.id}.html`);
        
        fs.writeFileSync(gameFilePath, gameHtml, 'utf8');
        totalPages++;
        
        if (totalPages % 50 === 0) {
          console.log(`  ✅ 已生成 ${totalPages} 个页面...`);
        }
      }
    }
    
    console.log(`🎉 成功生成 ${totalPages} 个静态游戏页面！`);
    console.log(`📊 统计信息:`);
    console.log(`  - 支持语言: ${supportedLngs.length} 种 (${supportedLngs.join(', ')})`);
    console.log(`  - 游戏数量: ${gamesData.games.length} 个`);
    console.log(`  - 总页面数: ${totalPages} 个`);
    
  } catch (error) {
    console.error('❌ 生成静态页面时出错:', error);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  generateStaticGamePages();
}

module.exports = { generateStaticGamePages }; 