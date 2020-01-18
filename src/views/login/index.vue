<!--<template>-->
  <!--<div class="login-container">-->
    <!--<el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"-->
      <!--label-position="left">-->

      <!--<div class="title-container">-->
        <!--<h3 class="title">-->
          <!--&lt;!&ndash; {{ $t('login.title') }} &ndash;&gt;-->
          <!--长城软件OA管理台-->
        <!--</h3>-->
      <!--</div>-->

      <!--<el-form-item prop="username">-->
        <!--<span class="svg-container">-->
          <!--<svg-icon icon-class="user" />-->
        <!--</span>-->
        <!--<el-input ref="username" v-model="loginForm.username" :placeholder="$t('login.username')" name="username"-->
          <!--type="text" auto-complete="on" />-->
      <!--</el-form-item>-->

      <!--<el-form-item prop="password">-->
        <!--<span class="svg-container">-->
          <!--<svg-icon icon-class="password" />-->
        <!--</span>-->
        <!--<el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType"-->
          <!--:placeholder="$t('login.password')" name="password" auto-complete="on" @keyup.enter.native="handleLogin" />-->
        <!--<span class="show-pwd" @click="showPwd">-->
          <!--<svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />-->
        <!--</span>-->
      <!--</el-form-item>-->

      <!--<el-button class="button" :loading="loading" type="primary" style="width:100%;margin-bottom:30px;"-->
        <!--@click.native.prevent="handleLogin">-->
        <!--{{ $t('login.logIn') }}-->
      <!--</el-button>-->
    <!--</el-form>-->


  <!--</div>-->
<!--</template>-->

<!--<script>-->
  <!--import {-->
    <!--validUsername-->
  <!--} from '@/utils/validate'-->

  <!--export default {-->
    <!--name: 'Login',-->
    <!--data() {-->
      <!--const validateUsername = (rule, value, callback) => {-->
        <!--if (!validUsername(value)) {-->
          <!--callback(new Error('请输入正确的用户名'))-->
        <!--} else {-->
          <!--callback()-->
        <!--}-->
      <!--}-->
      <!--const validatePassword = (rule, value, callback) => {-->
        <!--if (value.length < 6) {-->
          <!--callback(new Error('密码不能小于6位'))-->
        <!--} else {-->
          <!--callback()-->
        <!--}-->
      <!--}-->
      <!--return {-->
        <!--loginForm: {-->
          <!--username: '',-->
          <!--password: ''-->
        <!--},-->
        <!--loginRules: {-->
          <!--username: [{-->
            <!--required: true,-->
            <!--trigger: 'blur',-->
            <!--validator: validateUsername-->
          <!--}],-->
          <!--password: [{-->
            <!--required: true,-->
            <!--trigger: 'blur',-->
            <!--validator: validatePassword-->
          <!--}]-->
        <!--},-->
        <!--passwordType: 'password',-->
        <!--loading: false,-->
        <!--redirect: undefined-->
      <!--}-->
    <!--},-->
    <!--watch: {-->
      <!--$route: {-->
        <!--handler: function (route) {-->
          <!--this.redirect = route.query && route.query.redirect-->
        <!--},-->
        <!--immediate: true-->
      <!--}-->
    <!--},-->
    <!--created() {-->
      <!--// window.addEventListener('storage', this.afterQRScan)-->
    <!--},-->
    <!--mounted() {-->
      <!--if (this.loginForm.username === '') {-->
        <!--this.$refs.username.focus()-->
      <!--} else if (this.loginForm.password === '') {-->
        <!--this.$refs.password.focus()-->
      <!--}-->
    <!--},-->
    <!--destroyed() {-->
      <!--// window.removeEventListener('storage', this.afterQRScan)-->
    <!--},-->
    <!--methods: {-->
      <!--showPwd() {-->
        <!--if (this.passwordType === 'password') {-->
          <!--this.passwordType = ''-->
        <!--} else {-->
          <!--this.passwordType = 'password'-->
        <!--}-->
        <!--this.$nextTick(() => {-->
          <!--this.$refs.password.focus()-->
        <!--})-->
      <!--},-->
      <!--handleLogin() {-->
        <!--this.$refs.loginForm.validate(valid => {-->
          <!--if (valid) {-->
            <!--this.loading = true-->
            <!--this.$store.dispatch('user/login', this.loginForm)-->
              <!--.then(() => {-->
                <!--//登陆首页还是之前访问需要重定向的地址-->
                <!--this.$router.push({-->
                  <!--path: this.redirect || '/'-->
                <!--})-->
                <!--this.loading = false-->
              <!--})-->
              <!--.catch(() => {-->
                <!--console.log('error submit!!')-->
                <!--this.loading = false-->
              <!--})-->
          <!--} else {-->
            <!--console.log('error submit!!')-->
            <!--return false-->
          <!--}-->
        <!--})-->
      <!--}-->

    <!--}-->
  <!--}-->
