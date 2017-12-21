# marked.js简易手册
本文介绍的是marked.js。秉持“来之即用”的原则，对它进行简要的翻译和归纳，

##安装
在网上引用或者是引用本地文件即可。要么就用命令行：

``` 
npm install marked --save 

```

##最简单用法
```
    var rendererMD = new marked.Renderer();
    marked.setOptions({
      renderer: rendererMD,
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false
    });//基本设置
    console.log(marked('I am using __markdown__.'));
    // Outputs: <p>I am using <strong>markdown</strong>.</p>

```

留意到，控制台打印出了带html文档标签的内容。

假使你的html页面中有一个`<div id="content">`，可以做如下设定：
```

ocument.getElementById('content').innerHTML =marked('# Marked in browser\n\nRendered by **marked**.');
//省去声明...    
```
那么文字将以innerHTML的形式传入#content的div中。

##marked方法

```
  marked(markdownString [,options] [,callback])

```

` markdownString ` 是你渲染的内容，必须是字符串。

`options`是你渲染的设置——它是一个对象。当然，你用marked.setOptions也是不错的。

`callback`是回调函数。如果 options 参数没有定义，它就是第二个参数。

## 关于Options
之前看到，options有各种各样的设置。现在逐一分析。

### ighlight
这是一个函数，它可以让你文本的代码块实现语法高亮。

代码高亮基于highlight.js，本文将重点看这个例子的实现：

在此之前，你需要引入[highlight.js](https://github.com/isagalaev/highlight.js)及其样式：
```
<link href="http://cdn.bootcss.com/highlight.js/8.0/styles/monokai_sublime.min.css" rel="stylesheet">
<script src="http://cdn.bootcss.com/highlight.js/8.0/highlight.min.js"></script>
<script>hljs.initHighlightingOnLoad();</script>

```
然后输入如下代码

```
var rendererMD = new marked.Renderer();
    marked.setOptions({
      renderer: rendererMD,
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false
    });
    var markdownString = '```js\n console.log("hello"); \n```';
    marked.setOptions({
        highlight: function (code) {
        return hljs.highlightAuto(code).value;
      }
    });

    document.getElementById('content').innerHTML = marked(markdownString);
```

效果如下：
![](http://images2015.cnblogs.com/blog/1011161/201612/1011161-20161226222236289-2121001307.png
)

高亮的参数
完整的highlight方法包含三个参数：code，lang和callback

code——代码内容——是一个字符串。

lang——编程语言的种类——也是字符串。

callback就是回调函数。

## renderer（渲染）
render存放的是一个对象，不声明时默认为new Renderer()。

自定义渲染方式
渲染选项允许你以自定义的方式渲染内容，并把之前的规则设置覆盖掉。——这是比较底层的方法了。

比如，我想渲染# heading+，但是默认的规则是：<h1></h1>，我想改为更为复杂的结构——
```
var rendererMD = new marked.Renderer();
    rendererMD.heading = function (text, level) {
        var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
        return '<h' + level + '><a name="' +
                escapedText +
                 '" class="anchor" href="#' +
                 escapedText +
                 '"><span class="header-link"></span></a>' +
                  text + '</h' + level + '>';
    }


    console.log(marked('# heading+', { renderer: rendererMD }));
    document.getElementById('content').innerHTML = marked('# heading+', { renderer: rendererMD });
```
渲染的结果是：
```
<h1>
  <a name="heading-" class="anchor" href="#heading-">
    <span class="header-link"></span>
  </a>
  heading+
</h1>
```
以上就用了`heading`的渲染。

块级支持以下渲染
* code(string code, string language)
* blockquote(string quote)
* html(string html)
* heading(string text, number level)
* hr()
* list(string body, boolean ordered)
* listitem(string text)
* paragraph(string text)
* table(string header, string body)
* tablerow(string content)
* tablecell(string content, object flags)
* flags 拥有以下属性：
```
{
    header: true || false,
    align: 'center' || 'left' || 'right'
}
```
行级支持以下渲染：
* strong(string text)
* em(string text)
* codespan(string code)
* br()
* del(string text)
* link(string href, string title, string text)
* image(string href, string title, string text)
其它渲染参数
### gfm
它是一个布尔值，默认为`true`。

允许 Git Hub标准的`markdown`.

### tables
它是一个布尔值，默认为`true`。

允许支持表格语法。该选项要求 gfm 为true。

### breaks
它是一个布尔值，默认为`false`。

允许回车换行。该选项要求 gfm 为true。

### pedantic
它是一个布尔值，默认为`false`。

尽可能地兼容 `markdown.pl`的晦涩部分。不纠正原始模型任何的不良行为和错误。

### sanitize
它是一个布尔值，默认为`false`。

对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）

### smartLists
它是一个布尔值，默认为`false`。

使用比原生markdown更时髦的列表。 旧的列表将可能被作为pedantic的处理内容过滤掉.

### smartypants
它是一个布尔值，默认为false。

使用更为时髦的标点，比如在引用语法中加入破折号。

使用`lexer`和`parser`
如果你想，还可以使用词法分析器。通过它可以追加规则：
```
    var tokens = marked.lexer('text');//把text解析为一个marked.js的内部对象
    console.log(marked.parser(tokens));//又把这个对象转化为html字符串。（<p>text</p>）

    var lexer = new marked.Lexer({sanitize: true});//放option信息
    var tokens = lexer.lex('<h1>hello</h1>');//<p>&lt;h1&gt;hello&lt;/h1&gt;</p>
    console.log(marked.parser(tokens));
    console.log(lexer.rules);//打出正则信息
    ```



[阅读原文](https://www.cnblogs.com/djtao/p/6224399.html)