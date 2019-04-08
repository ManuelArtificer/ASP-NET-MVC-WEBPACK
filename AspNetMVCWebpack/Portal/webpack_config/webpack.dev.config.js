// node modules
const path = require("path");

// webpack plugins
const merge = require("webpack-merge");

// config files
const settings = require("./webpack.settings.js");
const commonConfig = require("./webpack.common.config.js");

module.exports = merge(commonConfig, {
    devtool: "inline-source-map",
    mode: "development",
    output: {
        filename: path.join(settings.paths.dist.js, "[name].js"),
        chunkFilename: path.join(settings.paths.dist.js, "[name].js"),
        path: path.resolve(__dirname, settings.paths.dist.base),
        publicPath: settings.paths.publicPath,
        library: settings.libraryName,
        libraryTarget: "var"
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg|webp)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: settings.paths.dist.img,
                            name: "[name].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|otf|eot|woff2?)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: settings.paths.dist.font,
                            name: "[name].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" }, 
                    { loader: "css-loader", options: { sourceMap: true } }
                ]
            },
            {
                test: /\.less$/,                    
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader", options: { sourceMap: true } },
                    { loader: "less-loader", options: { sourceMap: true } }   
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader", options: { sourceMap: true, importLoaders: 2 } },
                    { loader: "resolve-url-loader" },
                    { loader: "postcss-loader",
                        options: {
                            plugins: () => [
                                require("autoprefixer")
                            ],
                            sourceMap: true
                        }
                    },
                    { loader: "sass-loader", options: { sourceMap: true } }
                ]
            }
        ]
    }
})