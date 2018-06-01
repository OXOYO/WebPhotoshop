<template>
<div class="login-wrapper">
  <div class="login-title">帐号登录</div>
  <div class="login-info">
    <input class="user-name" placeholder="输入用户名/邮箱/手机号"  type="text" v-model="account.name">
    <input class="pass-word" placeholder="输入密码" type="password" value="" v-model="account.password">
    <div class="login-row">
      <div class="login-remember">
        <input type="checkbox" name="rememberMe" id="rememberMe" value="true" checked="checked" class="auto-login" tabindex="4">
        <label for="rememberMe">下次自动登录</label>
      </div>
      <div class="foget-password">立即注册</div>
    </div>
    <button class="login-button">登录</button>
  </div>
</div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      account: {
        name: '',
        password: ''
      }
    }
  }
}
</script>

<style lang="scss">
.login-wrapper {
  width: 300px;
  padding: 30px;
  background-color: #fff;
  border: 1px solid #d5dce5;
  border-radius: 5px;
  .login-title {
    font-size: 24px;
    color: #4d5e73;
    margin-bottom: 20px;
  }
  .user-name,
  .pass-word {
    width: 100%;
    border: 1px solid #d5dce5;
    text-indent: 23px;
    border-radius: 3px;
    padding: 12px 0;
    margin-bottom: 20px;
    outline: 0;
    font-size: 16px;
  }
  .login-row {
    display: flex;
    justify-content: space-between;
    .login-remember {
      display: flex;
      align-items: center;
    }
    .foget-password {
      cursor: pointer;
      color: #428bca;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .login-button {
    margin-top: 20px;
    width: 100%;
    height: 40px;
    outline: 0;
    cursor: pointer;
    font-size: 20px;
    background: #c90a16;
    color: #fff;
    border: solid 1px #c90000;
    border-radius: 3px;
    box-shadow: 0 0 3px #fff inset;
    &:hover {
      background: #ba0813;
    }
  }
}
</style>
