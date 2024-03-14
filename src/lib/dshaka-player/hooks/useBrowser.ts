import { useEffect, useState } from 'react';


type Browser = 'Firefox' | 'Chrome' | 'Safari' | 'Edge' | 'Opera' | 'Unknown'

export default function useBrowser() : Browser {
  const [browser, setBrowser] = useState<Browser>('Unknown');

  useEffect(() => {
    const userAgent = navigator.userAgent;

    if (userAgent.includes('Firefox')) {
      setBrowser('Firefox');
    } else if (userAgent.includes('Chrome')) {
      setBrowser('Chrome');
    } else if (userAgent.includes('Safari')) {
      setBrowser('Safari');
    } else if (userAgent.includes('Edge')) {
      setBrowser('Edge');
    } else if (userAgent.includes('Opera')) {
      setBrowser('Opera');
    }
  }, []);

  return browser;
}

