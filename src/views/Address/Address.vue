<template>
  <section class="loginContainer">
    <div class="registerInner">
  
    <div>
   
      <HeaderTop title="填写收货信息">
        <a href="javascript:" slot="left" class="header_search" @click="$router.back()">
          <span class="header_login_text">
          &lt;
          </span>
        </a>
        <span class="header_login" slot="right">
        <router-link  :to="'/login'">
        <span class="header_login_text" v-if="!userInfo.id">
          登录|注册
        </span>
        </router-link>
        <span class="header_login_text" v-if="userInfo.id">
          {{userInfo.user_name}}
        </span>
        </span>
      </HeaderTop> 
    </div>

    <div class="login_header">
    <h3 class="address_logo">CVTE活动中心</h3>
      <div class="login_header_title">
        <h3 style="margin:0; ">请填写并认真核对您的收货信息，实物奖品我们将通过快递的形式寄送，具体发货时间请查看活动规则。</h3>
      </div>
    </div>

    <div class="login_content">
        <form @submit.prevent="postaddress">

          <div :class="{on: !loginWay}">
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="真实姓名" v-model="real_name">
              </section>
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="mobile">
            </section>
            
            <v-distpicker type="mobile" @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea"></v-distpicker>
         
            <section class="login_message">
              <input type="texteare" placeholder="详细地址" v-model="detail">
            </section>
          </div>
          <button class="login_submit">确定提交</button>
        </form>
         
      </div>
      <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"/>
     </div>
  </section>
</template>

<script>
import {mapState} from 'vuex'
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
import AlertTip from '../../components/AlertTip/AlertTip.vue'
import {reqAddressPost} from '../../api'
import VDistpicker from 'v-distpicker'

export default {
  data () {
    return {
      user_id: this.$store.state.userInfo.id,
      loginWay: false, // true代表短信登陆, false代表密码
      detail: '',
      mobile: '',
      real_name: '',
      province: '',
      city: '',
      district: '',
      alertText: '', // 提示文本
      alertShow: false // 是否显示警告框
    }
  },
  components: {
    HeaderTop,
    AlertTip,
    VDistpicker 
  },
  computed: {
    ...mapState(['userInfo'])
  },
    methods: {
    choose(){
      this.show=!this.show
    },
    onChangeProvince(a){
      this.province = a.value
    },    
    onChangeCity(a){
      this.city = a.value 
    },
    onChangeArea(a){
      this.district = a.value
      this.show=false
    },
 
    // 异步注册
    async postaddress () {
      let result
      // 前台表单验证
      const {user_id,province,city,district,detail} = this
      if (!this.province) {
        // 用户名必须指定
        this.showAlert('省份必须指定')
        return
      } else if (!this.city) {
        // 密码必须指定
        this.showAlert('市必须指定')
        return
      } else if (!this.district) {
        // 再次密码必须指定
        this.showAlert('区必须指定')
        return
      } else if (!this.detail) {
        // 密码必须指定
        this.showAlert('详细地址必须指定')
        return
      } 
     
      // 发送ajax请求密码登陆
      result = await reqAddressPost({ user_id,province,city,district,detail})
      
      // 根据结果数据处理
      if (result.code === 0) {
        this.showAlert('地址添加成功！')
        return
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
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
 .loginContainer
    width 100%
    height 100%
    background #fff
    .registerInner
      padding-top 20px
      width 80%
      margin 0 auto
      .login_header
        .address_logo
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
