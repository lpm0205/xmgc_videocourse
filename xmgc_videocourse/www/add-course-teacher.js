/**
 * Created by asus1 on 2016/9/18.
 */

    $("#file").click(function(){
        _fns.uploadFile2($('#upload'), function (f) {
            console.log('>>>>before:', f);
        }, function (f) {
            console.log('>>>>progressAAAA:', f);
            $('#wancheng').css('width', f.percent + '%');
            $('#wancheng').html(f.percent + '%');
            console.log('>>>>>AAAA');
        }, function (f) {
            console.log('>>>>successXXXX:', f);
            $('#wenjian').html(f.url);
            $('#wenjian').attr('href', f.url);
        });
    });
    $("#upload").click(function(){
        var dat = {
            cType:$("[name='kc']:checked").val(),
            cLevel:$("[name='level']:checked").val(),
            cName:$("#cName").val(),
            cNum:$("#cNum").val(),
            cPro:$("#cPro").val(),
            cAddr:$("#wenjian").html()
        };
        $.get('../api/addcourse',dat,function(dat){
            console.log("<<<",+dat);
            if(dat==1){
                console.log("<<<<",dat);
               window.location.href='add-smcourse-teacher.html';
            }
        })
    });