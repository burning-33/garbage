<template>
  <div class="login">
    <div class="hvMiddle">
        <div class="borderccc bR10 b-v-center btnWidth pg15">
            <p class="iconfont fs20 colorccc pr15">&#xe602;</p>
            <input class="flex" type="number" v-model="phoneNum" placeholder="请输入手机号"/>
        </div>
        <div class="borderccc bR10 b-v-center btnWidth pg15">
            <p class="iconfont fs20 colorccc pr15">&#xe640;</p>
            <input class="flex" v-model="inputPwd" type="password" placeholder="请输入密码"/>
        </div>
        <div class="b-v-center register">
            <router-link :to="{name:'register',params:{title:'注册'}}" tag="p" class="flex">用户注册</router-link>
            <router-link :to="{name:'forgetPwd',params:{title:'忘记密码'}}" tag="p" class="flex tr">忘记密码</router-link>
        </div>
        <button @click="login" class="bR5 bgGreen colorw fs18 btnLogin">登录</button>
    </div>
  </div>
</template>

<script>
import qs from 'qs';
import {Toast} from 'vant'
export default {
  name: "login",
  data() {
    return {
      phoneNum: "",
      inputPwd: ""
    };
  },
  computed: {},
  methods: {
    login() {
      let _this = this;
      let regPhone =  /^[1][3,4,5,7,8][0-9]{9}$/
      if(_this.phoneNum == ''){
          Toast('手机号码不能为空');
      }else if(!regPhone.test(_this.phoneNum)){
        Toast('请输入正确的手机号');
      }else if(_this.inputPwd == ''){
          Toast('密码不能为空');
      }else{
        _this.$post(_this.GLOBAL.base_url + "login", {loginname: _this.phoneNum,password: _this.inputPwd})
        // axios.post("/xxw/api/login", {loginname: _this.phoneNum,password: _this.inputPwd})
        .then(res => {
          console.log(res);
          if(res.code == 200){
            Toast.success('登录成功,正在跳转...');
            window.sessionStorage.setItem('token',res.data.token)
            _this.GLOBAL.token = res.data.token;
            _this.GLOBAL.mobile = res.data.mobile;
            _this.GLOBAL.discount = res.data.discount;
            _this.GLOBAL.nickname = res.data.nickname;
            console.log(_this.GLOBAL.token,_this.GLOBAL.mobile,_this.GLOBAL.discount)
            setTimeout(function(){
              _this.$router.replace({name: 'home',params:{title:'首页'}})
            },3000)
          }else{
            Toast(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.login {
  overflow: hidden;
  .hvMiddle {
    margin-top: 100px;
    .colorccc{
      color: #ccc;
    }
  }
  .btnWidth {
    width: 290px;
    height: 44px;
    margin: auto;
    ::-webkit-input-placeholder {
      color: #ccc;
    }
  }
  .borderccc {
    border: 1px solid #ccc;
  }
  .btnWidth + .btnWidth {
    margin-top: 25px;
  }
  .register {
    width: 290px;
    margin: 10px auto 0;
  }
  .btnLogin {
    width: 290px;
    height: 44px;
    margin: 0 auto;
    margin-top: 55px;
  }
}
</style>

