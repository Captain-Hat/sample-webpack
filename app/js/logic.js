import config from './config.json';
import imgUrl from '../images/code.jpg';
$(() => {
    //计算二维码大小和位置。已知数据：code 209*209   左上角坐标155,164   大图：750*683
    //宽占0.2787   坐标  0.2067  0.2401
    //添加二维码omitWeeks
    console.log(imgUrl);
    //防止缓存
    var stamp = new Date().getTime();
    $('#urlCode').attr('src', imgUrl + '?t=' + stamp)
    $('#countdown').countDown({
        targetDate: {
            'day': 15,
            'month': 6,
            'year': 2017,
            'hour': 0,
            'min': 0,
            'sec': 0
        },
        omitWeeks: true
    });
})