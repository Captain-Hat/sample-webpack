var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = {
    devtool: 'cheap-module-eval-source-map', //配置生成Source Maps，选择合适的选项 
    entry: { // pagesDir是前面准备好的入口文件集合目录的路径
        'js/entry': __dirname + "/app/main.js",
        'js/vendor': ['jquery','./vendor/countdown/jquery.lwtCountdown-1.0.js']
    },
    output: {
        path: __dirname + "/build", //打包后的文件存放的地方
        // publicPath: "/asset",
        filename: "[name]-[hash].js", //打包后输出文件的文件名
        chunkFilename: '[id].bundle.js',
    },
    module: { //在配置文件里添加JSON loader
        loaders: [{
                test: /\.json$/,
                loader: "json-loader"
            },
            {
                test: /\.js$/,
                exclude: /node_modules|vendor|bootstrap/,
                loader: 'babel-loader?presets[]=es2015-loose&cacheDirectory',

            },
            {
                test: /\.(css|less)$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!less-loader?modules",
                    publicPath: '../'
                }) //添加对样式表的处理
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=100&name=images/[name]-[hash:8].[ext]'
            },
            {　　　　　　
                test: /\.html$/,
                loader: 'html-withimg-loader'　　　　
            },

            {
                test: require.resolve('jquery'), // 此loader配置项的目标是NPM中的jquery
                loader: 'expose-loader?$!expose-loader?jQuery', // 先把jQuery对象声明成为全局变量`jQuery`，再通过管道进一步又声明成为全局变量`$`
            },
        ]
    },
    plugins: [
        new webpack.BannerPlugin("Copyright Flying Unicorns inc."), //在这个数组中new一个就可以了
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: function () {
                    return [precss, autoprefixer];
                },
                devServer: {
                    contentBase: "./build", //本地服务器所加载的页面所在的目录
                    colors: true, //终端中输出结果为彩色
                    historyApiFallback: true, //不跳转
                    inline: true //实时刷新
                }
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html', //http访问路径
            template: __dirname + "/app/index.tmpl.html", //实际文件路径
            inject: true,
            chunks: ['js/entry', 'js/vendor', 'js/commons'] //new 一个这个插件的实例，并传入相关的参数
        }),
        // new webpack.optimize.UglifyJsPlugin(), 
        /* 抽取出所有通用的部分 */
        new webpack.optimize.CommonsChunkPlugin({
            name: 'js/commons', // 需要注意的是，chunk的name不能相同！！！
            filename: '[name].js',
            minChunks: 2,
        }),

        /* 抽取出chunk的css */
        new ExtractTextPlugin('css/styles.css'),
        new ExtractTextPlugin('css/base.less'),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
        })
    ]
}