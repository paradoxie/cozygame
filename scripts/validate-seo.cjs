const fs = require('fs');
const path = require('path');
const { currentSupportedLngs } = require('./i18n-config.cjs');

async function validateSEO() {
  console.log('🔍 开始验证SEO配置...\n');
  
  let errors = [];
  let warnings = [];
  let totalPages = 0;
  
  try {
    // 1. 验证games.json存在且格式正确
    const gamesJsonPath = path.resolve(__dirname, '../public/games.json');
    if (!fs.existsSync(gamesJsonPath)) {
      errors.push('❌ games.json 文件不存在');
    } else {
      const gamesData = JSON.parse(fs.readFileSync(gamesJsonPath, 'utf8'));
      if (!gamesData || !gamesData.games || !Array.isArray(gamesData.games)) {
        errors.push('❌ games.json 格式无效');
      } else {
        console.log(`✅ 游戏数据: ${gamesData.games.length} 个游戏`);
        
        // 验证游戏数据结构
        let gamesWithMissingTranslations = 0;
        gamesData.games.forEach((game, index) => {
          if (!game.id) {
            errors.push(`❌ 游戏 #${index + 1} 缺少 id 字段`);
          }
          
          // 检查多语言支持
          let hasAllTranslations = true;
          currentSupportedLngs.forEach(lang => {
            if (!game.title || !game.title[lang]) {
              hasAllTranslations = false;
            }
            if (!game.description || !game.description[lang]) {
              hasAllTranslations = false;
            }
          });
          
          if (!hasAllTranslations) {
            gamesWithMissingTranslations++;
          }
        });
        
        if (gamesWithMissingTranslations > 0) {
          warnings.push(`⚠️  ${gamesWithMissingTranslations} 个游戏缺少某些语言的翻译`);
        }
      }
    }
    
    // 2. 验证静态页面生成
    console.log('\n📄 检查静态页面生成...');
    const distDir = path.resolve(__dirname, '../dist');
    
    if (!fs.existsSync(distDir)) {
      warnings.push('⚠️  dist 目录不存在，请先运行构建命令');
    } else {
      for (const lang of currentSupportedLngs) {
        const langGameDir = path.join(distDir, lang, 'game');
        if (fs.existsSync(langGameDir)) {
          const staticFiles = fs.readdirSync(langGameDir).filter(f => f.endsWith('.html'));
          totalPages += staticFiles.length;
          console.log(`  ✅ ${lang}: ${staticFiles.length} 个静态页面`);
        } else {
          warnings.push(`⚠️  ${lang} 语言的静态页面目录不存在`);
        }
      }
    }
    
    // 3. 验证sitemap.xml
    console.log('\n🗺️  检查sitemap.xml...');
    const sitemapPath = path.resolve(__dirname, '../public/sitemap.xml');
    if (!fs.existsSync(sitemapPath)) {
      errors.push('❌ sitemap.xml 不存在');
    } else {
      const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
      const urlCount = (sitemapContent.match(/<url>/g) || []).length;
      console.log(`  ✅ Sitemap 包含 ${urlCount} 个URL`);
      
      // 验证是否包含多语言链接
      const hasHreflang = sitemapContent.includes('hreflang');
      if (hasHreflang) {
        console.log('  ✅ Sitemap 包含 hreflang 属性');
      } else {
        warnings.push('⚠️  Sitemap 缺少 hreflang 属性');
      }
    }
    
    // 4. 验证robots.txt
    console.log('\n🤖 检查robots.txt...');
    const robotsPath = path.resolve(__dirname, '../public/robots.txt');
    if (!fs.existsSync(robotsPath)) {
      warnings.push('⚠️  robots.txt 不存在');
    } else {
      const robotsContent = fs.readFileSync(robotsPath, 'utf8');
      if (robotsContent.includes('Sitemap:')) {
        console.log('  ✅ robots.txt 包含 Sitemap 引用');
      } else {
        warnings.push('⚠️  robots.txt 缺少 Sitemap 引用');
      }
    }
    
    // 5. 验证翻译文件
    console.log('\n🌐 检查翻译文件...');
    for (const lang of currentSupportedLngs) {
      const translationPath = path.resolve(__dirname, `../public/locales/${lang}/translation.json`);
      if (fs.existsSync(translationPath)) {
        console.log(`  ✅ ${lang} 翻译文件存在`);
      } else {
        errors.push(`❌ ${lang} 翻译文件不存在`);
      }
    }
    
    // 6. 验证.htaccess
    console.log('\n⚙️  检查.htaccess配置...');
    const htaccessPath = path.resolve(__dirname, '../public/.htaccess');
    if (!fs.existsSync(htaccessPath)) {
      warnings.push('⚠️  .htaccess 文件不存在');
    } else {
      const htaccessContent = fs.readFileSync(htaccessPath, 'utf8');
      
      if (htaccessContent.includes('bot|crawler|spider')) {
        console.log('  ✅ .htaccess 包含搜索引擎爬虫检测');
      } else {
        warnings.push('⚠️  .htaccess 缺少搜索引擎爬虫检测规则');
      }
      
      if (htaccessContent.includes('RewriteEngine On')) {
        console.log('  ✅ .htaccess URL重写已启用');
      } else {
        errors.push('❌ .htaccess URL重写未启用');
      }
    }
    
    // 7. 生成SEO报告
    console.log('\n📊 SEO 配置报告');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📈 总体统计:`);
    console.log(`   - 支持语言数: ${currentSupportedLngs.length}`);
    console.log(`   - 静态页面数: ${totalPages}`);
    console.log(`   - 每语言平均页面数: ${Math.round(totalPages / currentSupportedLngs.length)}`);
    
    if (errors.length === 0 && warnings.length === 0) {
      console.log('\n🎉 SEO配置完美！所有检查都通过了！');
    } else {
      if (errors.length > 0) {
        console.log('\n❌ 发现错误:');
        errors.forEach(error => console.log(`   ${error}`));
      }
      
      if (warnings.length > 0) {
        console.log('\n⚠️  发现警告:');
        warnings.forEach(warning => console.log(`   ${warning}`));
      }
    }
    
    // 8. 提供优化建议
    console.log('\n💡 SEO 优化建议:');
    console.log('   1. 确保所有游戏都有完整的多语言翻译');
    console.log('   2. 定期更新sitemap.xml');
    console.log('   3. 监控Google Search Console的索引状态');
    console.log('   4. 考虑添加结构化数据富媒体摘要');
    console.log('   5. 优化页面加载速度和Core Web Vitals');
    console.log('   6. 考虑生成针对不同地区的专用sitemap');
    
    return {
      success: errors.length === 0,
      errors,
      warnings,
      stats: {
        totalLanguages: currentSupportedLngs.length,
        totalStaticPages: totalPages,
        avgPagesPerLanguage: Math.round(totalPages / currentSupportedLngs.length)
      }
    };
    
  } catch (error) {
    console.error('❌ 验证过程中出错:', error);
    return {
      success: false,
      errors: [error.message],
      warnings: [],
      stats: {}
    };
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  validateSEO().then(result => {
    if (!result.success) {
      process.exit(1);
    }
  });
}

module.exports = { validateSEO };