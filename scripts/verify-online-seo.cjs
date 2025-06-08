const https = require('https');
const http = require('http');
const { URL } = require('url');

const DOMAIN = 'https://cozygame.fun'; // 你的线上域名
const SAMPLE_GAMES = ['agent-smith', '8-ball-pool-billiard', 'airplane-racer']; // 测试用的样本游戏
const LANGUAGES = ['en', 'zh-CN', 'es', 'fr', 'de', 'ru', 'ja'];

// HTTP请求函数
function httpRequest(url) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const client = urlObj.protocol === 'https:' ? https : http;
    
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname + urlObj.search,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SEO-Validator/1.0)'
      }
    };

    const req = client.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });

    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.abort();
      reject(new Error('Request timeout'));
    });
    req.end();
  });
}

// 提取HTML中的SEO元数据
function extractSEOData(html) {
  const seo = {};
  
  // 提取title
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  seo.title = titleMatch ? titleMatch[1].trim() : null;
  
  // 提取meta description
  const descMatch = html.match(/<meta\s+name=["']description["'][^>]*content=["']([^"']+)["']/i);
  seo.description = descMatch ? descMatch[1].trim() : null;
  
  // 提取keywords
  const keywordsMatch = html.match(/<meta\s+name=["']keywords["'][^>]*content=["']([^"']+)["']/i);
  seo.keywords = keywordsMatch ? keywordsMatch[1].trim() : null;
  
  // 检查canonical
  seo.hasCanonical = html.includes('rel="canonical"');
  
  // 检查hreflang
  const hreflangCount = (html.match(/hreflang=/g) || []).length;
  seo.hreflangCount = hreflangCount;
  
  // 检查Open Graph
  seo.hasOG = html.includes('property="og:title"');
  
  // 检查Twitter Card
  seo.hasTwitterCard = html.includes('name="twitter:card"');
  
  // 检查JSON-LD
  seo.hasJSONLD = html.includes('application/ld+json');
  
  // 提取JSON-LD内容
  const jsonldMatch = html.match(/<script type="application\/ld\+json">\s*(\{[\s\S]*?\})\s*<\/script>/i);
  if (jsonldMatch) {
    try {
      seo.jsonLD = JSON.parse(jsonldMatch[1]);
    } catch (e) {
      seo.jsonLD = null;
    }
  }
  
  return seo;
}

// 验证网站基础配置
async function verifyBasics() {
  console.log('🌐 验证网站基础配置...\n');
  
  const results = {
    site: { success: false, errors: [] },
    sitemap: { success: false, errors: [] },
    robots: { success: false, errors: [] }
  };
  
  try {
    // 检查主站
    const siteResponse = await httpRequest(DOMAIN);
    if (siteResponse.statusCode === 200) {
      results.site.success = true;
      console.log('✅ 主站可访问');
    } else {
      results.site.errors.push(`主站返回状态码: ${siteResponse.statusCode}`);
    }
  } catch (error) {
    results.site.errors.push(`主站访问失败: ${error.message}`);
  }
  
  try {
    // 检查sitemap
    const sitemapResponse = await httpRequest(`${DOMAIN}/sitemap.xml`);
    if (sitemapResponse.statusCode === 200) {
      const urlCount = (sitemapResponse.body.match(/<url>/g) || []).length;
      const gameCount = (sitemapResponse.body.match(/\/game\//g) || []).length;
      
      results.sitemap.success = true;
      results.sitemap.urlCount = urlCount;
      results.sitemap.gameCount = gameCount;
      console.log(`✅ Sitemap可访问 (${urlCount} URLs, ${gameCount} 游戏页面)`);
      
      // 检查hreflang
      if (sitemapResponse.body.includes('hreflang')) {
        console.log('✅ Sitemap包含hreflang属性');
      } else {
        results.sitemap.errors.push('Sitemap缺少hreflang属性');
      }
    } else {
      results.sitemap.errors.push(`Sitemap返回状态码: ${sitemapResponse.statusCode}`);
    }
  } catch (error) {
    results.sitemap.errors.push(`Sitemap访问失败: ${error.message}`);
  }
  
  try {
    // 检查robots.txt
    const robotsResponse = await httpRequest(`${DOMAIN}/robots.txt`);
    if (robotsResponse.statusCode === 200) {
      results.robots.success = true;
      console.log('✅ Robots.txt可访问');
      
      if (robotsResponse.body.includes('Sitemap:')) {
        console.log('✅ Robots.txt包含Sitemap引用');
      } else {
        results.robots.errors.push('Robots.txt缺少Sitemap引用');
      }
    } else {
      results.robots.errors.push(`Robots.txt返回状态码: ${robotsResponse.statusCode}`);
    }
  } catch (error) {
    results.robots.errors.push(`Robots.txt访问失败: ${error.message}`);
  }
  
  return results;
}

// 验证游戏页面SEO
async function verifyGamePages() {
  console.log('\n🎮 验证游戏页面SEO配置...\n');
  
  const results = {};
  
  for (const lang of LANGUAGES) {
    console.log(`📝 检查 ${lang} 语言版本...`);
    results[lang] = { tested: 0, passed: 0, failed: 0, errors: [] };
    
    for (const gameId of SAMPLE_GAMES) {
      const url = `${DOMAIN}/${lang}/game/${gameId}`;
      
      try {
        const response = await httpRequest(url);
        results[lang].tested++;
        
        if (response.statusCode === 200) {
          const seo = extractSEOData(response.body);
          
          // 验证SEO元素
          const checks = [
            { name: 'Title', condition: seo.title && seo.title.length > 0 },
            { name: 'Description', condition: seo.description && seo.description.length > 0 },
            { name: 'Keywords', condition: seo.keywords && seo.keywords.length > 0 },
            { name: 'Canonical', condition: seo.hasCanonical },
            { name: 'Hreflang', condition: seo.hreflangCount >= LANGUAGES.length },
            { name: 'Open Graph', condition: seo.hasOG },
            { name: 'Twitter Card', condition: seo.hasTwitterCard },
            { name: 'JSON-LD', condition: seo.hasJSONLD }
          ];
          
          const passedChecks = checks.filter(check => check.condition).length;
          const failedChecks = checks.filter(check => !check.condition);
          
          if (passedChecks === checks.length) {
            results[lang].passed++;
            console.log(`  ✅ ${gameId}: 所有SEO检查通过 (${passedChecks}/${checks.length})`);
          } else {
            results[lang].failed++;
            console.log(`  ⚠️  ${gameId}: 部分SEO检查失败 (${passedChecks}/${checks.length})`);
            failedChecks.forEach(check => {
              console.log(`    ❌ 缺少: ${check.name}`);
            });
          }
          
          // 验证语言特定内容
          if (lang === 'zh-CN' && seo.title && !seo.title.match(/[\u4e00-\u9fff]/)) {
            console.log(`    ⚠️  中文页面标题可能不包含中文字符`);
          }
          
        } else {
          results[lang].failed++;
          results[lang].errors.push(`${gameId}: HTTP ${response.statusCode}`);
          console.log(`  ❌ ${gameId}: HTTP ${response.statusCode}`);
        }
      } catch (error) {
        results[lang].failed++;
        results[lang].errors.push(`${gameId}: ${error.message}`);
        console.log(`  ❌ ${gameId}: ${error.message}`);
      }
      
      // 避免请求过于频繁
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log(`  📊 ${lang} 总结: ${results[lang].passed}✅ ${results[lang].failed}❌ (共${results[lang].tested}个)`);
  }
  
  return results;
}

// 生成SEO验证报告
function generateReport(basicsResults, gameResults) {
  console.log('\n📊 线上SEO验证报告');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
  // 基础配置总结
  console.log('\n🌐 基础配置状态:');
  console.log(`   主站访问: ${basicsResults.site.success ? '✅' : '❌'}`);
  console.log(`   Sitemap: ${basicsResults.sitemap.success ? '✅' : '❌'}`);
  console.log(`   Robots.txt: ${basicsResults.robots.success ? '✅' : '❌'}`);
  
  if (basicsResults.sitemap.success) {
    console.log(`   Sitemap统计: ${basicsResults.sitemap.urlCount} URLs, ${basicsResults.sitemap.gameCount} 游戏页面`);
  }
  
  // 游戏页面总结
  console.log('\n🎮 游戏页面SEO状态:');
  let totalTested = 0, totalPassed = 0, totalFailed = 0;
  
  for (const [lang, result] of Object.entries(gameResults)) {
    totalTested += result.tested;
    totalPassed += result.passed;
    totalFailed += result.failed;
    
    const successRate = result.tested > 0 ? Math.round((result.passed / result.tested) * 100) : 0;
    console.log(`   ${lang}: ${result.passed}/${result.tested} 通过 (${successRate}%)`);
  }
  
  const overallSuccessRate = totalTested > 0 ? Math.round((totalPassed / totalTested) * 100) : 0;
  console.log(`   总体成功率: ${totalPassed}/${totalTested} (${overallSuccessRate}%)`);
  
  // 错误总结
  let hasErrors = false;
  for (const [category, result] of Object.entries(basicsResults)) {
    if (result.errors && result.errors.length > 0) {
      if (!hasErrors) {
        console.log('\n❌ 发现的问题:');
        hasErrors = true;
      }
      console.log(`   ${category}:`);
      result.errors.forEach(error => console.log(`     - ${error}`));
    }
  }
  
  for (const [lang, result] of Object.entries(gameResults)) {
    if (result.errors && result.errors.length > 0) {
      if (!hasErrors) {
        console.log('\n❌ 发现的问题:');
        hasErrors = true;
      }
      console.log(`   ${lang} 游戏页面:`);
      result.errors.forEach(error => console.log(`     - ${error}`));
    }
  }
  
  if (!hasErrors) {
    console.log('\n🎉 所有检查都通过了！线上SEO配置完美！');
  }
  
  // 建议
  console.log('\n💡 优化建议:');
  console.log('   1. 使用 Google Search Console 提交sitemap');
  console.log('   2. 监控 Core Web Vitals 性能指标');
  console.log('   3. 定期检查索引状态和搜索表现');
  console.log('   4. 考虑添加更多结构化数据类型');
  
  // 在线工具建议
  console.log('\n🔧 推荐的在线SEO验证工具:');
  console.log('   • Google结构化数据测试: https://search.google.com/test/rich-results');
  console.log('   • Facebook Open Graph调试器: https://developers.facebook.com/tools/debug/');
  console.log('   • Twitter Card验证器: https://cards-dev.twitter.com/validator');
  console.log(`   • 示例测试URL: ${DOMAIN}/en/game/${SAMPLE_GAMES[0]}`);
}

// 主函数
async function main() {
  console.log('🚀 开始线上SEO验证...\n');
  console.log(`🎯 目标域名: ${DOMAIN}`);
  console.log(`🌐 测试语言: ${LANGUAGES.join(', ')}`);
  console.log(`🎮 样本游戏: ${SAMPLE_GAMES.join(', ')}\n`);
  
  try {
    const basicsResults = await verifyBasics();
    const gameResults = await verifyGamePages();
    
    generateReport(basicsResults, gameResults);
    
    // 根据结果设置退出码
    const hasBasicErrors = Object.values(basicsResults).some(result => !result.success);
    const hasGameErrors = Object.values(gameResults).some(result => result.failed > 0);
    
    if (hasBasicErrors || hasGameErrors) {
      process.exit(1);
    }
    
  } catch (error) {
    console.error('❌ 验证过程中发生错误:', error);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = { main }; 