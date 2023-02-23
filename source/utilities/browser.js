let browser = {};

if (typeof navigator !== 'undefined') {
  const userAgent = navigator.userAgent.toLowerCase();

  browser = {
    isSafari: /safari/i.test(userAgent) && !/(chrome|chromium)/i.test(userAgent),
    isChrome: /chrome/i.test(userAgent),
  };
  
  if (browser.isSafari) {
    browser.name = 'safari';
  } else if (browser.isChrome) {
    browser.name = 'chrome';
  }  
} else {
  browser = {
    isNode: true
  };
}

export {browser};