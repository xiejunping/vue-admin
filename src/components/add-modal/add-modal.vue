<template>
  <Modal
    :title="head"
    :width="width"
    v-model="show"
    :mask-closable="false"
    @on-visible-change="bind">
    <Spin size="large" fix v-if="spin" />
    <Row :gutter="12">
      <Col span="18">
        <slot></slot>
      </Col>
    </Row>
    <div slot="footer">
      <Button type="default" @click="$emit('on-reset')">重置</Button>
      <Button v-if="editState" type="primary" :loading="loading" @click="$emit('on-save', 'edit')">
        <span v-if="loading">提交中...</span>
        <span v-else>保存</span>
      </Button>
      <Button v-else type="primary" :loading="loading" @click="$emit('on-save', 'add')">
        <span v-if="loading">提交中...</span>
        <span v-else>添加</span>
      </Button>
    </div>
  </Modal>
</template>

<script>
export default {
  name: 'addModal',
  props: {
    value: {
      type: Boolean
    },
    title: {
      type: String
    },
    width: {
      type: Number,
      default () {
        return 735
      }
    },
    spin: {
      type: Boolean,
      default () {
        return false
      }
    },
    loading: {
      type: Boolean,
      default () {
        return false
      }
    },
    editState: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  computed: {
    show: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    head () {
      return this.editState ? `修改${this.title}` : `添加${this.title}`
    }
  },
  methods: {
    bind () {
      this.$emit('on-bind')
    }
  }
}
</script>
