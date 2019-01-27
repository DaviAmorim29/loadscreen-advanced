Init();

//Cache to keep track of all progress values.
//This is need for the Math.max functions (so no backwards progressbars).
var progressCache = [];

function Init()
{

    var cursor = document.getElementById("cursor");
    cursor.setAttribute("src", config.cursorImage);
}