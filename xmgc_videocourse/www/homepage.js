
$.get('../api/homepagecard', function (req,res) {
    for(var i=0;i<req.length;i++){
        var dat = {
            avatar: req[i]['cAddr'],
            cname: req[i]['cName'],
            cnum: req[i]['cNum']
        };
        var usrjo = $('#mainpage').clone(true, true);
        usrjo.attr('data-test','test1');
        usrjo.attr('style','display:block');
        usrjo.find('#cImage').attr('src', dat.avatar);
        usrjo.find('#cName').html(dat.cname);
        usrjo.find('#cNum').html('&nbsp;'+dat.cnum);
        $('#copy').append(usrjo);
    }
    console.log('count:')
});

