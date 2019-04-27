<template>
  <i-select
    ref="select"
    class="c-auto-select"
    transfer
    clearable
    remote
    filterable
    label-in-value
    auto-complete
    :placeholder="placeholder"
    :disabled="disabled"
    :style="styleWidth"
    @on-change="handleChange">
    <slot name="input">
      <i-input
        ref="input"
        slot="input"
        suffix="ios-arrow-down"
        clearable
        v-model="currentValue"
        :disabled="disabled"
        :placeholder="placeholder"
        @on-clear="handleClear"
        @on-blur="handleBlur"></i-input>
    </slot>
    <slot>
      <i-option v-for="item in filteredData" :key="item.value" :value="item.value">{{item.label}}</i-option>
    </slot>
  </i-select>
</template>
<script>
export default {
  name: 'autoSelect',
  props: {
    value: {
      type: [Number, String],
      default: ''
    },
    data: {
      type: Array,
      default: []
    },
    width: {
      type: [Number, String],
      default: 200
    },
    placeholder: {
      type: String
    },
    disabled: {
      type: Boolean
    }
  },
  computed: {
    inputIcon () {
      return this.currentValue ? 'md-close' : 'ios-arrow-down'
    },
    styleWidth () {
      const width = parseInt(this.width)
      return { width: `${width}px` }
    },
    filteredData () {
      return this.data.filter(item => {
        let bool = true
        const { label } = item
        if (label && this.currentValue) {
          bool = label.toUpperCase().indexOf(this.currentValue.toUpperCase()) !== -1
        }
        return bool
      })
    }
  },
  watch: {
    value (val) {
      this.init(val)
    },
    currentValue (val) {
      this.$refs.select.setQuery(val)
      this.$emit('input', val)
    }
  },
  methods: {
    init (val) {
      if (typeof val === 'number') this.currentValue = this.bind(val)
      else this.currentValue = val
    },
    bind (id) {
      let name
      if (typeof id === 'number') {
        const item = this.data.filter(ret => ret.value === id)
        item.length && (name = item.pop().label)
      } else name = id
      return name
    },
    handleChange (option = {label: '', value: ''}) {
      this.currentValue = option.value
      this.$emit('on-select', option)
    },
    handleClear () {
      this.currentValue = ''
      this.$refs.select.reset()
    },
    handleBlur () {
      if (this.currentValue) {
        const some = this.data.some(ret => ret.label === this.currentValue)
        if (!some) {
          this.currentValue = ''
          this.$refs.select.reset()
        }
      } else {
        this.$refs.select.reset()
      }
    }
  },
  data () {
    return {
      currentValue: ''
    }
  },
  mounted () {
    this.init(this.value)
  }
}
</script>
<style lang='stylus' scoped>
@import '~@/common/styles/mixin'

</style>