<!--</script>-->

<!--<style lang="scss">-->
  <!--/* 修复input 背景不协调 和光标变色 */-->
  <!--/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */-->

  <!--$bg:#283443;-->
  <!--$light_gray:#fff;-->
  <!--$cursor: #fff;-->

  <!--@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {-->
    <!--.login-container .el-input input {-->
      <!--color: $cursor;-->
    <!--}-->
  <!--}-->

  <!--/* reset element-ui css */-->
  <!--.login-container {-->
    <!--.el-input {-->
      <!--display: inline-block;-->
      <!--height: 47px;-->
      <!--width: 85%;-->

      <!--input {-->
        <!--background: transparent;-->
        <!--border: 0px;-->
        <!-- -webkit-appearance: none;-->
        <!--border-radius: 0px;-->
        <!--padding: 12px 5px 12px 15px;-->
        <!--color: $light_gray;-->
        <!--height: 47px;-->
        <!--caret-color: $cursor;-->

        <!--&:-webkit-autofill {-->
          <!--box-shadow: 0 0 0px 1000px $bg inset !important;-->
          <!-- -webkit-text-fill-color: $cursor !important;-->
        <!--}-->
      <!--}-->
    <!--}-->

    <!--.el-form-item {-->
      <!--border: 1px solid rgba(255, 255, 255, 0.1);-->
      <!--background: rgba(0, 0, 0, 0.1);-->
      <!--border-radius: 5px;-->
      <!--color: #454545;-->
    <!--}-->
  <!--}-->
<!--</style>-->

<!--<style lang="scss" scoped>-->
  <!--$bg:#2d3a4b;-->
  <!--$dark_gray:#889aa4;-->
  <!--$light_gray:#eee;-->

  <!--.button,-->
  <!--.button:focus,-->
  <!--.button:hover {-->
    <!--background: #2E4E76;-->
    <!--border-color: #2E4E76;-->
  <!--}-->

  <!--.login-container {-->
    <!--min-height: 100%;-->
    <!--width: 100%;-->
    <!--background-color: $bg;-->
    <!--overflow: hidden;-->

    <!--.login-form {-->
      <!--position: relative;-->
      <!--width: 520px;-->
      <!--max-width: 100%;-->
      <!--padding: 160px 35px 0;-->
      <!--margin: 0 auto;-->
      <!--overflow: hidden;-->
    <!--}-->

    <!--.tips {-->
      <!--font-size: 14px;-->
      <!--color: #fff;-->
      <!--margin-bottom: 10px;-->

      <!--span {-->
        <!--&:first-of-type {-->
          <!--margin-right: 16px;-->
        <!--}-->
      <!--}-->
    <!--}-->

    <!--.svg-container {-->
      <!--padding: 6px 5px 6px 15px;-->
      <!--color: $dark_gray;-->
      <!--vertical-align: middle;-->
      <!--width: 30px;-->
      <!--display: inline-block;-->
    <!--}-->

    <!--.title-container {-->
      <!--position: relative;-->

      <!--.title {-->
        <!--font-size: 26px;-->
        <!--color: $light_gray;-->
        <!--margin: 0px auto 40px auto;-->
        <!--text-align: center;-->
        <!--font-weight: bold;-->
      <!--}-->

      <!--.set-language {-->
        <!--color: #fff;-->
        <!--position: absolute;-->
        <!--top: 3px;-->
        <!--font-size: 18px;-->
        <!--right: 0px;-->
        <!--cursor: pointer;-->
      <!--}-->
    <!--}-->

    <!--.show-pwd {-->
      <!--position: absolute;-->
      <!--right: 10px;-->
      <!--top: 7px;-->
      <!--font-size: 16px;-->
      <!--color: $dark_gray;-->
      <!--cursor: pointer;-->
      <!--user-select: none;-->
    <!--}-->



  <!--}-->
