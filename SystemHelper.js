export default class SystemHelper {
  static IsMobileDevice() {
    const ua = navigator.userAgent;
    const isMobileUA = /Mobi|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

    // iPadOS 13+ 伪装 macOS,需要额外判断
    const isModernIPad = /Macintosh/i.test(ua) && navigator.maxTouchPoints > 1;

    return isMobileUA || isModernIPad;
  }
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
  static async SetSystemCopyBuffer(text) {
    if (!text) {
      return false;
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (e) {
        return false;
      }
    }
    return false;
  }
}