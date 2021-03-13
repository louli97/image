var oTxt = document.getElementById('search');
var oList = document.getElementById('list');
var oBtn = document.getElementById('btn');

$(function() {

    $.get("function.php?act=select", function(data, status) {
        result = $.parseJSON(data);
        var apiName = [];
        for (var i = 0; i < result.length; i++) {
            apiName[i] = result[i];
        }
        //点击事件
        oBtn.addEventListener('click', function() {
            var keyWord = oTxt.value;
            // var apiNameList = searchByIndexOf(keyWord,apiName);
            var apiNameList = searchByRegExp(keyWord, apiName);
            renderapiName(apiNameList);
        }, false);
        //回车查询
        oTxt.addEventListener('keydown', function(e) {
            if (e.keyCode == 13) {
                var keyWord = oTxt.value;
                // var apiNameList = searchByIndexOf(keyWord,apiName);
                var apiNameList = searchByRegExp(keyWord, apiName);
                renderapiName(apiNameList);
            }
        }, false);
        var cpLock = false;
        $('#search').on('compositionstart', function() {
            cpLock = true;
        });
        $('#search').on('compositionend', function() {
            cpLock = false;
            var keyWord = oTxt.value;
            // var apiNameList = searchByIndexOf(keyWord,apiName);
            var apiNameList = searchByRegExp(keyWord, apiName);
            renderapiName(apiNameList);
        });
        $('#search').on('input', function() {
            if (!cpLock) {
                var keyWord = oTxt.value;
                // var apiNameList = searchByIndexOf(keyWord,apiName);
                var apiNameList = searchByRegExp(keyWord, apiName);
                renderapiName(apiNameList);
            }
        });



        function renderapiName(list) {
            if (!(list instanceof Array)) {
                return;
            }
            oList.innerHTML = '';
            var len = list.length;
            var item = null;
            for (var i = 0; i < len; i++) {
                // item = document.createElement('tr');
                oList.innerHTML += '<tr class="pack"><td class="title"><a href="doc/' + list[i]['address'] + '.php" target="_blank">' + list[i]['name'] + '</a></td><td><a href="doc/' + list[i]['address'] + '.php" target="_blank">' + list[i]['info'] + '</a></td><td><a href="doc/' + list[i]['address'] + '.php" target="_blank"><i class="fa fa-star"></i> ' + list[i]['num'] + '</a></td></tr>';
                // oList.appendChild(item);
            }
        }




        //模糊匹配的时候如果不区分大小写，可以使用toLowerCase()或者toUpperCase()转换之后去匹配。

        //模糊查询1:利用字符串的indexOf方法
        function searchByIndexOf(keyWord, list) {
            if (!(list instanceof Array)) {
                return;
            }
            var len = list.length;
            var arr = [];
            for (var i = 0; i < len; i++) {
                //如果字符串中不包含目标字符会返回-1
                if (list[i].indexOf(keyWord) >= 0) {
                    arr.push(list[i]);
                }
            }
            return arr;
        }
        //正则匹配
        function searchByRegExp(keyWord, list) {
            if (!(list instanceof Array)) {
                return;
            }
            var len = list.length;
            var arr = [];
            var reg = new RegExp(keyWord);
            for (var i = 0; i < len; i++) {
                //如果字符串中不包含目标字符会返回-1
                if (list[i]['name'].match(reg)) {
                    arr.push(list[i]);
                }
            }
            return arr;
        }
        renderapiName(apiName);
    });

});