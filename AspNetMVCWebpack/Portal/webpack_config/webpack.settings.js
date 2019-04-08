module.exports = {
    name: "app",
    libraryName: "MyApp",
    paths: {
        context: "../src",
        src: {
            ts: "./ts",
            css: "./css",
            img: "./assets/img",
            font: "./assets/font"
        },
        dist: {
            base: "../../dist",
            js: "./js",
            css: "./css",
            img: "./assets/img",
            font: "./assets/font"
        },
        publicPath: "/dist/",
        view: {
            template: "../../Views/Shared/_Layout_Template.cshtml",
            outputName: "../Views/Shared/_Layout.cshtml"
        }
    },
    vars: {
        cssName: "styles"
    },
    globals: {
        $: "jquery"
    },
    chunkNames: {
        styles: "styles",
        vendorScripts: "vendor",
        vendorStyles: "vendor",
        shared: "shared"
    },
    entries: {
        app: {
            styles: [ 
                "bootstrap/dist/css/bootstrap.min.css",             
                './styles.scss'
            ],
            scripts: [
                'babel-polyfill',
                "bootstrap",
                "./main.ts"
            ]
        }
    }
}