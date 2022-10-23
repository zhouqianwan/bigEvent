// 每次调用ajax请求的时候，会先调用ajaxPrefilter()这个函数
// 在这个函数中，可以拿到ajax提供的配置对象   就是ajax请求中的{}里面的内容
$.ajaxPrefilter(function(options) {
    // console.log(options);
    // 再发起真正的ajax请求之前，统一拼接请求的路径  
    options.url = "http://127.0.0.1:3007" + options.url
})