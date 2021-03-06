const path = require('path');
module.exports = ({ config }) => {
  // use installed babel-loader which is v8.0-beta (which is meant to work with @babel/core@7)
  config.module.rules[0].use[0].loader = require.resolve('babel-loader');
  config.module.rules[0].include.push(path.resolve('../storybook-utilities'));
  // use @babel/preset-react for JSX and env (instead of staged presets)
  config.module.rules[0].use[0].options.presets = [
    require.resolve('@babel/preset-react'),
    require.resolve('@babel/preset-env'),
  ];
  config.node = {
    fs: 'empty'
  };

  config.module.rules.push({
    test: /\.scss$/,
    use: [
      'style-loader',
      'css-loader',
      { loader: 'postcss-loader', options: { plugins: [require('postcss-preset-env')({
        stage: 0,
        browsers: 'last 2 versions'
      }),]}},
      'sass-loader'
    ],
  });

  config.resolve.modules = [
    ...(config.resolve.modules || []),
    path.resolve(__dirname, '../.babelrc'),
    path.resolve(__dirname, '../node_modules')
  ];

  return config;
};
