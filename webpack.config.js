const path = require('path') 
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js',
        analytics: './src/analytics.js'
    }, // точка входа
    output: {
        filename: '[name].[contenthash].js', // в какой файл все собирать
        path: path.resolve(__dirname, 'dist') // в какую папку собирать
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html'
        })
    ]
}