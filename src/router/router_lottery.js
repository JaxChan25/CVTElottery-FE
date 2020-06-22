export const lottery = {
  path: '/lottery/lottery', // 抽奖
  name: 'lottery',
  component (resolve) {
    require.ensure(['../views/lottery/lottery.vue'], () => {
      resolve(require('../views/lottery/lottery.vue'))
    })
  }
}
export const lotteryRecord = {
  path: '/lottery/lotteryRecord', // 获奖记录
  name: 'lotteryRecord',
  component (resolve) {
    require.ensure(['../views/lottery/lotteryRecord.vue'], () => {
      resolve(require('../views/lottery/lotteryRecord.vue'))
    })
  }
}
