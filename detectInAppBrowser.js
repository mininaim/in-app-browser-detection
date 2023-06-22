function detectInAppBrowser() {
  const isInAppBrowser = () => {
    const { userAgent, vendor, opera } = navigator;
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

    return "Not an in-app browser";
  };

  const inAppBrowser = isInAppBrowser();

  if (inAppBrowser === "iOS WKWebView" && document.documentElement.lang === "ar") {
    document.addEventListener('DOMContentLoaded', () => {
      const styleElement = document.createElement('style');
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
