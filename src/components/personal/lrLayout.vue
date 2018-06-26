<template>
    <div class="lyLayout borderB">
        <router-link :to="obj.router" tag="div" :class="border?'lrborder b-v-center pg10 ':'b-v-center pg10 '  ">
          <p class="flex">{{obj.textL}}</p>
          <div class="imgHeader" v-if="obj.img"><img :src="obj.textR" alt=""></div>
          <p v-else>{{obj.textR}}</p>     
          <p v-if="obj.arrowR" class="mlr10"><span class="iconfont">&#xe60d;</span></p>     
        </router-link>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    props:['obj','border']
}
</script>
<style lang="less" scoped>
    .imgHeader{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        background: #000;
    }
    .lrborder+.lrborder{
        border-top: 1px solid #eee; 
    }
</style>