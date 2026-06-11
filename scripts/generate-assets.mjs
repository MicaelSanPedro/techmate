import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BASE_URL = 'https://techmate.dev';
const POSTS_DIR = path.join(process.cwd(), 'src/content/posts');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

function getAllPosts() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
  
  return files.map(file => {
    const filePath = path.join(POSTS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(content);
    return {
      slug: file.replace('.md', ''),
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      category: data.category
    };
  }).sort((a, b) => new Date(b.date) - new Date(a.date));
}

function generateSitemap(posts) {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${BASE_URL}/blog</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${BASE_URL}/favoritos</loc>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>
  ${posts.map(post => `
  <url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
</urlset>`;

  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemap);
  console.log('✅ sitemap.xml gerado com sucesso!');
}

function generateRSS(posts) {
  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>TechMate</title>
  <link>${BASE_URL}</link>
  <description>Seu parceiro em tech. Tutoriais e dicas honestas sobre Linux, Windows, dev e gaming.</description>
  <language>pt-br</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
  ${posts.map(post => `
  <item>
    <title><![CDATA[${post.title}]]></title>
    <link>${BASE_URL}/blog/${post.slug}</link>
    <guid>${BASE_URL}/blog/${post.slug}</guid>
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <description><![CDATA[${post.excerpt}]]></description>
    <category>${post.category}</category>
  </item>`).join('')}
</channel>
</rss>`;

  fs.writeFileSync(path.join(PUBLIC_DIR, 'rss.xml'), rss);
  console.log('✅ rss.xml gerado com sucesso!');
}

const posts = getAllPosts();
generateSitemap(posts);
generateRSS(posts);
