// 21522436 - Nguyễn Thị Hồng Nhung
import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';

import { AuthProvider, useAuth } from '~/provider/AuthProvider';

// Makes sure the user is authenticated before accessing protected pages
const InitialLayout = () => {
  const { session } = useAuth();
  const segments = useSegments() as string[];
  const router = useRouter();

  useEffect(() => {
    // Check if the path/url is in the (auth) group
    const inAuthGroup = segments[0] === '(auth)';

    if (session && !inAuthGroup) {
      // Redirect authenticated users to the page
      router.replace('/(bt1)/(app-screen)/(drawer)/(tabs)');
    } else if (!session) {
      // Redirect unauthenticated users to the login page
      router.replace('/(bt1)/(auth)/login');
    }
  }, [session]);

  return <Slot />;
};

// Wrap the app with the AuthProvider
const RootLayout = () => {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
};

export default RootLayout;