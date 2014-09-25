//Highlight js init 
hljs.configure({
  tabReplace: '    ', // 4 spaces
});

hljs.initHighlightingOnLoad();

$('.download-zip-package').on('click', function() {
  ga('send', 'event', 'button', 'click', 'download-zip-package');
});

$(".navbar-fixed-top").headroom({
	  "tolerance": 5,
	  "offset": 100});

$(function () { $("[data-toggle='tooltip']").tooltip(); });