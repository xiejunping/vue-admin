<template>
  <div class="c-role g-container">
    <div class="g-wrapper">
      <div class="g-wrapper-title g-clearfix">
        <span>角色列表</span>
      </div>
      <Row class="g-wrapper-content">
        <Form inline class="c-access-ivh">
          <FormItem>
            <Button type="primary" @click="add">添加角色</Button>
          </FormItem>
        </Form>
        <Row>
          <Col span="6">
            <Card style="width: 94%" dis-hover>
              <p slot="title" class="c-card-title">
                <Icon type="ios-contacts" size="24" color="#6d6d6d" />
                用户分组
              </p>
              <a slot="extra" @click.prevent="setGroup">
                设置
              </a>
              <Tree :data="group"></Tree>
            </Card>
          </Col>
          <Col span="18">
            <list-table
              :columns="columns"
              :spin="spin"
              :data="list"></list-table>
          </Col>
        </Row>
        <Page show-elevator show-total :total="total" class="g-pull-right"></Page>
      </Row>
    </div>
  </div>
</template>

<script>
import mixin from '../mixin'
import ListTable from '@/components/list-table'
import AddModal from '@/components/add-modal'
import { isArray } from '@/common/lib/utils'
import { getGroup, getRole, getRoleInfo, addRole, editRole, delRole } from '@/api/manage.model'
export default {
  name: 'role',
  mixins: [ mixin ],
  components: { ListTable, AddModal },
  methods: {
    getData () {
      this.spin = true
      const param = {
        gid: 1,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      // tree data prcomss
      const createTree = list => {
        return list.map(ret => {
          if (ret.children && ret.children.length) {
            ret.children = createTree(ret.children)
          }
          ret.expand = true
          ret.title = ret.name
          return ret
        })
      }
      Promise.all([getGroup(), getRole(param)]).then(data => {
        this.spin = false
        const [groupData, roleData] = data
        if (groupData && isArray(groupData)) {
          this.group = createTree(groupData)
        }
        if (roleData && isArray(roleData.list)) {
          this.total = roleData.total
          this.list = roleData.list
        }
      }).catch(e => {
        console.log(e)
      })
    },
    bind () {
      if (this.editState && this.formMenu.id) {
        this.spin = true
        getRoleInfo(this.formMenu.id).then(data => {
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
          delRole(id).then(data => {
            this.$Message.destroy()
            if (data) this.getData()
          })
        }
      })
    },
    setGroup () {},
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
          addRole(this.formMenu).then(data => {
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
      editRole(this.formMenu).then(data => {
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
      total: 0,
      pageIndex: 1,
      pageSize: 20,
      columns: [
        {
          key: 'id',
          width: 1,
          title: 'ID'
        },
        {
          key: 'name',
          width: 8,
          title: '角色',
          align: 'left'
        },
        {
          key: 'gid',
          width: 3,
          title: '用户组',
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
      ], // 表头部
      list: [], // 角色数据
      group: [] // 用户分组
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style lang="stylus">
@import "~@/common/styles/mixin.styl"
.c-role
  $scroll()
  max-height calc(100% - 43px)
  .c-role-ivh
    .ivu-form-item
      margin-bottom 15px
  .ivu-card .ivu-card-head
      padding 0
      border-bottom none
  .c-card-title
    background-color #efefef
    line-height 40px
    height 40px
    padding-left 10px
    color #5b5b5b
    font-weight normal
</style>
