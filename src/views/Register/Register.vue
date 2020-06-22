<template>
  <section class="loginContainer">
    <div class="registerInner">
      <div class="login_header">
        <h2 class="login_logo">CVTE活动中心</h2>
          <div class="login_header_title">
            <h4 style="margin:0; ">用户注册</h4>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="register">

          <div :class="{on: !loginWay}">
            <section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="text" maxlength="8" placeholder="密码" v-if="showPwd" v-model="pwd">
                <input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd">
                <div class="switch_button off" :class="showPwd?'on':'off'" @click="showPwd=!showPwd">
                  <div class="switch_circle" :class="{right: showPwd}"></div>
                  <span class="switch_text">{{showPwd ? 'abc' : '...'}}</span>
                </div>
              </section>
              <section class="login_verification">
                <input type="text" maxlength="8" placeholder="再次输入密码" v-if="showPwd" v-model="pwd_confirm">
                <input type="password" maxlength="8" placeholder="再次输入密码" v-else v-model="pwd_confirm">
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="真实姓名" v-model="real_name">
              </section>
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="mobile">
            </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="@/assets/captcha.svg">
              </section>
              <section class="login_hint">
                温馨提示：
                点击注册代表已同意
                <a href="javascript:;">《用户服务协议》</a>
              </section>
            </section>
          </div>
          <button class="login_submit">注册</button>
        </form>
        <a href="javascript:;" class="about_us" @click="$router.replace('/login')">已有账号?点击登录</a>
      </div>
      <!--利用$router.back()返回上一级路由 -->
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-arrow-left"></i>
      </a>
    </div>
    <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"/>
  </section>

</template>
<script>

import AlertTip from '../../components/AlertTip/AlertTip.vue'
import {reqPwdRegister} from '../../api'
export default {
  data () {
    return {
      loginWay: false, // true代表短信登陆, false代表密码
      computeTime: 0,
      showPwd: false, // 是否显示密码
      pwd: '',
      pwd_confirm: '',
      mobile: '',
      real_name: '',
      name: '', // 用户名
      code: '', // 短信验证码
      alertText: '', // 提示文本
      alertShow: false // 是否显示警告框
    }
  },
  computed: {
  },
  methods: {
    rightPhone (mobile) {
      // 利用正则对手机号进行匹配，返回布尔值
      return /^1\d{10}$/.test(mobile)
    },
    // 异步注册
    async register () {
      let result
      // 前台表单验证
      const {name, pwd,pwd_confirm,real_name, mobile,captcha} = this
      if (!this.name) {
        // 用户名必须指定
        this.showAlert('用户名必须指定')
        return
      } else if (!this.pwd) {
        // 密码必须指定
        this.showAlert('密码必须指定')
        return
      } else if (!this.pwd_confirm) {
        // 再次密码必须指定
        this.showAlert('再此确认密码必须指定')
        return
      } else if (this.pwd_confirm!=this.pwd) {
        // 密码必须指定
        this.showAlert('两次输入的密码必须相同')
        return
      } else if (!this.mobile) {
        this.showAlert('手机号码必须指定')
        return
      }else if (!this.rightPhone(this.mobile)) {
        this.showAlert('手机号码格式不正确')
        return
      }else if (!this.captcha) {
        // 验证码必须指定
        this.showAlert('验证码必须指定')
        return
      }
     
      // 发送ajax请求密码登陆
      result = await reqPwdRegister({name, pwd ,pwd_confirm,real_name,mobile,captcha})
      
      // 根据结果数据处理
      if (result.code === 0) {
        const user = result.data

        // 将user保存到vuex的state
        this.$store.dispatch('recordUser', user)
        // 中心
        this.$router.replace('/')
      } else {
        const msg = result.msg
        this.showAlert(msg)
      }

    },
    
    showAlert (alertText) {
      this.alertShow = true
      this.alertText = alertText
    },
    // 关闭警告框
    closeTip () {
      this.alertShow = false
      this.alertText = ''
    },

  },
  components: {
    AlertTip
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scope>
  @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff
    .registerInner
      padding-top 10px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 0px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(30px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
