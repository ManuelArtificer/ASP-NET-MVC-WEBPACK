// node modules
const path = require("path");

// webpack plugins
const webpack = require("webpack");
const ManifestPlugin = require("webpack-manifest-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// config files
const settings = require("./webpack.settings.js");

const getEntries = () => {
    const entries = {};
    for (const [key, value] of Object.entries(settings.entries)) {
        entries[key] = [...value.styles, ...value.scripts];
    }

    return entries;
};

module.exports = {
    context: path.resolve(__dirname, settings.paths.context),
    entry: getEntries(),
    output: {
        publicPath: settings.paths.publicPath
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".html"],
    },
    module: {
        rules: [
            { 
                test: /.ts$/, 
                loader: "awesome-typescript-loader" 
            },            
            { 
                test: /\.html$/, 
                loader: "html-loader" 
            },
            { 
                test: /\.js$/,
                use: ["source-map-loader"], 
                enforce: "pre"
            }
        ]
    },
    plugins: ([
        new webpack.ProvidePlugin(settings.globals),
        new CleanWebpackPlugin({
            "verbose": true
        }),
        new HtmlWebpackPlugin({
            filename: settings.paths.view.outputName,
            template: settings.paths.view.template
        }),
        new ManifestPlugin()
    ]),
    stats: { colors: true }
};