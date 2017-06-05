 (function (doc, win) {
     var docEl = doc.documentElement,
         resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
         recalc = function () {
             var clientWidth = docEl.clientWidth;
             if (!clientWidth) return;
             if (clientWidth >= 1024) {
                 docEl.style.fontSize = '100px';
             } else {
                 docEl.style.fontSize = 100 * (clientWidth / 1024) + 'px'; // 用边缘值代入 50*（640/320）px=100px;
             }
             console.log("!!" + docEl.style.fontSize)
         };

     if (!doc.addEventListener) return;
     win.addEventListener(resizeEvt, recalc, false);
     doc.addEventListener('DOMContentLoaded', recalc, false);
 })(document, window);