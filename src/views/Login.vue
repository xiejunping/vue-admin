<template>
  <div>
    <particle></particle>
    <div class="main">
      <header>
        <h1 class="logo">admin</h1>
        <h3 class="logo-title">Vue-admin 后台管理系统</h3>
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
import { mapActions } from 'vuex'
import Particle from '@/components/Particle'
export default {
  name: 'login',
  data () {
    return {
      form: {
        userName: 'cabber', // 'kim',
        password: ''
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
      const data = await this.handleLogin({
        username: this.form.userName,
        password: this.util.aesEncrypt(this.form.password)
      })
      if (data) {
        const info = await this.getUserInfo()
        if (info) this.$router.push({name: 'index'})
      }
    }
  },
  components: {
    Particle
  }
}
</script>

<style scoped>
  header {
    padding: 10px 0;
  }
  .main {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 300px;
    height: 340px;
    margin: auto;
    padding: 20px;
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

  .logo-title {
    font-size: 18px;
    line-height: 60px;
  }

  .ivu-form-item {
    margin-bottom: 20px;
  }
</style>
