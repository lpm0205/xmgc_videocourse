/**
 * Created by asus1 on 2016/9/20.
 */
$.get('../api/coursepagecard', function (req,res) {
    for(var i=0;i<req.length;i++){
        var dat = {
            //avatar: req[i]['cAddr'],
            smcId: req[i]['smcId'],
            smcName: req[i]['smcName']
        };
        console.log(dat.smcId);
        console.log(dat.smcName);
        var usrjo = $('#mainpage').clone(true, true);
        usrjo.find('#smcId').html(dat.smcId);
        usrjo.find('#smcName').html('&nbsp;'+dat.smcName);
        $('#copy').append(usrjo);
    }
    console.log('123');
});

