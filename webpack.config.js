const path = require('path') 
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () =>{
    const config = {
        splitChunks: {
            chunks: 'all'
        },
    }

    if(isProd){
        config.minimizer = [
            new TerserPlugin(),
            new OptimizeCssAssetsPlugin()
        ]
    }

    return config
}

const cssLoaders = extra =>{
    const loaders =  [
        {
        loader: MiniCssExtractPlugin.loader,
        options: {
                    hmr: isDev,
                    reloadAll: true
                },
        }, 
        'css-loader'
    ]

    if (extra){
        loaders.push(extra)
    }

    return loaders;
}

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
    resolve: {
        alias: {
            '@models': path.resolve(__dirname, 'src/models'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@styles': path.resolve(__dirname, 'src/styles')
        }
    },
    optimization: optimization(),
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin(
            {
                patterns: [
                    {
                        from: path.resolve(__dirname, 'src/favicon.ico'),
                        to: path.resolve(__dirname, 'dist') 
                    }
                ]
            }
        ),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        })
    ],
    module: {
        rules:[
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test:/\.(png|jpe?g|svg|gif)$/i,
                use: 'file-loader',
            },
            {
                test: /\.(ttf|woff|woff2)$/,
                use: 'file-loader'
            },
            {
                test: /\.xml$/,
                use: 'xml-loader'
            },
            {
                test: /\.csv$/,
                use: 'csv-loader'
            },
            {
                test: /\.less$/,
                use: cssLoaders('less-loader')
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
        ]
    },
    devServer: {
        port: 3000,
        liveReload: true
    }
}