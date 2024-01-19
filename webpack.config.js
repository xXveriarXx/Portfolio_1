const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            { 
                test: /\.svg$/, 
                use: ['svg-inline-loader']
            },
            { 
                test: /\.(scss|css)$/,
                use: [ 'style-loader', 'css-loader', ],
            },
            { test: /\.(js)$/, use: 'babel-loader', exclude: /node_modules/, },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                use: ['file-loader'],
                type: 'asset/resource'
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.[contenthash].js',
        assetModuleFilename: path.join('images', '[name].[contenthash][ext]'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
            filename: 'index.html',
        }),
        new CopyPlugin({
            patterns: [
                { from: 'assets', to: 'assets/'}
            ]
        })
    ],
    devServer: {
        watchFiles: path.join(__dirname, 'src'),
        port: 9000,
    },
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development'
}