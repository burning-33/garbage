<template>
    <div class="forgetPwd">
        <div class="mlr38">
            <div class="borderccc bR5 b-v-center btnWidth">
                <p class="fs16 color333 plr8 height mr15">+86</p>
                <input class="flex" type="number" v-model="phoneNum" placeholder="请输入11位手机号"/>
            </div>
            <p v-if="!showCode" class="color333 fs12 mt8">为保证您得账号安全，我们将向您的手机发送验证码</p>
            <div v-else class="borderccc bR5 btnWidth">
                <van-cell-group class="ml5">
                    <van-field
                        center
                        v-model="sms"
                        placeholder="请输入短信验证码"
                        icon="clear"
                        @click-icon="sms = ''">
                        <van-button @click="getValidateCode" v-if="is_show"  slot="button" size="normal" type="primary" class="bgGreen">{{getCodetext}}</van-button>
                        <van-button v-else slot="button" size="normal" type="primary" class="bg999">已发送{{last_time}}秒</van-button>
                    </van-field>
                </van-cell-group>
            </div>
            <button class="bgGreen btnCommit" @click="nextStep">下一步</button>
        </div>

    </div>
</template>
<script>
import {Toast} from 'vant'
export default {
  data() {
    return {
      sms: "",
      validateCode:'',
      showCode:false,
      //倒计时
      is_show: true,
      last_time: "",
      getCodetext: "获取验证码",
      phoneNum:'',
      from:''      
    };
  },
  methods: {
    getValidateCode() {
      let _this = this;
        _this.$fetch(_this.GLOBAL.base_url + "sms", {
            mobile: _this.phoneNum,
            type: "pwd"
        })
        .then(res => {
            console.log(res,'密码');
            if (res.code == 200) {
            _this.is_show = !_this.is_show;
            _this.validateCode = res.data
            _this.GLOBAL.countdown(_this);
            }
        })
        .catch(err => {
            console.log(err);
        });
      
    },
    nextStep() {
        console.log(this.sms)
        console.log(this.validateCode)
        if(!this.showCode){
            this.showCode = true
            this.getValidateCode()
        }else{
            if (this.sms == "") {
                Toast("请填写验证码");
            } else if (this.sms != this.validateCode) {
                Toast("验证码不正确");
            } else {
                this.$router.replace({
                name: "setPwd",
                params: { title: "设置密码" ,code:this.validateCode,login:true,phoneNum:_this.phoneNum}
                });
            }
        }
    }
  },
  components: {}
};
</script>
<style lang="less" scoped>
.forgetPwd {
  margin-top: 100px;
  .mlr38 {
    margin: 0 38px;
  }
  .height{
      height: 42px;
      line-height: 42px;
      background-color: rgb(235, 233, 233);
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
  
  .van-button--primary {
    border: 0;
  }
  .borderccc {
    border: 1px solid #ccc;
  }
  .btnWidth + .btnWidth {
    margin-top: 25px;
  }
  .btnCommit {
    width: 290px;
    height: 44px;
    margin: auto;
    border-radius: 10px;
    margin-top: 80px;
    color: #fff;
    font-size: 20px;
  }
  .bR10 {
    border-radius: 10px;
  }
  .bg999 {
    background-color: #999;
  }
}
</style>


