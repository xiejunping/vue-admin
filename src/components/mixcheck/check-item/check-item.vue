<template>
  <label :class="wrapClasses">
    <span :class="mixcheckClasses">
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
        'c-wrapper',
        {
          'c-group-item': this.multiple,
          'c-wrapper-checked': this.currentValue,
          'c-wrapper-disabled': this.disabled
        }
      ]
    },
    mixcheckClasses () {
      return [
        'c-mixcheck',
        {
          'c-mix-checked': this.currentValue,
          'c-mix-disabled': this.disabled
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
      const brothers = findBrothersComponents(this, 'Checkitem', true)
      this.currentValue = checked
      if (brothers.length) {
        const model = brothers.filter(child => child.currentValue).map(ret => ret.label) // 同类选中值
        this.parent.change(model)
      } else this.parent.change([])
    }
  },
  data () {
    return {
      model: [],
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

</style>
