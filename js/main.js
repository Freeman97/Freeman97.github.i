var lmessage = [];
var rmessage = [];
var text2 = "defg";
var introText = ["盆友你好呀~", "你知道什么是百团大战吗？", "百团大战的介绍：blablablablablablablablablabablablbalab", "什么样的社团适合你呢", "来测试一个吧~"];
var testQuiz = [
    {
        qText: "以下两位知名人物请问你认识哪一位？",
        choiceText: ["龙女士", "富野大光头"],
        img: ["./image/A.jpg", "./image/B.jpg"],
        choiceRText: ["你舍得打破这份宁静吗？", "看来你觉得你比我懂高达？"]
    },
    {
        qText: "测试题测试测试测试测试测试测试测试测试测试测试测试测试测试",
        choiceText: ["A选项A选项A选项A选项A选项A选项", "B选项B选项B选项B选项B选项B选项", "CCCCCCCCCCCCCCCCCC"],
        img: ["./image/A.jpg", "./image/B.jpg", ""],
        choiceRText: ["这里有mom的气息", "V高达是一部温暖人心的作品", "丢那星"]
    },
    {
        qText: "你同意雷亚游戏世界主宰，CytusDeemo宇宙神作吗",
        choiceText: ["EVANS多少分啊吵", "这歌真好听，osu里的"],
        img: ["", ""],
        choiceRText: ["KONMAI QUALITY", "8012年了还屙"]
    }
];
var resultText = "这么喜欢龙图，你应该加入ZACA音游组本质龙图群。群号1145141919810";
var el = $("#chat-container");
var container = new container(el, 10);
function showMore()
{
    $("#cover").fadeIn()
    $(".more-page").fadeIn();
}
function showResult(a)
{
    /*
        a: 测试结果分析文本
    */
    container.addMessage(new messageBox(a, "l"));
    container.showMessage("l", 0, 0, 0);
    $("#input-box2").fadeOut(1000);
    $("#input-box").fadeOut(1000, 
        function()
        {
            $("#more-btn").fadeIn(1000);
        }
    );
}
function quiz(b, x, y)
{
    /*
        quiz: 测试题队列
            测试题的组织方式:
            {
                qText: 题干文本
                choiceText[]: 选项文本
                img[]: 选项配图
                choiceRText[]: 选项选择后的回复文本
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
                showResult(resultText);
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
        $("#input-box2").hide();
        $("#input-box").fadeIn();
    }
    else
    {
        $("#input-box").hide();
        $("#input-box2").fadeIn();
    }
    container.addMessage(new messageBox(a.qText, "l"), "l");
    container.showMessage("l", 0, 0, 0);
    for(var i = 0; i < a.choiceText.length; i++)
    {
        parseChoice(i, a.choiceText[i], a.img[i]);
    }
    container.showMessage("l", 0, a.choiceText.length - 1, 500, 
        function()
        {
            for(var i = 0; i < a.choiceText.length; i++)
            {
                bindChoice(i, a.choiceRText[i], _this.quiz, b, x, y);
            }
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
    container.addMessage(new messageBox(uOrder + ". " + text, "l"), "l");
    $(".choiceImage-" + lOrder).css({"background-image": "url(" + img + ")"});
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
    $(".choice-" + lOrder).click(
        function()
        {
            container.addMessage(new messageBox(uOrder + "选项", "r"));
            container.showMessage("r", 0, 0, 0);
            container.addMessage(new messageBox(rText, "l"));
            setTimeout(
                function()
                {
                    container.showMessage("l", 0, 0, 0);
                }, 1000
            );
            $(".choice-btn").unbind("click");
            setTimeout(
                function()
                {
                    callback(b, x + 1, y);
                }, 2000
            );
        }
    );
}
window.onload = function()
{
    $("#start-btn").click(
        function()
        {
            $("#start-btn").hide();
            quiz(testQuiz, 0, 2);
        }
    );
    $("#more-btn").click(
        function()
        {
            var moreMessage = [];
            var moreText = ["<a>点击了解【学术实践类】</a>", "<a>点击了解【文娱体育类】</a>", "<a href='./iframe/socialServiceSouth.html' target='more-page' onclick='showMore()'>点击了解【社会服务类】</a>"];
            for(var i = 0; i < moreText.length; i++)
            {
                moreMessage[i] = new messageBox(moreText[i], "l");
                console.log(moreMessage);
                container.addMessage(moreMessage[i], "l");
            }
            console.log(container.lMessage);
            container.showMessage("l", 0, 2, 500);
            $("#more-btn").unbind("click");
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
    container.showMessage("l", 0, 4, 2000,
        function()
        {
            $("#start-btn").fadeIn(1000);
        }
    );
}