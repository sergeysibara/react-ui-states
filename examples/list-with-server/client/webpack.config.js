var path = require('path');
var webpack = require('webpack');

function resolve(targetPath) {
    return path.resolve(__dirname, targetPath)
}

var examplesPath = './../../';
var configPaths = {
    src: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist'),
    react: resolve(examplesPath + 'node_modules/react/dist/react-with-addons.js'),
    reactDom: resolve(examplesPath + 'node_modules/react-dom/dist/react-dom.js'),
    uiStates: resolve(examplesPath + 'ui-states-build/react-ui-states.js'),
    babelPolyfill: resolve(examplesPath + 'node_modules/babel-polyfill/dist/polyfill.js')
};


module.exports = {
    //cache: true,
    //devtool: 'source-map',

    context: configPaths.src,
    entry: {
        index: './index.js',
        vendor: [
            configPaths.babelPolyfill,
            configPaths.react,
            configPaths.reactDom,
            configPaths.uiStates
        ]
    },

    output: {
        path: configPaths.dist,
        filename: '[name].bundle.js'
    },

    resolve: {
        root: configPaths.src,
        alias: {
            react: configPaths.react,
            'react-dom': configPaths.reactDom,
            'ui-states': configPaths.uiStates
        },
        extensions: ['', '.js']
    },

    module: {
        loaders: [
            {
                test: /.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'stage-2', 'react'],
                }
            }
        ],
        noParse: [
            configPaths.babelPolyfill,
            configPaths.react,
            configPaths.uiStates
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    ]
};