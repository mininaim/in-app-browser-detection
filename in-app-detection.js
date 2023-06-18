    function detectInAppBrowser() {
      function isInAppBrowser() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if (/android/i.test(userAgent) && /wv/i.test(userAgent)) {
          return "Android WebView";
        } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
          if (window.webkit && window.webkit.messageHandlers) {
            return "iOS WKWebView";
          } else if (navigator.standalone) {
            return "iOS standalone mode (web app)";
          }
        }
        
        if (window.navigator.standalone === true) {
          return "iOS standalone mode (Safari)";
        }
        if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
          return "Web app manifest (Chrome, Edge, Firefox)";
        }
        

        if (/Instagram/.test(userAgent)) {
          return "Instagram in-app browser";
        }
        if (/TikTok/.test(userAgent)) {
          return "TikTok in-app browser";
        }
        if (/LinkedIn/.test(userAgent)) {
          return "LinkedIn in-app browser";
        }
  
        return "Not an in-app browser";
      }

   
      var inAppBrowser = isInAppBrowser();


      if (inAppBrowser === "iOS WKWebView" && document.documentElement.lang === "ar") {
        document.addEventListener('DOMContentLoaded', function() {
          var styleElement = document.createElement('style');
          styleElement.innerHTML = `
            /* override the backwards effect */
            body {
              transform: none !important;
              direction: rtl !important;
              unicode-bidi: normal !important;
            }
          `;
          document.head.appendChild(styleElement);
        });
      }
    }

    // Call the detectInAppBrowser function
    detectInAppBrowser();
