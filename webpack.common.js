//webpack.config.js
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin    = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: [
        "./src/index.ts",
    ],
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "[name].[chunkhash].js",
        chunkFilename: "[name].[chunkhash].js",
        clean: true,
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            {
                test: /\.scss$/i,
                use: [
                    process.env.NODE_ENV !== "production"
                        ? "style-loader"
                        : MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].[chunkhash].css",
            chunkFilename: "[id].css",
        }),
        new HtmlWebpackPlugin({
            title: 'Making your first Phaser 3 game',
            favicon: 'src/static/favicon.ico',
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/static' }
            ]
        })
    ],
};
