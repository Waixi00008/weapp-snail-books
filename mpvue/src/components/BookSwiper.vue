<template lang="html">
  <div class="container">
    <swiper
      indicator-dots="true"
      indicator-active-color="#EA5149"
      autoplay="true"
      interval="6000"
      duration="1000"
      circular="true"
    >
      <div :key='n' v-for="(books,n) in top">
        <swiper-item class="item-container">
          <img @click='bookDetail(book)' :key='book.isbn' v-for="book in books" :src="book.imageUrl" class="slide-image" mode="aspectFit"/>
        </swiper-item>
      </div>
    </swiper>
  </div>
</template>

<script>
export default {
  props: ['top'],
  methods: {
    bookDetail (item) {
      wx.navigateTo({
        url: '/pages/bookDetail/main?id=' + item.id
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .container {
    margin-top:5px;
    margin-bottom:30px;
    width: 100%;
    height: 250rpx;
    .slide-image {
      width:33%;
      height:250rpx;
    }
  }
</style>
