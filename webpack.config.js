var path = require('path');

function resolve(targetPath) {
    return path.resolve(__dirname, targetPath)
}

var configPaths = {
    src: resolve('src'),
    dist: resolve('dist'),
    objectPath: resolve('./src/object-path/index.js'),
    utils: resolve('./src/utils/index.js')
};

module.exports =
{
    entry: resolve('./src/index.js'),
    output: {
        path: configPaths.dist,
        filename: 'react-ui-states.js',
        library: 'react-ui-states',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },

    module: {
        loaders: [
            {
                test: /.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015','stage-2']
                }
            }
        ]
    },
    resolve: {
        root: configPaths.src,
        alias: {
            'object-path': configPaths.objectPath,
            utils: configPaths.utils
        },
        extensions: ['', '.js']
    }
};
