const { getDefaultConfig } = require('@expo/metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');

const config = getDefaultConfig(__dirname);

// Add proper resolver configuration
config.resolver = {
  ...config.resolver,
  blockList: exclusionList([
    /node_modules\/.*\/node_modules\/.*/,
    /ios\/.*/,
  ]),
  sourceExts: ['jsx', 'js', 'ts', 'tsx', 'json'],
  assetExts: ['png', 'jpg', 'jpeg', 'gif', 'webp', 'ttf', 'otf', 'woff', 'woff2']
};

// Add proper transformer configuration
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
  assetPlugins: ['expo-asset/tools/hashAssetFiles']
};

module.exports = config; 