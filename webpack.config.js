const path              = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/js/index.js',

    output: {
        path: path.resolve(__dirname,'dist'),
        filename: "js/bundle.js"
    },
    devtool: "source-map",
    module: {
        rules:[

            //handle js compilation, we babel-loader with es2015 presets
            {test: /\.js$/,
                use:[
                {
                    loader: "babel-loader",
                    options: {
                        presets: ['es2015']
                    }
                }
            ]},

            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader", options: {
                            sourceMap: true
                        }
                    }]
            })}

        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./src/index.html"
        }),
        new ExtractTextPlugin({
            filename: 'css/styles.css',
            disable: process.env.NODE_ENV === "development"
        })
    ],

    devServer: {
        publicPath: '/',
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        stats: "errors-only",
        open: true,
        port: 9000
    }
};