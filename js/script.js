//Mobile support (for navbar)

function navToggle() {
    var b = document.getElementById("navBar");
    "navbar" === b.className ? b.className += " responsive" : b.className="navbar";
}
