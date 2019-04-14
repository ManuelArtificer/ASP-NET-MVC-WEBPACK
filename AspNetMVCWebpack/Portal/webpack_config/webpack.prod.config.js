// node modules
const path = require("path");

// webpack plugins
const webpack = require("webpack");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

// config files
const settings = require("./webpack.settings.js");
const commonConfig = require("./webpack.common.config.js");

module.exports = merge(commonConfig, {
    mode: "production",
    output: {
        filename: path.join(settings.paths.dist.js, "[name].[chunkhash].js"),
        chunkFilename: path.join(settings.paths.dist.js, "[name].[chunkhash].js"),
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
                            name: "[name].[hash:8].[ext]"
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
                            name: "[name].[hash:8].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    { loader: "css-loader" }
                ]
            },
            {
                test: /\.less$/,                    
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: "css-loader" },
                    { loader: "less-loader" }   
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: "css-loader", options: { importLoaders: 2 } },
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
    },
    optimization: {
        minimizer: [
            new TerserPlugin(
                {
                    cache: true,
                    parallel: true,
                    terserOptions: {
                        output: {
                          comments: /@license/i,
                        },
                      },
                      extractComments: true
                }                
            ),
            new OptimizeCssAssetsPlugin({
                cssProcessorOptions: {
                    safe: true,
                    discardComments: true
                },
            })
        ],
        splitChunks: {
            cacheGroups: {
                default: false,
                common: false,
                shared: {
                    name: settings.chunkNames.shared,
                    minChunks: 2,
                    chunks: "all",
                    enforce: true
                },
                vendor: {
                    name: settings.chunkNames.vendorScripts,
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    priority: 10,
                    enforce: true
                },
            }
        }       
    },
    plugins: [
        new BundleAnalyzerPlugin(),
        new webpack.HashedModuleIdsPlugin(),
        new MiniCssExtractPlugin({
            path: path.resolve(__dirname, settings.paths.dist.base),
            filename: path.join(settings.paths.dist.css, settings.chunkNames.styles + ".[chunkhash].css"),
            chunkFilename: path.join(settings.paths.dist.css, settings.chunkNames.vendorStyles + ".[chunkhash].css")
        })    
    ]
})