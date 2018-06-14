let LocalStorage = {
    inputOnblur: function () {
        //使用闭包
        let tableWrapper = document.getElementById('table-wrapper');
        let inputs = tableWrapper.getElementsByTagName('input');
        for (let i = 0; i < inputs.length; i++) {
            (function () {
                inputs[i].onblur = function () {
                    if (isNaN(inputs[i].value) !== false) {
                        alert('您输入的' + inputs[i].value + '不是数字!!');
                    }
                }
                inputs[i].onclick = function () {
                    let value = e.target.textContent;
                    e.target.innerHTML = '<td><input value=' + value +
                        '><button id="confirm">确认</button><button id="cancel">取消</button>';
                }
            })();
        }
    },
    setData: function () {
        let submit = document.getElementById('submit');

        submit.onclick = function () {
            let data = [];
            let tableWrapper = document.getElementById('table-wrapper');
            let tds = tableWrapper.getElementsByTagName('td');
            let k = 0;
            for (let i = 0; i < tds.length; i++) {
                if (isNaN(tds[i].innerText) === false) {
                    data.push(tds[i].innerText);

                }
            }
            console.log(data);
            //行列控制,提取数字简易
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 12; j++) {
                    if (k < data.length) {
                        // console.log('data' + i + j + ',' + data[k].value);
                        localStorage.setItem("data" + i + j, data[k]);
                        k++;
                    }
                }
            }
        }

    },
    buttonClick: function () {
        let body = document.getElementsByTagName('body')[0];
        let confirm = document.getElementById('confirm');
        let cancel = document.getElementById('cancel');

        let parsent = confirm.parentElement;
        let input = parsent.firstChild;
        let value = input.value;
        confirm.addEventListener('click', function () {
            parsent.innerHTML = '<td>' + input.value + '<i class="icon ion-edit"></i></td>';

        });
        cancel.addEventListener('click', function () {
            parsent.innerHTML = '<td>' + value + '<i class="icon ion-edit"></i></td>';

        });
        body.addEventListener('click', function (e) {
            if (e.target.nodeName !== 'TD' && e.target.id !== "inputNum" && e.target.nodeName !== "BUTTON") {
                parsent.innerHTML = '<td>' + value + '<i class="icon ion-edit"></i></td>';
            }
        });
        input.addEventListener('keydown', function (e) {
            if (e.keyCode === 13) {
                parsent.innerHTML = '<td>' + input.value + '<i class="icon ion-edit"></i></td>';

            } else if (e.keyCode === 27) {
                parsent.innerHTML = '<td>' + value + '<i class="icon ion-edit"></i></td>';

            }

        });

    },
    mutex: function () {
        let tableWrapper = document.getElementById('table-wrapper');
        let input = tableWrapper.getElementsByTagName('input');
        if (input.length !== 0) {
            return false
        } else {
            return true;
        }
    },

}