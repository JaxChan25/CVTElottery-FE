<template>
  <div class="wap" v-title="'抽奖'" ref="wap">
    <div  class="banner" ref='ban' >
      <p class="priceChanceBtn">{{title}}</p>
      <p class="priceChanceBtn2">现在有{{people_apply}}人参加活动</p>
      <p style="display: none">{{remainingTimes}}</p>
      
    </div>

  <div class="box" ref="box">

        <div class="prizers">
          <div class="prizer">
            <div class="prizerList" id="prizerList">
              <ul id="prizerList1">
                <li v-for="(item,index) in roleprize" :key="index">
                  <span>{{rolename[index]}}</span>
                  <span>{{rolephone[index]}}</span>
                  <span class="prizeName">{{item.name}}</span>
                </li>
              </ul>
              <ul id="prizerList2"></ul>
            </div>
          </div>
        </div>

      <div class="container">
        <div class="item" v-for="(imgLi,index) in prizeList" :key="index" ref="pice" :style="{'background-color':'none'}">
          <p class="click" v-if="index==4 && clickFlage">点击<br>抽奖</p>
          <p class="unclick" v-if="index==4 && !clickFlage">点击<br>抽奖</p>
          <p class="times" v-if="index==7">你还有{{remainingTimes}}次抽奖机会</P>
          <img v-lazy="imgLi.image" v-if="imgLi.image" />
          <p class="name" v-if="imgLi.name">{{imgLi.name}}</P>
        </div>
      </div>
      <div >
        <a class="priceChanceBtn" @click="rule">活动规则</a>
        <a class="priceChanceBtn2" @click="record">中奖记录</a>
      </div>
  </div>
    

  <div class="massage" v-show="prizeInfoShow" @touchmove="touchMove($event)">

    <p v-if="notshow&&haverecord" style="color:#fff; text-align:center; margin-top:1rem">你已填写过地址</p>

      <div class="noPrize" v-if="noPrizeShow">
        <p class="noprize_p">很遗憾，您没有中奖</p>
        <div class="xiaofu">
          <img src="../../assets/img/lottery/noprize.png" alt="">
        </div>
        <div class="btn" @click="close()">
          下次再来
        </div>
      </div>

      

      <div class="PrizeShowing" v-if="havePrizeShow">
        <p class="p1">恭喜您获得</p>
        <p class="p2">{{prizeName}}</p>
        <div class="proImg">
          <img :src="prizeUrl" alt="">
        </div>
        <a class="btn1" @click="lotteryRecord">
          立即领取
        </a>
        <a class="btn2" @click="close_prize">
          返回抽奖
        </a>
        <p v-if="notshow" style="color:#fff; text-align:center">你已填写过地址</p>
      </div>


      <div class="havePrize" v-if="haverule">
        <p class="title">活动规则</p>
        <div style="height:200px;margin-top:0.5rem;margin-right:0.1rem">
          <happy-scroll color="rgba(0,0,0,0.5)" size="5" resize>
            <div class="message2" style="height:2000px;">
              <p class="list1" v-for="(datas,index) in rule_text" :key="index">{{datas}}</p>
            </div>
         </happy-scroll>          
        </div>
      </div>  
      <div class="close_" @click="closerule" v-if="haverule">
        <img class="close_btn" src="../../assets/img/lottery/close.png" alt="">
      </div>  


      <div class="havePrize" v-if="haverecord">
        <p class="title">中奖记录</p>
       <div style="height:200px;margin-top:0.5rem;margin-right:0.1rem">
          <happy-scroll color="rgba(0,0,0,0.5)" size="5" resize>
            <div class="message2" style="height:2000px;">
              <p class="list" v-for="(datas,index) in user_prizes" :key="index">{{datas.level}} {{datas.name}} {{datas.created_at}}</p>
            </div>
          </happy-scroll>          
        </div>


        <a class="know" @click="closerecord">
          我知道了
        </a>
        <a class="know2" @click="lotteryRecord">
          填写地址
        </a>
      </div>


      <div class="haveLottery" v-if="haveLottery">
        <div class="xiaofu">
          <img src="../../assets/img/lottery/receivedXF1.png" alt="">
        </div>
        <p>您没有抽奖次数啦</p>
        <div class="btn" @click="close()">
          我知道啦
        </div>
      </div>

      <div class="haveLottery" v-if="no_act">
        <div class="xiaofu">
          <img src="../../assets/img/lottery/receivedXF1.png" alt="">
        </div>
        <p>活动还没开始</p>
        <div class="btn" @click="closeact()">
          我知道啦
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import isSelect from '@/assets/img/lottery/isselect.png'
import {mapState} from 'vuex'
import {reqActivity} from '../../api'
import {reqSurplustimes} from '../../api'
import {reqDrawLottery} from '../../api'
import {reqUserPrizes} from '../../api'
import {reqActivityPrizes} from '../../api'
import {reqAddress} from '../../api'
import { Toast } from 'mint-ui'
export default {
    data () {
    return {
      game_user_id: this.$store.state.userInfo.id,
      activity_id: parseInt(this.$route.params.activityID),
      surplus_time:'',
      alertText: '', // 提示文本
      alertShow: false, // 是否显示警告框
      //抽奖
        swiperName: { // 获奖名单
        loop: true, // 当获奖人数大于等于5的时候滚动，否则不滚动
        direction: 'vertical',
        slidesPerView: 5,
        freeMode: true,
        freeModeMomentum: true,
        freeModeMomentumVelocityRatio: 1,
        autoplay: 1000
      },
      // mobile: '15114785236',
      prizeIndex: 0,
      arrNum: [0, 1, 2, 5, 8, 11, 10, 9, 6, 3], // 定义转动的顺序
      clickFlage: true, // 点击事件，防止重复点击
      rolename:['陈若邻','陈亮','尹文彪','黄树炫','张冠杰','陈若邻','陈亮','尹文彪','黄树炫','张冠杰'],
      rolephone:['159****9355','135****6896','189****5139','138****8961','159****9355','135****6896','189****5139','138****8961','159****9355','138****8961',],
      roleprize:[],
      prizeInfoShow: false, // 显示中奖信息的遮罩层
      noPrizeShow: false, // 没中奖
      havePrizeShow: false, // 中奖了
      haveLottery: false, // 已经抽过奖了
      haverule:false,
      haverecord:false,
      no_act:false,
      timer1: '',
      timer2: '',
      s1: '',
      s2: '',
      winnerNum: '20',
      prizeDesc: [], // 奖品说明
      lotteryDesc: [], // 活动说明
      hasRecord: false, // 是否显示获奖情况
      remainingTimes: '', // 剩余抽奖次数
      prizeList: [], // 奖项列表
      prizeLevel: '', // 中奖等级
      prizeName: '', // 奖品名称
      prizeUrl: '', // 奖品图片
      prizers: [], // 获奖名单
      timeFlag: 0, // 时间标记，抽奖请求时间过长，则返回错误
      startStatus: '', // 活动开始的状态
      title:'',//活动名称
      people_apply:0,
      rule_text:[],
      prizeid:'',
      user_prizes:[],
      haveprize:'',
      hasaddress: false,
      notshow:false,
    }
  },

  beforeRouteEnter (to, from, next) {
    document.title = '抽奖'
    next()
  },

  computed: {
    ...mapState(['userInfo'])
  },

  mounted () {
    this.$nextTick(() => {
      this.get()
    })
    this.getSuplustimes()
    this.getPrizes()
    this.getPrizers()
    this.haveaddress()
  },

  // 销毁组件重新加载
  deactivated () {
    this.$destroy()
  },
  methods: {

   async get () {
      let res
      res = await reqActivity(this.activity_id)     
      // 根据结果数据处理
      if (res.code === 0) {
        this.roleprize = JSON.parse(JSON.stringify(res.data.game_prizes)) 
        this.prizeList = res.data.game_prizes
        this.prizeList.splice(4, 0, ' ')
        this.prizeList.splice(7, 0, ' ')
        console.log(this.prizeList)
        this.title=res.data.name
        this.people_apply=res.data.virtual_num+res.data.participate_num
        this.rule_text=res.data.rule_text.split("\\r\\n")
        this.startStatus=1
        //console.log(res.data.banner_image)
        this.$refs.ban.style.backgroundImage = 'url(' + res.data.banner_image + ')'
        this.$refs.box.style.backgroundImage = 'url(' + res.data.lottery_image + ')'
        this.$refs.wap.style.backgroundColor = res.data.background_color
        if (this.prizeList && this.prizeList.length > 1) {
          this.prizerListScroll()
         } 
        this.prizeZhuan()
      } 
      else {
          Toast({
            message: res.bizMessage,
            position: 'middle',
            duration: 1500
          })
        }
    },


    async haveaddress(){
      let res
      res = await reqAddress(this.activity_id)    
      // 根据结果数据处理
      if (res.code === 0) {
        this.hasaddress=true
      }
    },

    async getSuplustimes () {
      let result
      const {game_user_id,activity_id} = this
      result = await reqSurplustimes({game_user_id,activity_id})    
      // 根据结果数据处理
      if (result.code === 0) {
        this.remainingTimes = result.data        
      } else {
        const msg = result.msg
        this.showAlert(msg)
      }
    },

    async getPrizes(){
      let result
      const {game_user_id,activity_id} = this
      result = await reqUserPrizes({game_user_id,activity_id})   
      if (result.code === 0) {
        console.log(result.data.items)
        this.user_prizes = result.data.items       
      } else {
        const msg = result.msg
        this.showAlert(msg)
      }
    },

    async getPrizers(){
      let result
      const {activity_id} = this
      result = await reqActivityPrizes({activity_id})   
      if (result.code === 0) {
        console.log(result.data.items)
        this.prizers = result.data.items       
      } else {
        const msg = result.msg
        this.showAlert(msg)
      }
    },

    
    move () {

      this.prizeIndex++
      this.$refs.pice[this.arrNum[(this.prizeIndex-1)%10]].style.backgroundImage = 'none'
      this.$refs.pice[this.arrNum[this.prizeIndex%10]].style.backgroundImage = 'url(' + isSelect + ')'

      if (this.s2 && this.prizeList[this.arrNum[this.prizeIndex%10]].id == this.s2) {
        console.log("come in please")
        clearInterval(this.timer1)
        clearInterval(this.timer2)
        this.stop()
      }

      this.timeFlag += 100
      if (this.timeFlag >= 10000 && !this.prizeName) {
        clearInterval(this.timer1)
        clearInterval(this.timer2)
        Toast({
          message: '当前抽奖人数过多，稍后再来',
          position: 'middle',
          duration: 1500
        })
        this.clickFlage = true// 能点击
        setTimeout(() => { // 刷新后重新加载
          location.reload()
        }, 1500)
      }
    },

    // 停止
    stop () {
      this.clickFlage = false// 不能点击
      this.prizeInfo() // 弹出是否中奖
    },

    // 降速
    lowSpeed () {
      console.log("in2")
      clearInterval(this.timer1)
      this.timer2 = setInterval(this.move, 300)
      setTimeout(() => { // 顺序打乱
          this.s2=this.prizeid
      }, 900)
    },

    // 获奖名单滚动
    prizerListScroll () {
      this.$nextTick(() => {
        var prizerList2 = document.getElementById('prizerList2')
        var prizerList1 = document.getElementById('prizerList1')
        var prizerList = document.getElementById('prizerList')
        prizerList2.innerHTML = prizerList1.innerHTML
        setInterval(() => {
          // if (this.prizerList.scrollTop >= (this.prizerList1.offsetHeight - this.prizerList.offsetHeight)) {
          if (prizerList.scrollTop >= prizerList1.offsetHeight) {
            prizerList.scrollTop = 0
          } else {
            prizerList.scrollTop++
          }
        }, 60)
      })
    },
    

    async lottery()
    {
      let res
      const {game_user_id,activity_id}=this
      res = await reqDrawLottery({game_user_id,activity_id})
      if(res.code===0)
      {
        this.remainingTimes--  
        this.prizeid=res.data.id
        this.prizeLevel = res.data.level
        this.prizeName = res.data.name
        this.prizeUrl = res.data.image
        this.haveprize = res.data.if_win //1 no 2 yes
        this.timer1 = setInterval(this.move, 100)                            
        setTimeout(() => {
         clearInterval(this.timer1)
         this.lowSpeed()
        }, 1200)
      }
      else
      {
        this.prizeInfoShow = true
        this.no_act = true
      }
    },

    prizeZhuan () {
      this.$nextTick(() => {
        this.$refs.pice[4].onclick = () => {
          if (this.remainingTimes > 0) { // 判断剩余抽奖次数
            if (this.clickFlage) {
              this.lottery()
            }
          } 
          else { // 没有抽奖机会了
            this.prizeInfoShow = true
            this.haveLottery = true
          }
        }
      })
    },

    touchMove (e) {
      e.preventDefault()// 禁止滚动
      e.stopPropagation()
    },

    prizeInfo () {
      setTimeout(() => {
        this.prizeInfoShow = true      
        if(this.haveprize==1)
          this.noPrizeShow=true
        else
          this.havePrizeShow = true
      }, 800)
    },

    close () { // 关闭没中奖
      this.prizeInfoShow = false
      this.noPrizeShow = false
      this.haveLottery = false
      this.clickFlage = true
    },

    closeact () { // 关闭没中奖
      this.prizeInfoShow = false
      this.noPrizeShow = false
      this.no_act = false
      this.clickFlage = true
    },

    close_prize () { // 关闭没中奖
      this.prizeInfoShow = false
      this.havePrizeShow = false
      this.haveLottery = false
      this.clickFlage = true
      this.notshow=false
    },

    goIndex () {
      this.$router.push({ name: 'preferIndex' })
      this.prizeInfoShow = false // 显示中奖信息的遮罩层
      this.noPrizeShow = false// 没中奖
    },
    rule(){
      this.prizeInfoShow=true
      this.haverule=true
    },
    record(){
      this.prizeInfoShow=true
      this.haverecord=true
    },
    closerecord(){
      this.prizeInfoShow=false
      this.haverecord=false
      this.notshow=false
    },
    closerule(){
      this.prizeInfoShow=false
      this.haverule=false
    },

    lotteryRecord () {
      if(this.hasaddress)
      {
        this.notshow=true
      }
      else
        this.$router.replace('/address')
    }

  }
}
</script>

