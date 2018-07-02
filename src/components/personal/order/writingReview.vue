<template>
  <div class="writingReview">
      <!-- 内容 -->
        <div class="details">
            <div class="plr15 ptb10">
                <p class="flex">订单编号：{{reviewItem.number}}</p>
            </div>
            <div class="plr15 ptb10 b-v-center bgfe goodsItem" >
                <div class="imgOrder"><img  :src="reviewItem.goods_image" alt=""></div>
                <div class="flex ml15">
                    <p class="fs15 color333 ellipsis" style="width:255px;height:27px;">{{reviewItem.goods_name}}</p>
                    <p class="flex fs12">规格：{{reviewItem.goods_format}}</p>
                    <div class="b-v-center">
                        <p class="flex fs12">颜色分类：{{reviewItem.goods_color}}</p>
                        <p class="flex tr fs12 line-through">￥{{reviewItem.goods_price}}</p>
                    </div>
                    <div class="b-v-center">
                        <p class="flex fs12">数量：{{reviewItem.item_num}}</p>
                        <p class="tr flex fs12 color333">￥{{reviewItem.goods_money}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="borderT mt10">
            <div class="plr15 ptb10">
                <p class="">评价内容</p>
            </div>
            <div class="mlr15">
                <textarea v-model="msg" class="border textArea pg10" name="" placeholder="对该商品进行客观、全面的评价" id="" cols="30" rows="10"></textarea>
            </div>
            <button class="bgGreen btnCommit" @click="review">提交</button>
        </div>
        <ymDialog ref="dialog" :modal="modal" />
  </div>
</template>

<script>
import ymDialog from "../../common/dialog";
import { Toast } from "vant";
export default {
  name: "writingReview",
  data() {
    return {
      reviewItem: {},
      msg:'',
      modal: {
        confirmText: "好的",
        contentText: "感谢您的评价！",
        red: false,
        showCancel: false
      }
    };
  },
  components: {
      ymDialog
  },
  methods: {
      review(){
          let _this = this;
           connsole.log(_this.orderId)
           connsole.log(_this.reviewItem.id)
          _this.$post(_this.GLOBAL.base_url+'comment',{
              token: _this.GLOBAL.token,
              o_id:_this.reviewItem.id,
              content:_this.msg
            })
            .then(res => {
              if(res.code == 200){
                 
                _this.$refs.dialog.confirm().then(()=>{
                    _this.$router.replace({
                        name: "toReview",
                        params: { title: "评价订单",orderId:_this.orderId }
                    })
                }).catch(()=>{
                })
              }else{
                  Toast(res.msg)
              }
            })
            .catch(err => {
              console.log(err);
            })
      }
  },
  created() {
    this.reviewItem = this.$route.params.reviewObj
    this.orderId = this.$route.params.orderId
  }
};
</script>


<style lang="less" scoped>
.writingReview {
    .goodsItem + .goodsItem{
    margin-top: 10px;
    }
  .imgOrder > img {
    width: 75px;
    height: 75px;
  }
  .line-through {
    text-decoration: line-through;
  }
  .btnOrder {
    width: 75px;
    height: 25px;
  }
  .borderR {
    border: 1px solid #fb4e26;
  }
  .border666 {
    border: 1px solid #666;
  }
  .textArea{
      width: 100%;
  }
  ::-webkit-input-placeholder{
      color: #ccc;
  }
  .btnCommit {
    width: 290px;
    height: 44px;
    margin: auto;
    border-radius: 5px;
    margin-top: 80px;
    color: #fff;
    font-size: 20px;
  }
}
</style>

