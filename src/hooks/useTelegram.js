import { useEffect, useState } from 'react';

export function useTelegram() {
  const [tg, setTg] = useState(null);
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const webApp = window.Telegram?.WebApp;
    if (webApp) {
      setTg(webApp);
      setTheme(webApp.colorScheme || 'light');
      setUser(webApp.initDataUnsafe?.user || null);

      const handler = () => setTheme(webApp.colorScheme);
      webApp.onEvent('themeChanged', handler);
      return () => webApp.offEvent('themeChanged', handler);
    }
  }, []);

  return { tg, theme, user };
}