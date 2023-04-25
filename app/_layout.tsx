import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, useColorScheme } from 'react-native';

import { useThemeColor } from '../components/Themed';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
    Montserrat: require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, 'background');

  const headerConfig = {
    headerStyle: { backgroundColor },
    headerTitleStyle: {
      fontFamily: 'Montserrat-SemiBold',
      fontSize: 14,
      fontWeight: '600',
    },
  } as const;

  return (
    <>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerTitle: 'Ordinal Inscription Lookup',
              ...headerConfig,
            }}
          />
          <Stack.Screen
            name="details"
            options={{
              headerTitle: 'Ordinal Inscription Lookup',
              ...headerConfig,
            }}
          />
        </Stack>
      </ThemeProvider>
    </>
  );
}
