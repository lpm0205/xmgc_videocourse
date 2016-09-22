/*http路由分发
接口模式server/:app/:api
*/

var _rotr = {};

//http请求的路由控制
_rotr = new $router();

//访问的请求
_rotr.get('api', '/api/:apiname', apihandler);
_rotr.post('api', '/api/:apiname', apihandler);
var _mysql=require('./_mysql')
var _ctnu = require('./ctnu');




/*所有api处理函数都收集到这里
必须是返回promise
各个api处理函数用promise衔接,return传递ctx
*/
_rotr.apis = {};

/*处理Api请求
默认tenk的api直接使用
每个app的独立api格式appname_apiname
*/
function * apihandler(next) {
    var ctx = this;
    var apinm = ctx.params.apiname;

    console.log('API RECV:', apinm);

    //匹配到路由函数,路由函数异常自动返回错误,创建xdat用来传递共享数据
    var apifn = _rotr.apis[apinm];
    ctx.xdat = {
        apiName: apinm
    };

    if (apifn && apifn.constructor == Function) {
        yield apifn.call(ctx, next).then(function() {

            //所有接口都支持JSONP,限定xx.x.xmgc360.com域名
            var jsonpCallback = ctx.query.callback || ctx.request.body.callback;
            if (jsonpCallback && ctx.body) {
                if (_cfg.regx.crossDomains.test(ctx.hostname)) {
                    ctx.body = ctx.query.callback + '(' + JSON.stringify(ctx.body) + ')';
                };
            };

        }, function(err) {
            ctx.body = __newMsg(__errCode.APIERR, [err.message, 'API proc failed:' + apinm + '.']);
            __errhdlr(err);
        });
    } else {
        ctx.body = __newMsg(__errCode.NOTFOUND, ['服务端找不到接口程序', 'API miss:' + apinm + '.']);
    };

    yield next;
};

//注册路由
_rotr.apis.reg = function() {
    var ctx = this;
    var co = $co(function* () {
        var name = ctx.query.name || ctx.request.body.name;
        if (!name ) throw Error('姓名格式不合法aaaaa.');

        var pw = ctx.query.pw || ctx.request.body.pw;
        if (!pw) throw Error('密码格式不合法.');

        var type = ctx.query.type || ctx.request.body.type;
        if (!type) throw Error('身份类型不合法');

        console.log(type);
        var regResult;
        var sqlstr="insert into userinfo set uName='" + name +"',uPassword=MD5('"+ pw +"'),userTypeId = '"+type+"';"
        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
        if(!rows)throw Error("失败");
        else{
            regResult=1;
        }

        var res=(regResult);
        ctx.body = res;
        return ctx;
    });
    return co;
};
//查询用户名是否重复
_rotr.apis.regSel = function() {
    var ctx = this;
    var co = $co(function* () {
        var name = ctx.query.name || ctx.request.body.name;
        var regResult;
        var sqlstr="select count(*) from userinfo where uName='"+name+"'"
        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
        if(!rows)throw Error("失败");

        regResult= rows[0]['count(*)'];
        var res=(regResult);
        console.log(regResult,name);
        ctx.body = res;
        return ctx;
    });
    return co;
};
//登录接口
_rotr.apis.login = function() {
    var res={};
    var ctx = this;
    var co = $co(function* () {
        var name = ctx.query.name || ctx.request.body.name;
        if (!name ) throw Error('姓名格式不合法.');

        var pw = ctx.query.pw || ctx.request.body.pw;
        if (!pw) throw Error('密码格式不合法.');

        var sqlstr="select count(*),userTypeId from userinfo where uName='"+name+"' and uPassword=md5('"+pw+"')";
        var dat={};
        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
        if(!rows)throw Error("失败");

        console.log(rows);
        dat.num = rows[0]['count(*)'];
        dat.type = rows[0]['userTypeId'];
        console.log(dat);
        ctx.body = dat;
        return ctx;
    });
    return co;
};
//课程分类页面信息读取
var cId ;
var courseNum;
_rotr.apis.addcourse = function(){
    var res={};
    var ctx = this;
    var co = $co(function* () {
        var cType = ctx.query.cType || ctx.request.body.cType;
        if (!cType ) throw Error('课程类型格式不合法.');

        var cLevel = ctx.query.cLevel || ctx.request.body.cLevel;
        if (!cLevel ) throw Error('课程难度格式不合法.');

        var cName = ctx.query.cName || ctx.request.body.cName;
        if (!cName ) throw Error('课程名称不合法.');

        var cNum = ctx.query.cNum || ctx.request.body.cNum;
        if (!cNum ) throw Error('课程数量不合法.');

        var cPro = ctx.query.cPro || ctx.request.body.cPro;
        if (!cPro ) throw Error('课程简介不合法.');

        var cAddr = ctx.query.cAddr || ctx.request.body.cAddr;
        if (!cAddr ) throw Error('地址不合法.');

        var sqlstr="insert into course set cTypeId='"+cType+"',cLevel='"+cLevel+"', cName='"+cName+"',cNum='"+cNum+"',cTime=now(),cPro='"+cPro+"',cAddr='"+cAddr+"'";
        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
        var dat;
        if(!rows)throw Error("失败");
        dat=1;
        var sqlstr2="select cId,cNum from course where cName='"+cName+"'";
        var results=yield _ctnu([_mysql.conn,'query'],sqlstr2);
        console.log(results);
        cId=results[0]['cId'];
        courseNum=results[0]['cNum'];
        console.log("<<<<courseNum",+courseNum);
        console.log(dat);

        ctx.body = dat;
        return ctx;
    });
    return co;
};

