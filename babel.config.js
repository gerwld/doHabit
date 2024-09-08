module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            "@components": './src/components',
            screens: './src/screens',
            locales: './src/locales',
            "@redux": './src/redux',
            actions: './src/redux/actions',
            hocs: './src/hocs',
            hooks: './src/hooks',
            styles: './src/styles',
            "@constants": './src/constants.js',
          },
        },
      ],
    ],
  }
}
