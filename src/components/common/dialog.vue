<template>
    <div class="dialog" v-if="show">
        <div class="dialog-box bgw bR5">
            <div class="mat">
                <p class="colorb fs16 btnDel">{{_modal.contentText}}</p>
                <div class="b-v-center">
                    <div class="flex btnB b-center">
                      <button class="bgbbb colorw btnW bR5 " @click="close">{{_modal.cancelText}}</button>
                    </div>
                    <div class="flex btnB b-center">
                      <button :class="_modal.red?'bgRed colorw btnW bR5 flex':'bgGreen colorw btnW bR5 flex'" @click="submit">{{_modal.confirmText}}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,   // 是否显示模态框
      resolve: '',
      reject: '',
      promise: ''  // 保存promise对象
    };
  },
   props: ['modal'],
   computed: {
     _modal () {
       let _modal = this.modal;
          _modal = {
            contentText: typeof _modal.contentText === 'undefined' ? '' : _modal.contentText,
            cancelText: typeof _modal.cancelText !== 'undefined' ? _modal.cancelText : '取消',
            confirmText: typeof _modal.confirmText !== 'undefined' ? _modal.confirmText : '确定'
          };
          return _modal;
     }
   },
   methods: {
     confirm () {
        this.show = true;
        this.promise = new Promise((resolve, reject) => {
          this.resolve = resolve;
          this.reject = reject;
        });
        return this.promise;
     },
      close () {
        this.show = false;
        this.reject();
      },
      submit () {
        this.resolve('submit');
        this.show = false;
      }
   }

};
</script>
<style lang="less" scoped>
.dialog {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.453);
  position: fixed;
  top: 0;
  .bgbbb {
    background-color: #bbb;
  }
  .bgRed {
    background-color: #df1c24;
  }
  .btnDel{
      margin-top: 27px;
      margin-bottom: 23px;
  }
    .mat{
        width: 160px;
        margin: 0 auto;
        overflow: hidden;
    }
  .dialog-box {
    text-align: center;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 240px;
    height: 120px;
    .btnW {
      width: 65px;
      height: 28px;
    }
    .btnB+ .btnB {
      margin-left: 15px;  
    }
  }
}
</style>


