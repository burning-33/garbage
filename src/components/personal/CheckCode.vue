<template>
    <div class="checkCode">
        <div class="mlr20">
            <p class="mb20 color333">你当前的手机号为：15708446068</p>
        <van-cell-group class="border bR10">
            <van-field
                center
                v-model="sms"
                placeholder="请输入短信验证码"
                icon="clear"
                @click-icon="sms = ''">
                <van-button slot="button" size="large" type="primary" class="bgGreen">获取验证码</van-button>
            </van-field>
        </van-cell-group>
        <button class="bgGreen btnCommit">下一步</button>
        </div>

    </div>
</template>
<script>
export default {
  data() {},
  components: {}
};
</script>
<style lang="less" scoped>
.checkCode {
    margin-top: 100px;
  .btnCommit {
    width: 100%;
    height: 44px;
    border-radius: 10px;
    margin-top: 80px;
    color: #fff;
    font-size: 20px;
  }
  .bR10 {
    border-radius: 10px;
  }
}
</style>