//首页课程推荐
_rotr.apis.homepagecard = function () {
    var res = {};
    var ctx = this;
    var co = $co(function* () {
        var sqlstr = "select cName,cNum ,cAddr from course;";
        var dat = {};
        var rows = yield _ctnu([_mysql.conn, 'query'], sqlstr);
        console.log(rows);

        dat = rows;
        console.log(dat);
        console.log(dat.length);
        ctx.body = dat;
        return ctx;
    });
    return co;
};

_rotr.apis.coursepagecard = function () {
    var res = {};
    var ctx = this;
    var co = $co(function* () {
        var sqlstr = "select smcId,smcName from smcourse;";
        var dat = {};
        var rows = yield _ctnu([_mysql.conn, 'query'], sqlstr);
        console.log(rows);

        dat = rows;
        console.log(dat);
        console.log(dat.length);
        ctx.body = dat;
        return ctx;
    });
    return co;
};

_rotr.apis.addsmcourse = function () {
    var res = {};
    var ctx = this;
    var co = $co(function* () {
        var dat = {};
        dat.courseNum=courseNum;

        var smcId = ctx.query.smcId || ctx.request.body.smcId;
        if (!smcId ) throw Error('微课id不合法.');

        var smcName = ctx.query.smcName || ctx.request.body.smcName;
        if (!smcName ) throw Error('微课名称不合法.');

        var smcAddr = ctx.query.smcAddr || ctx.request.body.smcAddr;
        if (!smcAddr ) throw Error('微课地址不合法.');

        var sqlstr="insert into smcourse set cId='"+cId+"',smcId='"+smcId+"', smcName='"+smcName+"',smcAddr='"+smcAddr+"'";
        var rows = yield _ctnu([_mysql.conn, 'query'], sqlstr);


       // console.log(data);
        ctx.body = rows;
        return ctx;
    });
    return co;
};

_rotr.apis.addsmcourseNum = function () {
    var res = {};
    var ctx = this;
    var co = $co(function* () {
        var dat = {};
        dat.rows = 2;
        dat.courseNum=courseNum;

        console.log(dat);
        console.log(dat.length);
        ctx.body = dat;
        return ctx;
    });
    return co;
};


_rotr.apis.stuAnswer = function(){
    var res={}
    var ctx = this;
    var co = $co(function* () {
        /*var dataObj={
         checkNumDat :  ctx.request.body.checkNum,
         testNumDat :  ctx.request.body.testNum
         }

         var dataArray=new Array(0)
         var i=0;
         dataArray[i]=dataObj
         i++
         console.log(dataArray)*/
        // var checkNumDat = JSON.parse( ctx.request.body)

        var   finalDat =JSON.parse(ctx.request.body.dat)//接收传过来的学生选择的答案内容和对应题目编号
        var finalScore=0;//定义一个总成绩，接收每道题的分值相加

        /*var answerLi=new Array(0)
         var i=0;
         for(var key in rows3){
         var answerObj={
         answerTestNo:rows3[key]['testNo'],
         answerRight:rows3[key]['answer'],
         answerScore:rows3[key]['examSetScore']
         }
         answerLi[i]=answerObj
         i++
         }
         console.log("正确答案",answerLi)*/
        for(var key in finalDat){
            var testNumDat=finalDat[key]['testNum']
            var checkNumDat =finalDat[key]['checkNum']
            // console.log("学生答案",testNumDat,checkNumDat)
            var sqlstr="update testdetail set testAnswer='"+checkNumDat+"' where testId=(" +
                "select testId from testtable where testPlNo = (" +
                "select testPlNo from testplan where testPlExamNo='"+$examId+"'" +
                ") and testUserNo='"+userNo+"') and testDetBankNo='"+testNumDat+"'and userNo='"+userNo+"'"

            var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
            if(!rows)throw Error("失败");

            var sqlstr3="select distinct answer,a.examSetScore from banktable b," +
                "(select * from examdetail)a where a.examDetBankNo=b.testNo and testNo='"+testNumDat+"'"
            //查询对应题目编号的答案
            var rows3=yield _ctnu([_mysql.conn,'query'],sqlstr3);
            if(!rows3)throw Error("失败");
            var rightAnswer=rows3[0]['answer']
            var scorePoint=rows3[0]['examSetScore']

            if(checkNumDat==rightAnswer){
                console.log("答案正确")
                finalScore+=scorePoint;
            }
            else {
                console.log("答案错误")
            }
        }

        var sqlstr2="update testtable set mark=1,testScore='"+finalScore+"' where testUserNo='"+userNo+"' and testPlNo in ("+
            "select testPlNo from testplan where testPlExamNo='"+$examId+"')"
        var rows2=yield _ctnu([_mysql.conn,'query'],sqlstr2);
        if(!rows2)throw Error("失败");

        var res=rows2['changedRows']
        console.log(res)

        ctx.body = res;
        return ctx;
    });
    return co;
}


//测试接口
_rotr.apis.testEjs = function(){
    var res={}
    var ctx = this;
    var co = $co(function* () {

        var ejs = require('ejs'),
            str =$fs.readFileSync(__dirname + '/../www/test.ejs', 'utf8');

        var ret = ejs.render(str, {
            names: ['foo', 'bar', 'baz']
        });
        ctx.body = ret;
        return ctx;
    });
    return co;
}


module.exports = _rotr;
