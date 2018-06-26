<script>
  const base_url = "http://garbage.xxw360.com/api/";
  //验证码倒计时
  function countdown(that) {
    var time = 60;
    settime(that);
    function settime(that) {
      if (time == 0) {
          that.is_show=true
        that.getCodetext="重新获取"
        time = 60;
        return;
      } else {
        that.is_show=false;
        that.last_time = time;
        time--;
      }
      setTimeout(function() {
        settime(that);
      }, 1000);
    }
  }
  export default {
    base_url,
    countdown
  };
</script>
