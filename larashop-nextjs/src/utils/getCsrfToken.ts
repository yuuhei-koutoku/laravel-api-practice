/**
 * CSRFトークン発行API
 * @returns 実行結果
 */
export const getCsrfToken = async (): Promise<boolean> => {
  const res = await fetch(`http://localhost/sanctum/csrf-cookie`, {
    credentials: 'include'
  });
  
  if (!res.ok) {
    throw new Error('Failed to get CSRF token');
  }
  
  return Promise.resolve(true)

};

export default getCsrfToken