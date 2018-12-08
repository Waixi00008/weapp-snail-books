<template lang="html">
    <div class="highlight">
      <p>{{title}}</p>
      <p>{{subtitle}}</p>
    </div>
</template>

<script>
export default {
  props: ['title', 'subtitle'],
  components: {

  }
}
</script>

<style scoped>
  .highlight {
    color: red;
  }
</style>
