<template lang="html">
    <div class="container">
      <progress :percent="percent" activeColor="#EA5149"></progress>
      <p>{{year}}年已经过去了{{days}}天,{{percent}}%</p>
    </div>
</template>

<script>
export default {
  methods: {
    // 判断是否是闰年 闰年366天 平年365天
    isLeapYear (year) {
      if (year % 400 === 0) {
        return true
      } else if (year % 4 === 0 && year % 100 !== 0) {
        return true
      } else {
        return false
      }
    },
    getDayofYear (year) {
      return this.isLeapYear(year) ? 366 : 365
    }
  },
  // 计算属性是属性不是方法不能用()
  computed: {
    year () {
      const year = new Date().getFullYear()
      return year
    },
    days () {
      // 设置一年第一天
      const start = new Date()
      start.setMonth(0)
      start.setDate(1)
      // 时间戳
      let offset = new Date().getTime() - start.getTime()
      return parseInt(offset / 1000 / 60 / 60 / 24) + 1
    },
    percent () {
      let total = this.getDayofYear(this.year)
      return (this.days * 100 / total).toFixed(1)
    }

  }
}
</script>

<style scoped lang="scss">
  .container {
    margin-bottom: 50px;
    text-align: center;
    progress {
      margin-bottom: 10px;
    }
  }
</style>
