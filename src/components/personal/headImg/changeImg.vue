<template>
    <div class="changeImg">
         <div class="imgHeader mlr20">
            <img :src="imgUrl" alt="">
        </div> 
        <button v-if="!is_show" class="bgGreen btnCommit" @click="uploadHeadImg">更换头像</button> 
        <button v-else  class="bgGreen btnCommit" @click="commit">确认</button> 
        <input type="file" accept="image/*" @change="handleFile" class="hiddenInput"/> 
        <ymDialog ref="dialog" :modal="modal" />
    </div>
</template>
<script>
import ymDialog from "../../common/dialog";
import {Toast} from 'vant'
export default {
  data() {
    return {
      imgUrl: require("../../../assets/logo.png"),
      user: {},
      is_show:false,
      modal: {
        confirmText: "ok",
        contentText: "更改成功",
        red: false,
        showCancel: false
      }
    };
  },
  methods: {
      // 选择图片上传
    uploadHeadImg: function () {
      this.$el.querySelector('.hiddenInput').click()
    },
    handleFile(e) {
      let _this = this;
      let $target = e.target || e.srcElement
      let file = $target.files[0]
      console.log('file',file)
      var reader = new FileReader()
      reader.onload = (data) => {
        console.log('data',data)
        _this.is_show = true
        let res = data.target || data.srcElement
        _this.$post(_this.GLOBAL.base_url + 'upload',{
          token:_this.GLOBAL.token,
          image: res.result,
        })
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            _this.imgUrl = res.result
          }else{
            Toast(res.msg)
          }
        })
        .catch(err => {
          console.log(err);
        });
      }
      reader.readAsDataURL(file)
      
    },
    commit(){
      let _this = this;
      console.log(_this.GLOBAL.token)
      _this.$put(_this.GLOBAL.base_url + "member", {
          token:_this.GLOBAL.token,
          nickname: '',
          head: _this.imgUrl
        })
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            _this.$refs.dialog.confirm().then(()=>{
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
  },
  components: {
    ymDialog
  }
}
</script>
<style lang="less" scoped>
.changeImg {
    .imgHeader {
    width: 150px;
    height: 150px;
    overflow: hidden;
    margin: 100px auto 0;
    border-radius: 50%;
    background: #000000;
  }
  .btnCommit {
    width: 290px;
    height: 44px;
    margin: auto;
    border-radius: 5px;
    margin-top: 50px;
    color: #fff;
    font-size: 20px;
  }
  .hiddenInput{
      display: none;
  }
}
</style>


