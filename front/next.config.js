const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  compress: true,
  webpack(config, { webpack }) {
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

    const prod = process.env.NODE_ENV === 'production';
    const plugins = [
      ...config.plugins,
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/),
    ];
    //moment에서 locale 한국어만 쓰도록 설정(용량문제)

    return {
      ...config,
      mode: prod ? 'production' : 'development',
      devtool: prod ? 'hidden-source-map' : 'eval',
      plugins,
    };
  },
});
