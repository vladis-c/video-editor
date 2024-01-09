import {ExpoConfig, ConfigContext} from 'expo/config';

export default ({config}: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'VideoEditor',
  slug: 'video-editor',
  owner: 'vladis-c',
  version: '1.0.0',
  platforms: ['android'],
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  backgroundColor: '#EFEFEF',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#EFEFEF',
  },
  assetBundlePatterns: ['**/*'],
  android: {
    package: 'com.vladisc.videoeditor',
    jsEngine: 'hermes',
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#EFEFEF',
    },
  },
  plugins: [
    [
      'expo-build-properties',
      {
        android: {
          minSdkVersion: 24,
          packagingOptions: {
            jniLibs: {
              useLegacyPackaging: true,
            },
          },
        },
      },
    ],
    ['@config-plugins/ffmpeg-kit-react-native', {package: 'full-gpl'}],
    [
      'expo-media-library',
      {
        photosPermission:
          'Allow $(PRODUCT_NAME) to access your gallery for saving videos.',
        savePhotosPermission:
          'Allow $(PRODUCT_NAME) to access your gallery for saving videos.',
        isAccessMediaLocationEnabled: true,
      },
    ],
    [
      'expo-image-picker',
      {
        photosPermission:
          'Allow $(PRODUCT_NAME) to access your gallery for getting videos.',
      },
    ],
  ],
  extra: {
    eas: {
      projectId: '',
    },
  },
});
