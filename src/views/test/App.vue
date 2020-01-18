<template>

  <el-main id="app-login">
    <div class="login-box">
      <div class="logo">
        <i class="iconfont icon-github"></i>
      </div>
      <p class="text-tips">{{welcome}}</p>

      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" :placeholder="tips.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="ruleForm.password" :placeholder="tips.password"></el-input>
        </el-form-item>
        <el-form-item style="text-align: center;">
          <el-button type="primary" native-type="button" :loading="btn.loginBtnLoading" class="loginBtn"
            @click="submitForm('ruleForm')">{{ btn.loginBtn}}</el-button>
          <el-button native-type="button" class="loginBtn" @click="resetForm('ruleForm')">
            {{btn.resetBtn}}
          </el-button>
        </el-form-item>
      </el-form>


      <p class="text-tips">
        <i class="el-icon-edit"></i> ©make by VUE + ELEMENT UI
      </p>
    </div>

  </el-main>
</template>

<script>
  import "./login.scss";
  import '@/assets/font/iconfont.css'

  export default {
    name: 'test',

    computed: {},

    data() {
      return {
        welcome: "请登录",
        ruleForm: {
          username: "",
          password: ""
        },
        rules: {
          username: [{
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          }],
          password: [{
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }]
        },
        tips: {
          username: "用户名",
          password: "密码"
        },
        btn: {
          loginBtnLoading: false,
          loginBtn: "登陆",
          resetBtn: "清空"
        }
      };
    },

    props: {
      obj: Object
    },

    created() {},

    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            alert("登陆");
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }

  }
</script>

<!--设置scoped只在当前页面生效-->
<style lang="scss" scoped>
  $textColor: #909db7;

  .login-box {
    position: relative;
    width: 330px;
    margin: 0 auto;
    padding: 0px 15px;
  }

  /**使用字体图标或svg图标来控制整个主题颜色**/
  .login-box .logo {
    margin: 0 auto;
    text-align: center;
    margin-bottom: 20px;
  }

  .login-box .logo .iconfont {
    font-size: 60px;
    color: $textColor;
  }

  .login-box .text-tips {
    text-align: center;
    color: $textColor;
  }

  .login-box .loginBtn {
    width: 45%;
  }
</style>