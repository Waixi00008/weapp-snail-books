<template lang="html">
  <div class="title">
    <p>{{title}}</p>
    <p>{{subtitle}}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    subtitle: String
  }
}
</script>

<style scoped lang="css">
.title {
  color: red;
}
</style>
