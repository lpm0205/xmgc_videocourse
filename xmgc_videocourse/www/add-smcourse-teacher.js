/**
 * Created by asus1 on 2016/9/20.
 */
$.get('../api/addsmcourseNum', function (req) {
    //console.log(req.courseNum);
    for(var i=1;i<req.courseNum;i++){
        var usrjo = $('#mainpage').clone(true, true);
        usrjo.attr('style','display:block');
        usrjo.find('#smcId0').attr('id','smcId'+i);
        usrjo.find('#smcName0').attr('id','smcName'+i);
        usrjo.find('#upload0').attr('id','upload'+i);
        usrjo.find('#wancheng0').attr('id','wancheng'+i);
        usrjo.find('#wenjian0').attr('id','wenjian'+i);
        usrjo.find('#file0').attr('id','file'+i);
        $('#copy').append(usrjo);
    }
    console.log('count:')
});
    var tname;
    function show_element(e){
        if(!e){
            var e = window.event;
        }
        //获取事件点击元素
        var targ = e.target;
        //获取元素名称
         tname = targ.id;
    }

    function uploadSmcourse()
    {
        console.log(">>>>",tname.substring(6));
        var num=tname.substring(6);
        var data={
             smcId:$('#smcId'+num+'').val(),
             smcName:$('#smcName'+num+'').val(),
             smcAddr:$('#wenjian'+num+'').html()
        };
        console.log(data);

        $.post('../api/addsmcourse',data,function(data){
            console.log(data);
            if(data.affectedRows>=1){
                alert("提交成功")
                console.log("提交成功")
            }
            else{
                alert("提交失败")
                console.log("提交失败")
            }
        });

    }

     function uploadUrl()
     {
         var num=tname.substring(4);
         _fns.uploadFile2($('#file'+num+''), function (f) {
             console.log('>>>>before:', f);
         }, function (f) {
             console.log('>>>>progressAAAA:', f);
             $('#wancheng'+num+'').css('width', f.percent + '%');
             $('#wancheng'+num+'').html(f.percent + '%');
             console.log('>>>>>AAAA');
         }, function (f) {
             console.log('>>>>successXXXX:', f);
             $('#wenjian'+num+'').html(f.url);
             $('#wenjian'+num+'').attr('href', f.url);
             console.log('#wenjian'+num+''.html);
         });
     }

   /* $("#file").click(function(){
        //$.get('../api/addsmcourse', function (req) {
        //    _fns.uploadFile2($('#upload'), function (f) {
        //        console.log('>>>>before:', f);
        //    }, function (f) {
        //        console.log('>>>>progressAAAA:', f);
        //        $('#wancheng').css('width', f.percent + '%');
        //        $('#wancheng').html(f.percent + '%');
        //        console.log('>>>>>AAAA');
        //    }, function (f) {
        //        console.log('>>>>successXXXX:', f);
        //        $('#wenjian').html(f.url);
        //        $('#wenjian').attr('href', f.url);
        //    });
        //});
        //var finalDat={};
        //var smcLi=new Array(0);
        //for(var i=1;i<req.courseNum;i++){
        //
        //    var smc = {
        //        smcId: $('#smcId').val(),
        //        smcName: $('#smcName').val(),
        //        smcAddr:$('#wenjian').html()
        //    };
        //
        //    smcLi.push(smc);
        //}
        //finalDat.dat=JSON.stringify(smcLi);

    });*/
    //var finalDat={};
    //var answerLi=new Array(0);
    //var j= 1;
    //for(var i= 0;i<qusNum;i++){
    //    var answer={}
    //    answer.checkNum = $('input[name='+j+']:checked').val()
    //    answer.testNum = $('input[name='+j+']:checked').attr("id")
    //    if(no==1){
    //        if(!answer.checkNum){
    //            alert("您的题目没有完成！")
    //            return;
    //        }
    //    }
    //    answerLi.push(answer)
    //    j++
    //}
    //finalDat.dat=JSON.stringify(answerLi)

