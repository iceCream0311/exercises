$("#btn").onclick = function() {
    var inputStr = $("input").value;
    /* $("#num").innerHTML=GetLength1(inputStr)*/
    /* $("#num").innerHTML=GetLength2(inputStr)*/
    /* $("#num").innerHTML=GetLength3(inputStr)*/
    $("#num").innerHTML = GetLength4(inputStr)
}

/*获取DOM*/
function $(dom) {
    return document.querySelector(dom)
}
/*第一种通过Unicode 编码来确定是中文还是英文*/
/*256个ASCII码中的后128个扩展码可定制用来表示特殊字符和非英语字符,charCodeAt() 方法可返回指定位置的字符的 Unicode 编码*/
function GetLength1(str) {
    var realLength = 0;
    for (var i = 0; i < str.length; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128)
            realLength += 1;
        else
            realLength += 2;
    }
    return realLength;
}
/*第二种：escape对字符串进行编码时，字符值大于255的以"%u****"格式存储，而字符值大于255的恰好是非英文字符（一般是中文字符，非中文字符也可以当作中文字符考虑）；substring用以判断在字符串中的前两个字符串是否为"%u"。*/
function GetLength3(str) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.substr(i, 1);
        var ts = escape(c);
        if (ts.substring(0, 2) == "%u") {
            len += 2;
        } else {
            len += 1;
        }
    }
    return len;
}
/* 第二种匹配双字节字符(包括汉字在内)：[^\x00-\xff]（采取将255意外的字符替换成"aa"的做法，取长度）*/
function GetLength2(str) {
    return str.replace(/[^\x00-\xff]/g, "aa").length;
};
/*第四种利用正则和第三种的类似只不过这次用的是match和匹配中文字符的正则/[\u4e00-\u9fa5]/*/
function GetLength4(str) {
    var re = /[\u4e00-\u9fa5]|[\（\）\《\》\——\；\，\。\“\”\<\>\！]/g;
    /*  var re = /[^\x00-\xff]/g;*/
    var chineseArr = str.match(re);
    return (str.length + chineseArr.length)
}
