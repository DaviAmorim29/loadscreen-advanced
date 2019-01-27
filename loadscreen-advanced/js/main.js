$(document).ready(function(){
	$('#nav-icon1,.nav-icon2,#nav-icon3,#nav-icon4').click(function(){
		$(this).toggleClass('open');
	});
});

$('.nav-icon2').on("click", function(){
	$('.page').toggleClass('pageby');
});

var progressCache = [];

function Init()
{

    var cursor = document.getElementById("cursor");
    cursor.setAttribute("src", config.cursorImage);
}
