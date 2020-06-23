const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode: "production",

    entry: {
        app: [path.join(__dirname, 'src', 'index.tsx'), path.join(__dirname, 'src', 'index.scss')]
    },
    output: {
        path: path.join(__dirname, '..', 'backend-node', 'dist'),
        filename: '[name].[hash:8].js'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        alias: {
            'api': path.join(path.join(__dirname, 'api.prod.ts'))
        }
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.(sass|scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS, using Node Sass by default
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: path.join(__dirname, 'src', 'index.html')}),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
};
