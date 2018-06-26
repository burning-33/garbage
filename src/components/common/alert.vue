<template>
    <div class="alert" v-if="isShow">
        <div :class="_modal.service?'alert-box servicewidth bgw bR10':'alert-box boxwidth bgw bR10'">
            <p class="colorb">{{_modal.alertMsg}}</p>
            <p v-if="_modal.service" class="mt20 fs20 colorRed">400-800-8820</p>
            <div @click="close" v-if="_modal.service" class="iconfont fs20">&#xe6bf;</div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: false
    };
  },
  props: ['modal'],
  computed: {
    _modal () {
      let _modal = this.modal;
      _modal = {
       alertMsg: typeof _modal.alertMsg === 'undefined' ?'':_modal.alertMsg,
       service: typeof _modal.service === 'undefined' ?false:_modal.service,
       delay: typeof _modal.delay === 'undefined' ? 1500:_modal.delay,
      }
      return _modal
    }
  },
  methods: {
    confirm () {
      console.log(this._modal);
      this.isShow = true;
      setTimeout(()=> {
          this.isShow = false;
      },this._modal.delay)
    },
    hand(){
      this.isShow = true;
      this.promise = new Promise((resolve, reject) => {
          this.resolve = resolve;
          this.reject = reject;
        });
        return this.promise;
    },
    close(){
      this.isShow = false;
      this.reject();
    }
  }
};
</script>
<style lang="less" scoped>
.alert {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.42);
  position: fixed;
  top: 0;
  z-index: 999;
  .alert-box {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 120px;
    height: 100px;
    text-align: center;
    padding: 25px;
    .iconfont{
      position: absolute;
      top: 0;
      right: 11px;
      height: 16px;
      width: 16px;
      vertical-align: middle;
      display: table-cell;
    }
  }
  .boxwidth{
    width: 120px;
    height: 100px;
  }
  .servicewidth{
    width: 240px;
    height: 120px;
  }
}
</style>


