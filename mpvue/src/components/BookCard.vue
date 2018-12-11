<template lang="html">
  <div class="container">
    <a :href="detailUrl">
      <div class="book-card">
        <div class="thumb" @click.stop="preview">
          <img :src="book.imageUrl"
              class="avatar"
              :alt="book.title"
          />
        </div>
        <div class="detail">
          <div class="row text-primary">
            <div class="left">
              <span class="title">{{book.title}}</span>
            </div>
            <div class="right text-primary">
              <Star :value="book.rate"/>
              <span class="rating">{{book.rate}}</span>
            </div>
          </div>
          <div class="row">
            <div class="left">
              <span class="author">{{book.author}}</span>
            </div>
            <div class="right text-primary">
              <span class="count">浏览:{{book.count}}</span>
            </div>
          </div>
          <div class="row">
            <div class="left">
              <span class="publisher">{{book.publisher}}</span>
            </div>
            <div class="right">
              <span class="adduser">添加人:{{book.user_info.nickName}}</span>
            </div>
          </div>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
import Star from '@/components/Star'
export default {
  components: {
    Star
  },
  props: ['book'],
  data () {
    return {

    }
  },
  methods: {
    preview () {
      wx.previewImage({
        current: this.book.imageUrl,
        urls: [this.book.imageUrl]
      })
    }
  },
  computed: {
    detailUrl () {
      return '/pages/bookDetail/main?id=' + this.book.id
    }
  },
  mounted () {
  }
}
</script>

<style scoped lang="scss">
.book-card{
  background: white;
  box-sizing: border-box;
  padding:10px;
  overflow: hidden;
  margin-top:5px;
  margin-bottom:5px;
  font-size:14px;
  .thumb{
    box-sizing: border-box;
    width:90px;
    height:90px;
    float: left;
    margin:0 auto;
    overflow:hidden;
    .avatar{
      max-width: 100%;
      max-height: 100%;
    }
  }
  .detail{
    float: left;
    margin-left: 10px;
    width:calc(100% - 110px);
    overflow: hidden;
    .row{
      line-height:20px;
      margin-bottom:3px;
      .left{
        float: left;
        .title,.author,.publisher {
          display: inline-block;
          width: 300rpx;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .right{
        float: right;
      }
    }
  }
}
</style>