<style lang="less" scoped>
.wap {
  background: linear-gradient( #ff6412, #ff7d16); // background: #439AF7;
  
  .banner {
    width: 100%;
    height: 2.3rem;
    position: relative;
    //background-image: url(../../assets/img/lottery/banner.png);
    background-size: cover;
    background-position: bottom;
    .prizeInfoBtn {
      width: 2rem;
      height: 1.27rem;
      position: absolute;
      top: 0;
      right: 0;
      .prizeInfoBtnImg {
        width: 2rem;
        height: 1.27rem;
      }
    }
    .priceChanceBtn {
      // width: 3.1rem;
      height: 0.8rem;
      //border-radius: 0.8rem;
      //background-color: #ff7a00;
      position: absolute;
      margin-top: 0.2rem;
      left: 50%;
      transform: translateX(-50%);
      line-height: 0.8rem;
      font-size: 0.40rem;
      color: #fff;
      font-weight: 500;
      text-align: center;
      padding: .06rem .4rem;
    }

    .priceChanceBtn2 {
      width: 5rem;
      height: 0.6rem;
      //border-radius: 0.6rem;
      //background-color: #ff7a00;
      position: absolute;
      margin-top: 1rem;
      left: 50%;
      transform: translateX(-50%);
      line-height: 0.6rem;
      font-size: 0.34rem;
      color: #fff;
      font-weight: 500;
      text-align: center;
      padding: .06rem .4rem;
    }
    .whiteBar {
      position: absolute;
      z-index: 0;
      transform: rotate(-30deg);
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .whiteBar1 {
      top: 4rem;
      left: -3rem;
      width: 7.9rem;
      height: 1.8rem;
    }
    .whiteBar2 {
      top: 4.2rem;
      right: -2rem;
      width: 7.9rem;
      height: 2.3rem;
    }
    .whiteBar3 {
      top: 9.3rem;
      left: -1.8rem;
      width: 7.9rem;
      height: 1.75rem;
    }
    .whiteBar4 {
      top: 9.2rem;
      left: 2.5rem;
      width: 7.9rem;
      height: 1.36rem;
    }
  }
  overflow: hidden;
  .box {
    margin: 0 auto;
    margin-bottom: 3rem;
    width: 6.9rem;
    height: 7.5rem;
    padding: 0.35rem;
    background: no-repeat;
    background-size: contain;
    background-position: center;
    border-radius: 0.2rem;
    box-sizing: border-box;
    position: relative;
    .container{
    margin-top: 0.2rem;
    margin-left: 0.24rem;
    width: 100%;
    height: 100%;
    }
    .priceChanceBtn {
      width: 2rem;
      background-color: #ff7a00;
      position: absolute;
      margin-top: 0.2rem;
      left: 25%;
      transform: translateX(-50%);
      font-size: 0.40rem;
      background-image: linear-gradient(180deg, #FFE077 0%, #FFC541 100%);
      border-radius: 25px;
      border-radius: 25px;
      font-weight: 500;
      text-align: center;
      padding: 0.15rem .4rem;
    }
    .priceChanceBtn2 {
      width: 2rem;
      background-color: #ff7a00;
      position: absolute;
      margin-top: 0.2rem;
      left: 75%;
      transform: translateX(-50%);
      font-size: 0.40rem;
      background-image: linear-gradient(180deg, #FFE077 0%, #FFC541 100%);
      border-radius: 25px;
      border-radius: 25px;
      font-weight: 500;
      text-align: center;
      padding: 0.15rem .4rem;
    }
    .times{
      margin-top: 0.2rem;
      font-size: 0.30rem;
      color: #fff;
      font-weight: 500;
      text-align: center;
    }
    .click{
      margin-top: 0.2rem;
      font-size: 0.40rem;
      color: #fff;
      font-weight: 500;
      text-align: center;
    }
    .unclick{
      margin-top: 0.2rem;
      font-size: 0.40rem;
      color: #000;
      font-weight: 500;
      text-align: center;
    }
    .name{
      font-size: 0.20rem;
      color: #000;
      font-weight: 500;
      text-align: center;
    }
    .report{
      margin-top: 0.1rem;
      font-size: 0.30rem;
      color: #fff;
      font-weight: 500;
      text-align: center;
    }
    .item {
      // background: url('../../assets/img/lottery/border.png') no-repeat;
      background-size: 100%;
      float: left;
      width: 1.8rem;
      height: 1.35rem;
      margin-left: 0.065rem;
      margin-right: 0.065rem;
      margin-top: 0.06rem;
      margin-bottom: 0.06rem;
      position: relative;
      &:nth-child(3n) {
        margin-right: 0;
      } 

      box-sizing: border-box;
      img {
        width: 1rem;
        height: 1rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  .prizers {
    height: 0.5rem;
    width: 5rem;
    position: relative;
    text-align: center;
    margin-left: 0.8rem;
    .prizer {
      width: 5rem;
      height: 0.45rem;
      margin-top: 0.07rem;
      top: 0.16rem;
      left: 0.35rem;
      right: 0.35rem;
      overflow: hidden;
      box-sizing: border-box;
      .prizeIcon {
        width: 5.8rem;
        height: 0.6rem;
        margin-bottom: 0.3rem;
        img {
          width: 100%;
          height: 100%;
        }
      } // .swiper-container {
      .prizerList {
        z-index: 0;
        height: 3.1rem;
        overflow: hidden; // .swiper-slide {
        li {
          line-height: 0.45rem;
          font-size: 0.20rem;
          color: #232323; // margin-bottom: .2rem;
          overflow: hidden;
          span {
            &:first-child {
              display: block;
              float: left;
              margin-right: 0.63rem;
              width: 0.6rem;
              text-align: justify; //两端对齐
              text-align-last: justify;
            }
            &:nth-child(2) {
              float: left;
              width: 1.7rem;
            }
            &:last-child {
              float: right; // display: inline-block;
              text-align: right;
              display: -webkit-box;
              word-break: break-all;
              text-overflow: ellipsis;
              overflow: hidden;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              width: 2rem;
            }
          }
        }
      }
    }
  }
  .info {
    // width:6.9rem;
    // margin: 0 auto;
    .title {
      width: 2.5rem;
      height: 0.48rem;
      position: relative;
      overflow: hidden;
      margin-left: 50%;
      transform: translateX(-50%);
      vertical-align: middle;
      .squire1 {
        float: left;
      }
      .squire2 {
        float: right;
      }
      .squire {
        width: 0.37rem;
        height: 0.48rem;
        img {
          display: inline-block;
          line-height: 0.48rem;
          width: 0.37rem;
          height: 0.08rem;
          vertical-align: middle;
        }
      }
      span {
        display: blcok;
        position: absolute;
        text-align: justify; //两端对齐
        text-align-last: justify;
        width: 1.4rem;
        left: 50%;
        transform: translateX(-50%);
        font-size: 0.34rem;
        color: #fff;
        font-weight: 700;
        float: left;
        line-height: 0.48rem;
      }
    }
    .infoContent {
      width: 6.9rem;
      height: auto;
      margin: 0.3rem;
      background-color: #62abff;
      padding: 0.3rem 0.2rem;
      box-sizing: border-box;
      ul {
        margin-left: 0.3rem;
        li {
          //  list-style-image: url('../../assets/img/lottery/point.png');
          list-style-type: disc;
          list-style-position: outside;
          font-size: 0.26rem;
          color: #fff;
          text-align: left;
          margin-bottom: 0.5rem;
          position: relative;

          img {
            position: absolute;
            top: 0.15rem;
            left: 0.1rem;
            width: 0.1rem;
            height: 0.1rem;
            float: left;
            margin-right: 0.1rem;
            vertical-align: middle;
          }
        }
      }
    }
  }

  .massage {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    .noPrize {
      width: 100%;
      height: 100%;
      
      .noprize_p{
        margin-top: 3.5rem;
        font-family: PingFangSC-Semibold;
        font-size: 24px;
        color: #FFFFFF;
        text-align: center;
        line-height: 18px;
      }
      .xiaofu {
        width: 3rem;
        height: 2rem;
        border-radius: 100%;
        margin: 0 auto 0.6rem;
        img {
          margin-top: 0.5rem;
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      .btn {
        width: 3.7rem;
        height: 0.9rem;
        margin: 0 auto;
        background: url("../../assets/img/lottery/btn.png") no-repeat;
        background-size: 100%;
        font-size: 0.36rem;
        color: #fff;
        line-height: 0.9rem;
        text-align: center;
        font-weight: 600;
      }
    }
    .haveLottery {
      width: 5.3rem;
      height: 4.4rem;
      background-color: #fff;
      position: absolute;
      top: 3.2rem;
      left: 1.1rem;
      border-radius: 0.4rem;
      .close {
        position: absolute;
        width: 0.51rem;
        height: 0.51rem;
        top: -0.8rem;
        right: 0;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .xiaofu {
        width: 1.7rem;
        height: 1.7rem;
        margin: 0.3rem auto 0.2rem;
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      p {
        font-size: 0.3rem;
        color: #707070;
        margin: 0.21rem auto 0.37rem;
        text-align: center;
      }
      .btn {
        width: 3.7rem;
        height: 0.9rem;
        margin: 0 auto;
        background: url("../../assets/img/lottery/btn.png") no-repeat;
        background-size: 100%;

        font-size: 0.36rem;
        color: #fff;
        line-height: 0.9rem;
        text-align: center;
        font-weight: 600;
      }
    }
    .circleLight {
      width: 9.22rem;
      height: 9.22rem;
      position: absolute;
      
      top: 0.8rem;
      left: 50%;
      margin-left: -4.61rem;
      -webkit-animation: rotate 20s infinite linear;
      animation: rotate 20s infinite linear;
      transform-origin: 50% 50%;
    }
    @-webkit-keyframes rotate {
      0% {
        -webkit-transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
      }
    }
    @keyframes rotate {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    .PrizeShowing {
      width: 100%;
      height: 100%;
      .p1{
        font-family: PingFangSC-Semibold;
        font-size: 18px;
        color: #FFFFFF;
        text-align: center;
        line-height: 18px;
        margin-top: 2rem;
      }
      .p2{
        margin-top: 0.4rem;
        font-family: PingFangSC-Semibold;
        font-size: 30px;
        color: #FFCA51;
        text-align: center;
        line-height: 30px;
      }
      .proImg {
        width: 5rem;
        height: 5rem;
        margin: 0 auto 0.36rem;
        line-height: 2rem;
        text-align: center;
        img {
          margin-top: 0.4rem;
          width: 100%;
          height: 100%;
        }
      }
      .btn1 {
        width: 1.6rem;
        position: absolute;
        margin-top: 0.4rem;
        left: 30%;
        transform: translateX(-50%);
        font-size: 0.40rem;
        border-radius: 25px;
        border-radius: 25px;
        font-weight: 500;
        color: #fff;
        border: 1px solid #FFFFFF;
        text-align: center;
        padding: 0.27rem .4rem;
      }
      .btn2 {
        width: 1.6rem;
        background-color: #ff7a00;
        position: absolute;
        margin-top: 0.4rem;
        left: 70%;
        transform: translateX(-50%);
        font-size: 0.40rem;
        background-image: linear-gradient(180deg, #FFE077 0%, #FFC541 100%);
        border-radius: 25px;
        border-radius: 25px;
        font-weight: 500;
        text-align: center;
        padding: 0.27rem .4rem;
      }
    }

    .close_{
      margin-top: 9.4rem;
      text-align: center;
      .close_btn{
        height: 0.7rem;
        width: 0.7rem;
      }    
    }


      .havePrize {
      width: 5.3rem; 
      height: 6.1rem;
      padding-bottom: 0.5rem;
      border-radius: 0.4rem;
      position: absolute;
      top: 2.42rem;
      left: 1.1rem;
      background: #fff;
      .know{
        width: 1.2rem;
        background: #EEEEEE;
        position: absolute;
        bottom: 0.3rem;
        left: 30%;
        transform: translateX(-50%);
        font-size: 0.24rem;
        border-radius: 25px;
        border-radius: 25px;
        font-weight: 500;
        text-align: center;
        padding: 0.2rem .35rem;
      }
      .know2{
        width: 1.2rem;
        background-image: linear-gradient(180deg, #FFE077 0%, #FFC541 100%);
        position: absolute;
        bottom: 0.3rem;
        left: 70%;
        transform: translateX(-50%);
        font-size: 0.24rem;
        border-radius: 25px;
        border-radius: 25px;
        font-weight: 500;
        text-align: center;
        padding: 0.2rem .35rem;
      }
      .title{
        font-family: PingFangSC-Semibold;
        font-size: 18px;
        font-weight: 600;
        color: #333333;
        text-align: center;
        line-height: 18px;
        margin-top: 0.5rem;
      }
      .message{
        margin-top: 0.5rem;
        height: 5rem;
        width: 4.7rem;
        font-family: MicrosoftYaHei;
        font-size: 12px;
        color: #666666;
        line-height: 21px;
        text-align:center;
        margin: 0.5rem auto;
      }
      .message2{
        height: 5rem;
        width: 4.7rem;
        font-family: MicrosoftYaHei;
        font-size: 12px;
        color: #666666;
        line-height: 21px;
        text-align:center;
      }
      .list1{
        margin-left: 0.2rem;
        font-size: 0.24rem;
      }
      .list{
        margin-left: 0.2rem;
        font-size: 0.26rem;
        height: 0.9rem;
        line-height: 0.9rem;
        border-bottom:1px solid #EEEEEE
      }
      .proImg {
        width: 4.1rem;
        height: 4.1rem;
        margin: 0 auto 0.36rem;
        line-height: 2rem;
        text-align: center;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .btn {
        width: 3rem;
        height: 0.9rem;
        line-height: 0.9rem;
        margin-top: 3rem;
        margin: 0 auto;
        background: url("../../assets/img/lottery/btn.png") no-repeat;
        background-size: 100%;
        text-align: center;
        a {
          height: 0.9rem;
          font-size: 0.36rem;
          margin: 0 auto;
          color: #fff;
          line-height: 0.9rem;
          text-align: center;
          font-weight: 600;
        }
      }
    }



  }
}
</style>