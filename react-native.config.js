module.exports = {
  project: {
    ios: {},
    android: {
      packageName: 'com.blinkit',
    },
  },

  'react-native-vector-icons': {
    platforms: {
      ios: null,
    },
  },
  assets: ['./src/assets/fonts'],
  getTransfomModulePath() {
    return require.resolve('react-native-typescript-transformer');
  },
  getSourceExts() {
    return ['ts', 'tsx'];
  },
};