<!--</style>-->

<template>
  <div class="login-view">
    <div class="login-header-wrapper">
      <div class="logo"></div>
      <div class="login-help">
        <a class="help">帮助中心</a>
      </div>
    </div>
    <div class="login-container">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
               label-position="left">
        <div class="title-container">
          <h3 class="title">
            <!-- {{ $t('login.title') }} -->
            协同管理系统
          </h3>
        </div>
        <div class="form-wrapper">
          <div class="form-logo"></div>
          <p class="form-name">欢迎登录长软OA系统</p>
          <el-form-item prop="username">
            <el-input size="mini" ref="username" v-model="loginForm.username" placeholder="用户名" name="username"
                      type="text" auto-complete="on" suffix-icon="el-icon-user-solid" />
          </el-form-item>

          <el-form-item prop="password">
            <el-input size="mini" :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType"
                      placeholder="密码" name="password" auto-complete="on" @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
          </el-form-item>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-button class="button" :loading="loading" type="primary" @click.native.prevent="handleLogin">登录</el-button>
            </el-col>
            <el-col :span="12">
              <el-button class="button" @click.native.prevent="handleClear">清空</el-button>
            </el-col>
          </el-row>
        </div>
      </el-form>


    </div>
    <div class="login-footer-wrapper">
      <div class="login-version">© 版权所有: 长城计算机软件与系统有限公司<span style="margin-left: 50px">版本号: V1.5</span></div>
      <div class="footer-image"></div>
    </div>
  </div>
</template>

<script>
  import {
          validUsername
  } from '@/utils/validate'

  export default {
    name: 'Login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!validUsername(value)) {
          callback(new Error('请输入正确的用户名'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能小于6位'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          username: '',
          password: ''
        },
        loginRules: {
          username: [{
            required: true,
            trigger: 'blur',
            validator: validateUsername
          }],
          password: [{
            required: true,
            trigger: 'blur',
            validator: validatePassword
          }]
        },
        passwordType: 'password',
        loading: false,
        redirect: undefined
      }
    },
    watch: {
      $route: {
        handler: function (route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    created() {
      // window.addEventListener('storage', this.afterQRScan)
    },
    mounted() {
      if (this.loginForm.username === '') {
        this.$refs.username.focus()
      } else if (this.loginForm.password === '') {
        this.$refs.password.focus()
      }
    },
    destroyed() {
      // window.removeEventListener('storage', this.afterQRScan)
    },
    methods: {
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
      })
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('user/login', this.loginForm)
                    .then(() => {
              //登陆首页还是之前访问需要重定向的地址
              this.$router.push({
              path: this.redirect || '/'
            })
            this.loading = false
          })
          .catch(() => {
              console.log('error submit!!')
            this.loading = false
          })
          } else {
            console.log('error submit!!')
          return false
        }
      })
      },
      // 清空按钮
      handleClear() {
        this.loginForm.username = '';
        this.loginForm.password = '';
      }

    }
  }
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#283443;
  $light_gray:#000;
  $cursor: #000;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
  .el-input {
    display: inline-block;
    width: 100%;
  input {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 5px;
    padding: 12px 5px 12px 15px;
    color: $light_gray;
    caret-color: $cursor;
  &:-webkit-autofill {
     box-shadow: 0 0 0px 1000px #fff inset !important;
     -webkit-text-fill-color: #000 !important;
   }
  }
  }
  .el-form-item {
    border: 1px solid #dcdfe6;
    border-radius: 5px;
    color: #454545;
  @media screen and (max-width:1680px) {
    .el-form-item__content {
      line-height: 20px;
    }
  }
  @media screen and (min-width:1680px) {
    .el-form-item__content {
      line-height: 40px;
    }
  }
  }
  }
