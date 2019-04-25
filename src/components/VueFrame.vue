<template>
  <iframe :src="src" width="100%" height="100%" frameborder="0"></iframe>
</template>
<script>
export default {
  name: 'vueFrame',
  props: {
    src: {
      type: String
    }
  }
}
</script>
<style lang="stylus" scoped>

</style>
