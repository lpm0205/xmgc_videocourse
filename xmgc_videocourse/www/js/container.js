/**
 * Created by lenovo on 2016/9/13.
 */

var json = [
    {src: "images/ceshi2.png", title: "课程", name: "【HTML5】", style: "井蛙不可语海，夏虫不可语冰"},
    {src: "images/ceshi2.png", title: "课程", name: "【HTML5】", style: "井蛙不可语海，夏虫不可语冰"},
    {src: "images/ceshi2.png", title: "课程", name: "【HTML5】", style: "井蛙不可语海，夏虫不可语冰"},
    {src: "images/ceshi2.png", title: "课程", name: "【HTML5】", style: "井蛙不可语海，夏虫不可语冰"},
    {src: "images/ceshi2.png", title: "课程", name: "【HTML5】", style: "井蛙不可语海，夏虫不可语冰"},
    {src: "images/ceshi2.png", title: "课程", name: "【HTML5】", style: "井蛙不可语海，夏虫不可语冰"},
    {src: "images/ceshi2.png", title: "课程", name: "【HTML5】", style: "井蛙不可语海，夏虫不可语冰"},
    {src: "images/ceshi2.png", title: "课程", name: "【HTML5】", style: "井蛙不可语海，夏虫不可语冰"},
    {src: "images/ceshi2.png", title: "课程", name: "【HTML5】", style: "井蛙不可语海，夏虫不可语冰"}
];
$(function () {
    var $container = $('#container');
    $container.imagesLoaded(function () {
        $container.masonry({
            itemSelector: '.box',
            isAnimated: true
        });
    });
    var str = "";
    for (var i = 0; i < json.length; i++) {
        //                        str += '<div class="box"><a href="#"><img src="' + json[i].src + '" alt=""/></a></div>&nbsp;&nbsp;&nbsp;&nbsp;';
        str += '<div class="box"><a href="videoPlay.html"><img src="' + json[i].src + '" alt=""/>'
            + '<div class="al-left-con">'
            + '<a href="javascript:;" class="al-left-a">'
            + '<p>'+json[i].title+'</p>'
            + '<p class="al-p-con">'+json[i].name+'</p>'
            + '<p>'+json[i].style+'</p>'
            + '</a>'
            + '<a href="javascript:;" class="al-left-at">'
            + '<p>'+json[i].title+'</p>'
            + '<p class="al-p-con">'+json[i].name+'</p>'
            + '<p>'+json[i].style+'</p>'
            + '</a>'
            + '</div>'
            + '</a></div>';
    }
    //判断触底，加载更多的图片
    $(window).scroll(function () {
        //当距离底部就剩下500px的时候，加载新图片
        if ($(document).height() - $(this).scrollTop() - $(this).height() < 500) {
            //创建一个jquery对象
            var $boxes = $(str);
            $("#container").append($boxes).masonry("appended", $boxes, true);//追加元素
            //                    $boxes.css("margin","5px");
            $("#container").imagesLoaded(function () {
                $("#container").masonry();
            });//加载完图片后，会实现自动重新排列。【这里是重点】
        }
        $(".box").mouseenter(function () {
            $(this).find(".al-left-at").stop().slideDown();
        })
        $(".box").mouseleave(function () {
            $(this).find(".al-left-at").stop().slideUp();
        })
    });
    for (var j = 0; j < 3; j++) {
        $("#container").html(str);
    }
    $("#container").imagesLoaded(function () {
        $("#container").masonry();
    });
    $(".box").mouseenter(function () {
        $(this).find(".al-left-at").stop().slideDown(200);
    })
    $(".box").mouseleave(function () {
        $(this).find(".al-left-at").stop().slideUp(200);
    })
});