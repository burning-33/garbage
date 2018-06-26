<template>
  <div class="headTitle">
      <h5 v-if="!title">新商场</h5>
      <h5 v-else>{{title}}</h5>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return{

    }
  },
  props:['title']

}
</script>


<style lang="less" scoped>
    .headTitle{
        background: #78b01f;
        color: #fff;
        text-align: center;
    }
</style>
