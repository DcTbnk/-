$(function () {

    let id = JSON.parse(localStorage.getItem('login-id'));

    // 查询用户购物车中的商品
    $.ajax({
        url: 'http://jx.xuzhixiang.top/ap/api/cart-list.php',
        type: 'get',
        data: {
            id: id,
        },
        success: function (res) {
            // console.log(res)
            result = res.data;
            let str = '';
            let allPiece=''
            result.forEach(function (item) {
                allPiece++;
                // let onePay = item.pnum * item.pprice;
                str += `
                    <tr index="${item.pid}">
                        <td class="td1"><input type="checkbox" name="pitch-on" class="ck"></input></td>
                        <td class="td2">
                            <img src="${item.pimg}" alt="">
                            <div>
                                <p>${item.pname}</p>
                                <p>${item.pprice}</p>
                                <p>编号: DMLG016</p>
                            </div>
                        </td>
                        <td class="td3 price">${item.pprice}</td>
                        <td class="td4">
                            <p>
                                <span class="minus" >-</span>
                                <input type="number" value="${item.pnum}" class="totalNum">
                                <span class="add">+</span>
                            </p>
                        </td>
                        <td class="td5 totalPrice">${item.pprice*item.pnum}</td>
                        <td class="td6"><span class="goods-del">X</span></td>
                    </tr>`;
            });
            $('table tbody').append(str);
            localStorage.setItem('login-piece',allPiece);


            // 全选框
            $("#selectAll").click(function () {
                $(".ck").prop("checked", $(this).prop("checked"));
                finalPrice();
            })
            $(".ck").click(function () {
                if ($(".ck:checked").length == $(".ck").length) {
                    $("#selectAll").prop("checked", true);
                } else {
                    $("#selectAll").prop("checked", false);
                }
                finalPrice();
            });

            // 获取删除按钮
            var adel = document.querySelectorAll(".goods-del");
            var aCk = document.querySelectorAll(".ck");
            // console.log(adel);
            for (let i = 0; i < adel.length; i++) {
                adel[i].onclick = function () {
                    let pid = $(this).parent().parent().attr("index");
                    $.ajax({
                        type: "get",
                        url: "http://jx.xuzhixiang.top/ap/api/cart-delete.php",
                        data: {
                            uid: id,
                            pid: pid
                        },
                        dataType: "dataType",
                    });
                    $(this).parent().parent().remove();
                    aCk[i].checked = false;
                    finalPrice();
                }
            }
            // 更新数据，就是在购物车里操作商品的 增改数量，删
            var aMinus = document.querySelectorAll('.minus');
            var aTxt = document.querySelectorAll(".totalNum");
            var aPlus = document.querySelectorAll('.add');
            var atotalPrice = document.querySelectorAll('.totalPrice');
            for (let i = 0; i < aMinus.length; i++) {
                // 数量减
                aMinus[i].onclick = function () {
                    // 获取id，做添加数据使用
                    let id = this.parentNode.parentNode.parentNode.getAttribute("index");
                    if (aTxt[i].value <= 1) {
                        aTxt[i].value = 1;
                        return;
                    }
                    // aTxt[i].value--;
                    // oDiv.className='1111';
                    aTxt[i].value = aTxt[i].value - 1;
                    saveData(id, Number(aTxt[i].value));
                    getPrice(i);
                    finalPrice();
                }
                // 数量加
                aPlus[i].onclick = function () {
                    // 获取id，做添加数据使用
                    let id = this.parentNode.parentNode.parentNode.getAttribute("index");
                    aTxt[i].value++;
                    saveData(id, Number(aTxt[i].value));
                    getPrice(i);
                    finalPrice();
                }
                // 手动改数量
                aTxt[i].onchange = function () {
                    // 获取id，做添加数据使用
                    let id = this.parentNode.parentNode.parentNode.getAttribute("index");
                    if (aTxt[i].value <= 1) {
                        aTxt[i].value = 1;
                    }
                    saveData(id, Number(aTxt[i].value));
                    getPrice(i);
                    finalPrice();
                }

            }
            // 修改数量的同时，需要改变单个商品的总价，每个操作都要改，所以封装一下
            function getPrice(i) {
                $(".totalPrice").eq(i).html($(".price").eq(i).html() * aTxt[i].value);
            }
            //数量改变的时候 存入接口的封装
            function saveData(goodsid, goodsnum) {
                $.get("http://jx.xuzhixiang.top/ap/api/cart-update-num.php", {
                    uid: id,
                    pid: goodsid,
                    pnum: goodsnum
                });
            }
            //数量改变的时候 存入接口的封装
            function finalPrice() {
                // 定义一个累加的容器
                var sum = 0;
                for (let i = 0; i < aCk.length; i++) {
                    if (aCk[i].checked) {
                        // 如果选中了，就把选中的单个小计累加
                        sum += Number(atotalPrice[i].innerHTML);
                    }
                }
                $("#finalPrice").html(sum);
            }











            // 猜你喜欢-换一换****************************************
            // let id = JSON.parse(localStorage.getItem('login-id'));
            var allNum = '';
            let productList2 = '';
            $.ajax({
                url: "http://jx.xuzhixiang.top/ap/api/productlist.php",
                method: "get",
                data: {
                    uid: id
                },
                dataType: "json",
                success: function (res) {
                    console.log(res)
                    productListArr = res.data
                    allNum = productListArr.length;

                    // 左
                    let productList1 = '';
                    $.ajax({
                        url: "//jx.xuzhixiang.top/ap/api/allproductlist.php",
                        method: "get",
                        data: {
                            uid: id,
                            pagesize: 6,
                            pagenum: 0
                        },
                        dataType: "json",
                        success: function (res) {
                            console.log(res)
                            productListArr = res.data

                            productListArr.forEach(item => {
                                productList1 += `<li>
                        <img src="${item.pimg}" alt="">
                        <p>${item.pname}</p>
                        <p>${item.pdesc}</p>
                        <p><span><i class="iconfont iconrenminbi1688"></i>${item.pprice}</span><span>20人购买</span></p>
                        </li>`;
                            });
                            $('.like-ul').html(productList1);
                        }
                    })





                }
            });

        }
    });
})