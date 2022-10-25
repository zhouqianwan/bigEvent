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
        $.post("/api/register", data, function(res) {
            if (res.status !== 0) {
                return layer.msg("注册失败！");
            }
            layer.msg('注册成功！');
            setTimeout(function() {
                $("#tologin").click();
                $("#form_register [name=username]").val("");
                $("#form_register [name=password]").val("")
                $("#form_register [name=repassword]").val("")
            }, 2000)

        })
    })

    // 提交登录的post事件
    $("#form_login").on("submit", function(e) {
        e.preventDefault();
        // data = { username: $("#form_login [name=username]").val(), password: $("#form_login [name=password]").val() }
        data = $(this).serialize();
        $.post("/api/login", data, function(res) {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg("登陆失败！");
            }
            layer.msg('登录成功！');
            // 登录成功的话，会从服务器返回一个token字符串，将他保存在localStorage中
            localStorage.setItem("token", res.token);
            // 设置定时器一秒中后在跳转页面
            setTimeout(function() {
                location.href = "/index.html";
            }, 1000)
        });
    })
})