<template>
    <div class="cutImg">
        <div class="borderccc bR5 b-v-center btnWidth pg15">
            <p class="iconfont fs20 colorccc pr15">&#xe640;</p>
            <input class="flex" v-model="secondPwd" type="password" placeholder="再次输入新密码"/>
        </div>
        <button class="bgGreen btnCommit" @click="commit">提交</button>
        <ymDialog ref="dialog" :modal="modal" />
    </div>
</template>
<script>
import ymDialog from "../../common/dialog";
import {Toast} from 'vant'
export default {
  data() {
    return {
      modal: {
        confirmText: "ok",
        contentText: "密码修改成功",
        red: false,
        showCancel: false
      }
    };
  },
  created(){
      
  },
  methods: {
    commit(){
        let _this = this;
        
    }
  },
  components: {
    ymDialog
  }
};
</script>
<style lang="less" scoped>
.cutImg {
  margin-top: 100px;
    ::-webkit-input-placeholder {
        color: #ccc;
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


