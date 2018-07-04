<template>
  <div id="app">
    <header class="header b-v-center plr10">
      <div class="return" @click="returnLast"><div class="b-v-center " v-show="!isShow"><p  class="iconfont colorw fs16">&#xe614;返回</p></div></div>
      <h5 v-if="!$route.params.title" class="flex">新商场</h5>
      <h5 v-else class="flex">{{$route.params.title}}</h5>
      <div class="return"></div>
    </header>
    <main :class="isShow?'main mainHeight':'main mainCurrent'" >
      <router-view></router-view> 
    </main>
    <footer class="footer" v-show="isShow">
      <ul>
        <router-link :to="{name: 'home',params:{title:'首页',act:'4'}}" tag="li" exact ><p class="iconfont">&#xe605;</p><p>首页</p></router-link>
        <router-link :to="{name: 'classify',params:{title:'推荐码',act:'1'}}" tag="li" ><p class="iconfont">&#xe60e;</p><p>推荐码</p></router-link>
        <router-link :to="{name: 'cart',params:{title:'购物车',act:'2'}}" tag="li" ><p class="iconfont">&#xe600;</p><p>购物车</p></router-link>
        <router-link :to="{name: 'me',params:{title:'个人中心',act:'3'}}" tag="li" ><p class="iconfont">&#xe611;</p><p>个人中心</p></router-link>
      </ul>
    </footer>

  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      isShow:true
    }
  },
    watch: {
      '$route' (newVal) {
        this.hideFooter(newVal);
        if(this.$route.name === 'me'){
          this.$route.params.title= "个人中心"
          this.$route.params.act= "3"
        }
      }
    },
  components:{
  },
  methods:{
    hideFooter(router){
        this.isShow = router.meta.showFooter !== undefined ? router.meta.showFooter : true;
    },
    returnLast(e){
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    }
  },
  mounted(){
      console.log('app222')
  }
}
</script>
<style lang="less">
  @import "./styles/common";
  @import "./styles/componentStyle";
  .liact{
    p{
      color: #2bbf3a;
    }
  }
</style>
