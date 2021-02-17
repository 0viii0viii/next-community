module.exports = {
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif)$/i,
      loader: 'file-loader',

      options: {
        name() {
          // `resourcePath` - `/absolute/path/to/file.js`
          // `resourceQuery` - `?foo=bar`

          if (process.env.NODE_ENV === 'development') {
            return '[path][name].[ext]';
          }

          return '[contenthash].[ext]';
        },
        publicPath: `/_next/static/images`,
        outputPath: 'static/images',
        limit: 1000,
      },
    });

    return config;
  },
};