</style>

<style lang="scss" scoped>
  $dark_gray:#889aa4;
  $light_gray:#eee;
  /*.button,*/
  /*.button:focus,*/
  /*.button:hover {*/
  /*background: #2E4E76;*/
  /*border-color: #2E4E76;*/
  /*}*/
  .login-view {
    width: 100%;
    height: 100%;
    padding: 0 0 214px 0;
    background: #fff;
  }
  .login-header-wrapper {
    width: 100%;
    height: 100px;
  }
  .logo {
    float: left;
    width: 238px;
    height: 100%;
    background: url("../../assets/logo.png") no-repeat;
    margin-left: 62px;
  }
  .login-help {
    width: 200px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    float: right;
  }
  .login-container {
    position: relative;
    min-height: 100%;
    width: 100%;
    background: url("../../assets/login.png") no-repeat;
    background-size: 100% 100%;
    /*overflow: hidden;*/
  }
  @media screen and (max-width:1680px){
    .login-form {
      position: absolute;
      top: 40%;
      right: 10%;
      width: 20%;
      max-width: 100%;
      margin-top: -175px;
      padding: 50px 0;
      overflow: hidden;
    }
    .title-container {
      position: relative;
    }
    .title {
      font-size: 26px;
      color: #fff;
      margin: 0px auto 20px auto;
      text-align: center;
      font-weight: bold;
    }
    .form-wrapper {
      padding: 20px 20px 0 20px;
      background: #fff;
      border-radius: 10px;
    }
    .form-logo {
      margin: 0 auto;
      width: 100px;
      height: 100px;
      border: 1px solid #a0cfff;
      border-radius: 50%;
      background: url("../../assets/logo-robot.png") center center no-repeat;
    }
    .form-name {
      font-size: 12px;
      margin: 10px 0;
      color: #aaa;
      text-align: center;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
    .button {
      width:100%;
      margin-bottom:20px;
    }
  }
  @media screen and (min-width:1680px){
    .login-form {
      position: absolute;
      top: 40%;
      right: 10%;
      width: 20%;
      max-width: 100%;
      margin-top: -175px;
      padding: 50px 0;
      overflow: hidden;
    }
    .title-container {
      position: relative;
    }
    .title {
      font-size: 32px;
      color: #fff;
      margin: 0px auto 20px auto;
      text-align: center;
      font-weight: bold;
    }
    .form-wrapper {
      padding: 20px 20px 0 20px;
      background: #fff;
      border-radius: 10px;
    }
    .form-logo {
      margin: 0 auto;
      width: 100px;
      height: 100px;
      border: 1px solid #a0cfff;
      border-radius: 50%;
      background: url("../../assets/logo-robot.png") center center no-repeat;
    }
    .form-name {
      font-size: 12px;
      margin: 15px 0;
      color: #aaa;
      text-align: center;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
    .button {
      width:100%;
      margin-bottom:20px;
    }
  }
  .login-footer-wrapper {
    width: 100%;
    height: 110px;
  }
  .login-version {
    width: 100%;
    height: 50px;
    line-height: 60px;
    text-align: center;
  }
  .footer-image {
    width: 100%;
    height: 64px;
    background: url("../../assets/login-footer.png");
  }
</style>