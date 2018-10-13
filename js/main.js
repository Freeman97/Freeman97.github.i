var lmessage = [];
var rmessage = [];
var recorder = [];
var result = [];
var society;
var entertainment;
var academic;
var map;
var all;
var preload = ["./image/1.jpg", "./image/2.jpg", "./image/3.jpg", "./image/4.jpg", "./image/5.jpg", "./image/6.jpg", "./image/7.jpg", "./image/8.jpg", "./image/9.jpg"];
var introText = ["在吗？", "你一定听说过百团大战了吧~", "最近百团大战快要开始了", "你有想好要加入哪个社团吗？", "让我来帮你看看吧！"];
var testQuiz = [
    {
        qText: ["在开始帮你挑选社团之前，先告诉我你的性别吧😉"],
        choiceText: ["男", "女", "秘密"],
        img: ["", "", ""],
        choiceRText: ["这位英俊的小伙子你好哟", "这位美丽的小姐姐你好哟", "哦？这位盆友，你很有思想喔（滑稽）"]
    },
    {
        qText: ["好嘞！我已经知道啦！", "让我们来进入正题吧～", "在华工的校园中，清风拂面，艳阳高照，你感到微微有些口渴。","“好想来一杯冰镇奶茶啊！” ", "这样想着，你走入了木棉咖啡厅…", "旁边的华工图书馆（滑稽）。此时在你面前浮现了两幅画，这两幅你更喜欢哪一幅呢？"],
        choiceText: ["", ""],
        img: ["./image/1.jpg", "./image/2.jpg"],
        choiceRText: ["", ""]
    },
    {
        qText: ["从图书馆出来", "抬眼望去是湛蓝色的天空，挂着白云", "映照在不远处的湖面上。", "湖边的几位华工学子吸引了你的视线", "他们在…"],
        choiceText: ["坐在湖边安静地读书", "热闹地坐在湖边玩狼人杀", "一起乐跑"],
        img: ["./image/3.jpg", "./image/4.jpg", "./image/5.jpg"],
        choiceRText: ["", "", ""]
    },
    {
        qText: ["你决定去看一看华工的百步梯", "这古色古香的阶梯承载着华工的发展成长", "也会见证你青葱的大学时光", "望着这陡峭的阶梯拾级而上", "你的心中涌现了对大学时光的期许…"], 
        choiceText: ["会当凌绝顶，一览众山小", "谈笑有鸿儒，往来无白丁", "惟江上之清风，与山间之明月"],
        img: ["", "", ""],
        choiceRText: ["是相当不错的大学期望呢！<br/>祝你成功～", "是相当不错的大学期望呢！<br/>祝你成功～", "是相当不错的大学期望呢！<br/>祝你成功～"]
    },
    {
        qText: ["登上了百步梯，你找到了一块阴凉的树荫", "在习习的凉风下，你逐渐进入梦乡", "在梦中浮现了一个图标，你认为它是…"],
        choiceText: ["", "", ""],
        img: ["./image/6.jpg", "./image/7.jpg", "./image/8.jpg"],
        choiceRText: ["", "", ""]
    }
];
var resultText = ["测试完成啦！（鼓掌", "系统正在飞速运算中…", "loading", "loading…", "loading……", "叮！", "经过测试，以下社团比较适合你哦~"];
var el = $("#chat-container");
var container = new container(el, 10);
var list;
function preloadImg(a)
{
    for(var i = 0; i < a.length; i++)
    {
        $("#preloader-box").append("<div></div>");
        $("#preloader-box").children().last().css({"background-image": "url(" + a[i] + ")"});
    }
}
function verify(name)
{
    for(var i = 0; i < society.length; i++)
    {
        if(name == society[i].name)
        {
            return society[i];
        }
    }
    for(var i = 0; i < academic.length; i++)
    {
        if(name == academic[i].name)
        {
            return academic[i];
        }
    }
    for(var i = 0; i < entertainment.length; i++)
    {
        if(name == entertainment[i].name)
        {
            return entertainment[i];
        }
    }
    return -1;
}
function showMore(n)
{
    $("#outer-container" + n).fadeIn();
    $("#container" + n).fadeIn();
}
function chooseResult(a, set)
{
    /*
        set[]: 作为随机使用的集合数组，按选项顺序填入需要的集合
    */
    console.log(set);
    switch(a)
    {
        case 0:
        {
            var b = set[0][Math.floor(Math.random() * set[0].length)];
            var c;
            while((c = verify(b)) == -1)
            {
                b = set[0][Math.floor(Math.random() * set[0].length)];
            }
            console.log(c);
            result.push(c);
            break; 
        }
        case 1:
        {
            var b = set[1][Math.floor(Math.random() * set[1].length)];
            var c;
            while((c = verify(b)) == -1)
            {
                b = set[1][Math.floor(Math.random() * set[1].length)];
            }
            console.log(c);
            result.push(c);
            break;
        }
        case 2:
        {
            var b = set[2][Math.floor(Math.random() * set[2].length)];
            var c;
            while((c = verify(b)) == -1)
            {
                b = set[2][Math.floor(Math.random() * set[2].length)];
            }
            console.log(c);
            result.push(c);
            break;
        }
    }
}
function showResult()
{
    /*
        a: 测试结果分析文本
    */
    console.log(recorder);
    for(var i = 0; i < resultText.length; i++)
    {
        container.addMessage(new messageBox(resultText[i], "l"));
    }
    chooseResult(recorder[2], [map[0], map[1], map[2]]);
    chooseResult(recorder[3], [map[3], map[4], map[5]]);
    chooseResult(recorder[4], [map[6], map[7], map[8]]);
    for(var i = 0; i < result.length; i++)
    {
        container.addMessage(new messageBox(result[i].name, "l"));
        container.addMessage(new messageBox(result[i].intro, "l"));
    }
    container.addMessage(new messageBox("还有更多信息可以了解哦!", "l"));
	container.addMessage(new messageBox("不分享到朋友圈邀请大家也来玩玩吗？", "l"), "l");
    container.showMessage("l", 0, resultText.length, 500, 
        function()
        {
            container.showMessage("l", 0, 6, 2000, 
            function()
                {
                    $("#chat-container").animate({"height": "-=20%"}, 700, "swing", 
                        function()
                        {
                            $("#chat-container").scrollTop($("#chat-container")[0].scrollHeight);
                        }
                    );
                    $("#input-box2").fadeOut(1000);
                    $("#input-box").fadeOut(1000, 
                        function()
                        {
                            $("#more-btn").fadeIn(1000);
                            $("#support").fadeIn(1000);
                        }
                    );
                }
            );
        }
    );
}
function quiz(b, x, y)
{
    /*
        quiz: 测试题队列
            测试题的组织方式:
            {
                qText[]: 题干文本(会以数组内的顺序将文本分条发出)
                choiceText[]: 选项文本(不希望具有选项文本时请填[])
                img[]: 选项配图
                choiceRText[]: 选项选择后的回复文本(不希望具有回复文本时请填[])
            }
        x: 展示测试题的起点下标
        y: 终点下标
        **测试题的连续抛出通过递归实现**
    */
    if(x > y)
    {
        setTimeout(
            function()
            {
                showResult();
            }, 1000
        )
        return;
    }
    var a = b[x];
    var _this = this;
    console.log(_this);
    console.log(a);
    if(a.choiceText.length == 3)
    {
        $("#back-box").unbind("click").click(
            function()
            {
                $("#input-box").fadeOut();
                $("#back-box").fadeOut();
                $("#front-box").fadeIn();
            }
        );
        $("#front-box").unbind("click").click(
            function()
            {
                $("#input-box").fadeIn();
                $("#front-box").fadeOut();
                $("#back-box").fadeIn();
            }
        );
    }
    else
    {
        $("#back-box").unbind("click").click(
            function()
            {
                $("#input-box2").fadeOut();
                $("#back-box").fadeOut();
                $("#front-box").fadeIn();
            }
        );
        $("#front-box").unbind("click").click(
            function()
            {
                $("#input-box2").fadeIn();
                $("#front-box").fadeOut();
                $("#back-box").fadeIn();
            }
        );
    }
    for(var i = 0; i < a.qText.length; i++)
    {
        container.addMessage(new messageBox(a.qText[i], "l"), "l");
    }
    container.showMessage("l", 0, a.qText.length - 1, 1000, 
        function()
        {
            for(var i = 0; i < a.choiceText.length; i++)
            {
                parseChoice(i, a.choiceText[i], a.img[i]);
            }
            container.showMessage("l", 0, a.choiceText.length - 1, 500, 
                function()
                {
                    setTimeout(
                        function()
                        {
                            if(a.choiceText.length == 3)
                            {
                                $("#input-box2").hide();
                                $("#input-box").fadeIn();
                                $("#back-box").fadeIn();
                            }
                            else
                            {
                                $("#input-box").hide();
                                $("#input-box2").fadeIn();
                                $("#back-box").fadeIn();
                            }
                        }, 1000
                    );
                    for(var i = 0; i < a.choiceText.length; i++)
                    {
                        bindChoice(i, a.choiceRText[i], _this.quiz, b, x, y);
                    }
                }
            );
        }
    );
}
function parseChoice(o, text, img)
{
    /*
        o: 指名该选项为A/B/C(0/1/2)
        text: 选项文本
        img: 选项配图路径
    */
    var lowerEnum = ['a', 'b', 'c'];
    var upperEnum = ['A', 'B', 'C'];
    var lOrder = lowerEnum[o];
    var uOrder = upperEnum[o];
    if(text != "")
    {
        $($(".choice-" + lOrder).children()[0]).text(text);
        $(".choice-content").css({"margin-top": "5%", "margin-bottom": "5%"});
        $(".choice-" + lOrder).css({"background-image": "url()"});
        $(".choice-box").css({"height": "auto"});
        $("#choiceBox-b").css({"margin-top": "10%"});
        $("#choiceBox-c").css({"margin-top": "10%"});
        $(".choice-box2").css({"height": "auto"});
        $("#choiceBox-b2").css({"margin-top": "10%"});
        container.addMessage(new messageBox(uOrder + ". " + text, "l"), "l");
    }
    if(img != "")
    {
        $($(".choice-" + lOrder).children()[0]).text("");
        $(".choice-" + lOrder).css({"background-image": "url(" + img + ")"});
        $(".choice-box").css({"height": $("html")[0].offsetHeight * 0.144 + "px"});
        $("#choiceBox-b").css({"margin-top": $("html")[0].offsetHeight * 0.024 + "px"});
        $("#choiceBox-c").css({"margin-top": $("html")[0].offsetHeight * 0.024 + "px"});
        $(".choice-box2").css({"height": $("html")[0].offsetHeight * 0.216 + "px"});
        $("#choiceBox-b2").css({"margin-top": $("html")[0].offsetHeight * 0.024 + "px"});
    }
}
function bindChoice(o, rText, callback, b, x, y)
{
    /*
        o: 指名该选项为A/B/C(0/1/2)
        rText: 选项选择后的回复文本
        callback: 请传入quiz()
        b, x, y: 
    */
    var lowerEnum = ['a', 'b', 'c'];
    var upperEnum = ['A', 'B', 'C'];
    var lOrder = lowerEnum[o];
    var uOrder = upperEnum[o];
    $(".choice-" + lOrder).unbind("click").click(
        function()
        {
            $("#input-box").fadeOut();
            $("#input-box2").fadeOut();
            recorder.push(o);
            container.addMessage(new messageBox(uOrder + "选项", "r"));
            container.showMessage("r", 0, 0, 0);
            if(rText != "")
            {
                container.addMessage(new messageBox(rText, "l"));
                setTimeout(
                    function()
                    {
                        container.showMessage("l", 0, 0, 0);
                    }, 1000
                );
            }
            $(".choice-btn").unbind("click");
            setTimeout(
                function()
                {
                    callback(b, x + 1, y);
                }, 1000
            );
            $("#back-box").fadeOut();
            $("#front-box").fadeOut();
        }
    );
}
$(document).ready(
    function()
    {
        $.ajax(
            {
                url: 'js/societyS.json',
                async: false,
                success: function(data)
                {
                    society = data;
                    console.log(society[0]);
                }
            }
        );
        $.ajax(
            {
                url: 'js/entertainmentS.json',
                async: false,
                success: function(data)
                {
                    entertainment = data;
                }
            }
        );
        $.ajax(
            {
                url: 'js/academicS.json',
                async: false,
                success: function(data)
                {
                    academic = data;
                }
            }
        );
        $.ajax(
            {
                url: 'js/map.json',
                async: false,
                success: function(data)
                {
                    map = data;
                }
            }
        );
    }
);
window.onload = function()
{
	var sound;
	var isFirst = true;
	var fixaudio = function()
	{
		if(isFirst)
		{
			isFirst = false;
			sound = new Audio();
			sound.loop = true;
			sound.preload = "auto";
			document.removeEventListener("touchstart", fixaudio, false);
			sound.src = "./sound/bgm.mp3";
			sound.play();
		}	
    };
	document.getElementById("start-btn").addEventListener("touchstart", fixaudio, false);
	document.getElementById("more-btn").addEventListener("touchstart", fixaudio, false);
    $(".inner-box").css({"max-height": $("html")[0].offsetHeight * 0.48 + "px"});
    $(".choice-box").css({"max-height": $("html")[0].offsetHeight * 0.18 + "px"});
    $(".choice-box2").css({"max-height": $("html")[0].offsetHeight * 0.27 + "px"});
    preloadImg(preload);
    list1 = new listContainer($("#container1"), $("#outer-container1"), academic);
    list2 = new listContainer($("#container2"), $("#outer-container2"), entertainment);
    list3 = new listContainer($("#container3"), $("#outer-container3"), society);
    $("#start-btn").click(
        function()
        {
            $("#start-btn").hide();
            $("#more-btn").hide();
            $("#chat-container").animate({"height": "+=20%"}, 700, "swing");
            setTimeout(
                function()
                {
                    quiz(testQuiz, 0, testQuiz.length - 1);
                }, 1000
            );
        }
    );
    $("#more-btn").click(
        function()
        {
            var moreMessage = [];
            var moreText = ["<a onclick='showMore(1)'>点击了解【学术实践类】</a>", "<a onclick='showMore(2)'>点击了解【文娱体育类】</a>", "<a onclick='showMore(3)'>点击了解【社会服务类】</a>"];
            for(var i = 0; i < moreText.length; i++)
            {
                moreMessage[i] = new messageBox(moreText[i], "l");
                console.log(moreMessage);
                container.addMessage(moreMessage[i], "l");
            }
            console.log(container.lMessage);
            container.showMessage("l", 0, 2, 500);
        }
    )
    $("#cover").click(
        function()
        {
            $("#cover").fadeOut();
            $(".more-page").fadeOut();
        }
    )
    for(var i = 0; i < introText.length; i++)
    {
        lmessage[i] = new messageBox(introText[i], "l");
        container.addMessage(lmessage[i], "l");
    }
    console.log(lmessage);
    console.log(container.lMessage);
    container.showMessage("l", 0, introText.length - 1, 2000,
        function()
        {
            $("#start-btn").fadeIn(1000);
            $("#more-btn").fadeIn(1000);
        }
    );
}
