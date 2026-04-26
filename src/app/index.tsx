import { useRouter } from 'expo-router';
import { useEffect } from 'react';

import SplashScreen from '../components/splash-screen';
import { getMainTabRoute } from '../features/ledger/main-tab-navigation';

export default function IndexScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace(getMainTabRoute('home'));
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [router]);

  return <SplashScreen />;
}
