/**
 * Created by asus1 on 2016/9/18.
 */
    $("#upload").click(function(){

        //_fns.uploadFile2($('#upload'), function (f) {
        //    console.log('>>>>before:', f);
        //}, function (f) {
        //    console.log('>>>>progressAAAA:', f);
        //    $('#wancheng').css('width', f.percent + '%');
        //    $('#wancheng').html(f.percent + '%');
        //    console.log('>>>>>AAAA');
        //}, function (f) {
        //    console.log('>>>>successXXXX:', f);
        //    $('#wenjian').html(f.url);
        //    $('#wenjian').attr('href', f.url);
        //});
    var dat = {
        cType:$("[name='kc']:checked").val(),
        cLevel:$("[name='level']:checked").val(),
        cName:$("#cName").val(),
        cNum:$("#cNum").val(),
        //cAddr:$("#wenjian").html()
    };
    $.post('/api/addcourse',dat,function(res){
        if(res==1){
            console.log("<<<<",res);
            alert("课程添加成功了。");
           window.location.href='homepage-teacher.html';
        }
    })
});