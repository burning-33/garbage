<template>
  <div class="address">
    <div class="pg15 bgw mb10 " v-for="(item,index) in addressInfo" :key="index">
        <p class="color333 fs15 mb10 fontB">李易 188****1876</p>
        <p>四川省自贡市自流井区东方广场1139号向华小区东门13栋1单元1503</p>
        <div class="borderT pt10 mt10 overflow">
            <p class="fl" @click="changeDefault(index)" >
                <span :class="addSelected === index?'iconfont colorRed fs18 mr3':'iconfont defaultStyle fs12 mr3'">{{addSelected === index ? '&#xe67e;':'&#xe61b;'}}</span>
                <span>{{addSelected === index ? '默认地址':'设为默认'}}</span>
            </p>
            <div class="b-v-center fr">
                <p class="mr10" @click="editAdd(index)"><span class="iconfont fs18">&#xe607;</span>编辑</p>
                <p @click="delAdd(index)"><span class="iconfont fs18">&#xe632;</span>删除</p>
            </div>
        </div>
    </div>
    <button @click="addAddress" class="bR5 bgGreen colorw fs18 btnAdd"><span class="iconfont mr10 colorw">&#xe604;</span> 添加收货地址</button>
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
        {
          name: "1李易",
          phone: "18853761876",
          province: "四川省",
          city: "自贡市",
          county: "自流井区",
          details: "东方广场1139号向华小区东门13栋1单元1503"
        },
        {
          name: "2李易",
          phone: "18853761876",
          province: "四川省",
          city: "自贡市",
          county: "自流井区",
          details: "东方广场1139号向华小区东门13栋1单元1503"
        },
        {
          name: "3李易",
          phone: "18853761876",
          province: "四川省",
          city: "自贡市",
          county: "自流井区",
          details: "东方广场1139号向华小区东门13栋1单元1503"
        }
      ]
    };
  },
  created() {
    //   获取地址列表
  },
  methods: {
    changeDefault(index) {
      console.log(index);
      if (this.addSelected == index) {
        Toast("已经是默认地址");
      } else {
          let _this = this;
        axios.post(_this.GLOBAL.base_url + "address", {
            token: _this.phoneNum,//token
            id: index
          })
          .then(res => {
            console.log(res);
            if (res.code == 200) {
              this.addSelected = index;
            }
          })
          .catch(err => {
            console.log(err);
          });
        
      }
    },
    delAdd(id) {
      let _this = this;
        axios.post(_this.GLOBAL.base_url + "address", {
            token: _this.phoneNum,//token
            id: id
          })
          .then(res => {
            console.log(res);
            if (res.code == 200) {
              Toast.success("删除成功");
            }
          })
          .catch(err => {
            console.log(err);
          });
    },
    editAdd(id){
        let obj = this.addressInfo[id]
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
  background: #f9f9f9;
  overflow: hidden;
  height: 100%;
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
  .defaultStyle {
    color: #fff;
    border: 1px solid #666;
    border-radius: 50%;
  }
}
</style>

