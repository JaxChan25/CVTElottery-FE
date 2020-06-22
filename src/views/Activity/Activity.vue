<template>
<div>


</div>
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
      alertShow: false, // 是否显示警告框
    }
  },
  components: {
    //AlertTip
  },
  computed: {
    ...mapState(['userInfo'])
  },
  mounted:{
    //let scrollTimer = setInterval(this.scroll, 2000);
  },
  methods: {
    logout () {
      MessageBox.confirm('确认退出吗?').then(
          Toast('退出成功')

      )
    },//end logout
  }
}
</script>

<style>
</style>
