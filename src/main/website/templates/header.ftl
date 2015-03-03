<!DOCTYPE html>
<html lang="<#if (content.language)??>${content.language}<#else>de</#if>">
  <head>

    <meta charset="utf-8"/>
    <meta http-equiv="content-type" content="text/html;charset=UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta name="description" content="${content.meta_description}"/>
    <meta name="author" content="Vadim Bauer"/>
    <meta content="/img/logo.png" property="og:image"/>
    <meta name="keywords" content="${content.meta_keywords}"/>
    <meta name="date" content='${published_date?string("yyyy-MM-dd")}' scheme="YYYY-MM-DD"/>
	<meta name="author" content="Vadim Bauer">
    <#if (content.meta_robots)??><meta name="ROBOTS" content="${content.meta_robots}"/></#if>
	
    <title>${content.title}</title>

    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootswatch/3.0.2/cosmo/bootstrap.min.css" type="text/css"/>
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" type="text/css"/>
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.0/styles/obsidian.min.css" type="text/css"/>
    <link rel="stylesheet" href="/css/obsidian.css" type="text/css"/>
    <link rel="stylesheet" href="/css/mb.css"  type="text/css"/>
	<link rel="stylesheet" href="/css/konik.css" type="text/css"/>

    <!-- JQuery at the top to use it in our code -->
    <script src="//cdn.jsdelivr.net/jquery/2.1.0/jquery.min.js"></script>

    <!-- icon -->
    <link href="/favicon.ico"  rel="icon"  type="image/x-icon" />

    <script>
	  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
	  ga('create', 'UA-45977479-1', 'auto');
	  ga('require', 'displayfeatures');
	  ga('send', 'pageview');
	</script>

  </head>

  <body>