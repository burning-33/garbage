<template>
  <div class="search">
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
      <div>
        <ul class="ul"
            v-waterfall-lower="loadMore"
            waterfall-disabled="disabled"
            waterfall-offset="400"
        >
          <li class="li" v-for="(item,index) in list" @click="goDetails(item.id)" :key="index">
            <img :src="item.cover" alt="">
            <div class="title">{{item.name}}</div>
            <div class="price">
              <span class="newprice">￥{{item.money}}</span>
              <span class="oldprice">￥{{item.price}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- <transition name="slide-fade">
      <Details
        v-if="detshow"
        @detafalse = 'detafalse'
        :detailsid = 'detailsid'
      />
    </transition> -->
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Collapse, CollapseItem } from 'vant';
  import { Waterfall } from 'vant';
  Vue.use(Waterfall);
  Vue.use(Collapse).use(CollapseItem);
  export default {
    name: 'Search',
    components:{
     
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
        axioscanshu:'is_hot'
      }
    },
    mounted: function () {
      this.huoqu()
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
      huoqu(){
        // const selt = this;
        // var neirong = selt.selt
        // axios.get('http://garbage.xxw360.com/api/goods',{params:
        //     {
        //       keyword:neirong,
        //       order:this.axioscanshu
        //     },
        // })
        //   .then(function (res) {
        //   console.log(res.data)
        //   selt.list = res.data.data
        // }).catch(function (err) {
        //   console.error('请求错误')
        // })
        const selt = this;
        var neirong = selt.neirong
        selt.$fetch(selt.GLOBAL.base_url + 'goods',
            {
              keyword:neirong,
              order:this.axioscanshu,
              p:1
            },)
          .then((response) => {
            console.log(response)
            selt.list = response.data.list
          })
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
        this.huoqu();
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

          this.huoqu()
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

