<template>
    <div class="changeImg">
         <div class="imgHeader mlr20">
            <img :src="imgUrl" alt="">
        </div> 
        <button class="bgGreen btnCommit" @click="uploadHeadImg">更换头像</button> 
        <input type="file" accept="image/*" @change="handleFile" class="hiddenInput"/> 
    </div>
</template>
<script>
export default {
  data() {
    return {
      imgUrl: require("../../../assets/logo.png"),
      user: {}
    };
  },
  created() {
    console.log(this.$route.params.originalInfo);
    this.user = this.$route.params.originalInfo;
  },
  methods: {
      // 打开图片上传
    uploadHeadImg: function () {
      this.$el.querySelector('.hiddenInput').click()
    },
    handleFile(e) {
    let $target = e.target || e.srcElement
      let file = $target.files[0]
      var reader = new FileReader()
      reader.onload = (data) => {
        let res = data.target || data.srcElement
        this.imgUrl = res.result
      }
      reader.readAsDataURL(file)
      console.log(file)
    }
  },
  components: {}
};
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


