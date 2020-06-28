$(function () {
    $("#header").load('./header.html');
    $('#footer').load('./footer.html');

    //注册
    //验证码
    let str = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';

    function setVc() {
        let newStr = '';
        for (let i = 1; i <= 6; i++) {
            let num = parseInt(Math.random() * str.length);
            if (newStr.indexOf(str[num]) === -1) {
                newStr += str[num];
            } else {
                i--;
            }
        }
        return newStr;
    }
    // $('[class="code2"]').html(setVc());
    $('[class="code2"]').click(function () {
        $(this).html(setVc());
    });

    /* 提交 */
    $('[name="submit-btn"]').click(function () {
        let username = $('[name="username"]').val();
        let code1 = $('[name="code1"]').val();
        let code2 = $('[class="code2"]').text();
        let userpwd1 = $('[name="password1"]').val();
        let userpwd2 = $('[name="password2"]').val();

        if (userpwd1 == '') {
            window.alert('您还没有输入密码');
            return false;
        }
        if (userpwd2 == '') {
            window.alert('您还没有再次输入密码');
            return false;
        }
        if (userpwd1 !== userpwd2) {
            window.alert('两次密码不一致')
            return false;
        }
        if (userpwd1.length !== 6) {
            window.alert('您的密码不符合规范')
            return false;
        }

        if (username == '') {
            window.alert('您还没有输入手机号');
            return false;
        }
        if (username[0] !== '1') {
            window.alert('您输入的不是手机号');
            return false;
        }
        if (username.length !== 11) {
            window.alert('您输入的手机号不正确');
            return false;
        }

        if (code1 == '') {
            window.alert('您还没有输入验证码');
            return false;
        }

        if(code1.toLowerCase()!=code2.toLowerCase()){
            window.alert('您的验证码不正确');
            return false;
        }

        $.ajax({
            url: 'http://jx.xuzhixiang.top/ap/api/reg.php',
            type: 'get',
            data: {
                username:username,
                password:userpwd1,
            },
            dataType: 'json',
            success: function (res) {
                console.log(res);
                if (res.code == '0') {
                    window.alert('注册失败，您的账号已被注册，请重新注册');
                } else {
                    window.alert('注册成功，点击确认，跳转至登录界面');
                    window.location.href = './login.html';
                }
            }
        });

    });
})