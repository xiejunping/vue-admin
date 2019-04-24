<template>
  <div>
    <particle></particle>
    <div class="main">
      <header>
        <h1 class="logo">admin</h1>
        <h3 class="logo-title">Vue-admin 后台管理系统</h3>
      </header>
      <section>
        <a-form :form="form" @keydown.enter.native="handlerSubmit">
          <a-form-item>
            <a-input
              v-decorator="[
                'username',
                {initialValue: 'cabber', rules: [{ required: true, message: '账号不能为空' }]}
              ]"
              placeholder="请输入用户名">
              <a-icon slot="prefix" :size="14"  type="user" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              type="password"
              v-decorator="[
                'password',
                {rules: [{ required: true, min: 6, max: 50, message: '密码为6-20个字母或数字或组合' }]}
              ]"
              placeholder="请输入密码">
              <a-icon slot="prefix" :size="14"  type="lock" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button @click="handlerSubmit" type="primary" block>登录</a-button>
          </a-form-item>
        </a-form>
      </section>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Particle from '@/components/Particle'
export default {
  name: 'login',
  components: { Particle },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handlerSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.signIn(values)
        }
      })
    },
    async signIn ({ username, password }) {
      const data = await this.handleLogin({
        username,
        password: this.util.aesEncrypt(password)
      })
      if (data) {
        const info = await this.getUserInfo()
        if (info) this.$router.push({ name: 'index' })
      }
    }
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
