<template>
  <div class="comment">
    <div class="detailsHeader">
      <div @click="$emit('commentfalse')" > <span class="iconfont">&#xe614;</span>返回 </div>
      <div class="title">商品评价</div>
      <div>...</div>
    </div>
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
          <p class="bottom-tip" ref="bTip">查看更多</p>
        </ul>
        <div class="loading-wrapper"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Popup } from 'vant';
  import { Lazyload } from 'vant';
  import { List } from 'vant';
  import BScroll from 'better-scroll'

  Vue.use(List);
  Vue.use(Lazyload);
  Vue.use(Popup);
  export default {
    name: 'Comment',
    props:['idNum','comment'],
    data() {
      return {
        list:[],//传输过来的产品数据
        zanactive:false,//未点赞
        arr:[{a:'1'},{b:'2'}],
        pages:'',
        loading: false,
        finished: false,
        pageIndex:0
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


            if (selt.list.length >= 8) {
              selt.hasMore = false
            }
            selt.$nextTick(() => {
              if (!selt.scroll) {
                selt.scroll = new BScroll(selt.$refs.wrapper, {
                  // click: true,
                  scrollY: true,
                  // pullUpLoad:{
                  //   threshold: -70, // 负值是当上拉到超过低部 70px；正值是距离底部距离 时，
                  // }
                })
                selt.scroll.on('touchend', (pos) => {
                  // 下拉动作
                  if (pos.y > 50) {
                    selt.loadData()
                  }
                })
              } else {
                selt.scroll.refresh()
              }
            })
            // selt.$nextTick(() => {
            //   if (!selt.scroll) {
            //     selt.scroll = new BScroll(selt.$refs.wrapper, {
            //       // click: true,
            //       // scrollY: true,
            //       // pullUpLoad:{
            //       //   threshold: -70, // 负值是当上拉到超过低部 70px；正值是距离底部距离 时，
            //       // }
            //     })
            //
            //     selt.scroll.on('touchEnd', () => {
            //       if (selt.scroll.y <= (selt.scroll.maxScrollY - 30)) {
            //         selt.$refs.bTip.innerText = '加载中.....'
            //         selt.offset += 3;
            //         selt.$nextTick(() => {
            //           // 恢复文本值
            //           selt.$refs.bTip.innerText = '查看更多'
            //
            //           // 向列表添加数据
            //           selt.loadData();
            //           // 加载更多后,重新计算滚动区域高度
            //           selt.scroll.refresh();
            //         })
            //       }
            //     })
            //   } else {
            //     console.log('重新计算')
            //     selt.scroll.refresh()
            //
            //   }
            //
            // })
          })
      }
    },
    mounted(){
      const selt = this;
      const id = selt.idNum;
      selt.$fetch(selt.GLOBAL.base_url + 'comment',{g_id:selt.idNum,p:'1',row:'8'})
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
    created(){
      // this.loadData()
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .wrapper{
    width: 100%;
    position:absolute;
    top: 50px;
    overflow: hidden;
    z-index: 1;
  }
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
    margin-top: 50px;
  }
  .comment{
    position: fixed;
    top: 0;
    left: 0;
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
    /*position: fixed;*/
    /*top: 0;*/
    /*left: 0;*/
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

