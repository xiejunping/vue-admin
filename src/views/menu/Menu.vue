<template>
  <div class="c-menu g-container">
    <div class="g-wrapper">
      <div class="g-wrapper-title g-clearfix">
        <span>菜单列表</span>
      </div>
      <Row class="g-wrapper-content">
        <Form inline class="c-menu-ivh">
          <FormItem>
            <Button type="primary" @click="addModel = true">添加菜单</Button>
          </FormItem>
        </Form>
        <div class="c-menu-tree">
          <Row class="c-tree-th">
            <Col span="1">
            <span>排序</span>
            </Col>
            <Col span="1">
            <span>ID</span>
            </Col>
            <Col span="6" class="c-tree-text">
            <span>名称</span>
            </Col>
            <Col span="2">
            <span>图标</span>
            </Col>
            <Col span="4" class="c-tree-text">
            <span>路径</span>
            </Col>
            <Col span="2">
            <span>状态</span>
            </Col>
            <Col span="3">
            <span>创建日期</span>
            </Col>
            <Col span="5">
            <span>操作</span>
            </Col>
          </Row>
          <ul>
            <li v-for="item in list" :key="item.id">
              <Row :gutter="12" class="c-tree-tr">
                <Col span="1">
                  <Input size="small" number v-model="item.order" />
                </Col>
                <Col span="1">
                <span>{{item.id}}</span>
                </Col>
                <Col span="6" class="c-tree-text">
                <span>{{item.title}}</span>
                </Col>
                <Col span="2">
                  <Icon :type="item.icon" size="18"></Icon>
                </Col>
                <Col span="4" class="c-tree-text">
                <span>{{item.path}}</span>
                </Col>
                <Col span="2">
                <span v-if="item.status === 1" class="g-text-success">启用</span>
                <span v-else class="g-text-error">禁用</span>
                </Col>
                <Col span="3">
                <span>{{item.creat_date}}</span>
                </Col>
                <Col span="5">
                <a @click.prevent="append(item.id)">添加子菜单</a> | <a @click.prevent="edit(item.id)">修改</a> | <a @click.prevent="del(item.id)">删除</a></span>
                </Col>
              </Row>
              <ul>
                <li v-for="(meta, idx) in item.children" :key="meta.id">
                  <Row :gutter="12" class="c-tree-tr">
                    <Col span="1">
                    <Input size="small" number v-model="meta.order" />
                    </Col>
                    <Col span="1">
                    <span>{{meta.id}}</span>
                    </Col>
                    <Col span="6" class="c-tree-text">
                    <span v-if="item.children.length - 1 === idx">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ {{meta.title}}</span>
                    <span v-else>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├─ {{meta.title}}</span>
                    </Col>
                    <Col span="2">
                      <Icon :type="meta.icon" size="18"></Icon>
                    </Col>
                    <Col span="4" class="c-tree-text">
                    <span>{{meta.path}}</span>
                    </Col>
                    <Col span="2">
                    <span v-if="meta.status === 1" class="g-text-success">启用</span>
                    <span v-else class="g-text-error">禁用</span>
                    </Col>
                    <Col span="3">
                    <span>{{meta.creat_date}}</span>
                    </Col>
                    <Col span="5">
                    <a @click.prevent="append(meta.id)">添加子菜单</a> | <a @click.prevent="edit(meta.id)">修改</a> | <a @click.prevent="del(meta.id)">删除</a></span>
                    </Col>
                  </Row>
                  <ul>
                    <li v-for="(t, i) in meta.children" :key="t.id">
                      <Row :gutter="12" class="c-tree-tr">
                        <Col span="1">
                        <Input size="small" number v-model="t.order" />
                        </Col>
                        <Col span="1">
                        <span>{{t.id}}</span>
                        </Col>
                        <Col span="6" class="c-tree-text">
                        <span v-if="meta.children.length - 1 === i">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ {{t.title}}</span>
                        <span v-else>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├─ {{t.title}}</span>
                        </Col>
                        <Col span="2">
                        <Icon :type="t.icon" size="18"></Icon>
                        </Col>
                        <Col span="4" class="c-tree-text">
                        <span>{{t.path}}</span>
                        </Col>
                        <Col span="2">
                        <span v-if="t.status === 1" class="g-text-success">启用</span>
                        <span v-else class="g-text-error">禁用</span>
                        </Col>
                        <Col span="3">
                        <span>{{t.creat_date}}</span>
                        </Col>
                        <Col span="5">
                        <a @click.prevent="append(t.id)">添加子菜单</a> | <a @click.prevent="edit(t.id)">修改</a> | <a @click.prevent="del(t.id)">删除</a></span>
                        </Col>
                      </Row>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
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
    <Modal
      title="添加菜单"
      width="735"
      v-model="addModel"
      :mask-closable="false"
      @on-visible-change="bind">
      <Spin size="large" fix v-if="spin"></Spin>
      <Row :gutter="12">
        <Col span="18">
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
        </Col>
      </Row>
      <div slot="footer">
        <Button type="default" @click="addModel = false">取消</Button>
        <Button v-if="editState" type="primary" :loading="saving" @click="resave">
          <span v-if="saving">提交中...</span>
          <span v-else>保存</span>
        </Button>
        <Button v-else type="primary" :loading="saving" @click="save">
          <span v-if="saving">提交中...</span>
          <span v-else>添加</span>
        </Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { getMenu, addMenu, delMenu, editMenu, getMenuInfo } from '@/api/manage.model'
import { treeToList } from '@/common/lib/tools'
export default {
  name: 'imenu',
  computed: {
    dropList () {
      const drop = JSON.parse(JSON.stringify(this.list))
      return treeToList(drop, 'children', 'title')
    }
  },
  methods: {
    getData () {
      getMenu().then(data => {
        this.list = data
      })
    },
    bind () {
      if (this.editState) {
        this.spin = true
        getMenuInfo(this.editId).then(data => {
          this.spin = false
          data && (this.formMenu = data)
        })
      } else {
        this.editId = null
        this.formMenu = {
          title: '',
          name: '',
          pid: 0,
          path: '',
          icon: '',
          component: '',
          status: 1
        }
      }
    },
    append (id) {

    },
    edit (id) {
      if (!id) return
      this.addModel = true
      this.editState = true
      this.editId = id
    },
    save () {
      this.$refs.formModal.validate((valid) => {
        if (valid) {
          this.spin = true
          this.saving = true
          addMenu(this.formMenu).then(data => {
            this.spin = false
            this.saving = false
            if (data) {
              this.addModel = false
              this.getData()
            }
          })
        }
      })
    },
    resave () {
      const params = Object.assign({id: this.editId}, this.formMenu)
      this.spin = true
      this.saving = true
      editMenu(params).then(data => {
        this.spin = false
        this.saving = false
        if (data) {
          this.editState = false
          this.addModel = false
          this.getData()
        }
      })
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
    }
  },
  data () {
    return {
      editState: null,
      editId: null,
      list: [],

      spin: null,
      saving: null,
      addModel: null,
      formMenu: {
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
.c-menu-tree
  text-align center
  margin-bottom 24px
  .c-tree-th, .c-tree-tr
    height 40px
    line-height 40px
  .c-tree-th
    background-color #efefef
  .c-tree-text
    text-align left
.c-menu-ivh
  .ivu-form-item
    margin-bottom 15px
</style>
