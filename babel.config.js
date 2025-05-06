module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        'babel-preset-expo',
        {
          // Enable the import.meta polyfill
          unstable_transformImportMeta: true,
        }
      ]
    ],
    plugins: ["react-native-reanimated/plugin"],
  };
};
