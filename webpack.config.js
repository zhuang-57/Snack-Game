//引入一个包
const path = require('path');
//引入html插件
const htmlWebpackPlugin = require('html-webpack-plugin');
//引入clean插件
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
//webpack中的配置信息都应该写在moudle.exports中
module.exports = {
    //打包模式一定要配置
    mode : 'development',
    //指定入口文件
    entry: "./src/index.ts",

    //指定打包文件所在的目录
    output: {
        //指定打包的目录
        path: path.resolve(__dirname,'dist'),
        //打包后的文件
        filename: "bundle.js",

        //配置打包环境,告诉webpack不使用模板，适用于ie
        environment: {
            arrowFunction:false,
        }
    },

    //指定webpack打包时指定的文件
    module: {
        //指定加载规则
        rules: [
            {
                //test指定是规则生效的文件
                test:/\.ts$/,
                //使用的loader去指定文件处理,从后往前执行
                use:[
                    //配置babel
                    {
                        //指定加载器
                        loader: "babel-loader",
                        //设置babel
                        options: {
                            //设置预定义的环境
                            presets: [
                                [
                                    //指定环境插件
                                    "@babel/preset-env",
                                    //配置信息
                                    {
                                        targets:{
                                            "chrome":"58",
                                            "ie":"11"
                                        },
                                        //指定corejs的版本
                                        "corejs":"3",
                                        //使用corejs的方式"usage" 表示按需加载
                                        "useBuiltIns":"usage",

                                    }
                                ]
                            ]
                        }
                    }
                    ,
                    'ts-loader'],
                exclude: /node_modules/

            },
            //指定设置less文件的处理(从下向上执行！)
            {
                test:/\.less$/,
                use:[
                    "style-loader",
                    "css-loader",
                    //引入postcss,解决css的兼容性问题
                    {
                        loader:"postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: 'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader",
                ]
            }
        ]
    },
    //配置webpack插件
    plugins:[
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin({
            // title:'这是一个自定义的title',
            template: "./src/index.html"
        }),
    ],
    //配置引用模块
    resolve: {
        extensions:['.js','.ts']
    }
}