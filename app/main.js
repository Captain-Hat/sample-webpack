//页面逻辑js
import './js/logic';
//第三方插件
 
//页面css和less
import './css/main.css';//使用require导入css文件
import './less/base.less';//使用require导入css文件
import '../vendor/countdown/countdown.css';//使用require导入css文件
//不需要合并的文件搬运（需要在html引入）
require('!!file-loader?name=static/css/[name].[ext]!../vendor/h5reset.css');
require('!!file-loader?name=static/js/[name].[ext]!../vendor/rem.js');
// require('!!file-loader?name=static/css/[name].[ext]!../vendor/countdown/countdown.css');