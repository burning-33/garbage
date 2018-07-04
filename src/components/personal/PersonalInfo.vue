<template>
    <div class="personalInfo"> 
        <router-link :to="{name:'changeImg',params:{title:'更换头像',originalInfo:userInfo}}" tag="div" class="lrborder b-v-center pg10">
          <p class="flex">头像</p>
          <div class="imgHeader" :style="'background:url('+userInfo.head+') center / 100%;'" >
            </div>  
          <p  class="mr10 ml5"><span class="iconfont">&#xe60d;</span></p>     
        </router-link>
        <router-link :to="{name:'nikename',params:{title:'修改昵称',originalInfo:userInfo}}" tag="div" class="lrborder b-v-center pg10">
          <p class="flex">昵称</p>
          <p  class='mr10 ml5'>{{userInfo.nickname}}</p>     
          <p  class="mr10 ml5"><span class="iconfont">&#xe60d;</span></p>     
        </router-link>
        <router-link to="" tag="div" class="lrborder b-v-center pg10">
          <p class="flex">会员号</p>
          <p  class='mr10 ml5'>{{userInfo.id}}</p>        
        </router-link>
        <router-link to="" tag="div" class="lrborder b-v-center pg10">
          <p class="flex">注册时间</p>
          <p  class='mr10 ml5'>{{userInfo.regdate}}</p>        
        </router-link>
        <router-link :to="{name:'editPhone',params:{title:'修改手机号',mobile:userInfo.mobile}}" tag="div" class="lrborder b-v-center pg10">
          <p class="flex">手机号</p>
          <p  class='mr10 ml5'>{{userInfo.mobile}}</p>     
          <p  class="mr10 ml5"><span class="iconfont">&#xe60d;</span></p>     
        </router-link>
        <router-link to="" tag="div" class="lrborder b-v-center pg10">
          <p class="flex">推荐码</p>
          <p  class='mr10 ml5'>{{userInfo.recommendation_code}}</p>         
        </router-link>
        <router-link to="" tag="div" class="lrborder b-v-center pg10">
          <p class="flex">我的邀请码</p>
          <p  class='mr10 ml5'>{{userInfo.invitation_code}}</p>          
        </router-link>
        <router-link :to="{name:'CheckCode',params:{title:'修改密码',mobile:userInfo.mobile}}" tag="div" class="lrborder b-v-center pg10">
          <p class="flex">修改密码</p>
          <p  class='mr10 ml5'>******</p>     
          <p  class="mr10 ml5"><span class="iconfont">&#xe60d;</span></p>     
        </router-link>
    </div>
</template>
<script>
export default {
  name: "personalInfo",
  data() {
    return {
      userInfo:{}
    };
  },
  components: {
  },
  created() {
    let _this = this;
    _this.$fetch(_this.GLOBAL.base_url+'member',{token: _this.GLOBAL.token})
      .then(res => {
            console.log('个人信息',res);
            if (res.code == 200) {
              _this.userInfo = res.data.user;
            }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {} 
};
</script>
<style lang="less" scoped>
.imgHeader {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
}
.lrborder + .lrborder {
  border-top: 1px solid #eee;
}
</style>


