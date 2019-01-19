<template>
  <div class="c-access g-container">
    <div class="g-wrapper">
      <div class="g-wrapper-title g-clearfix">
        <span>权限列表</span>
      </div>
      <Row class="g-wrapper-content">
        <Form inline class="c-access-ivh">
          <FormItem>
            <Button type="primary" @click="cron({type: 'add', id: 0})">添加权限</Button>
          </FormItem>
        </Form>
        <list-table
          :columns="columns"
          :data="list"
          :spin="spin"
          @on-control="cron"></list-table>

        <Form inline class="c-access-ivh">
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
      title="权限"
      :loading="loading"
      :spin="spin"
      :editState="editState"
      @on-bind="bind"
      @on-save="submit"
      @on-reset="reset">
      <Form
        ref="formModal"
        :model="formAccess"
        autocomplete="on"
        :rules="ruleValidate"
        :label-width="100">
        <FormItem label="权限名称" prop="name">
          <Input v-model="formAccess.name" placeholder="" style="width: 335px" />
        </FormItem>
        <FormItem label="父级权限" prop="pid">
          <Select v-model="formAccess.pid" style="width: 225px">
            <Option :value="0">顶级</Option>
            <Option v-for="t in dropList" :key="t.id" :value="t.id">{{t.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="类型" prop="type">
          <Select v-model="formAccess.type" style="width: 225px">
            <Option :value="-1">请选择</Option>
            <Option value="URL">菜单</Option>
            <Option value="API">API</Option>
          </Select>
        </FormItem>
        <FormItem v-if="formAccess.type === 'URL'" label="菜单" prop="mid">
          <Select v-model="formAccess.mid" style="width: 225px">
            <Option :value="-1">请选择</Option>
            <Option v-for="t in menuList" :key="t.id" :value="t.id">{{t.title}}</Option>
          </Select>
        </FormItem>
        <FormItem label="路径" prop="urls">
          <Input v-model="formAccess.urls" placeholder="" style="width: 335px" />
        </FormItem>
        <FormItem label="状态" prop="status">
          <Select v-model="formAccess.status" style="width: 225px">
            <Option :value="1">启用</Option>
            <Option :value="0">禁用</Option>
          </Select>
        </FormItem>
      </Form>
    </add-modal>
  </div>
</template>

<script>
import mixin from '../mixin'
import { getAccess, addAccess, getAccessInfo, editAccess, getMenu } from '@/api/manage.model'
import { treeToList } from '@/common/lib/tools'
import { isArray } from '@/common/lib/utils'
import ListTable from '@/components/list-table'
import AddModal from '@/components/add-modal'
export default {
  name: 'access',
  mixins: [ mixin ],
  components: { ListTable, AddModal },
  computed: {
    dropList () {
      const drop = JSON.parse(JSON.stringify(this.list))
      return treeToList(drop, 'children', 'name')
    },
    menuList () {
      const drop = JSON.parse(JSON.stringify(this.menu))
      return treeToList(drop, 'children', 'title')
    }
  },
  data () {
    return {
      menu: [], // 下拉菜单数据
      columns: [
        {
          key: 'order',
          title: '排序',
          width: 1
        },
        {
          key: 'id',
          title: 'ID',
          width: 1
        },
        {
          key: 'name',
          title: '名称',
          width: 6,
          align: 'left'
        },
        {
          key: 'type',
          title: '类型',
          width: 2
        },
        {
          key: 'urls',
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
          width: '3'
        },
        {
          key: 'control',
          title: '操作',
          width: 5
        }
      ], // 表头
      // 表单
      formAccess: {
        id: '',
        name: '',
        pid: 0,
        mid: -1,
        type: -1,
        urls: '',
        status: 1
      },
      ruleValidate: {
        name: {
          required: true, message: '权限名称不能为空', trigger: 'blur'
        },
        urls: {
          required: true, message: '权限路径不能为空', trigger: 'blur'
        },
        status: {
          required: true, type: 'number', message: '非法的状态', trigger: 'blur'
        },
        pid: {
          required: true, type: 'number', message: '请选择一个上级权限', trigger: 'blur'
        },
        type: {
          required: true, type: 'string', message: '请选择一个类型', trigger: 'blur'
        }
      }
    }
  },
  methods: {
    getData () {
      this.spin = true
      getAccess().then(data => {
        this.spin = false
        if (data && isArray(data)) this.list = data
      })
    },
    bind () {
      this.spin = true
      // 修改
      if (this.editState && this.formAccess.id) {
        Promise.all([getAccessInfo(this.formAccess.id), getMenu()]).then(data => {
          this.spin = false
          const [accessData, menuData] = data
          accessData && (this.formAccess = accessData)
          menuData && (this.menu = menuData)
        })
      } else {
        getMenu().then(data => {
          this.spin = false
          if (data && isArray(data)) this.menu = data
        })
      }
    },
    edit (id) {
      if (!id) return
      this.editState = true
      this.formAccess.id = id
      this.addModel = true
    },
    add (id) {
      this.reduce()
      if (id) this.formAccess.pid = id
      this.addModel = true
    },
    // 还原默认值
    reduce () {
      this.formAccess = {
        id: '',
        name: '',
        mid: -1,
        pid: 0,
        type: -1,
        urls: '',
        status: 1
      }
    },
    // 重置
    reset () {
      this.reduce()
      this.$refs.formModal.resetFields()
    },
    save () {
      this.$refs.formModal.validate((valid) => {
        if (valid) {
          if (this.formAccess.type < 0) {
            this.$Message.error({duration: 5, content: '请选择类型'})
            return
          }
          if (this.formAccess.type === 'URL' && this.formAccess.mid < 0) {
            this.$Message.error({duration: 5, content: '请选择菜单'})
            return
          }
          this.loading = true
          addAccess(this.formAccess).then(data => {
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
      this.$refs.formModal.validate((valid) => {
        if (valid) {
          this.loading = true
          editAccess(this.formAccess).then(data => {
            this.loading = false
            this.editState = false
            if (data) {
              this.addModel = false
              this.getData()
            }
          })
        }
      })
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/common/styles/mixin.styl"

.c-access
  $scroll()
  max-height calc(100% - 43px)
.c-access-ivh
  .ivu-form-item
    margin-bottom 15px
</style>
