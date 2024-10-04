import { useEffect } from 'react';
import { Dimensions } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

const useOrientationLock = () => {
  useEffect(() => {
    const handleOrientation = async () => {
      const { width } = Dimensions.get('window');
      if (width >= 768) {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
      } else {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      }
    };

    handleOrientation(); // Check the orientation on initial render

    const subscription = Dimensions.addEventListener('change', handleOrientation); // Listen for dimension changes

    return () => {
      subscription?.remove();
      ScreenOrientation.unlockAsync(); // Unlock orientation on unmount
    };
  }, []);
};

export default useOrientationLock;
