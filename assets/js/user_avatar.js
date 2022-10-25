$(function() {
    // 导入layer
    const layer = layui.layer;

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
            // 纵横比
            aspectRatio: 1,
            // 指定预览区域
            preview: '.img-preview'
        }
        // 1.3 创建裁剪区域
    $image.cropper(options)

    //  修改：绑定上传的按钮
    // 当点击立即提交 
    $(".btn_submit").on("click", function() {
        // 模拟点击上传文件按钮 
        $(".btn_file").click();
    });
    // 修改：为选择文件的input按钮，绑定change事件
    // 为文件绑定change事件  e.target.files[0]可以获取图片
    $(".btn_file").on("change", function(e) {
            // 拿到用户选择的图片  直接复制
            var file = e.target.files[0];
            if (file == null) return layer.msg("请选择照片！")
                // 根据选择的文件 ,创建一个对应的URL
            var newImgUrl = URL.createObjectURL(file);
            // 重新初始化裁剪区域
            $image
            // 销毁旧的裁剪区域
                .cropper('destroy')
                // 重新设置图片路径
                .attr('src', newImgUrl)
                // 重新初始化裁剪区域
                .cropper(options)
        })
        // 为确认按钮绑定点击事件
    $(".btn_sure").on("click", function() {
        // 3. 将裁剪后的图片， 输出为 base64 格式的字符串
        var dataURL = $image
            // 创建一个 Canvas 画布
            .cropper('getCroppedCanvas', {
                width: 100,
                height: 100
            })
            .toDataURL('image/png');
        // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        // 调用接口，将图片上传到服务器
        $.ajax({
            method: "POST",
            url: "/my/update/avatar",
            data: {
                avatar: dataURL
            },
            success: function(res) {
                if (res.status !== 0) return layer.msg("更换用户失败！");
                layer.msg("更换用户头像成功！");
                // 将上传头像变为上传的头像
                // 重新在加载一遍父类的渲染信息的方法
                window.parent.getUserInfo();
            }
        })
    })


})