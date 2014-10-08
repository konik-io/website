<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
<#setting url_escaping_charset='UTF-8'>

   <#list published_content as content>
    <url>
        <loc><#if content.type="post">${config.site_host}/blog.html#${content.title?replace(" ", "-")?url}<#else>${config.site_host}/${content.uri}</#if></loc>
        <lastmod>${content.date?string("yyyy-MM-dd")}</lastmod>
    </url>
   </#list>

    <url>
        <loc>${config.site_host}/docs/api/konik/</loc>
        <lastmod>${.now?string("yyyy-MM-dd")}</lastmod>
    </url>
    <url>
        <loc>${config.site_host}/docs/api/pdfbox-carriage/</loc>
        <lastmod>${.now?string("yyyy-MM-dd")}</lastmod>
    </url>
    <url>
        <loc>${config.site_host}/docs/api/itext-carriage/</loc>
        <lastmod>${.now?string("yyyy-MM-dd")}</lastmod>
    </url>

</urlset>

