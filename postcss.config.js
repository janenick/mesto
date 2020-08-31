module.exports = {
  // подключите плагины к PostCSS
  plugins: [
    // подключите autoprefixer
    require('autoprefixer')(),
    // cssnano при подключении нужно передать объект опций
    // { preset: default } говорит о том, что нужно использовать
    // стандартные настройки минификации
    require('cssnano')({ preset: 'default' })
  ]
};
