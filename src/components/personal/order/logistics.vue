<template>
  <div class="logistics">
      <div class="b-v-center ptb10 plr15 border bR5 headerInfo " >
          <div class="imgExpress mr15">
              <img src="./express.png" alt="">
          </div>
          <div>
            <p class="color333">物流信息：<span class="colorG2">在路上</span></p> 
            <p class="fs12">订单编号：74849964</p>             
            <p class="fs12">快递单号：748499643548656</p>             
            <p class="fs10">承运公司：<span class="colorRed fs10">韵达快递</span></p>             
          </div>
      </div>
      <div class="border pg30 bR5 headerInfo">
        <van-steps direction="vertical" :active="0" active-color="#81b824">
          <van-step>
            <h3 class="fs12">【城市】物流状态1</h3>
            <p class="fs12">2016-07-12 12:40</p>
          </van-step>
          <van-step>
            <h3 class="fs12">【城市】物流状态2</h3>
            <p class="fs12">2016-07-11 10:00</p>
          </van-step>
          <van-step>
            <h3 class="fs12">快件已发货</h3>
            <p class="fs12">2016-07-10 09:30</p>
          </van-step>
        </van-steps>
      </div>
  </div>
</template>

<script>
export default {
  name: "logistics",
  data() {
    return {};
  },
  components: {},
  methods: {},
  created() {
    let _this = this;
  }
};
</script>


<style lang="less" scoped>
.logistics {
  .headerInfo {
    margin: 25px 25px 15px;
    .imgExpress {
      width: 70px;
      height: 70px;
      background-color: #ffcd02;
      display: table-cell;
      vertical-align: middle;
      position: relative;
      img {
        width: 70px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
      }
    }
  }
}
</style>

