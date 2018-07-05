<template>
  <div class="search">
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
       <div>
      <div class="searchHeader">
        <input type="text" class="sousuo" v-model="neirong">
        <van-icon name="search" class="sousuoIcon" />
        <van-icon name="clear" @click="clearneirong" v-show="clearShow" class="clear"/>
      </div>
      <span class="quxiao" @click="searchBtn">搜索</span>
    </div>
    <div v-if="searchShow">
      <div class="sou soulei">大家都在搜</div>
      <div class="soulei">
        <span>石头</span>
        <span>垃圾袋</span>
        <span>袋子</span>
      </div>
      <div class="heng"></div>
      <div class="soulei sou">
        <span >搜索记录</span>
        <span @click="clear">清楚所有记录</span>
      </div>
      <ul>
        <li class="soulei" v-for="(item, index) in arr" :key="index">
          <span>{{item}}</span>
          <span class="iconfont" @click="deletes(index)" data-idx="index">&#xe716;</span>
        </li>
      </ul>
    </div>
    <div v-else>
      <div class="classification">
        <div :class="[active == 1?'active':'']" data-index = '1' @click="actClass">热销</div>
        <div :class="[active == 2?'active':'']" data-index = '2' @click="actClass">新品</div>
        <div :class="[active == 3?'active':'']" data-index = '3' @click="actClass">销量
          <span v-if="volumedown" class="iconfont"  :class="{iconactive:iconactive}">&#xe791;</span>
          <span v-if="!volumedown" class="iconfont"  :class="{iconactive:iconactive}">&#xe78f;</span>
        </div>
        <div :class="[active == 4?'active':'']" data-index = '4' @click="actClass">价格
          <span v-if="priceDown" class="iconfont" >&#xe791;</span>
          <span v-if="!priceDown" class="iconfont">&#xe78f;</span>
        </div>
      </div>
    </div>
    <ul ref="list" class="list-content ul">
        <li class="li" v-for="(item,index) in items" @click="goDetails(item.id)" :key="index">
            <img :src="item.cover" alt="">
            <div class="title">{{item.name}}</div>
            <div class="price">
              <span class="newprice">￥{{item.money}}</span>
              <span class="oldprice">￥{{item.price}}</span>
            </div>
          </li>
    </ul>
</vue-better-scroll>

  </div>
</template>

