function getCookieValue(cookieName: string): string | null {
    const match = document.cookie.match(new RegExp(`(^| )${cookieName}=([^;]+)`));
    return match ? decodeURIComponent(match[2]) : null;
  }
  

  export default getCookieValue