const isWindowExist = typeof window !== 'undefined';

export const setCookie = (
  cName: string,
  cValue: any,
  cDay: number | null = null,
) => {
  if (!isWindowExist) return;

  let cookie = `${cName}=${encodeURIComponent(cValue)};path=/`;

  if (cDay) {
    const expires = new Date();
    expires.setDate(expires.getDate() + cDay);
    cookie += `;expires=${expires.toUTCString()}`;
  }

  document.cookie = cookie;
};

export const getCookie = (cName: string) => {
  if (!isWindowExist) return;

  const cValue =
    document.cookie.match(`(^|;)\\s*${cName}\\s*=\\s*([^;]+)`)?.pop() || '';
  return cValue;
};

export const deleteCookie = (cName: string) => {
  if (!isWindowExist) return;

  const cookie = `${cName}=;max-age=0`;
  document.cookie = cookie;
};