<script>
  import Vue from 'vue'
  import { Collapse, CollapseItem } from 'vant';
  import { Waterfall } from 'vant';
  import BScroll from 'better-scroll'
  import VueBetterScroll from 'vue2-better-scroll'
  Vue.use (VueBetterScroll)
  Vue.use(Waterfall);
  Vue.use(Collapse).use(CollapseItem);
  let count = 1
  export default {
    name: 'Search',
    components:{
     VueBetterScroll
    },
    data() {
      return {
        active:'1',
        iconactive:false,//选中销量或者价格
        list: '',
        disabled: false,
        searchShow:false,//是否显示搜索内容
        neirong:'',//输入框内容
        arr:[1,2,1,3],//历史搜索
        clearShow:false,//清楚按钮
        volumedown:true,//销量向下
        priceDown:true,//销量向下
        axioscanshu:'is_hot',
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
    mounted: function () {
      this.onPullingDown()
    },
    created () {
      // this.huoqu()
    },
    computed:{
      clearShows(){
        if(this.neirong == ''){
            this.clearShow = false
        }else {
          this.clearShow = true
        }
      }
    },
    directives: {
      WaterfallLower: Waterfall('lower')
    },

    methods: {
      clearneirong(){
        this.neirong=''
        this.clearShow = false
      },
      // 分类查询点击
      actClass(e){
        this.active = e.target.dataset.index;
        if(e.target.dataset.index == '1'){
          this.axioscanshu = 'is_hot'
        }
        if(e.target.dataset.index == '2'){
          this.axioscanshu = 'is_new'
        }

        if(e.target.dataset.index == '3'){
         this.iconactive = !this.iconactive
          this.volumedown = !this.volumedown
          if(this.volumedown == true){
            this.axioscanshu = 'volume-desc'
          }else if(this.volumedown == false){
            this.axioscanshu = 'volume-asc'
          }

        }else {
          this.volumedown = true;
        }
        if(e.target.dataset.index == '4'){
          this.priceDown = !this.priceDown
          if(this.priceDown == true){
            this.axioscanshu = 'money-desc'
          }else if(this.priceDown == false){
            this.axioscanshu = 'money-asc'
          }

        }else {
          this.priceDown = true;
        }
        this.getData ();
        console.log(this.neirong)
      },
      // 加载更多
      loadMore() {
        this.disabled = true;
        setTimeout(() => {
          for (let i = 0; i < 5; i++) {
            // this.list.push(this.list.length);
          }
          this.disabled = false;
        }, 200);
      },
      // 搜索商品
      searchBtn(){
        if(this.neirong==''){
          return
        }else {
          this.searchShow = false
          this.clearShow = true
          this.getData ()
        }
      },
      // 删除历史记录
      deletes(e){
        this.arr.splice(e, 1);
      },
      // 清楚所有
      clear(){
        this.arr = []
      },
      goDetails(id){
        console.log('000')
        // this.detshow = true;
        // this.detailsid = id
         this.$router.push({path: '/details',query:{id:id}})
      },
       // 滚动到页面顶部
      scrollTo () {
        this.$refs.scroll.scrollTo(this.scrollToX, this.scrollToY, this.scrollToTime)
      },
      // 模拟数据请求
      getData () {
         const selt = this;
        var neirong = selt.neirong
        selt.$fetch(selt.GLOBAL.base_url + 'goods',
            {
              keyword:neirong,
              order:this.axioscanshu,
              p:count,
              row:8
            },)
          .then((response) => {
            console.log(response)
            selt.items = response.data.list 
            selt.pages =  response.data.all_page
          })
      },
      onPullingDown () {
        // 模拟下拉刷新
        console.log('下拉刷新')
        count = 1
         var neirong = this.neirong
        this.$fetch(this.GLOBAL.base_url + 'goods',
            {
              keyword:neirong,
              order:this.axioscanshu,
              p:count,
              row:8
            },)
          .then((response) => {
            console.log(response)
             this.items = response.data.list 
             this.pages =  response.data.all_page
            this.$refs.scroll.forceUpdate(true)
          })
      },
      onPullingUp () {
        // 模拟上拉 加载更多数据
        console.log('上拉加载')
        count ++
            var neirong = this.neirong
        this.$fetch(this.GLOBAL.base_url + 'goods',
            {
              keyword:neirong,
              order:this.axioscanshu,
              p:count,
              row:8
            },)
          .then((response) => {
            console.log(response)
            this.items = this.items.concat(response.data.list) 
               
             this.pages =  response.data.all_page
            if(count< this.pages){
              this.$refs.scroll.forceUpdate(true)
            }else {
              this.$refs.scroll.forceUpdate(false)
            }
          })
      }
    },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
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
  .iconfont{
    transform:rotate(0deg);
  }
  .search{
    font-size: 14px;
  }
  .soulei{
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    box-sizing: border-box;
    line-height: 30px;
    .iconfont{
      width: 20px;
      height:20px;
      font-size: 20px;
    }
  }
  .heng{
    width: 100%;
    height: 14px;
    background: #f9f9f9;
  }
.sou{
  color: #b4b4b4;
}
.border{
  border-bottom: 1px solid #efefef;
}
.searchHeader{
  width: 80%;
  position: relative;
  height: 1.6rem;
  margin: 10px auto;
  display: inline-block;
  margin-left: 20px;
  .sousuo{
    width: 100%;
    height: 1.6rem;
    border: 1px solid #bfbfbf;
    border-radius: 4px;
    margin: 0;
    display: inline-block;
    text-align: left;
    padding: 4px 0 0 10px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding-left: 30px;
    padding-right: 30px;

  }
  .sousuoIcon{
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
  .clear{
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #c4c4c4;
  }
}
  .quxiao{
    font-size: 14px;
  }
.classification{
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding: 0 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  border-top: 1px solid #e6e6e6;
  .iconactive{
    transform: rotate(180deg);
    transition: all 2s;
  }
}
  .active{
    color: #bf491a;
    .iconfont{
      color: #bf491a;
    }
  }

.ul{
  width: 100%;
  /*height: 200px;*/
  background: #e6e6e6;
  display: flex;
  flex-wrap: wrap ;
  justify-content: space-between;
  .li{
    width: 49%;
    height: 260px;
    display: inline-block;
    font-size: 14px;
    background: #ffffff;
    margin: 6px 0;
    img{
      width: 100%;
      height: 200px;
    }
    .title{
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding: 0 10px;
      box-sizing: border-box;
      margin: 6px 0;
    }
    .price{
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
      box-sizing: border-box;
      .oldprice{
        text-decoration:line-through
      }
      .newprice{
        color: #ff452c;
      }
    }
  }
}
</style>

