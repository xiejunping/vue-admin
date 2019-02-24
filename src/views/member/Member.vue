<template>
  <div class="c-member g-container">
    <div class="g-wrapper">
      <div class="g-wrapper-title g-clearfix">
        <span>用户列表</span>
      </div>
      <Row class="g-wrapper-content">
        <list-table
          :columns="columns"
          :data="list"
          :spin="spin"
          @on-control="cron"></list-table>
      </Row>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'member'
}
</script>

<style lang="stylus" scoped>
@import "~@/common/styles/mixin.styl"
.c-member
  $scroll()
  max-height calc(100% - 43px)
</style>
