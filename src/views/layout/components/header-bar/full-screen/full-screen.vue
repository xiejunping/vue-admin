<template>
  <div v-if="showFullScreenBtn" class="c-full-screen">
    <Tooltip
      :content="currentFullScreen"
      placement="bottom">
      <Icon
        :type="iconClasses"
        :size="23"
        @click.native="handleChange"></Icon>
    </Tooltip>
  </div>
</template>
<script>
export default {
  name: 'fullScreen',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    showFullScreenBtn () {
      return window.navigator.userAgent.indexOf('MSIE') < 0
    },
    iconClasses () {
      return this.value ? 'md-contract' : 'md-expand'
    },
    currentFullScreen () {
      return this.value ? '退出全屏' : '全屏'
    }
  },
  methods: {
    handleFullScreen () {
      const main = document.body

      if (this.value) {
        if (document.exitFullscreen) document.exitFullscreen()
        else if (document.mozCannelFullScreen) document.mozCannelFullScreen()
        else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen()
        else if (document.msExitFullscreen) document.msExitFullscreen()
      } else {
        if (main.requestFullscreen) main.requestFullscreen()
        else if (main.mozRequestFullScreen) main.mozRequestFullScreen()
        else if (main.webkitRequestFullScreen) main.webkitRequestFullScreen()
        else if (main.msRequestFullscreen) main.msRequestFullscreen()
      }
    },
    handleChange () {
      this.handleFullScreen()
    }
  },
  mounted () {
    let isFullScreen = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.fullScreen || document.isFullScreen || document.mozFullScreen || document.webkitIsFullScreen
    isFullScreen = !!isFullScreen

    document.addEventListener('fullscreenchange', () => {
      this.$emit('input', !this.value)
      this.$emit('on-change', !this.value)
    })
    document.addEventListener('mozfullscreenchange', () => {
      this.$emit('input', !this.value)
      this.$emit('on-change', !this.value)
    })
    document.addEventListener('webkitfullscreenchange', () => {
      this.$emit('input', !this.value)
      this.$emit('on-change', !this.value)
    })
    document.addEventListener('msfullscreenchange', () => {
      this.$emit('input', !this.value)
      this.$emit('on-change', !this.value)
    })

    // 默认
    this.$emit('input', isFullScreen)
  }
}
</script>
<style lang="stylus" scoped>
.c-full-screen
  display inline-block
  height 64px
  line-height 56px
  margin-right 10px
  i
    cursor pointer
    color white
</style>
