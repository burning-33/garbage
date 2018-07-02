<template>
    <div class="checkCode">
        <div class="mlr40">
            <p class="mb20 color333">你当前的手机号为：{{phoneNum}}</p>
        <div class="borderccc bR5 btnWidth">
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
      //倒计时
      is_show: true,
      last_time: "",
      getCodetext: "获取验证码",
      phoneNum:'',
      from:''      
    };
  },
  created(){
      this.from = this.$route.params.title
      this.phoneNum = this.$route.params.mobile 
  },
  methods: {
    getValidateCode() {
      let _this = this;
      if(this.from == '设置密码'){
        _this
        .$fetch(_this.GLOBAL.base_url + "sms", {
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
      }else{
        _this
        .$fetch(_this.GLOBAL.base_url + "sms", {
          mobile: _this.phoneNum,
          type: "verify"
        })
        .then(res => {
          console.log(res,'手机号');
          if (res.code == 200) {
            _this.is_show = !_this.is_show;
            _this.validateCode = res.data
            _this.GLOBAL.countdown(_this);
          }
        })
        .catch(err => {
          console.log(err);
        });
      }
      
    },
    nextStep() {
        console.log(this.sms)
        console.log(this.validateCode)
      if (this.sms == "") {
        Toast("请填写验证码");
      } else if (this.sms != this.validateCode) {
        Toast("验证码不正确");
      } else {
        if(this.from == '设置密码'){
          this.$router.replace({
            name: "setPwd",
            params: { title: "设置密码" ,code:this.validateCode,phoneNum:_this.phoneNum}
          });
        }else{
          this.$router.replace({
            name: "newPhone",
            params: { title: "新手机号" ,code:this.validateCode}
          });
        }
        
      }
    }
  },
  components: {}
};
</script>
<style lang="less" scoped>
.checkCode {
  margin-top: 100px;
  .mlr40 {
    margin: 0 40px;
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
    border-radius: 5px;
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


