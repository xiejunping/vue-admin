<template>
  <div class="e-500">
    <div class="e-500-body">
      <Card>
        <div class="e-500-title">
          <span>5</span>
          <span class="e-500-0">
            <Icon type="logo-freebsd-devil"></Icon>
          </span>
          <span class="e-500-0">
            <Icon type="logo-freebsd-devil"></Icon>
          </span>
        </div>
        <p class="e-500-msg">Oops! The server is wrong</p>
        <div class="e-500-btn">
          <Button @click="goHome"
                  size="large"
                  class="e-btn">返回首页</Button>
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
  name: 'E500',
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
.e-500-body {
  width: 700px;
  height: 500px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
.e-500-title {
  text-align: center;
  font-weight: 700;
  color: #2d8cf0;
  height: 260px;
  line-height: 260px;
  margin-top: 40px;
}
.e-500-0 {
  display: inline-block;
  position: relative;
  width: 170px;
  height: 170px;
  border-radius: 50%;
  border: 20px solid #ed3f14;
  color: #ed3f14;
  margin-right: 10px;
}
.e-500-0 i {
  display: inline-block;
  font-size: 120px;
  position: absolute;
  bottom: -10px;
  left: 10px;
  transform-origin: center bottom;
  animation: err500animation 3s ease 0s infinite alternate;
}
.e-500-title span {
  font-size: 240px;
}
.e-500-msg {
  display: block;
  text-align: center;
  font-size: 30px;
  font-weight: 500;
  letter-spacing: 4px;
  color: #ddddd2;
}
.e-500-btn {
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
@keyframes err500animation {
  0% {
    transform: rotateZ(0deg);
  }
  20% {
    transform: rotateZ(-10deg);
  }
  40% {
    transform: rotateZ(5deg);
  }
  60% {
    transform: rotateZ(-5deg);
  }
  80% {
    transform: rotateZ(10deg);
  }
  100% {
    transform: rotateZ(0deg);
  }
}
</style>
