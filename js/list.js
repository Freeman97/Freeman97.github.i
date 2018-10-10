function listContainer(el, el2, a)
{
    /*
        el: 要充当list的外部容器jQuery对象
        el2: 要充当list的容器父元素的jQeury对象
        a[]: 成为list内容的数组
    */
    this.listEl = el;
    this.pageEl = $("<div class='list-page'></div>");
    this.parentEl = el2;
    this.data = a;
    var _this = this;
    this.parentEl.parent().append(_this.pageEl);
    this.parentEl.append("<button class='exit-btn'>返回</button>");
    $(".exit-btn").click(
        function()
        {
            _this.parentEl.fadeOut();
        }
    );
    this.pageEl.append("<div class='page-title'><p class='pTitle-text'></p></div>").append("<div class='page-content'><p class='pContent-text'></p></div>").append("<button class='back-btn'>返回</button>");
    for(var i = 0; i < this.data.length; i++)
    {
        this.addListNode(_this.data[i]);
    }
}

listContainer.prototype.addListNode = function(a)
{
    /*
        a: data中内容
    */
    var _this = this;
    console.log(this);
    var listBox = $("<div class='list-box'></div>");
    var listContent = $("<p class='list-node'>" + a.name + "</p>");
    listBox.append(listContent);
    listBox.click(
        function()
        {
            $($(_this.pageEl.children()[0]).children()[0]).text(a.name);
            $($(_this.pageEl.children()[1]).children()[0]).text(a.intro);
            $($(_this.pageEl.children()[2])).click(
                function()
                {
                    _this.pageEl.fadeOut();
                    _this.parentEl.fadeIn();
                }
            );
            _this.parentEl.fadeOut();
            _this.pageEl.fadeIn();
        }
    );
    this.listEl.append(listBox);
}