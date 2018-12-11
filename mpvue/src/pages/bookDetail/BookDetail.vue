<template lang="html">
    <div>
      详情页id:{{bookid}}
    </div>
</template>

<script>
import { get } from '@/utils/index'
export default {
  components: {

  },
  props: {

  },
  data () {
    return {
      bookid: '',
      bookDetail: []
    }
  },
  methods: {
    async BookDetail (id) {
      const res = await get('/weapp/bookDeatil', {id})
      this.bookDetail = res.data.bookDetail
      console.log(this.bookDetail)
    }
  },
  computed: {

  },
  created () {
  },
  mounted () {
    this.bookid = this.$root.$mp.query.id
    this.BookDetail(this.bookid)
  },
  watch: {

  }
}
</script>

<style scoped lang="scss">

</style>
