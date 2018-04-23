<template>
  <div class="e-403">
    <div class="e-403-body">
      <Card>
        <div class="e-403-title">
          <span>4</span>
          <span class="e-403-0">
            <Icon type="android-lock"></Icon>
          </span>
          <span class="e-403-key">
            <Icon type="ios-bolt" size="220"></Icon>
          </span>
        </div>
        <p class="e-403-msg">
          You don't have permission
        </p>
        <div class="e-403-btn">
          <Button @click="goHome"
                  size="large"
                  class="e-btn"
                  type="ghost">返回首页</Button>
          <Button @click="backPage"
                  size="large"
                  class="e-btn e-primary"
                  type="primary">返回上一页</Button>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'E403',
  methods: {
    backPage () {
      this.$router.go(-1)
    },
    goHome () {
      this.$router.push({
        name: 'index'
      })
    }
  }
}
</script>

<style scoped>
.e-403-body {
  width: 700px;
  height: 500px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.e-403-title {
  text-align: center;
  font-weight: 700;
  color: #2d8cf0;
  line-height: 260px;
  margin-top: 40px;
}
.e-403-title span {
  font-size: 240px;
}
.e-403-0{
  display: inline-block;
  position: relative;
  width: 190px;
  height: 190px;
  border-radius: 50%;
  border: 16px solid #ed3f14;
  color: #ed3f14;
  margin-right: 10px;
}
.e-403-0 i{
  display: inline-block;
  font-size: 120px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
.e-403-key{
  display: inline-block;
  position: relative;
  width: 100px;
  height: 200px;
  border-radius: 50%;
  margin-right: 10px;
}
.e-403-key i{
  display: inline-block;
  font-size: 190px;
  position: absolute;
  left: 20px;
  transform: translate(-50%,-60%);
  transform-origin: center bottom;
  animation: err403animation 2.8s ease 0s infinite;
}
.e-403-msg {
  display: block;
  text-align: center;
  font-size: 30px;
  font-weight: 500;
  letter-spacing: 4px;
  color: #ddddd2;
}
.e-403-btn {
  text-align: center;
  padding: 20px 0;
  margin-bottom: 40px;
}
.e-btn {
  width: 200px;
}
.e-primary {
  margin-left: 40px;
}
@keyframes err403animation {
  0% {
    transform: rotateZ(0deg);
  }
  40% {
    transform: rotateZ(-20deg);
  }
  45% {
    transform: rotateZ(-15deg);
  }
  50% {
    transform: rotateZ(-20deg);
  }
  55% {
    transform: rotateZ(-15deg);
  }
  60% {
    transform: rotateZ(-20deg);
  }
  100% {
    transform: rotateZ(0deg);
  }
}
</style>
