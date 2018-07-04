<template>
    <div class="nikename">
        <div class="bR5 btnWidth mg20 pg10 bgf3">
            <input class="bgf3 inputName" v-model="nickname" type="text" placeholder="请输入昵称"/>
        </div>
        <button class="bgGreen btnCommit" @click="commit">保存</button>
        <ymDialog ref="dialog" :modal="modal" />
    </div>
</template>
<script>
import ymDialog from "../common/dialog";
import {Toast} from 'vant'
export default {
  data() {
    return {
      nickname:'',
      user:{},
      modal: {
        confirmText: "ok",
        contentText: "保存成功",
        red: false,
        showCancel: false
      }
    };
  },
  created(){
      this.user = this.$route.params.originalInfo
      this.nickname = this.$route.params.originalInfo.nickname
  },
  methods: {
    commit(){
      let _this = this;
      console.log(_this.user.nickname,_this.GLOBAL.token)
      if(_this.nickname == _this.user.nickname){
        Toast('昵称与之前相同')
      }else{
        _this.$put(_this.GLOBAL.base_url + "member", {
          token:_this.GLOBAL.token,
          nickname: _this.nickname,
          head: ''
        })
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            _this.$refs.dialog.confirm().then(()=>{
              _this.GLOBAL.nickname = _this.nickname;
                _this.$router.replace(
                    {name:'PersonalInfo',params:{title:'个人信息'}}
                )
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
.nikename {
  .bgf3{
      background-color: #f3f3f3;
      ::-webkit-input-placeholder{
          color: #a3a3a3;
      }
  }
  .inputName{
    width: 100%;
  }
  .btnCommit {
    width: 290px;
    height: 44px;
    margin: auto;
    border-radius: 5px;
    margin-top:250px;
    color: #fff;
    font-size: 20px;
  }
}
</style>


