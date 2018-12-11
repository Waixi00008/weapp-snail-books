<template lang="html">
  <div class="comment-list">
    <div class="page-title" v-if='commentList.length'>
      评论
    </div>
    <div class="comment"
        v-for='comment in commentList'
        :key='comment.id'
        @click='handleClick(comment)'
        >
      <div class="user">
        <div class="inline">
          <img :src="comment.user_info.avatarUrl"
                class="avatar"
                mode='aspectFit'
            >
          {{comment.user_info.nickName}}
        </div>
        <div class="right">
          {{comment.location||'未知地点'}}
          <span class="text-primary">
            --
          </span>
          {{comment.phone||'未知型号'}}
        </div>
      </div>
      <div class="content">
        {{comment.comment}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['commentList', 'type'],
  methods: {
    handleClick (comment) {
      if (this.type === 'user') {
        wx.navigateTo({
          url: '/pages/bookDetail/main?id=' + comment.bookid
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.comment-list{
  background:#eee;
  font-size:14px;
  .page-title {
    font-size: 20px;
    line-height: 30px;
    padding-left: 10px;
  }
  .right {
    float: right;
  }
  .comment{
    background: white;
    margin-bottom:10px;
    padding:5px 10px;
    .content{
      margin:10px 0;
    }
    .user{
      .inline{
        display:inline;
        .avatar{
          width:20px;
          height:20px;
          border-radius: 50%;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
