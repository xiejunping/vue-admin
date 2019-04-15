<template>
  <label :class="wrapClasses">
    <span class="c-radio-item">
      <input
        type="radio"
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
import { findComponentUpward } from '@/common/lib/assist'
export default {
  name: 'RadioItem',
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
        'c-radio-wrapper',
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
      this.currentValue = checked

      const value = checked ? this.trueValue : this.falseValue
      this.$emit('input', value)
      if (this.group) this.parent.change(this.model)
      else this.$emit('on-change', value)
    }
  },
  data () {
    return {
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
@import '~common/styles/mixin'

.c-radio-wrapper
  min-width 94px
  text-align center
  position relative
  &:hover
    color #3990ec
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
