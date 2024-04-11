const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const date = new Date();
const dateStr = date.getFullYear().toString() + (date.getMonth() + 1).toString() + date.getDate().toString() + date.getHours().toString() + date.getMinutes().toString()

module.exports = (env, argv) => {
    const config = {
        mode: argv.mode,
        entry: './src/index.tsx',
        devtool: 'source-map',
        watchOptions: {
            ignored: /node_modules/
        },
        output: {
            path: path.join(__dirname, 'build') + '/',
            filename: `app.js?${dateStr}`,
        },
        plugins: [
            new webpack.SourceMapDevToolPlugin({
                noSources: false,
                filename: '[file].map'
            }),
            new MiniCssExtractPlugin({
                filename: `app.css?${dateStr}`,
            }),
            new HtmlWebpackPlugin({
                template: 'public/index.html',
                filename: `index.html`,
            }),
            new CopyPlugin({
                patterns: [
                    { from: "public/img", to: "img" },
                ]
            })
        ],
        optimization: {
            minimizer: [
                new TerserPlugin(),
                new CssMinimizerPlugin(),
            ],
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: { presets: ['@babel/preset-env', '@babel/react'] },
                        },
                        {
                            loader: 'ts-loader',
                            options: {
                                configFile: path.resolve(__dirname, 'tsconfig.json'),
                            },
                        },
                    ]
                },
                {
                    test: /\.(scss|sass|css)$/i,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                        },
                        {
                            loader: "css-loader",
                            options: {
                                url: false
                            }
                        },
                        {
                            loader: "sass-loader"
                        },
                    ],
                },
            ]
        },
        devServer: {
            historyApiFallback: true,
            static: {
                directory: path.join(__dirname, 'public'),
            },
            port: 9999,
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json'],
        },
        devtool: false,
        target: 'web'
    }
    return config;
    
};