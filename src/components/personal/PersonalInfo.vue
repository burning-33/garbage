<template>
    <div class="personalInfo"> 
        <div v-for="(item,index)  in lrObj" :key="index">
          <lrLayout :obj="item" :border='true'/>          
        </div>
    </div>
</template>
<script>
import lrLayout from "./lrLayout.vue";
export default {
  name: "Me",
  data() {
    return {
      lrObj: [{
        textL: "头像",
        textR: require("../../assets/logo.png"),
        img: true,
        arrowR: true,
        router: ""
      }, {
        textL: "昵称",
        textR: 'chengsuansun',
        img: false,
        arrowR: true,
        router: ""
      }, {
        textL: "会员号",
        textR: '1515151',
        img: false,
        arrowR: false,
        router: ""
      },
      {
        textL: "注册时间",
        textR: '2018-02-11 13:32',
        img: false,
        arrowR: true,
        router: ""
      }, {
        textL: "手机号",
        textR: '15151515151',
        img: false,
        arrowR: true,
        router: ""
      }, {
        textL: "推荐码",
        textR: '1515151',
        img: false,
        arrowR: false,
        router: ""
      },{
        textL: "我的邀请码",
        textR: '342555',
        img: false,
        arrowR: false,
        router: ""
      }, {
        textL: "修改密码",
        textR: '******',
        img: false,
        arrowR: true,
        router: ""
      }]
    };
  },
  components: {
    lrLayout
  },
  computed: {},
  methods: {}
};
</script>
<style lang="less" scoped>
</style>


