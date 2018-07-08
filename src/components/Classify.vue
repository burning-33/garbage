<template>
  <div class="classify">
    <div class="detailsHeader">
      <!--<div @click="$emit('commentfalse')" > <span class="iconfont">&#xe614;</span>返回 </div>-->
      <div class="title">商品评价</div>
      <div @click="share">...</div>
    </div>
    <img :src="code" alt="" class="code">
    <van-popup v-model="show" position="bottom" :overlay="false">
        <div class="box">
            <div class="iconBox">
              <div class="iconB friendquan">
                <div class="iconfont">&#xe6a0;</div>
              </div>
              <!--<div class="iconB friend">-->
                <div class="iconfont friend">&#xe7ba;</div>
              <!--</div>-->
                <div class="iconB qq">
                    <div class="iconfont">&#xe623;</div>
                </div>
              <div class="iconB fuzhi copy" @click="copy" :data-clipboard-text="link" >
                <div class="iconfont">&#xe613;</div>
              </div>
            </div>
          <div class="cancel" @click="cancel">
            取消
          </div>
        </div>
    </van-popup>
    <van-popup v-model="showsucce">
      <div >
        <div class="showBox">
          <div class="h1">链接已复制</div>
          <div class="ok" @click="ok">OK</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
  import { Popup } from 'vant';
  import Vue from 'vue'
  import Clipboard from 'clipboard';
  import { Toast } from 'vant';
  Vue.use(Popup);
  export default {
    name: 'Classify',
    data() {
      return {
        show:false,
        showsucce:false,
        link:'啦啦啦，我是链接啊',
        code:''
      }
    },
    computed: {

    },
    mounted(){
      const selt = this;
      const token = sessionStorage.getItem("token");
      if(!token){
        Toast('请登录');
      }else {
        selt.$fetch(selt.GLOBAL.base_url + 'code',{token:token})
          .then((response) => {
            console.log(response)
            if(response.code =='200'){
              selt.code = response.data
            }

          })
      }
    },
    methods: {
      share(){
        this.show = true
      },
      cancel(){
        this.show = false
      },
      copy() {
        console.log('555555555')
        var that = this;
        var clipboard = new Clipboard('.copy')
        clipboard.on('success', e => {
          console.log('复制成功')
          clipboard.destroy()
          that.showsucce = true
        })
        clipboard.on('error', e => {
          console.log('该浏览器不支持自动复制')
          clipboard.destroy()
        })
      },
      ok(){
        this.showsucce = false
      },

    },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.classify{
  width: 100%;
  height: 100%;
  background: url("../../static/tu.png")center center/cover;
  position: relative;
  .code{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-43%,-12%);
    width: 132px;
    height: 132px;
  }
}
.detailsHeader{
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: #ffffff;
  text-align: right;
  /*display: flex;*/
  padding: 0 10px;
  /*justify-content: space-between;*/
  /*align-items: center;*/
  background: #73ab1d;
  box-sizing: border-box;
  font-size: 20px;
  position: relative;
  position: fixed;
  top: 0;
  left: 0;
  .iconfont{
    color: #ffffff;
  }
  div{
    color: #ffffff;
    font-size: 20px;
  }
  .title{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
}
.box{
  width: 100%;
  background: #ffffff;
  .iconBox{
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .iconB{
    width: 80px;
    height: 80px;
    border-radius: 14px;
    text-align: center;
  }
  .wx {
    display:flex;
  }
  .qq{
    background: #4dafea;
    .iconfont{
      font-size: 50px;
      color: #ffffff;
    }
  }
  .friendquan{
    background: #3eb135;
    .iconfont{
      font-size: 50px;
      color: #ffffff;
    }
  }
  .friend{
    font-size: 80px;
    color: #3eb135;
    margin: 0;
    /*background: #3eb135;*/
    .iconfont{
      font-size: 80px;
      color: #3eb135;
      margin: 0;
    }
  }
  .fuzhi{
    background: #eecf3d;
    .iconfont{
      font-size: 50px;
      color: #ffffff;
    }
  }
  .cancel{
    width: 100%;
    height: 50px;
    background: #59a403;
    line-height: 50px;
    font-size: 20px;
    color: #ffffff;
    text-align: center;
  }
}
.van-popup{
  border-radius: 10px;
}
.ok{
  text-align: center;
  font-size: 16px;
  background: #59a403;
  border-radius: 4px;
  color: #ffffff;
  width: 80px;
  height: 25px;
  line-height: 25px;
  margin: 40px auto;
}
.h1{
  text-align: center;
  font-size: 22px;
  margin: 30px 40px 20px 40px;
  color: #000000;
}

</style>

