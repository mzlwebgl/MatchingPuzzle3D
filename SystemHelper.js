/**
 * 系统助手
 * <script type="module">
 *  import SystemHelper from './com_minzhongliangs/helpers/SystemHelper.js';
 * </script>
 */
export default class SystemHelper {

  /** 是否运行在移动设备 */
  static IsMobileDevice() {
    const ua = navigator.userAgent;
    const isMobileUA = /Mobi|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

    // iPadOS 13+ 伪装 macOS,需要额外判断
    const isModernIPad = /Macintosh/i.test(ua) && navigator.maxTouchPoints > 1;

    return isMobileUA || isModernIPad;
  }

  /** 当前设备是否支持触摸 */
  static IsTouchDevice() {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }

  /** 当前浏览器是否支持地理定位 */
  static IsLocation() {
    return "geolocation" in navigator;
  }

  /** 获取操作系统类型,未知返回="Unknown","Windows" / "MacOS" / "Linux" / "Android" / "iOS" */
  static GetPlatform() {
    const ua = navigator.userAgent;

    // iPadOS 新 UA 识别
    if (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1) {
      return "iOS"; // 或 "iPadOS"
    }

    if (/Windows NT/i.test(ua)) return "Windows";
    if (/Mac OS X/i.test(ua)) return "MacOS";
    if (/Android/i.test(ua)) return "Android";
    if (/iPhone|iPad|iPod/i.test(ua)) return "iOS";
    if (/Linux/i.test(ua)) return "Linux";

    return "Unknown";
  }

  /** 获取浏览器类型,未知返回="Unknown","Google Chrome" / "Safari" / "Mozilla Firefox" / "Internet Explorer" / "Microsoft Edge" / "Opera" */
  static GetBrowser() {
    const ua = navigator.userAgent;

    // WebView 检测
    if (/wv/.test(ua) || /WebView/i.test(ua)) {
      return "WebView";
    }

    // Internet Explorer
    if (/MSIE|Trident/i.test(ua)) return "Internet Explorer";

    // Opera (Opr/)
    if (/OPR\/|Opera/i.test(ua)) return "Opera";

    // Edge (Chromium)
    if (/Edg\//i.test(ua)) return "Microsoft Edge";

    // Edge (旧版)
    if (/Edge/i.test(ua)) return "Microsoft Edge";

    // Firefox
    if (/Firefox/i.test(ua)) return "Mozilla Firefox";

    // Safari
    if (
      /Safari/i.test(ua) &&
      !/Chrome/i.test(ua) &&
      !/Chromium/i.test(ua) &&
      !/Edg\//i.test(ua) &&
      !/OPR\//i.test(ua)
    ) {
      return "Safari";
    }

    // Chrome
    if (
      /Chrome|Chromium/i.test(ua) &&
      !/Edg\//i.test(ua) &&
      !/OPR\//i.test(ua)
    ) {
      return "Google Chrome";
    }

    return "Unknown";
  }

  /** 是否运行在非浏览器(Node.js)环境 */
  static IsNode() {
    return (
      typeof process !== "undefined" &&
      process.versions?.node != null
    );
  }

  /** 是否运行在 iOS WebView(App 内嵌) */
  static IsIOSWebView() {
    const ua = navigator.userAgent;
    return (
      /iPhone|iPad|iPod/.test(ua) &&
      !/Safari/.test(ua)
    );
  }

  /** 是否运行在 Android WebView */
  static IsAndroidWebView() {
    return /wv/.test(navigator.userAgent);
  }

}