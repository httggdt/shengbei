function setResize() {
    var doc = document,
            win = window;
    var docEl = doc.documentElement,
            con = doc.getElementById("container"),
            resizeEvt = 'orientationchange' in window ? 'orientationchange'
            : 'resize',
            recalc = function() {
                var clientWidth = con.clientWidth;
                if (!clientWidth) return;
                docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
                document.body.style.visibility = "visible"
            } 
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);         
}
setResize();
