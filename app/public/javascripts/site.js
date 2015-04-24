$(document).ready(function() {    
    $(".anchor").click(function() {
        var a = $(this).attr("href");
	    a = a.substr(a.indexOf('#'));
        $(window).scrollTop($(a).offset().top - 50);
	    return false;
	});
// move to anchor offset if coming from another page // 
    var n = window.location.href.lastIndexOf('#');
    if (n > -1){
        var a = window.location.href.substr(n);
        setTimeout(function(){ $(window).scrollTop($(a).offset().top - 50); }, 100);        
    }
});