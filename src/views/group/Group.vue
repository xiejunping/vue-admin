<template>
  <div class="c-group g-container">
    <div class="g-wrapper">
      <div class="g-wrapper-title g-clearfix">
        <span>分组列表</span>
      </div>
      <Row class="g-wrapper-content">
        <Form inline class="c-access-ivh">
          <FormItem>
            <Button type="primary" @click="cron({type: 'add', id: 0})">添加分组</Button>
          </FormItem>
        </Form>
        <list-table
          :columns="columns"
          :data="list"
          :spin="spin"
          @on-control="cron"></list-table>
      </Row>
    </div>

    <add-modal
      v-model="addModel"
      title="分组"
      :loading="loading"
      :spin="spin"
      :editState="editState"
      @on-bind="bind"
      @on-save="submit"
      @on-reset="reset">

    </add-modal>
  </div>
</template>

<script type="text/ecmascript-6">
import mixin from '../mixin'
import ListTable from '@/components/list-table'
import AddModal from '@/components/add-modal'
import { isArray } from '@/common/lib/utils'
import { getGroup, getGroupInfo, addGroup, editGroup, delGroup } from '@/api/manage.model'
export default {
  name: 'group',
  mixins: [ mixin ],
  components: { ListTable, AddModal },
  computed: {
  },
  methods: {
    getData () {
      this.spin = true
      getGroup().then(data => {
        this.spin = false
        if (data && isArray(data)) this.list = data
      })
    },
    bind () {
      if (this.editState && this.formMenu.id) {
        this.spin = true
        getGroupInfo(this.formMenu.id).then(data => {
          this.spin = false
          data && (this.formMenu = data)
        })
      } else this.reduce()
    },
    add (id) {
      this.reduce()
      this.formMenu.pid = id
      this.addModel = true
    },
    edit (id) {
      if (!id) return
      this.editState = true
      this.formMenu.id = id
      this.addModel = true
    },
    del (id) {
      this.$Modal.confirm({
        title: '系统确认',
        content: '<p>删除将不能恢复，您确定删除该菜单吗？</p>',
        onOk: () => {
          this.$Message.loading({
            content: '正在努力删除中...',
            duration: 60
          })
          delGroup(id).then(data => {
            this.$Message.destroy()
            if (data) this.getData()
          })
        }
      })
    },
    reduce () {
      this.formMenu = {
        id: '',
        title: '',
        name: '',
        pid: 0,
        path: '',
        icon: '',
        component: '',
        status: 1
      }
    },
    reset () {
      this.reduce()
      this.$refs.formModal.resetFields()
    },
    save () {
      this.$refs.formModal.validate((valid) => {
        if (valid) {
          this.loading = true
          addGroup(this.formMenu).then(data => {
            this.loading = false
            if (data) {
              this.addModel = false
              this.getData()
            }
          })
        }
      })
    },
    resave () {
      this.loading = true
      editGroup(this.formMenu).then(data => {
        this.loading = false
        if (data) {
          this.editState = false
          this.addModel = false
          this.getData()
        }
      })
    }
  },
  data () {
    return {
      columns: [
        {
          key: 'order',
          width: 1,
          title: '排序'
        },
        {
          key: 'id',
          width: 2,
          title: 'ID'
        },
        {
          key: 'name',
          width: 9,
          title: '名称',
          align: 'left'
        },
        {
          key: 'status',
          width: 2,
          title: '状态'
        },
        {
          key: 'creat_date',
          width: 4,
          title: '创建日期'
        },
        {
          key: 'control',
          width: 6,
          title: '操作'
        }
      ],
      list: []
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/assets/styles/mixin.styl"
.c-group
  $scroll()
  max-height calc(100% - 43px)
  .c-group-ivh
    .ivu-form-item
      margin-bottom 15px
</style>
