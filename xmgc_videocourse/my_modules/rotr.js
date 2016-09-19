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

        //var cAddr = ctx.query.cAddr || ctx.request.body.cAddr;
        //if (!cAddr ) throw Error('地址不合法.');

        var sqlstr="insert into course set cTypeId='"+cType+"',cLevel='"+cLevel+"', cName='"+cName+"',cNum='"+cNum+"',cTime=now();";
        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
        var dat;
        if(!rows)throw Error("失败");
        else{
            dat=1;
        }
        console.log(dat);

        //var ejs = require('ejs'),
        //    str =$fs.readFileSync(__dirname + '/../www/examZone.ejs', 'utf8');
        //
        //var ret = ejs.render(str,{rows});

        ctx.body = dat;
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
