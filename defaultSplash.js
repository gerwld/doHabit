const fs = require('fs');
const path = require('path');

// Paths for assets
const ANDROID_LIGHT_XML = 'assets/bootsplash/android/light/splash.xml';
const ANDROID_DARK_XML = 'assets/bootsplash/android/dark/splash.xml';

const IOS_LIGHT_STORYBOARD = 'assets/bootsplash/ios/light/splash.storyboard';
const IOS_DARK_STORYBOARD = 'assets/bootsplash/ios/dark/splash.storyboard';

const LIGHT_IMAGE = 'assets/splash_image_light.png';
const DARK_IMAGE = 'assets/splash_image_dark.png';

// Function to copy files to their destination
const copyFileSync = (src, dest) => {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
};

// Plugin function
module.exports = (config) => {
  const platform = config.modRequest.platform;

  if (platform === 'ios') {
    console.log('Configuring iOS Splash Screen...');

    // Copy light and dark storyboards to iOS folder
    copyFileSync(IOS_LIGHT_STORYBOARD, 'ios/splash_light.storyboard');
    copyFileSync(IOS_DARK_STORYBOARD, 'ios/splash_dark.storyboard');

    // iOS splash images need to be handled via Xcode config; no PNG copy for iOS needed

  } else if (platform === 'android') {
    console.log('Configuring Android Splash Screen...');

    // Copy light and dark XMLs to Android res/drawable
    copyFileSync(ANDROID_LIGHT_XML, 'android/app/src/main/res/drawable/splash_light.xml');
    copyFileSync(ANDROID_DARK_XML, 'android/app/src/main/res/drawable/splash_dark.xml');

    // Copy splash images to Android drawable folders
    copyFileSync(LIGHT_IMAGE, 'android/app/src/main/res/drawable/splash_image_light.png');
    copyFileSync(DARK_IMAGE, 'android/app/src/main/res/drawable/splash_image_dark.png');
  }

  return config;
};
