export default {
  methods: {
    cron ({type, id}) {
      this[type](id)
    },
    submit (type) {
      if (type === 'add') {
        this.save()
      } else if (type === 'edit') {
        this.resave()
      }
    }
  },
  data () {
    return {
      list: [], // 列表数据
      // 弹出对话框
      addModel: false, // modal 开关
      loading: null, // 提交按钮
      spin: null, // 载入加载
      editState: null // 编辑状态
    }
  }
}
