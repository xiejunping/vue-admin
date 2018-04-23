<template>
  <div class="c-particle"></div>
</template>

<script>
import Particle from 'zhihu-particle'
export default {
  name: 'particle',
  mounted () {
    /* eslint-disable no-new */
    new Particle(this.$el, {
      atomColor: '#cceaff',
      interactive: true,
      density: 'low'
    })
  }
}
</script>

<style scoped>
  .c-particle {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    overflow: hidden;
  }
</style>
