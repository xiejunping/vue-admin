<template>
  <iframe :src="src" width="100%" height="100%" frameborder="0"></iframe>
</template>
<script>
export default {
  name: 'frame',
  computed: {
    src () {
      return this.$route.query.href
    }
  }
}
</script>
<style lang="stylus" scoped>

</style>
