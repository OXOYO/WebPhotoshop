<template>
<div class="login-wrapper" v-show="popUpsKey.login">
  <span class="login-close" @click="popUpsKey.login=false"></span>
  <div class="login-title">{{loginTitle}}</div>
  <div class="login-info">
    <input class="user-name" placeholder="输入用户名/邮箱/手机号"  type="text" v-model="account.name">
    <input class="pass-word" placeholder="输入密码" type="password" value="" v-model="account.password">
    <div class="error-message" v-show="showError">
      <span class="error-icon"></span>
      <span class="error-mess">{{errorMessage[index]}}</span>
    </div>
    <div class="login-row">
      <div class="login-remember">
        <input type="checkbox" name="rememberMe" id="rememberMe" value="true" checked="checked" class="auto-login" tabindex="4">
        <label for="rememberMe">下次自动登录</label>
      </div>
      <div class="foget-password" @click="loginTitle='注册账号',buttonTitle='注册'">立即注册</div>
    </div>
    <button class="login-button" @click="login">{{buttonTitle}}</button>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      account: {
        name: '',
        password: ''
      },
      showError: false,
      index: 0,
      errorMessage: ['请输入用户名！', '请输入密码！', '帐户名或登录密码不正确，请重新输入'],
      loginTitle: '帐号登录',
      buttonTitle: '登录'
    }
  },
  computed: {
    ...mapState([
      'popUpsKey'
    ])
  },
  mounted () {
    this.init()
  },
  methods: {
    // 初始化
    init () {
      let account = this.getStorage()
      if (account) {
        this.account = account
      }
    },
    login () {
      if (this.checkInput()) {
        if (this.loginTitle === '帐号登录') {
          // 登录
          this.checkAccount()
        } else {
          // 注册
          this.setAccount()
        }
      }
    },
    // 检查账号密码是否输入
    checkInput () {
      if (!this.account.name) {
        this.showError = true
        this.index = 0
        return false
      } else if (!this.account.password) {
        this.showError = true
        this.index = 1
        return false
      } else {
        this.showError = false
        return true
      }
    },
    // 查询账号密码
    checkAccount () {
      let params = this.account
      this.$http.post('/api/login/getAccount', params)
        .then((response) => {
          // 响应成功回调
          if (response.body.length > 0) {
            // 有账号
            this.setStorage()
          } else {
            // 无账号
            this.showError = true
            this.index = 2
          }
        })
        .catch((reject) => {
          console.log(reject)
        })
    },
    // 注册账号密码
    setAccount () {
      let params = this.account
      this.$http.post('/api/login/createAccount', params)
        .then((response) => {
          if (response.body === 'createAccount successed') {
            // 注册成功
            this.setStorage()
          }
        })
        .catch((reject) => {
          console.log(reject)
        })
    },
    // 保存数据到本地
    setStorage () {
      const account = this.account
      localStorage.setItem('account', JSON.stringify(account))
    },
    // 从本地存储获取数据
    getStorage () {
      return JSON.parse(localStorage.getItem('account'))
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
  position: relative;
  .login-close {
    position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url('../../src/assets/default/panel_tools.png') no-repeat -16px 0px;
  }
  .login-title {
    font-size: 24px;
    color: #4d5e73;
  }
  .user-name,
  .pass-word {
    width: 100%;
    border: 1px solid #d5dce5;
    text-indent: 23px;
    border-radius: 3px;
    padding: 12px 0;
    margin-top: 20px;
    outline: 0;
    font-size: 16px;
  }
  .login-row {
    margin-top: 10px;
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
  .error-message {
    height: 25px;
    background: #fff0f0;
    border: 1px solid #ffd2d2;
    margin-top: 10px;
    display: flex;
    align-items: center;
    .error-icon {
      margin-left: 5px;
      margin-right: 5px;
      width: 16px;
      height: 16px;
      background: url('../../src/assets/default/login-logic-icons.png') no-repeat 0 0;
    }
    .error-mess {
      color: #b74d46;
    }
  }
  .login-button {
    margin-top: 20px;
    width: 100%;
    height: 40px;
    outline: 0;
    cursor: pointer;
    font-size: 20px;
    background: #fff;
    color: #95B8E7;
    border: solid 1px #95B8E7;
    border-radius: 3px;
    box-shadow: 0 0 3px #fff inset;
    &:hover {
      background: #EDF5FA;
    }
  }
}
</style>
