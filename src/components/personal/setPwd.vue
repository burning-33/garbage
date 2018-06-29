<template>
    <div class="setPwd">
        <div class="borderccc bR5 b-v-center btnWidth pg15">
            <p class="iconfont fs20 colorccc pr15">&#xe640;</p>
            <input class="flex" v-model="firstPwd" type="password" placeholder="设置您的新密码"/>
        </div>
        <div class="borderccc bR5 b-v-center btnWidth pg15">
            <p class="iconfont fs20 colorccc pr15">&#xe640;</p>
            <input class="flex" v-model="secondPwd" type="password" placeholder="再次输入新密码"/>
        </div>
        <button class="bgGreen btnCommit" @click="commit">提交</button>
        <ymDialog ref="dialog" :modal="modal" />
    </div>
</template>
<script>
import ymDialog from "../common/dialog";
import {Toast} from 'vant'
export default {
  data() {
    return {
      firstPwd:'',
      secondPwd:'',
      phoneNum:'18782065437',
      auth:'',
      modal: {
        confirmText: "ok",
        contentText: "密码修改成功",
        red: false,
        showCancel: false
      }
    };
  },
  created(){
      let _this = this;
      if(_this.$route.params.login){
        _this.modal = {
          confirmText: "立即登录",
          contentText: "密码修改成功",
          red: false,
          showCancel: false
        }
      }
      _this
        .$fetch(_this.GLOBAL.base_url + "pwd", {
          mobile: _this.GLOBAL.mobile,
          code: _this.$route.params.code
        })
        .then(res => {
          console.log(res);
          if(res.code == 200){
            _this.auth = res.data;
          }else{
            Toast(res.msg)
          }
        })
        .catch(err => {
          console.log(err);
        });
  },
  methods: {
    commit(){
        let _this = this;
        console.log(_this.$route.params.code)
      if (_this.firstPwd == "") {
        Toast("密码不能为空");
      } else if(_this.firstPwd !== _this.secondPwd){
        Toast("两次密码不一致");
      } else{
           _this
        .$post(_this.GLOBAL.base_url + "pwd", {
          mobile: _this.phoneNum,
          password: _this.firstPwd,
          auth: _this.auth
        })
        .then(res => {
          console.log(res);
          if(res.code == 200){
            _this.$refs.dialog.confirm().then(()=>{
                console.log(123)
                if(_this.$route.params.login){
                  _this.$router.replace(
                    {name:'login',params:{title:'登录'}}
                  )
                }else{
                  _this.$router.replace(
                      {name:'PersonalInfo',params:{title:'个人信息'}}
                  )
                }
            }).catch(()=>{
                console.log(456)
            })
          }else{
            Toast(res.msg)
          }
        })
        .catch(err => {
          console.log(err);
        });
      }
    }
  },
  components: {
    ymDialog
  }
};
</script>
<style lang="less" scoped>
.setPwd {
  margin-top: 100px;
  .btnWidth {
    width: 290px;
    height: 44px;
    margin: auto;
    ::-webkit-input-placeholder {
      color: #ccc;
    }
  }
  .colorccc{
  color: #ccc;
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
}
</style>


