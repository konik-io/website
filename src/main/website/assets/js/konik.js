//Highlight js init 
hljs.initHighlightingOnLoad();

$('.download-zip-package').on('click', function() {
  ga('send', 'event', 'button', 'click', 'download-zip-package');
});

$(".navbar-fixed-top").headroom();