import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const htaccessContent = `# 启用 URL 重写引擎
RewriteEngine On

# 如果请求的是现有文件或目录，直接访问
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d

# 将所有其他请求重定向到 index.html
RewriteRule ^ index.html [QSA,L]

# 设置缓存控制
<IfModule mod_expires.c>
  ExpiresActive On

  # 图片缓存 - 1个月
  ExpiresByType image/jpeg "access plus 1 month"
  ExpiresByType image/png "access plus 1 month"
  ExpiresByType image/gif "access plus 1 month"
  ExpiresByType image/webp "access plus 1 month"
  ExpiresByType image/svg+xml "access plus 1 month"
  ExpiresByType image/x-icon "access plus 1 month"

  # CSS和JavaScript - 1周
  ExpiresByType text/css "access plus 1 week"
  ExpiresByType application/javascript "access plus 1 week"
  ExpiresByType application/x-javascript "access plus 1 week"

  # 字体文件 - 1个月
  ExpiresByType application/x-font-ttf "access plus 1 month"
  ExpiresByType font/opentype "access plus 1 month"
  ExpiresByType application/x-font-woff "access plus 1 month"
  ExpiresByType application/font-woff "access plus 1 month"
  ExpiresByType application/font-woff2 "access plus 1 month"

  # 数据文件 - 1小时
  ExpiresByType application/json "access plus 1 hour"
  ExpiresByType application/xml "access plus 1 hour"
  ExpiresByType text/xml "access plus 1 hour"
</IfModule>

# 启用GZIP压缩
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/xml
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE application/xml
  AddOutputFilterByType DEFLATE application/xhtml+xml
  AddOutputFilterByType DEFLATE application/rss+xml
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/x-javascript
  AddOutputFilterByType DEFLATE application/json
  AddOutputFilterByType DEFLATE application/font-woff
  AddOutputFilterByType DEFLATE application/font-woff2
</IfModule>

# 安全头部
<IfModule mod_headers.c>
  # XSS 保护
  Header set X-XSS-Protection "1; mode=block"
  
  # 防止MIME类型嗅探
  Header set X-Content-Type-Options "nosniff"
  
  # 引用策略
  Header set Referrer-Policy "strict-origin-when-cross-origin"
  
  # 内容安全策略 - 根据需要调整
  Header set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com; connect-src 'self' https://*.googleapis.com; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; frame-src 'self' https:;"
</IfModule>

# 错误页面
ErrorDocument 404 /index.html`;

const htaccessPath = path.resolve(__dirname, '../public/.htaccess');

try {
  fs.writeFileSync(htaccessPath, htaccessContent);
  console.log(`已成功生成 .htaccess 文件，位于 ${htaccessPath}`);
} catch (error) {
  console.error('生成 .htaccess 文件时出错:', error);
} 