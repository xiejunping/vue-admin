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
export default {
  name: 'RadioItem',
  props: {
    value: {
      type: [String, Number, Boolean]
    },
    label: {
      type: [String, Number, Boolean]
    },
    disabled: {
      type: Boolean,
      default: false
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: true
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false
    },
    name: {
      type: String
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
    },
    updateModel () {
      this.currentValue = this.value === this.trueValue
    }
  },
  watch: {
    value (val) {
      if (val === this.trueValue || val === this.falseValue) {
        this.updateModel()
      } else {
        throw new Error('Value should be trueValue or falseValue.')
      }
    }
  },
  data () {
    return {
      currentValue: this.value,
      showSlot: true
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
