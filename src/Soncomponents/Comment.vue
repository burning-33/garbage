<template>
  <div class="comment">
    <div class="detailsHeader">
      <div @click="fanhui" > <span class="iconfont">&#xe614;</span>返回 </div>
      <div class="title">商品评价</div>
    </div>
     <vue-better-scroll
    style="height:500px" 
    class="wrapper"
    ref="scroll"
    :scrollbar="scrollbarObj"
    :pullDownRefresh="pullDownRefreshObj"
    :pullUpLoad="pullUpLoadObj"
    :startY="parseInt(startY)"
    @pullingDown="onPullingDown"
    @pullingUp="onPullingUp">
    <div class="box">
      <div class="wrapper" ref="wrapper">
        <ul class="content">
          <li class="commentWrapper" v-for="(item,index) in list" :key="index">
            <div class="commentItem">
              <div class="headBox">
                <img :src="item.head" alt="" class="head">
                <span>{{item.nickname}}</span>
              </div>
              <div>
                <span>({{item.num}})</span>
                <span class="iconfont zan" :class="[item.status == '1' ? 'zanactive':'']" @click="zan(index)">&#xe677;</span>
              </div>

            </div>
            <div>{{item.content}}</div>
            <div class="time">{{item.create_time}}</div>
          </li>
        </ul>
      </div>
    </div>
    </vue-better-scroll>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Popup } from 'vant';
  import { Lazyload } from 'vant';
  import { List } from 'vant';
  import BScroll from 'better-scroll'
  import VueBetterScroll from 'vue2-better-scroll'
  Vue.use (VueBetterScroll)
  Vue.use(List);
  Vue.use(Lazyload);
  Vue.use(Popup);
   let count = 1
  export default {
    name: 'Comment',
    props:['comment'],
    components:{
     VueBetterScroll
    },
    data() {
      return {
        list:[],//传输过来的产品数据
        zanactive:false,//未点赞
        arr:[{a:'1'},{b:'2'}],
        pages:'',
        loading: false,
        finished: false,
        pageIndex:0,
        idNum:'',
        pages:'',
           // 这个配置可以开启滚动条，默认为 false。当设置为 true 或者是一个 Object 的时候，都会开启滚动条，默认是会 fade 的
        scrollbarObj: {
          fade: false
        },
        // 这个配置用于做下拉刷新功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启下拉刷新，可以配置顶部下拉的距离（threshold） 来决定刷新时机以及回弹停留的距离（stop）
        pullDownRefreshObj: {
          threshold: 90,
          stop: 40
        },
        // 这个配置用于做上拉加载功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启上拉加载，可以配置离底部距离阈值（threshold）来决定开始加载的时机
        pullUpLoadObj: {
          threshold: 0,
          txt: {
            more: '加载更多',
            noMore: '没有更多数据了'
          }
        },
        startY: 0,  // 纵轴方向初始化位置
        scrollToX: 0,
        scrollToY: 0,
        scrollToTime: 700,
        items: []
      }
    },
    computed: {

    },
    methods: {
      zan(index) {
        if (this.list[index].status == '0') {
          this.list[index].num += 1
          this.list[index].status = '1'
        } else if (this.list[index].status == '1') {
          if (this.list[index].num > 0) {
            this.list[index].num -= 1
            this.list[index].status = '0'
            console.log(this.list)
          }
        }
      },
      loadData() {
        const selt = this;
        const id = selt.idNum;
        selt.$fetch(selt.GLOBAL.base_url + 'comment', {g_id: selt.idNum, p: '1', row: '8'})
          .then((response) => {
            console.log(response)
            for (var i = 0; i < response.data.list.length; i++) {
              if (response.data.list[i].num == '') {
                response.data.list[i].num = '0'
              }
            }
            selt.list=response.data.list.concat(selt.list)
            // selt.list = response.data.list
            selt.pages = response.data.all_page

          })
      },
      // 模拟数据请求
      getData () {
         const selt = this;
      const id = selt.idNum;
      selt.$fetch(selt.GLOBAL.base_url + 'comment',{g_id:selt.idNum,p:count,row:'8'})
        .then((response) => {
          console.log(response)
          for(var i = 0;i < response.data.list.length;i++){
            if(response.data.list[i].num == ''){
              response.data.list[i].num = '0'
            }
          }
          selt.list = response.data.list
          selt.pages = response.data.all_page

        })
      },
      onPullingDown () {
        // 模拟下拉刷新
        console.log('下拉刷新')
        this.idNum = this.$route.params.idNum
        count = 1
        const selt = this;
      const id = selt.idNum;
      selt.$fetch(selt.GLOBAL.base_url + 'comment',{g_id:selt.idNum,p:count,row:'8'})
        .then((response) => {
          console.log(response)
          for(var i = 0;i < response.data.list.length;i++){
            if(response.data.list[i].num == ''){
              response.data.list[i].num = '0'
            }
          }
          selt.list = response.data.list
          selt.pages = response.data.all_page
        selt.$refs.scroll.forceUpdate(true)
        })
      },
      onPullingUp () {
        // 模拟上拉 加载更多数据
        console.log('上拉加载')
        count ++
              const selt = this;
      const id = selt.idNum;
      selt.$fetch(selt.GLOBAL.base_url + 'comment',{g_id:selt.idNum,p:count,row:'8'})
        .then((response) => {
          console.log(response)
          for(var i = 0;i < response.data.list.length;i++){
            if(response.data.list[i].num == ''){
              response.data.list[i].num = '0'
            }
          }
          selt.list =selt.list.concat(response.data.list)
          selt.pages = response.data.all_page
        if(count< this.pages){
              selt.$refs.scroll.forceUpdate(true)
            }else {
              selt.$refs.scroll.forceUpdate(false)
            }
        })
      },
      fanhui(){
        console.log('000')
        this.$router.push({path: '/details',query:{id:this.idNum}})
      }
    },
    mounted(){
      console.log(this.$route.params.idNum)
      this.idNum = this.$route.params.idNum
       this.onPullingDown()
      // const selt = this;
      // const id = selt.idNum;
      // selt.$fetch(selt.GLOBAL.base_url + 'comment',{g_id:selt.idNum,p:'1',row:'8'})
      //   .then((response) => {
      //     console.log(response)
      //     for(var i = 0;i < response.data.list.length;i++){
      //       if(response.data.list[i].num == ''){
      //         response.data.list[i].num = '0'
      //       }
      //     }
      //     selt.list = response.data.list
      //     selt.pages = response.data.all_page

      //   })
    },
    
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .content{
    height:100%;
  }
  .slide-fade-enter-active {
    transition: all .6s ease;
    transform: translateX(0);
  }
  .slide-fade-leave-active {
    transition: all .6s linear;
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(100%);
  }
  .box{
    width: 100%;
    overflow-y: auto;
  }
  .comment{
    // position: fixed;
    // top: -50px;
    // left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    background: #e9eeea;
    overflow-y: auto;
  }
  .detailsHeader{
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: #ffffff;
    display: flex;
    padding: 0 10px;
    justify-content: space-between;
    align-items: center;
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
  .commentAll{
    display: flex;
    justify-content: space-between;
    padding: 10px;
    box-sizing: border-box;
    font-size: 14px;
    border-bottom: 1px solid #bdbdbd;
    background: white;
    .lvse{
      color: #73ab1d;
    }
  }
  .commentWrapper{
    padding: 0 10px;
    box-sizing: border-box;
    font-size: 14px;
    background: #ffffff;
    padding-bottom: 6px;
    margin: 10px 0;
  }
  .commentItem{
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
  }
  .time{
    color: #dcdcdc;
    font-size: 10px;
    margin: 10px 0;
    /*border-bottom: 2px solid #d2d2d2;*/
  }
  .zan{
    color: #a8a8a8;
    font-size: 20px;
  }
  .zanactive{
    color: #ff4511;
  }
  .headBox{
    display: flex;
    align-items: center;
    span{
      color:#73ab1d;
    }
  }
  .head{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #73ab1d;
    margin-right: 10px;
  }
  .xiangqing{
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #000000;
    font-size: 18px;
  }

</style>

