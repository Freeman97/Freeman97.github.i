function container(el, d)
{
    this.el = el;
    this.lMessage = [];
    this.rMessage = [];
    this.d = d || 10;
}

container.prototype.addMessage = function(m)
{
    var a = m.pos;
    var _this = this;
    if(a == "l")
    {
        this.lMessage.push(m);
        console.log(_this.lMessage);
    }
    else if(a == "r")
    {
        this.rMessage.push(m);
        console.log(_this.rMessage);
    }
}

container.prototype.lMessageAnimate = function(el, t, callback, scrollDown)
{
    /*
        动画的实现目标：icon出现（无过渡），text出现（不透明度过渡为1，用时1秒）
        因为左右message-box元素嵌套情况不太一样，所以分开实现
        el: l-box或者r-box的jQuery对象
        callback: 回调函数
        scrollDown: 滚轮需要自动向下滑动的高度
    */
    var _this = this;
    setTimeout(
        function()
        {
            el.show(0, 
                function()
                {
                    _this.el.scrollTop(_this.el[0].scrollHeight);
                    $(el.children()[0]).animate({"opacity": 1}, 400);
                    $(el.children()[1]).animate({"opacity": 1}, 700, "swing",
                        function()
                        {
                            if(typeof callback == "function")
                            {
                                callback();
                            }
                        }
                    );
                }
            );
        }, t
    );
}

container.prototype.rMessageAnimate = function(el, t)
{
    var _this = this;
    console.log([el, t]);
    setTimeout(
        function()
        {
            el.show(0,
                function()
                {
                    _this.el.scrollTop(_this.el[0].scrollHeight);
                    $(el.children()[1]).animate({"opacity": 1}, 400);
                    $(el.children().children()[0]).animate({"opacity": 1}, 700);
                }
            )
        }, t
    )
}

container.prototype.showMessage = function(pos, a, b, dt, callback)
{
    /*
        pos: 消息是左边的("l")还是右边的("r")
        a: 需要发送的消息在对应侧消息队列的起始位置
        b: 需要发送的消息在对应消息队列的结束位置（只发送一条消息）
        **注意，发送出去的消息会从消息队列中被删除，会导致下标变动**
        dt: 在含有多个消息时定义各个消息的显现时间差, 单位为毫秒，需要消息同时出现请填0
        callback: 回调函数
    */
    var pos = pos || "r";
    var a = a;
    var b = b || a;
    var dt = dt || 0;
    var n = b - a + 1;
    console.log([a, b, n]);
    if(b == a)
    {
        dt = 0;
    }
    var text, appendStr;
    var _this = this;
    console.log(_this);
    if(pos == "r")
    {
        if(_this.rMessage.length == 0)
        {
            callback();
            return;
        }
        for(var i = a; i <= b; i++)
        {
            text = _this.rMessage[i].text;
            appendStr = "<div class='" + pos + "-box'><div class='" + pos + "-box2'><p class='" + pos + "-message'>" + text + "</p></div><div class='" + pos  + "-icon'></div></div>";
            _this.el.append(appendStr);
        }
        var temp = $("div.r-box:last");
        for(var i = 0; i < n; i++)
        {
            var timer = dt * (n - i);
            // console.log([temp, i, timer]);
            _this.rMessageAnimate(temp, timer);
            temp = temp.prev();
        }
        _this.rMessage.splice(a, n);
    }
    else
    {
        if(_this.lMessage.length == 0)
        {
            callback();
            return;
        }
        for(var i = a; i <= b; i++)
        {
            console.log([_this.lMessage[i], i]);
            text = _this.lMessage[i].text;
            appendStr = "<div class='" + pos + "-box'><div class='" + pos  + "-icon'></div><p class='" + pos + "-message'>" + text + "</p></div>";
            _this.el.append(appendStr);
        }
        var temp = $("div.l-box:last");
        for(var i = 0; i < n; i++)
        {
            var timer = dt * (n - i);
            // console.log([temp, i, timer]);
            if(i == 0)
            {
                _this.lMessageAnimate(temp, timer, callback);
            }
            else
            {
                _this.lMessageAnimate(temp, timer);
            }
            temp = temp.prev();
        }
        _this.lMessage.splice(a, b - a + 1);
    }
}

function messageBox(text, pos)
{
    /*
        text(String): 消息的文本内容, 可以混写html标签(比如需要换行的时候), 但是插入的内容默认包裹在一层<p>标签内还请留意
        pos(String): 消息的位置，左侧("l")或右侧("r")
        index: 消息在消息队列中的下标
    */
    this.text = text;
    this.pos = pos;
}
