$(function() {
    const form = layui.form;
    const layer = layui.layer;

    form.verify({
        nickname: function(value) {
            if (value.length > 13 || value.length < 1) {
                // 下面的提示消息不能用layer
                return "昵称长度必须在1~6个字符之间！"
            }
        }
    })

    // 获取用户的基本信息
    inituserinfo();

    // 重置表单的数据
    $("#reset").on("click", function(e) {
        e.preventDefault();
        // 再次调用初始石化数据 重新加载一遍即可
        inituserinfo();
    })

    // 提交用户修改的信息
    $(".layui-form").on("submit", function(e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/update",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg("更新用户信息失败！");
                layer.msg("更新用户信息成功！");
                // 调用父页面中的方法，重新渲染用户的头像和用户信息
                window.parent.getUserInfo();
            }
        })
    })

    function inituserinfo() {
        $.ajax({
            method: "GET",
            url: "/my/userinfo",
            success: function(res) {
                if (res.status !== 0) return layer.msg("获取用户信息失败！");
                // 将数据渲染到列表中
                // 使用form.val(name,value)快速为表单赋值     
                // 在form中添加 lay.filter(name)  将value值与表单中 name="***"匹配进行赋值
                form.val("formUserInfo", res.data);
            }
        })
    }

})