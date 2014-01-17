
// tree collapse
/*
$(function () {
    $('.tree li:has(ul)').addClass('parent_li').find(' > p').attr('title', 'Collapse this branch');
    $('.tree li.parent_li > p').on('click', function (e) {
        var children = $(this).parent('li.parent_li').find(' div.ulist > ul > li');
        if (children.is(":visible")) {
            children.hide('fast');
            $(this).attr('title', 'Expand this branch').find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
        } else {
            children.show('fast');
            $(this).attr('title', 'Collapse this branch').find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
        }
        e.stopPropagation();
    });
});
*/

hljs.initHighlightingOnLoad();