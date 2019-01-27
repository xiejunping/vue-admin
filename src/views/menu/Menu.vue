<template>
  <div class="c-menu g-container">
    <div class="g-wrapper">
      <div class="g-wrapper-title g-clearfix">
        <span>菜单列表</span>
      </div>
      <Row class="g-wrapper-content">
        <Form inline class="c-menu-ivh">
          <FormItem>
            <Button type="primary" @click="cron({type: 'add', id: 0})">添加菜单</Button>
          </FormItem>
        </Form>
        <list-table
          :columns="columns"
          :data="list"
          :spin="spin"
          @on-control="cron"></list-table>
        <Form inline class="c-menu-ivh">
          <FormItem>
            <Button type="default">排序</Button>
          </FormItem>
          <FormItem>
            <Button type="primary">导出EXCEL</Button>
          </FormItem>
          <FormItem>
            <Button type="primary">导入EXCEL</Button>
          </FormItem>
        </Form>
      </Row>
    </div>

    <add-modal
      v-model="addModel"
      title="菜单"
      :loading="loading"
      :spin="spin"
      :editState="editState"
      @on-bind="bind"
      @on-save="submit"
      @on-reset="reset">
      <Form ref="formModal" :model="formMenu" autocomplete="on" :rules="ruleValidate" :label-width="100">
        <FormItem label="菜单名称" prop="title">
          <Input v-model="formMenu.title" placeholder="" style="width: 335px" />
        </FormItem>
        <FormItem label="父级菜单" prop="pid">
          <Select v-model="formMenu.pid" style="width: 225px">
            <Option :value="0">顶级</Option>
            <Option v-for="t in dropList" :key="t.id" :value="t.id">{{t.title}}</Option>
          </Select>
        </FormItem>
        <FormItem label="路由" prop="name">
          <Input v-model="formMenu.name" placeholder="" style="width: 225px" />
        </FormItem>
        <FormItem label="图标" prop="type">
          <Input v-model="formMenu.icon" placeholder="" style="width: 225px" />
        </FormItem>
        <FormItem label="组件" prop="component">
          <Input v-model="formMenu.component" placeholder="" style="width: 225px" />
        </FormItem>
        <FormItem label="路径" prop="path">
          <Input v-model="formMenu.path" placeholder="" style="width: 335px" />
        </FormItem>
        <FormItem label="状态" prop="status">
          <Select v-model="formMenu.status" style="width: 225px">
            <Option :value="1">启用</Option>
            <Option :value="0">禁用</Option>
          </Select>
        </FormItem>
      </Form>
    </add-modal>
  </div>
</template>

<script type="text/ecmascript-6">
import mixin from '../mixin'
import { getMenu, addMenu, delMenu, editMenu, getMenuInfo } from '@/api/manage.model'
import { treeToList } from '@/common/lib/tools'
import { isArray } from '@/common/lib/utils'
import ListTable from '@/components/list-table'
import AddModal from '@/components/add-modal'
export default {
  name: 'imenu',
  mixins: [ mixin ],
  components: { ListTable, AddModal },
  computed: {
    dropList () {
      const drop = JSON.parse(JSON.stringify(this.list))
      return treeToList(drop, 'children', 'title')
    }
  },
  methods: {
    getData () {
      this.spin = true
      getMenu().then(data => {
        this.spin = false
        if (data && isArray(data)) this.list = data
      })
    },
    bind () {
      if (this.editState && this.formMenu.id) {
        this.spin = true
        getMenuInfo(this.formMenu.id).then(data => {
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
          delMenu(id).then(data => {
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
          addMenu(this.formMenu).then(data => {
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
      editMenu(this.formMenu).then(data => {
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
          title: '排序',
          width: '1'
        },
        {
          key: 'id',
          title: 'ID',
          width: 1
        },
        {
          key: 'title',
          title: '名称',
          width: 6,
          align: 'left'
        },
        {
          key: 'icon',
          title: '图标',
          width: 2
        },
        {
          key: 'path',
          title: '路径',
          width: 4,
          align: 'left'
        },
        {
          key: 'status',
          title: '状态',
          width: 2
        },
        {
          key: 'creat_date',
          title: '创建日期',
          width: 3
        },
        {
          key: 'control',
          title: '操作',
          width: 5
        }
      ],
      formMenu: {
        id: '',
        title: '',
        name: '',
        pid: 0,
        path: '',
        icon: '',
        component: '',
        status: 1
      },
      ruleValidate: {
        title: [
          {required: true, message: '菜单名称不能为空', trigger: 'blur'}
        ],
        pid: [
          {required: true, message: '父级菜单不能为空', type: 'number'}
        ],
        name: [
          {required: true, message: '路由名称不能为空', trigger: 'blur'}
        ],
        component: [
          {required: true, message: '路由组件不能为空', trigger: 'blur'}
        ],
        path: [
          {required: true, message: '菜单路径不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/common/styles/mixin.styl"

.c-menu
  $scroll()
  max-height calc(100% - 43px)
.c-menu-ivh
  .ivu-form-item
    margin-bottom 15px
</style>
