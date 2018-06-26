<template>
    <div class="addAddress">
        <div  class="mk-cell-list">
            <van-cell-group>
                    <van-field  v-model="username" label="收货人：" />
                    <van-field v-model="phone" label="联系方式："/>
            </van-cell-group>
           <div class="mk-cell mk-cell-access">
                <div class="mk-cell-bd">
                <div class="mk-label">所在地区：</div>
                </div>
                <div class="mk-cell-ft" @click="selectRegion">{{area}}</div>
            </div>
            <van-cell-group>
            <van-field v-model="details" label="详细地址：" type="textarea" placeholder="街道、楼牌号等" rows="1" autosize/>
            </van-cell-group>
        </div>
        <button @click="confirm" class="bR5 bgGreen colorw fs18 btnAdd">{{edit?'保存':'添加'}}</button>
        <van-area v-show="areaShow" :area-list="areaList" :value='region' @confirm='getArea' @change="change" @cancel="cancel"/>
        <alert v-show="isAlert" />
        <ymDialog ref="dialog" :modal="modal" />
    </div>
    
</template>
<script>
import alert from "../common/alert";
import ymDialog from "../common/dialog";
import AreaList from "../../assets/js/area.js";
export default {
  data() {
    return {
      edit: false,
      areaList: AreaList,
      username: "",
      phone: "",
      region: "",
      area: "",
      details: "",
      areaShow: false,
      isAlert: true,
      modal: {
        confirmText: "删除",
        contentText: "确认删除",
        red: true
      }
    };
  },
  created() {
    let _this = this;
    // console.log(_this.$route.params)
    if (_this.$route.params.editObj) {
      _this.edit = true;
      console.log("修改地址");
      let obj = _this.$route.params.editObj;
      _this.username = obj.name;
      _this.phone = obj.phone;
      _this.details = obj.details;
      _this.area = obj.province + obj.city + obj.county;
    } else {
      _this.edit = false;
    }
  },
  components: {
    alert,
    ymDialog
  },
  methods: {
    confirm() {
      // this.$refs.dialog.confirm().then(()=>{
      //     console.log(123)
      // }).catch(()=>{
      //     console.log(456)
      // })

      let regPhone = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (this.username == "") {
        // this.isAlert = true;
        Toast("收货人不能为空");
      } else if (_this.phone == "") {
        Toast("手机号码不能为空");
      } else if (!regPhone.test(_this.phone)) {
        Toast("请输入正确的手机号");
      } else if (_this.area == "") {
        Toast("地区不能为空");
      } else if (_this.details == "") {
        Toast("详细地址不能为空");
      } else {
        if (edit) {
            //编辑保存
        } else {
            // 增加保存
        }
      }
    },
    selectRegion() {
      this.areaShow = true;
    },
    getArea() {
      console.log(this.region);
    },
    change() {},
    cancel() {
      this.areaShow = false;
    }
  }
};
</script>
<style lang="less" scoped>
.mk-cell-list {
  background: #ffffff;
  position: relative;
}

.mk-cell-list .mk-cell {
  width: 100%;
  overflow: hidden;
  padding: 14px 12px 14px 15px;
  line-height: 18px;
  position: relative;
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
  font-size: 14px;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.mk-cell {
  border-top: 1px solid #e8e8e8;
}

@media only screen and (-webkit-min-device-pixel-ratio: 2) {
  .mk-cell-list .mk-cell {
    position: relative;
    border: 0;
  }

  .mk-cell-list .mk-cell:before {
    content: "";
    width: 200%;
    height: 200%;
    position: absolute;
    top: 0;
    left: 0;
    border-top: 1px solid #e8e8e8;
    -webkit-transform: scale(0.5);
    -webkit-transform-origin: 0 0;
    padding: 1px;
    -webkit-box-sizing: border-box;
    pointer-events: none;
  }
}

.mk-cell-list .mk-cell .mk-label {
  display: block;
  width: 75px;
  margin-right: 15px;
  word-wrap: break-word;
  word-break: break-all;
  color: #666;
  font-size: 14px;
  line-height: 17px;
}

.mk-cell-list .mk-cell .mk-cell-bd {
  font-size: 15px;
  color: #666;
  line-height: 17px;
  align-items: center;
  // flex: 1;
}

.mk-cell-list .mk-cell-access .mk-cell-ft {
  padding-right: 13px;
  position: relative;
  // text-align: right;
  flex: 1;
  color: #333 !important;
}

.mk-cell-list .mk-cell-access .mk-cell-ft:after {
  content: " ";
  display: inline-block;
  height: 6px;
  width: 6px;
  border-width: 2px 2px 0 0;
  border-color: #333;
  border-style: solid;
  -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  position: absolute;
  top: 50%;
  margin-top: -4px;
  right: 0;
}
.btnAdd {
  width: 290px;
  height: 44px;
  margin: 0 auto;
  margin-top: 55px;
}
</style>


