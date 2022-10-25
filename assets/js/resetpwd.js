$(function() {
    const form = layui.form;
    const layer = layui.layer;

    // 设置密码的验证规则
    form.verify({
        password: [/^[\S]{6,16}$/, "密码必须是6~16位不含空格的字符"]
    });

    // 如果表单进行提交，就发起ajax请求
    $(".layui-form").on("submit", function(e) {
        // 必须要禁止默认触发事件
        e.preventDefault();

        // 判断新密码和重复的密码是否正确  这个操作是前段执行的

        const newpwd = $("input[name='newpassword']").val();
        const repwd = $("input[name='repassword']").val()
        if (newpwd !== repwd) return layer.msg("新密码和确认密码不同，请确认后再试！4444");

        $.ajax({
            method: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg("重置密码成功！");
                // 将iNput框中的所有数据清除  手动重置表单 注意：只有原生js才有这个方法
                $(".layui-form")[0].reset();
            }
        })
    })

})