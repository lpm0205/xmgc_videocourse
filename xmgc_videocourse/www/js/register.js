/**
 * Created by Administrator on 2016/9/10.
 */
/**
 * Created by Administrator on 2016/9/9.
 */
function fo1(){
    var user = document.getElementById("user");
    user.style.background="";
    var div01 = document.getElementById("div01");
    div01.style.color = "#939393";
    div01.innerHTML="此用户名为登录账号，必须填(至少为五位)";
};
function bl1(){
    var user =document.getElementById("user");
    user.style.background = "";
    var user = document.getElementById("user").value;
    var div01 = document.getElementById("div01");
    div01.style.color = "red";
    var reg =  /^[a-zA-Z\d]\w{3,11}[a-zA-Z\d]$/;
    if(reg.test(user)){
        div01.innerHTML="用户名验证成功";
    }
    else{
        div01.innerHTML="用户名验证失败";
    }
};
function fo2(){
    var pwd =document.getElementById("pwd");
    pwd.style.background = "";
    var div02 = document.getElementById("div02");
    div02.innerHTML="密码必须填，请填入您的密码"
}
function bl2(){
    var pwd =document.getElementById("pwd");
    pwd.style.background = "";
    var pwd = document.getElementById("pwd").value;;
    var div02 = document.getElementById("div02");
    div02.style.color = "red";
    var patt = new RegExp("^[0-9a-zA-Z]{6,20}$");
    if(!patt.test(pwd)){
        div02.innerHTML="大小写字母或数字，长度6~20个字符";
    }
    else{
        div02.innerHTML="";
    }
};
function fo3(){
    var pwd2 = document.getElementById("pwd2");
    pwd2.style.background = "";
}
function bl3(){
    var pwd2 = document.getElementById("pwd2");
    pwd2.style.background = "";
    var pwd2 =document.getElementById("pwd2").value;
    var pwd = document.getElementById("pwd").value;
    var div03 =document.getElementById("div03");
    div03.style.color = "red";
    if(pwd2!=pwd){
        div03.innerHTML="两次输入的密码不一致，请重新输入";
    }
    else{
        div03.innerHTML = "";
    }
}

