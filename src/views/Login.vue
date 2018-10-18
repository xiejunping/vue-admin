<template>
  <div>
    <particle></particle>
    <div class="main">
      <header>
        <h1 class="logo">admin</h1>
      </header>
      <section>
        <Form ref="loginForm" :model="form" :rules="rules">
          <FormItem prop="userName">
            <Input v-model="form.userName" placeholder="请输入用户名">
              <span slot="prepend">
                <Icon :size="16" type="person"></Icon>
              </span>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="form.password" placeholder="请输入密码">
              <span slot="prepend">
                <Icon :size="14" type="locked"></Icon>
              </span>
            </Input>
          </FormItem>
          <FormItem>
            <Button @click="handlerSubmit" type="primary" long>登录</Button>
          </FormItem>
        </Form>
      </section>
    </div>

  </div>
</template>

<script>
import Particle from '@/components/Particle'
export default {
  name: 'login',
  data () {
    return {
      form: {
        userName: 'kim',
        password: 'U2FsdGVkX19Go0gRVmnFipB3nNsG33uLLLDHNDT+vZg='
      },
      rules: {
        username: [{
          required: true,
          message: '账号不能为空',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '密码为6-20个字母或数字或组合',
          max: 50,
          min: 6,
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handlerSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.signIn()
        }
      })
    },
    async signIn () {
      const data = this.handleLogin({
        username: this.form.userName,
        password: this.form.password
      })

      if (data) {
        this.getUserInfo()
      }
    }
  },
  components: {
    Particle
  }
}
</script>

<style scoped>
  .main {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 300px;
    height: 400px;
    margin: auto;
    padding: 10px;
    background-color: white;
    border-radius: 5px;
  }
  .logo {
    font-size: 0;
    margin: 0 auto;
    width: 160px;
    height: 74px;
    background: url(~@/assets/images/logo.png) center center no-repeat;
    background-size: contain;
  }
</style>
