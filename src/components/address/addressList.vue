<template>
  <div class="address">
    <div class="pg15 bgw mb10 " v-for="(item,index) in addressInfo" :key="index">
        <p class="color333 fs15 mb10 fontB">{{item.name}} {{item.phone}}</p>
        <p>{{item.address}}{{item.content}}</p>
        <div class="borderT pt10 mt10 overflow">
            <p class="fl" @click="changeDefault(item.id,item.is_default)" >
                <span :class="item.is_default == 1?'iconfont colorRed fs18 mr3':'iconfont defaultStyle fs12 mr3'">{{item.is_default? '&#xe67e;':'&#xe61b;'}}</span>
                <span>{{item.is_default==1? '默认地址':'设为默认'}}</span>
            </p>
            <div class="b-v-center fr">
                <p class="mr10" @click="editAdd(item.id)"><span class="iconfont fs18">&#xe607;</span>编辑</p>
                <p @click="delAdd(item.id)"><span class="iconfont fs18">&#xe632;</span>删除</p>
            </div>
        </div>
    </div>
    <button @click="addAddress" :class="addressInfo.length == 0?'bR5 bgGreen colorw fs18 noAdd':'bR5 bgGreen colorw fs18 btnAdd'"><span class="iconfont mr10 colorw">&#xe604;</span> 添加收货地址</button>
    <!-- <div v-if="noAddress" class="tc mt100">还没有添加收货地址</div> -->
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "addressList",
  data() {
    return {
      addSelected: 0,
      addressInfo: [
        // {
        //   name: "1李易",
        //   phone: "18853761876",
        //   province: "四川省",
        //   city: "自贡市",
        //   county: "自流井区",
        //   details: "东方广场1139号向华小区东门13栋1单元1503"
        // },
        // {
        //   name: "2李易",
        //   phone: "18853761876",
        //   province: "四川省",
        //   city: "自贡市",
        //   county: "自流井区",
        //   details: "东方广场1139号向华小区东门13栋1单元1503"
        // },
        // {
        //   name: "3李易",
        //   phone: "18853761876",
        //   province: "四川省",
        //   city: "自贡市",
        //   county: "自流井区",
        //   details: "东方广场1139号向华小区东门13栋1单元1503"
        // }
      ]
    };
  },
  created() {
    //   获取地址列表
    this.getAddList();

  },
  methods: {
    getAddList(){
      let _this = this;
      const toast1 = Toast.loading({
        mask: true,
        message: '加载中...'
      })
      // console.log(sessionStorage.getItem('token'),'token');
      _this.$fetch(_this.GLOBAL.base_url + "address", {token: sessionStorage.getItem('token')})
      // axios.get( "/xxw/api/address", {token: sessionStorage.getItem('token')})
        .then(res => {
          console.log('地址列表',res);
          if(res.code == 200){
            toast1.clear();
            _this.addressInfo = res.data;
          }else{
            Toast(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    changeDefault(index,de) {
      // console.log(index,'id');
      if (de == 1) {
        Toast("已经是默认地址");
      } else {
          let _this = this;
          console.log(_this.GLOBAL.token)
        _this.$patch(_this.GLOBAL.base_url + "address", {
            token: _this.GLOBAL.token,//token
            id: index
          })
          .then(res => {
            console.log(res);
            if (res.code == 200) {
              _this.getAddList();
            }
          })
          .catch(err => {
            console.log(err);
          });
        
      }
    },
    delAdd(id) {
      let _this = this;
      console.log(_this.GLOBAL.token)
      console.log(id)
        _this.$det(_this.GLOBAL.base_url + "address", {data:{
            token: _this.GLOBAL.token,//token
            id: id
          }})
          .then(res => {
            console.log(res);
            if (res.code == 200) {
              _this.getAddList();
            }else{
              Toast(res.msg);
            }
          })
          .catch(err => {
            console.log(err);
          });
    },
    editAdd(id){
      for(let i = 0;i<this.addressInfo.length;i++){
        if(id = this.addressInfo[i].id){
          var obj = this.addressInfo[i]
        }
      }
        console.log(obj)
        this.$router.push({
        name: "editAddress",
        params: { title: "编辑收货地址",
        editObj:obj }
      });
    },
    addAddress() {
      this.$router.push({
        name: "addAddress",
        params: { title: "添加收货地址" }
      });
    }
  }
};
</script>


<style lang="less" scoped>
.address {
  position: relative;
  background: #f9f9f9;
  overflow: hidden;
  height: 100%;
  .mt100{
    margin-top: 100px;
  }
  .fs18 {
    font-size: 18px;
  }
  .fr {
    float: right;
  }
  .btnAdd {
    width: 290px;
    height: 44px;
    margin: 0 auto;
    margin-top: 55px;
  }
  .noAdd{
    width: 290px;
    height: 44px;
    margin: 0 auto;
    margin-top: 150px;
  }
  .defaultStyle {
    color: #fff;
    border: 1px solid #666;
    border-radius: 50%;
  }
}
</style>

