﻿/*何亦辰/api/DcsalarmData/GetPersonPosition   PERSON_POSITION*/
require.config({
    paths: config.modulePaths
})

define(function (require) {

    var drawCanvas = require('drawCanvas');


    /*基础信息库*/
    var Data = [], restoredData = [];

    for (var i = 0; i < 19; i++) {
        Data.push('新增内eeedddhhhhhhhhhhhhhhhhhhhhggggggggggggggggggggggddddddddd容' + i);
    }
    for (var i = 0; i < 8; i++) {
        Data.push(' ');
    }

    /*****基本配置*******/
    var speedUp = 1000;               //上行速度

    console.log(Data)
    /*************右侧grid's Functions********************/

    //中间的迷之空缺
    function loadData(data) {
        var ul = document.getElementById('grid');

        for (var i = 0; i < data.length; i++) {
            var li = document.createElement('li');
            li.innerHTML = data[i];
            ul.appendChild(li);
        }
    }



    //从上方添加一条并插入
    function add_from_top(str) {

        var ul = document.getElementById('grid'),
            target = ul.children[0],
            h = target.clientHeight;

        var li = document.createElement('li');
        li.innerHTML = str;

        //ul.insertBefore(li, target);
        //动画区
        function add_from_top_animation(node, h) {
            node.style.height = 0;
            ul.insertBefore(li, target);
            var hh = 0,
                backgroundElement = document.getElementById('div8');

            function doit() {
                if (hh >= h) { return; }

                else {
                    hh += h / 3;
                    node.style.height = hh + 'px';
                    setTimeout(doit, 50);
                }
            }
            doit();

            //背景
            var positionY = backgroundElement.style.backgroundPositionY; 

            if (!positionY) {
                backgroundElement.style.backgroundPositionY = '35px';
            }
            else if (typeof positionY === 'string') {

                var number = positionY.slice(0, positionY.length - 2);

                backgroundElement.style.backgroundPositionY = 35 + parseInt(number) + 'px';
            }
        }

        add_from_top_animation(li, h);

    }

    //在上方删除出去
    function delete_from_top() {

        var ul = document.getElementById('grid'),
            target = ul.children[0],
            backgroundElement = document.getElementById('div8');

        target.style.marginTop = -35 + 'px';

        var _parent = target.parentNode;

        setTimeout(function () {
            _parent.removeChild(target);
            restoredData.push(target.innerHTML);
        }, speedUp);
        
        //背景
        var positionY = backgroundElement.style.backgroundPositionY;

        if (!positionY) {
            backgroundElement.style.backgroundPositionY = '-35px';
        }
        else if (typeof positionY === 'string') {

            var number = positionY.slice(0, positionY.length - 2);

            backgroundElement.style.backgroundPositionY = -35 + parseInt(number) + 'px';
        }
    }

    //从下方塞进一条数据
    function add_from_bottom(str) {

        var ul = document.getElementById('grid');

        var li = document.createElement('li');
        li.innerHTML = str;

        ul.appendChild(li);
        
    }



    /*********************管理函数************************/

    function addMsg(str) {
        add_from_bottom(str);
        delete_from_top();
    }






    /*****************************************************/



    var Go = function () {

        //先画Canvas
        drawCanvas.draw();

        //初次加载数据
        loadData(Data);

        //手工计数器
        var counter = 0;

        function loopIt() {

            if (counter >= Data.length) {
                counter = 0;
            }
            addMsg(Data[counter]);
            counter++;

            setTimeout(loopIt, speedUp);
        }
        
        setTimeout(loopIt, 1000);










    }
    Go();
})
