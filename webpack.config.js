const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')



const optimization = () => {
    return {
        splitChunks: {
            chunks: 'all'
        }
    }
}

const babelOptions = preset => {
    const opts = {
        presets: [
            '@babel/preset-env'
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties'
        ]
    }

    if (preset) {
        opts.presets.push(preset)
    }

    return opts
}


    module.exports = {
        context: path.resolve(__dirname, 'src'),
        mode: 'development',
        entry: {
            main: ['@babel/polyfill', './assets/site/base.ts'],
        },
        output: {
            filename: '[name].[contenthash].js',
            path: path.resolve(__dirname, 'dist')
        },
        optimization: optimization(),
        plugins: [
            new HTMLWebpackPlugin(
                {
                    template: "./index.html"
                }
            ),
            new CleanWebpackPlugin()
        ],
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.(png|jpg|svg|gif)$/,
                    use: ['file-loader']
                },
                {
                    test: /\.(ttf|woff|woff2|eot)$/,
                    use: ['file-loader']
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [{
                        loader: 'babel-loader',
                        options: babelOptions()
                    }]
                },
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: babelOptions('@babel/preset-typescript')
                    }
                },
            ]
        }
}
