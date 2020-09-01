const path = require('path'); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: { main: './src/pages/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js' // указали в какой файл будет собираться весь js и дали ему имя

  },

  module: {
    rules: [ // rules — это массив правил
      // правило для работы с html
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      // добавим в него объект правил для бабеля
      {
        // регулярное выражение, которое ищет все js файлы
        test: /\.m?js$/,
        // при обработке этих файлов нужно использовать babel-loader
        use: {
          loader: 'babel-loader'
        },
        // исключает папку node_modules, файлы в ней обрабатывать не нужно
        exclude: /node_modules/
      },
      // добавили правило для обработки файлов
      {
        // регулярное выражение, которое ищет все файлы с такими расширениями
        test: /\.(png|svg|jpe?g|gif)$/i,
        // при обработке этих файлов нужно использовать file-loader
        // + поместить в папку images
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: './images'
            }
          }
        ]
      },

      {
        // регулярное выражение, которое ищет все файлы с такими расширениями
        test: /\.(woff2|woff)$/i,
        // при обработке этих файлов нужно использовать file-loader
        // + поместить в папку fonts
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: './fonts'
            }
          }
        ]
      },

      {
        // применять это правило только к CSS-файлам
        test: /\.css$/i,
        // use: ['style-loader', 'css-loader'],
        // при обработке этих файлов нужно использовать
        //MiniCssExtractPlugin.loader и css-loader
        loader: [MiniCssExtractPlugin.loader,
        { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader']
      }


    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html' // путь к файлу index.html
    }),
    new MiniCssExtractPlugin() // подключение плагина для объединения файлов

  ]


}
