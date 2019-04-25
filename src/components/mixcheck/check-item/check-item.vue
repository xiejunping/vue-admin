<template>
  <label :class="wrapClasses">
    <span class="c-check-item">
      <input
        type="checkbox"
        :class="inputClasses"
        :disabled="disabled"
        :checked="currentValue"
        :name="name"
        @change="change" />
    </span>
    <slot><span v-if="showSlot">{{ label }}</span></slot>
  </label>
</template>

<script type="text/ecmascript-6">
import { findComponentUpward, findBrothersComponents } from '@/common/lib/assist'
export default {
  name: 'CheckItem',
  props: {
    label: {
      type: [String, Number, Boolean]
    },
    disabled: {
      type: Boolean,
      default: false
    },
    name: {
      type: String
    }
  },
  computed: {
    wrapClasses () {
      return [
        'mixcheck-item',
        'c-check-wrapper',
        {
          'c-wrapper-checked': this.currentValue,
          'c-wrapper-disabled': this.disabled
        }
      ]
    },
    inputClasses () {
      return 'c-mix-input'
    }
  },
  methods: {
    change (event) {
      if (this.disabled) return false
      const checked = event.target.checked
      const brothers = findBrothersComponents(this, 'CheckItem', false)
      this.currentValue = checked
      if (brothers.length) {
        const model = []
        for (const child of brothers) {
          if (child.currentValue) model.push(child.label)
        }
        this.parent.change(model)
      } else this.parent.change([])
    }
  },
  data () {
    return {
      model: null,
      showSlot: true,
      currentValue: false,
      parent: findComponentUpward(this, 'Mixcheck')
    }
  },
  mounted () {
    this.showSlot = this.$slots.default === undefined
    this.parent.updateModel(true)
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/common/styles/mixin.styl"

.c-check-wrapper
  min-width 94px
  text-align center
  position relative
  &:hover
    color #3990ec
  &:after
    content ""
    position absolute
    right 0
    top -3px
    width 0
    height 0
    border-top 6px solid transparent
    border-bottom 6px solid transparent
    border-left 6px solid #dee4f5
    transform rotate(-45deg)
  .c-mix-input
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    z-index 1
    opacity 0
    cursor pointer
</style>
