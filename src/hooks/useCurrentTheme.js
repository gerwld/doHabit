import { useEffect, useState } from 'react';
import { Platform, useColorScheme } from 'react-native';

// For web, you can use the window.matchMedia API
const useCurrentTheme = () => {
  const [theme, setTheme] = useState('light'); // Default to light theme

  // Get theme for mobile platforms
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (Platform.OS === 'web') {
      // For web, use window.matchMedia
      const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setTheme(darkModeMediaQuery.matches ? 'dark' : 'light');
      
      const handleChange = (event) => {
        setTheme(event.matches ? 'dark' : 'light');
      };

      darkModeMediaQuery.addEventListener('change', handleChange);

      return () => {
        darkModeMediaQuery.removeEventListener('change', handleChange);
      };
    } else {
      // For iOS and Android, use useColorScheme
      setTheme(colorScheme === 'dark' ? 'dark' : 'light');
    }
  }, [colorScheme]);

  return theme;
};

export default useCurrentTheme;
