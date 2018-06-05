//初始化相关操作
(function () {
    function init() {
        let data = [];
        data = getData();
        getData();
        render();
        getTableData();
        // barLine.drawLine(data[0].sale);
        barLine.drawBar(data[0].sale);
        barLine.drawLines();
    }
    init();
}());