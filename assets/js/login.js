$(function() {
    // 点击去注册账号，注册页面显示   登录页面隐藏 
    $("#toregister").on("click", function() {
        $(".login_box").hide();
        $(".register_box").show();
    });
    // 点击去登录，登录页面显示   注册页面隐藏 
    $("#tologin").on("click", function() {
            $(".register_box").hide();
            $(".login_box").show();
        })
        // 从layui中获取form对象
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        // 定义验证密码的规范  不能有空格6-13个字符
        pwd: [/^[\S]{6,13}$/, "密码不能有空格，必须是6~13位"],
        // 验证重置密码和密码是否相同
        repwd: function(value) {
            var pwd = $(".password1").val();
            if (pwd !== value) return "两次密码不一致！"
        }
    });



    // 提交注册的post事件
    $("#form_register").on("submit", function(e) {
        e.preventDefault();
        data = { username: $("#form_register [name=username]").val(), password: $("#form_register [name=password]").val() }
        $.post("http://127.0.0.1:3007/api/register", data, function(res) {
            if (res.status != 0) {
                layer.msg(res.messag);
            }
            layer.msg('注册成功！', {
                icon: 1,
                time: 2000 //2秒关闭（如果不配置，默认是3秒）
            }, function() {
                $("#tologin").click();
                $("#form_register [name=username]").val("");
                $("#form_register [name=password]").val("")
                $("#form_register [name=repassword]").val("")
            });
        })
    })

    // 提交登录的post事件
    $("#form_login").on("submit", function(e) {
        e.preventDefault();
        data = { username: $("#form_login [name=username]").val(), password: $("#form_login [name=password]").val() }
        $.post("http://127.0.0.1:3007/api/login", data, function(res) {
            if (res.status != 0) {
                layer.msg(res.messag);
            }
            layer.msg('登录成功！', {
                icon: 1,
                time: 2000 //2秒关闭（如果不配置，默认是3秒）
            }, function() {
                location.href = "/index.html"
            });
        })
    })
})