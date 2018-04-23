<template>
  <div class="e-404">
    <div class="e-404-body">
      <Card>
        <div class="e-404-title">
          <span>4</span>
          <ins>
            <Icon type="ios-navigate-outline"></Icon>
          </ins>
          <span>4</span>
        </div>
        <p class="e-404-msg">
          YOU &nbsp;&nbsp; LOOK &nbsp;&nbsp; LOST
        </p>
        <div class="e-404-btn">
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
  name: 'E404',
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
.e-404-body {
  width: 700px;
  height: 500px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.e-404-title {
  text-align: center;
  font-weight: 700;
  line-height: 260px;
  margin-top: 40px;
  color: #2d8cf0;
}
.e-404-title ins {
  display: inline-block;
  color: #19be6b;
  font-size: 230px;
  animation: err404animation 3s ease 0s infinite alternate;
}
.e-404-title span {
  font-size: 240px;
}
.e-404-msg {
  display: block;
  text-align: center;
  font-size: 30px;
  font-weight: 500;
  letter-spacing: 12px;
  color: #ddddd2;
}
.e-404-btn {
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
@keyframes err404animation {
  0% {
    transform: rotateZ(0deg);
  }
  20% {
    transform: rotateZ(-60deg);
  }
  40% {
    transform: rotateZ(-10deg);
  }
  60% {
    transform: rotateZ(50deg);
  }
  80% {
    transform: rotateZ(-20deg);
  }
  100% {
    transform: rotateZ(0deg);
  }
}
</style>
