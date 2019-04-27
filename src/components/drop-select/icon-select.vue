<template>
  <Dropdown
    trigger="custom"
    :placement="placement"
    :visible="dropVisible"
    class="c-menu-icon">
    <i-input
      ref="input"
      suffix="ios-arrow-down"
      v-model="currentValue"
      clearable
      readonly
      :placeholder="placeholder"
      :style="styles"
      @on-focus="handleFocus"></i-input>
    <DropdownMenu slot="list" class="c-icon-wrapper">
      <div class=""></div>
      <Row :gutter="12">
        <Col span="24">
          <i-input search enter-button placeholder="请输入搜索图标名称"></i-input>
        </Col>
      </Row>
      <ul class="c-icon-ul">
        <li @click.native="selectIcon('md-albums')">
          <Icon size="20" color="#57a3f3" type="md-albums" />
          <span class="c-icon-span">md-albums</span>
        </li>
        <li>
          <Icon size="20" color="#57a3f3" type="ios-aperture" />
          <span class="c-icon-span">ios-aperture</span>
        </li>
        <li>
          <Icon size="20" color="#57a3f3" type="logo-angular" />
          <span class="c-icon-span">logo-angular</span>
        </li>
        <li>
          <Icon size="20" color="#57a3f3" type="md-albums" />
          <span class="c-icon-span">md-albums</span>
        </li>
        <li>
          <Icon size="20" color="#57a3f3" type="ios-aperture" />
          <span class="c-icon-span">ios-aperture</span>
        </li>
        <li>
          <Icon size="20" color="#57a3f3" type="logo-angular" />
          <span class="c-icon-span">logo-angular</span>
        </li>
        <li>
          <Icon size="20" color="#57a3f3" type="md-albums" />
          <span class="c-icon-span">md-albums</span>
        </li>
        <li>
          <Icon size="20" color="#57a3f3" type="ios-aperture" />
          <span class="c-icon-span">ios-aperture</span>
        </li>
        <li>
          <Icon size="20" color="#57a3f3" type="logo-angular" />
          <span class="c-icon-span">logo-angular</span>
        </li>
        <li>
          <Icon size="20" color="#57a3f3" type="md-albums" />
          <span class="c-icon-span">md-albums</span>
        </li>
        <li>
          <Icon size="20" color="#57a3f3" type="ios-aperture" />
          <span class="c-icon-span">ios-aperture</span>
        </li>
        <li>
          <Icon size="20" color="#57a3f3" type="logo-angular" />
          <span class="c-icon-span">logo-angular</span>
        </li>
        <li>
          <Icon size="20" color="#57a3f3" type="md-albums" />
          <span class="c-icon-span">md-albums</span>
        </li>
        <li>
          <Icon size="20" color="#57a3f3" type="ios-aperture" />
          <span class="c-icon-span">ios-aperture</span>
        </li>
        <li>
          <Icon size="20" color="#57a3f3" type="logo-angular" />
          <span class="c-icon-span">logo-angular</span>
        </li>
        <li>
          <Icon size="20" color="#57a3f3" type="md-albums" />
          <span class="c-icon-span">md-albums</span>
        </li>
        <li>
          <Icon size="20" color="#57a3f3" type="ios-aperture" />
          <span class="c-icon-span">ios-aperture</span>
        </li>
        <li>
          <Icon size="20" color="#57a3f3" type="logo-angular" />
          <span class="c-icon-span">logo-angular</span>
        </li>
        <li>
          <Icon size="20" color="#57a3f3" type="md-albums" />
          <span class="c-icon-span">md-albums</span>
        </li>
        <li>
          <Icon size="20" color="#57a3f3" type="ios-aperture" />
          <span class="c-icon-span">ios-aperture</span>
        </li>
        <li>
          <Icon size="20" color="#57a3f3" type="logo-angular" />
          <span class="c-icon-span">logo-angular</span>
        </li>
        <li>
          <Icon size="20" color="#57a3f3" type="md-albums" />
          <span class="c-icon-span">md-albums</span>
        </li>
        <li>
          <Icon size="20" color="#57a3f3" type="ios-aperture" />
          <span class="c-icon-span">ios-aperture</span>
        </li>
        <li>
          <Icon size="20" color="#57a3f3" type="logo-angular" />
          <span class="c-icon-span">logo-angular</span>
        </li>
        <li>
          <Icon size="20" color="#57a3f3" type="md-albums" />
          <span class="c-icon-span">md-albums</span>
        </li>
        <li>
          <Icon size="20" color="#57a3f3" type="ios-aperture" />
          <span class="c-icon-span">ios-aperture</span>
        </li>
        <li>
          <Icon size="20" color="#57a3f3" type="logo-angular" />
          <span class="c-icon-span">logo-angular</span>
        </li>
      </ul>
    </DropdownMenu>
  </Dropdown>
</template>
<script>
import { oneOf } from '@/common/lib/assist'
export default {
  name: 'menuIcon',
  props: {
    value: {
      type: String
    },
    data: {
      type: Array
    },
    placeholder: {
      type: String
    },
    placement: {
      validator (value) {
        return oneOf(value, ['top', 'bottom', 'top-start', 'bottom-start', 'top-end', 'bottom-end']);
      },
      default: 'bottom-start'
    },
    transfer: {
      type: Boolean
    },
    width: {
      type: [Number, String],
      default: 200
    }
  },
  computed: {
    styles () {
      const width = parseInt(this.width)
      return {width: `${width}px`}
    }
  },
  watch: {

  },
  methods: {
    handleFocus () {
      this.dropVisible = true
      console.log(this.dropVisible)
    },
    selectIcon (icon) {
      this.currentValue = icon
    }
  },
  data () {
    return {
      currentValue: this.value,
      dropVisible: null
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~@/common/styles/mixin'

.c-icon-wrapper
  width 520px
  padding 8px 12px
  .c-icon-ul
    $clear()
    $scroll()
    max-height 300px
    padding 8px 0
    li
      width 32%
      padding 6px
      float left
      user-select none
      .c-icon-span
        padding-left 8px
        font-size 13px
      &:hover
        background-color #efefef
        cursor pointer
        border-radius 3px
</style>
