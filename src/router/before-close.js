import Modal from 'ant-design-vue'

export default {
  before_close_normal: resolve => {
    Modal.confirm({
      title: '确定要关闭这一页吗？',
      onOk: () => {
        resolve(true)
      },
      onCancel: () => {
        resolve(false)
      }
    })
  }
}
