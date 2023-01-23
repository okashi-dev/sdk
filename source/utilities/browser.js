const userAgent = navigator.userAgent.toLowerCase();

const browser = {
  isSafari: /safari/i.test(userAgent) && !/(chrome|chromium)/i.test(userAgent),
  isChrome: /chrome/i.test(userAgent),
};

if (browser.isSafari) {
  browser.name = 'safari';
} else if (browser.isChrome) {
  browser.name = 'chrome';
}

export {browser};