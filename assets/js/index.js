$(function() {



    // 调用获取信息函数  
    // 在立即执行函数中 会自动调用
    getUserInfo()
});


// 导入layer  不是一个函数，直接导入即可
const layer = layui.layer;
// 定义一个函数获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        // 将headers里面包含tooken发送到服务器上
        // headers: {
        //     // 将token在localStorage中提取出来，如果没有就给空值
        //     Authorization: localStorage.getItem("token") || ""
        // },
        // 里面的res就是后端的res.send发送到前端的数据  数据中包含用户输入的数据
        success: function(res) {
            if (res.status !== 0) return layer.msg("获取用户信息失败！");
            layer.msg("获取用户信息成功！")
                // 渲染用户的头像
            renderAvatar(res.data);
        },
        // 执行complete函数，可以使用res.responseJSON拿到服务器响应回来的数据
        complete: function(res) {
            console.log(res);
            if (res.status == 401) {
                // 强制清除token
                localStorage.removeItem("token")
                    // 跳转到login页面
                location.href = "/login.html";
            }
        }


    })
}

// 渲染用户的头像
function renderAvatar(user) {
    // 1、获取用户的名称
    let name = user.nickname || user.username;
    // 2、设置欢迎的文本
    $("#welcome").html("欢迎&nbsp;&nbsp;&nbsp;&nbsp;" + name);
    // 3、按需渲染用户的头像
    // 3.1、如果有图片就是用图片头像
    if (user.user_pic !== null) {
        // 给图片的属性赋值，并让他显示出来
        $(".layui-nav-img").attr("src", user.user_pic).show();
        // 图片头像出现，文字头像就隐藏
        $("#text_avatar").hide();
    } else {
        // 渲染文字头像 让图片头像隐藏
        $(".layui-nav-img").hide();
        // 把名字当成一个数组，取第一个值 大写字母
        var first = user.username[0].toUpperCase();
        $("#text_avatar").html(first).show();
        $("#index_userinfo #text_avatar").html(first).show();
    }
}

//退出的操作
$("#sign_out").on("click", function() {
    layer.confirm('是否退出登录?', { icon: 3, title: '提示' }, function(index) {
        //do something
        // 清除token
        localStorage.removeItem("token");
        // 将页面链接到登录的地方
        location.href = "/login.html";
        layer.close(index);
    });
})