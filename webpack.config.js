const path = require('path') 
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: './index.js',
        analytics: './analytics.js'
    }, // точка входа
    output: {
        filename: '[name].[contenthash].js', // в какой файл все собирать
        path: path.resolve(__dirname, 'dist') // в какую папку собирать
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html'
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules:[
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test:/\.(png|jpe?g|svg|gif)$/i,
                use: 'file-loader',
            },
            {
                test: /\.(ttf|woff|woff2)$/,
                use: 'file-loader'
            }
        ]
    }
}