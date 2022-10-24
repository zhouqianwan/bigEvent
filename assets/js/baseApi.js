// 每次调用ajax请求的时候，会先调用ajaxPrefilter()这个函数
// 在这个函数中，可以拿到ajax提供的配置对象   就是ajax请求中的{}里面的内容
$.ajaxPrefilter(function(options) {
    // console.log(options);
    // 再发起真正的ajax请求之前，统一拼接请求的路径  
    options.url = "http://127.0.0.1:3007" + options.url

    // 统一为有权限的接口，设置headers请求头 注意indexOf  中的o是大写
    // 如果链接中不含有/api/就发送token
    if (options.url.indexOf("/api/") == -1) {
        options.headers = {
            Authorization: localStorage.getItem("token") || ""
        }
    }
    // 执行complete函数，可以使用res.responseJSON拿到服务器响应回来的数据

    options.complete = function(res) {
        console.log(res);
        if (res.status == 401 || res.responseJSON.status == 1) {
            // 强制清除token
            localStorage.removeItem("token")
                // 跳转到login页面
            location.href = "/login.html";
        }
    }

})