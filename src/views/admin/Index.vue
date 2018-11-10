<template>
  <div class="layout-content-body">
    <Content :style="{padding: '24px', height: 'inherit', background: '#fff'}">
      <keep-alive>
        <router-view />
      </keep-alive>
    </Content>
  </div>
</template>
<style lang="stylus" scoped>
.layout-content-body
    height 100%
    padding 15px
</style>
