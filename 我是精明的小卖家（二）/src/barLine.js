let barLine = {
    getMax: function () {
        //坑货js的sort排序,自己需要重写
        let data = [];
        for (let i = 0; i < sourceData.length; i++) {
            let sortData = [].concat(sourceData[i].sale);
            let max = sortData.sort(sortNum);
            max = max[sortData.length - 1];
            data.push(max);
        }
        let max = data.sort()[data.length - 1];
        return max;
    },
    //多个折线图
    drawLines: function () {
        let c = document.getElementById("canvas"),
            ctx = c.getContext("2d");
        ctx.clearRect(0, 0, 600, 330);
        //最大值与比例
        let max = this.getMax();
        let ratio = 300 / max;
        //纵横初始坐标位置
        let startX = 20;
        let endX = 525;
        let startY = 0;
        let endY = 300;
        //折线图的横纵坐标

        ctx.beginPath();
        ctx.moveTo(startX, endY);
        ctx.lineTo(endX, endY);
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'black';
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(startX + 5, startY);
        ctx.lineTo(startX + 5, endY + 5);
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'black';
        ctx.stroke();
        //绘制参照物
        let y = 1;
        let lineX = 25;
        let num = 0;
        for (let i = 0; i <= 5; i++) {
            //绘制折线参照物
            ctx.beginPath();
            ctx.moveTo(startX, y);
            ctx.lineTo(525, y);
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = 'black';
            ctx.fillStyle = '#277DF4';
            ctx.fillText(720 - num, 0, y + 10);
            
            if (i === 0) {
                y = 0;
            }
            y += 50; //坐标
            num += 120; //参照物数字
            ctx.stroke();
        }
        //绘制参照物为0的数字
        ctx.fillText('0', 0, 305);
        let data = [];
        for (let i = 0; i < sourceData.length; i++) {
            data[i] = sourceData[i].sale;
        }
        //折线的月份
        let monthX = 25;
        for (let i = 0; i < 12; i++) {
            let month = (i + 1) + '月';
            ctx.fillStyle = '#277DF4';
            ctx.fillText(month, (monthX - 5), (endY + 15));
            monthX += 45;
        }
        let color = ['#AAAAAA', '#FF44AA', '#FF3333', '#FF7744', '#FFCC22', '#FFFF33', '#CCFF33', '#33FF33', '#33FFAA', '#33CCFF', '#9955FF'];
        for (let i = 0; i < data.length; i++) {
            lineX = 25;
            //文字
            let lineColor = color[i]
            for (j = 0; j < data[i].length; j++) {
                //圆点
                ctx.beginPath();
                ctx.arc(lineX, parseInt((max - data[i][j]) * ratio), 2.0, 0, 2 * Math.PI);
                ctx.lineWidth = 1;
                ctx.fillStyle = lineColor;
                ctx.fill();
                ctx.strokeStyle = lineColor;
                ctx.stroke();
                if (j !== 0) {
                    //绘制下标
                    ctx.beginPath();
                    ctx.moveTo(lineX, endY);
                    ctx.lineTo(lineX, (endY + 5));
                    ctx.strokeStyle = 'black';
                    ctx.lineWidth = 1;
                    ctx.stroke();
                    //绘制连线
                    ctx.beginPath();
                    ctx.moveTo((lineX - 45), parseInt((max - data[i][j - 1]) * ratio));
                    ctx.lineTo(lineX, parseInt((max - data[i][j]) * ratio));
                    ctx.strokeStyle = lineColor;
                    ctx.stroke();
                }
                lineX += 45;
            }
        }
    },
    //单个折线图
    drawLine: function (data) {
        let c = document.getElementById("canvas"),
            ctx = c.getContext("2d");
        ctx.clearRect(0, 0, 600, 330);
        //最大值与比例
        let max = this.getMax();
        let ratio = 300 / max;
        //纵横初始坐标位置
        let startX = 20;
        let endX = 525;
        let startY = 0;
        let endY = 300;
        //折线图的横纵坐标
        ctx.beginPath();
        ctx.moveTo(startX, endY);
        ctx.lineTo(endX, endY);
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#277DF4';
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(startX + 5, startY);
        ctx.lineTo(startX + 5, endY + 5);
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#277DF4';
        ctx.stroke();

        //绘制参照物
        let y = 1;
        let lineX = 25;
        let num = 0;
        for (let i = 0; i <= 5; i++) {
            //绘制折线参照物
            ctx.beginPath();
            ctx.moveTo(startX, y);
            ctx.lineTo(525, y);
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = 'black';
            ctx.fillStyle = '#277DF4';
            ctx.fillText(720 - num, 0, y + 10);
            
            if (i === 0) {
                y = 0;
            }
            y += 50; //坐标
            num += 120; //参照物数字
            ctx.stroke();
        }
        //绘制参照物为0的数字
        //折线
        ctx.fillText('0', 0, 305);

        //开始创建月份
        for (let i = 0; i < data.length; i++) {
            //折线的月份
            let month = (i + 1) + '月';
            ctx.fillStyle = '#277DF4';
            //文字
            ctx.fillText(month, (lineX - 5), (endY + 15));
            //圆点
            ctx.beginPath();
            ctx.arc(lineX, ((max - data[i]) * ratio), 2.5, 0, 2 * Math.PI);
            ctx.lineWidth = 1;
            ctx.fillStyle = '#277DF4';
            ctx.fill();
            ctx.strokeStyle = '#277DF4';
            ctx.stroke();

            if (i !== 0) {
                //绘制下标
                ctx.beginPath();
                ctx.moveTo(lineX, endY);
                ctx.lineTo(lineX, (endY + 5));
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 1;
                ctx.stroke();

                //绘制连线
                ctx.beginPath();
                ctx.moveTo((lineX - 45), parseInt((max - data[i - 1]) * ratio));
                ctx.lineTo(lineX, parseInt((max - data[i]) * ratio));
                ctx.strokeStyle = '#277DF4';
                ctx.stroke();
            }
            lineX += 45;
        }

    },
    drawBar: function (data) {
        let max = this.getMax();
        //比例约束
        let ratio = 300 / max;

        svgContent = document.getElementById('svgContent');
        svgContent.innerHTML = '';
        let text = '';
        let startX = 20;
        let endX = 525;
        let startY = 0;
        let endY = 300;

        let barX = 50;
        let num = 0;
        text += '<line x1="25"  x2="525" y1="' + endY + '" y2="' + endY +
            '" stroke="black" stroke-width="1" />';
        text += '<line x1="30"  x2="30" y1="0 " y2="' + (endY + 5) +
            '" stroke="black" stroke-width="1" />';
        //柱状图参照物
        let y = 1;
        for (let i = 0; i <= 5; i++) {
            text += '<line x1="25" x2="525" y1=' + y + ' y2=' + y + ' stroke="gray"' +
                'stroke-opacity="1" stroke-width="1"/>';
            text += '<text font-size="11" x=0 y=' + (y + 10) + ' y=320>' + (720 - num) + '</text>';
            if (i === 0) {
                y = 0;
            }
            y += 50; //坐标
            num += 120; //参照物数字
        }
        //数字为0
        text += '<text  font-size="11" x=0 y=' + 305 + ' y=320>' + 0 + '</text>';
        //绘制月份
        for (let i = 0; i < 12; i++) {
            let month = (i + 1) + '月';
            //柱状图的文字
            text += '<text fill="#277DF4" font-size="11" x=' + (barX - 5) + ' y=315>' + month + '</text>';
            //下标
            text += '<line x1=' + barX + ' x2=' + barX +
                ' y1="300" y2="305" stroke-width="1" stroke="black"/>';
            //数据
            text += '<rect id="rect" width=20' + ' height=' + parseInt(data[i] * ratio) + ' x=' + barX + ' y=' +
                parseInt((max - data[i]) * ratio) + ' fill="#277DF4"/>';
            barX += 40;
        }
        svgContent.innerHTML = text;
    },

}



function sortNum(a, b) {
    return a - b;
}