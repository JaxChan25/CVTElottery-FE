<template>
<body  style="background-color: #ff6412; margin: 0 auto; text-align: center;">
  <div class="end">
		<section class="title">
			<p style="font-size: 70px; font-weight: 800;">幸运大转盘</p>
			<p style="font-size: 50px; font-weight: 400;">已有9999人参与</p>
		</section>

		<div class="draw" id="lottery">
			<div class="note">
				<p style="font-size: 40px;">XXX获奖了</p>
			</div>
			<div class="mytable">
				<table style="margin: auto;">
					<tr>
						<td class="item lottery-unit lottery-unit-0">
							<div class="img">
								<img src="images/img1.png" alt="">
							</div>
							<span class="name">虚拟主机 1元/年</span>
						</td>
						<td class="gap"></td>
						<td class="item lottery-unit lottery-unit-1">
							<div class="img">
								<img src="images/img2.png" alt="">
							</div>
							<span class="name">VPS 1元/30天</span>
						</td>
						<td class="gap"></td>
						<td class="item lottery-unit lottery-unit-2">
							<div class="img">
								<img src="images/img3.png" alt="">
							</div>
							<span class="name">.top域名 1元/年</span>
						</td>
					</tr>
					<tr>
						<td class="gap-2" colspan="5"></td>
					</tr>
					
					<tr>
						<td class="item lottery-unit lottery-unit-9">
							<div class="img">
								<img src="images/img1.png" alt="">
							</div>
							<span class="name">虚拟主机 1元/年</span>
						</td>
						<td class="gap"></td>
						<td  rowspan="3">
							<a class="draw-btn" href="javascript:">立即抽奖</a>
						</td>
						<td class="gap"></td>
						<td class="item lottery-unit lottery-unit-3">
							<div class="img">
								<img src="images/img3.png" alt="">
							</div>
							<span class="name">.top域名 1元/年</span>
						</td>
					</tr>
					<tr>
						<td class="gap-2" colspan="5"></td>
					</tr>
					
					<tr>
						<td class="item lottery-unit lottery-unit-8">
							<div class="img">
								<img src="images/img1.png" alt="">
							</div>
							<span class="name">虚拟主机 1元/年</span>
						</td>
						<td class="gap"></td>
						
						<td class="gap"></td>
						<td class="item lottery-unit lottery-unit-4">
							<div class="img">
								<img src="images/img3.png" alt="">
							</div>
							<span class="name">.top域名 1元/年</span>
						</td>
					</tr>
					<tr>
						<td class="gap-2" colspan="5"></td>
					</tr>
					
					<tr>
						<td class="item lottery-unit lottery-unit-7">
							<div class="img">
								<img src="images/img7.png" alt="">
							</div>
							<span class="name">.com域名 19元/年</span>
						</td>
						<td class="gap"></td>
						<td class="item lottery-unit lottery-unit-6">
							<div class="img">
								<img src="images/img6.png" alt="">
							</div>
							<span class="name">CDN加速 10元/15天</span>
						</td>
						<td class="gap"></td>
						<td class="item lottery-unit lottery-unit-5">
							<div class="img">
								<img src="images/img8.png" alt="">
							</div>
							<span class="name">20元快云币</span>
						</td>
					</tr>
				</table>
			</div>
		</div>

    <button class="mybotton">活动规则</button>
    <button class="mybotton">中奖记录</button>
  </div>
</body>

</template>

<script>
import {mapState} from 'vuex'
//import AlertTip from '../../components/AlertTip/AlertTip.vue'
import { MessageBox, Toast } from 'mint-ui'
export default {
    data () {
    return {
      user_id: this.$store.state.userInfo.id,
      activity_id:this.$route.params.activityID,
      surplus_time:'',
      alertText: '', // 提示文本
      alertShow: false // 是否显示警告框
    }
  },
  components: {
    //AlertTip
  },
  computed: {
    ...mapState(['userInfo'])
  },
    methods: {
    logout () {
      MessageBox.confirm('确认退出吗?').then(
          Toast('退出成功')

      )
    }//end logout
  }
}
</script>

<style>
@import url("./css/style.css");

</style>
