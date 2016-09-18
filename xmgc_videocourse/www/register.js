/**
 * Created by asus1 on 2016/9/14.
 */
$('#pwd').click(function(){
    var dat = {
        name: $('#user').val(),
    };
    $.get('/api/regSel',dat,function(res){
        if(res>=1){
            $('#nameSel').show();
            $('#div01').hide();
        }
        else{
            $('#nameSel').hide();
            $('#div01').show();
        }
    })
});

$('#zhuce').click(function () {
    var dat = {
        name: $('#user').val(),
        pw: $('#pwd').val(),
        type:$("[name='uType']:checked").val()
    };
    $.post('/api/reg',dat,function(res){
        if(res==1){
            alert("您已经注册成功")
            window.location.href='index.html'
        }
    })
});