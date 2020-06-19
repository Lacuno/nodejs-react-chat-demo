const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "production",
    devtool: "source-map",

    entry: {
        app: path.join(__dirname, 'src', 'index.tsx')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[hash:8].js'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
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
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: path.join(__dirname, 'src', 'index.html')}),
    ]
};
