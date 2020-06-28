$(function () {

    var swiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        slidesPerView: 3,
        spaceBetween: 10,
        slidesPerGroup: 3,
        height: 330,
        loop: true,
        loopFillGroupWithBlank: true,
        // mousewheel: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
        },
    });






    // 猜你喜欢-换一换****************************************
    let id = JSON.parse(localStorage.getItem('login-id'));

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

            // 左左左左左
            let productList1 = '';
            $.ajax({
                url: "//jx.xuzhixiang.top/ap/api/allproductlist.php",
                method: "get",
                data: {
                    uid: id,
                    pagesize: 5,
                    pagenum: 0
                },
                dataType: "json",
                success: function (res) {
                    console.log(res)
                    productListArr = res.data

                    productListArr.forEach(item => {
                        productList1 += `<li>
                            <a href="./details.html?pid=${item.pid}">
                            <img src="${item.pimg}" alt="">
                            <div>
                                <p>${item.pname}</p>
                                <p>${item.pdesc}</p>
                                <p>
                                    <span><i class="iconfont iconrenminbi1688"></i>${item.pprice}</span>
                                    <img src="https://aromonde.com/images/add-cart-btn.png" alt="">
                                </p>
                            </div>
                            </a>
                        </li>`;
                    });
                    $('.message-matter').html(productList1);
                }
            })

            // ******************************************
            var pages = Math.ceil(allNum / 5);
            // console.log(pages);


            //点击猜你喜欢-换一换
            // let newNum2 = '';
            $('.change-like').click(function () {
                let newNum2 = parseInt(Math.random() * pages + 1);
                // console.log(newNum2);


                let productList1 = '';
                $.ajax({
                    url: "//jx.xuzhixiang.top/ap/api/allproductlist.php",
                    method: "get",
                    data: {
                        uid: id,
                        pagesize: 5,
                        pagenum: newNum2
                    },
                    dataType: "json",
                    success: function (res) {
                        // console.log(res)
                        productListArr = res.data

                        productListArr.forEach(item => {
                            productList1 += `<li>
                            <a href="./details.html?pid=${item.pid}">
                            <img src="${item.pimg}" alt="" style="width:85px;height:85px;">
                            <div>
                                <p>${item.pname}</p>
                                <p>${item.pdesc}</p>
                                <p>
                                    <span><i class="iconfont iconrenminbi1688"></i>${item.pprice}</span>
                                    <img src="https://aromonde.com/images/add-cart-btn.png" alt="">
                                </p>
                            </div>
                            </a>
                        </li>`;
                        });
                        $('.message-matter').html(productList1);
                    }
                })

            });

        }
    });

    // 购买buy

    let pid = decodeURIComponent(window.location.search.substr(1)).split('=')[1];

    $.ajax({
        url: 'http://jx.xuzhixiang.top/ap/api/detail.php',
        type: 'get',
        data: {
            id: pid
        },
        dataType: 'json',
        success: function (res) {
            console.log(res);

            result = res.data;

            let str = '';
            str = `
                <div class="amplify-box">
                    
                    <div class="list swiper-container">

                        <ul class="swiper-wrapper swiper-ul">
                            <li class="swiper-slide" style="height:95px;"><img src="${result.pimg}" alt=""></li>
                            
                            
                        </ul>
                        
                        <div class="triangle swiper-button-next"><i class="iconfont iconxiangxiadejiantou"></i></div>
                        
                    </div>
                    
                    <div class="show">
                        <img src="${result.pimg}" alt="">
                        <div class="mask"></div>
                    </div>
                    
                    <div class="glass"></div>
                </div>
                
                <div class="amplify-info">
                    <p>${result.pname}</p>
                    <p>${result.pdesc}</p>
                    <div>
                        <p><i class="iconfont iconrenminbi1688"></i>${result.pprice}</p>
                        <span>含税</span>
                        <span>156人已购买</span>
                        <span>
                            <a href="">请登录</a>
                            
                            查看会员价
                        </span>
                    </div>
                    <div>
                        <p>数量</p>
                        <div>
                            <i class="minus">-</i>
                            <input type="text" value="1" name="inNum">
                            <i class="add">+</i>
                        </div>
                        <p>5人收藏</p>
                    </div>
                    <div>
                        <p>立即购买</p>
                        <p class="addCar">加入购物车</p>
                        <p><img src="https://aromonde.com/images/collect-null.png" alt="">收藏</p>
                    </div>
                </div>
            `;

            $('.amplify').html(str);

            // 放大镜
            const arr = [
                result.pimg,
                result.pimg,
                result.pimg,
                result.pimg,
            ];
            const oBox = document.querySelector('.amplify-box');
            const setAmplify = new Amplify(oBox, arr);

            setAmplify.init();

            // 加减
            let val = $('[name=inNum]').val();
            $('.add').click(function () {
                val++;
                console.log($(this));
                $('[name=inNum]').val(val);
            });
            $('.minus').click(function () {
                val--;
                if (val <= 1) {
                    val = 1;
                    $('[name=inNum]').val(val);
                    return;
                }
                $('[name=inNum]').val(val);
            });
        }
    })



    /* $(this).addClass('active').siblings().removeClass('active').parent().next().find('li').removeClass('active').eq($(this).index()).addClass('active'); */

    // 点击加购
    $('.amplify').on('click', '.addCar', function () {

        if (id == -1) {
            let bool = window.confirm('您还没有登录,点击确定,跳转登录页面');
            if (bool === true) {
                window.location.href = `./login.html?${window.location.href}`;
            } else {
                return false;
            }
        } else {
            


            $.ajax({
                url: 'http://jx.xuzhixiang.top/ap/api/cart-list.php',
                type: 'get',
                data: {
                    id: id,

                },
                success: function (res) {
                    console.log(res);
                    if (res.data.pid == pid) {
                        $.ajax({
                            url: 'http://jx.xuzhixiang.top/ap/api/cart-update-num.php',
                            type: 'get',
                            data: {
                                uid: id,
                                pid: pid,
                                pnum: $('[name=inNum]').val() + res.data.pnum,

                            },
                            success: function (res) {
                                console.log(res)
                                window.confirm('添加成功，在购物车等亲~');

                            }
                        })
                    } else {
                        $.ajax({
                            url: 'http://jx.xuzhixiang.top/ap/api/add-product.php',
                            type: 'get',
                            data: {
                                uid: id,
                                pid: pid,
                                pnum: $('[name=inNum]').val(),

                            },
                            success: function (res) {
                                console.log(res)
                                window.confirm('添加成功，在购物车等亲~');

                            }
                        });
                    }

                }
            })





        }
    })


})