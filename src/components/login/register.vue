<template>
  <div class="register">
    <div class="hvMiddle">
        <div class="borderccc bR5 b-v-center btnWidth pg15">
            <p class="iconfont fs20 colorccc pr15">&#xe602;</p>
            <input class="flex" type="number" v-model="phoneNum" placeholder="请输入11位手机号"/>
        </div>
        <div class="borderccc bR5 b-v-center btnWidth">
            <p class="iconfont fs20 colorccc plr15">&#xe6cd;</p>
            <van-cell-group >
                <van-field
                    center
                    v-model="sms"
                    placeholder="请输入验证码"
                    icon="clear"
                    @click-icon="sms = ''">
                    <van-button @click="getValidateCode" v-if="is_show"  slot="button" size="normal" type="primary" class="bgGreen">{{getCodetext}}</van-button>
                    <van-button v-else slot="button" size="normal" type="primary" class="bg999">已发送{{last_time}}秒</van-button>
                </van-field>
            </van-cell-group>
        </div>
        
        <div class="borderccc bR5 b-v-center btnWidth pg15">
            <p class="iconfont fs20 colorccc pr15">&#xe640;</p>
            <input class="flex" v-model="inputPwd" type="password" placeholder="请输入密码(6-12位数字、字母)"/>
        </div>
        <div class="borderccc bR5 b-v-center btnWidth pg15">
            <p class="iconfont fs20 colorccc pr15">&#xe640;</p>
            <input class="flex" v-model="secondPwd" type="password" placeholder="再次输入密码(6-12位数字、字母)"/>
        </div>
        <div class="borderccc bR5 b-v-center btnWidth pg15">
            <p class="iconfont fs16 colorccc pr15">&#xe637;</p>
            <input class="flex" v-model="invitation" type="number" placeholder="请输入邀请码"/>
        </div>
        <button @click="register" class="bR5 bgGreen colorw fs18 btnLogin">注册</button>
    </div>
  </div>
</template>

<script>
import {Toast} from 'vant'
export default {
  name: "register",
  data() {
    return {
      sms: "",
      phoneNum: "",
      inputPwd: "",
      secondPwd: "",
      invitation:'',
      //倒计时
      is_show: true,
      last_time:'',
      getCodetext:'获取验证码'
    };
  },
  created(){
     //设置或获取整个 URL 为字符串。
    let url = window.location.href; 
    if (url.indexOf("?") != -1) {
        var strs = url.split("&");  
        for(var i = 0; i < strs.length; i ++) {
          this.invitation = strs[i].split("=")[1]
        }  
    } 
     
  },
  computed: {},
  methods: {
    getValidateCode(){
      let _this = this;
      let regPhone = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (_this.phoneNum == "") {
        Toast("手机号不能为空");
      } else if (!regPhone.test(_this.phoneNum)) {
        Toast("请输入正确的手机号");
      } else {
         _this
        .$fetch(_this.GLOBAL.base_url + "sms", {
          mobile: _this.phoneNum,
          type:'register'
        })
        .then(res => {
          console.log(res);
          if(res.code == 200){
            _this.is_show = !_this.is_show
            _this.GLOBAL.countdown(_this);
          }
        })
        .catch(err => {
          console.log(err);
        });
      }
    },
    register() {
      let _this = this;
      console.log(_this.phoneNum, _this.sms, _this.inputPwd, _this.secondPwd); 
      if (_this.sms == '') {
        Toast("请输入验证码");
      } else if (_this.sms == '') {
        Toast("验证码不正确");
      } else if (_this.inputPwd == "") {
        Toast("密码不能为空");
      } else if(_this.inputPwd !== _this.secondPwd){
        Toast("两次密码不一致");
      } else{
        if(_this.invitation){
          if(_this.invitation.length !=6){
            Toast("请输入6位邀请码");
          }
        }
         _this
        .$post(_this.GLOBAL.base_url + "reg", {
          mobile: _this.phoneNum,
          code: _this.sms,
          password: _this.inputPwd,
          invitation_code:_this.invitation
        })
        .then(res => {
          console.log(res);
          if(res.code == 200){
            Toast.success('注册成功,请前往登录');
            setTimeout(function(){
              _this.$router.replace({name: 'login',params:{title:'登录'}})
            },3000)
          }else{
            Toast(res.msg)
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
.register {
  overflow: hidden;
  .hvMiddle {
    margin-top: 80px;
  }
  .btnWidth {
    width: 290px;
    height: 44px;
    margin: auto;
    ::-webkit-input-placeholder {
      color: #ccc;
    }
  }
  .van-cell {
    padding: 0 !important;
  }
  .van-cell__title, .van-cell__value{
    display: flex;
  }
  .van-button {
    height: 42px;
    color: #fff;
  }
  .van-button--primary{
    border: 0;
  }
  .borderccc {
    border: 1px solid #ccc;
  }
  .btnWidth + .btnWidth {
    margin-top: 25px;
  }
  .btnLogin {
    width: 290px;
    height: 44px;
    margin: 0 auto;
    margin-top: 55px;
  }
}
</style>

