<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
import { findComponentsDownward } from '@/common/lib/assist'
export default {
  name: 'Mixcheck',
  props: {
    value: {
      type: [Array, String],
      default () {
        return ''
      }
    }
  },
  computed: {
    classes () {
      return []
    }
  },
  methods: {
    updateModel (update) {
      this.childrens = findComponentsDownward(this, 'RadioItem')
      if (this.childrens) {
        const { value } = this
        this.childrens.forEach(child => {
          child.model = value
          if (update) {
            child.currentValue = value.indexOf(child.label) >= 0
            child.group = true
          }
        })
      }
    },
    change (data) {
      this.currentValue = data
      this.$emit('input', data)
      this.$emit('on-change', data)
    }
  },
  watch: {
    value () {
      this.updateModel(true)
    }
  },
  data () {
    return {
      currentValue: this.value,
      childrens: []
    }
  },
  mounted () {
    this.updateModel(true)
  }
}
</script>

<style scoped>

</style>
