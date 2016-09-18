/**
 * Created by asus1 on 2016/9/14.
 */
/**
 * Created by asus1 on 2016/9/13.
 */
$('#loginBtn').click(function () {
    var dat = {
        name: $('#user').val(),
        pw: $('#pwd').val()
    };
    $.post('/api/login',dat,function(dat){
        if(dat.num>=1){
            alert("您已经登录成功");
            if(dat.type==1){
                window.location.href='homepage-student.html'
            }
            else
            {
                window.location.href='homepage-teacher.html'
            }
        }
        else{
            alert("你的账户存在问题");
        }
    })
});