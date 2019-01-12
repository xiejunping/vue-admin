<template>
  <div class="c-access g-container">
    <div class="g-wrapper">
      <div class="g-wrapper-title g-clearfix">
        <span>权限列表</span>
      </div>
      <Row class="g-wrapper-content">
        <Form inline class="c-access-ivh">
          <FormItem>
            <Button type="primary" @click="add">添加权限</Button>
          </FormItem>
        </Form>
        <div class="c-access-tree">
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
              <span>类型</span>
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
          <div :gutter="12">
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
                    <span>{{item.name}}</span>
                  </Col>
                  <Col span="2">
                    <span v-if="item.type === 'URL'">菜单</span>
                    <span v-else-if="item.type === 'API'">API</span>
                  </Col>
                  <Col span="4" class="c-tree-text">
                    <span>{{item.urls}}</span>
                  </Col>
                  <Col span="2">
                    <span v-if="item.status === 1" class="g-text-success">启用</span>
                    <span v-else class="g-text-error">禁用</span>
                  </Col>
                  <Col span="3">
                    <span>{{item.creat_date}}</span>
                  </Col>
                  <Col span="5">
                    <a @click.prevent="add(item.id)">添加子权限</a> | <a @click.prevent="edit(item.id)">修改</a> | <a @click.prevent="del(item.id)">删除</a></span>
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
                        <span v-if="item.children.length - 1 === idx">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ {{meta.name}}</span>
                        <span v-else>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├─ {{meta.name}}</span>
                      </Col>
                      <Col span="2">
                        <span v-if="meta.type === 'URL'">菜单</span>
                        <span v-else-if="meta.type === 'API'">API</span>
                      </Col>
                      <Col span="4" class="c-tree-text">
                        <span>{{meta.urls}}</span>
                      </Col>
                      <Col span="2">
                        <span v-if="meta.status === 1" class="g-text-success">启用</span>
                        <span v-else class="g-text-error">禁用</span>
                      </Col>
                      <Col span="3">
                        <span>{{meta.creat_date}}</span>
                      </Col>
                      <Col span="5">
                        <a @click.prevent="add(meta.id)">添加子权限</a> | <a @click.prevent="edit(meta.id)">修改</a> | <a @click.prevent="del(meta.id)">删除</a></span>
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
                            <span v-if="meta.children.length - 1 === i">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ {{t.name}}</span>
                            <span v-else>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├─ {{t.name}}</span>
                          </Col>
                          <Col span="2">
                            <span v-if="t.type === 'URL'">菜单</span>
                            <span v-else-if="t.type === 'API'">API</span>
                          </Col>
                          <Col span="4" class="c-tree-text">
                            <span>{{t.urls}}</span>
                          </Col>
                          <Col span="2">
                            <span v-if="t.status === 1" class="g-text-success">启用</span>
                            <span v-else class="g-text-error">禁用</span>
                          </Col>
                          <Col span="3">
                            <span>{{t.creat_date}}</span>
                          </Col>
                          <Col span="5">
                            <a @click.prevent="add(t.id)">添加子权限</a> | <a @click.prevent="edit(t.id)">修改</a> | <a @click.prevent="del(t.id)">删除</a></span>
                          </Col>
                        </Row>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
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

    <Modal
      title="添加权限"
      width="735"
      v-model="addModel"
      :mask-closable="false"
      @on-visible-change="bind">
      <Spin size="large" fix v-if="spin"></Spin>
      <Row :gutter="12">
        <Col span="18">
          <Form ref="formModal" :model="formAccess" autocomplete="on" :rules="ruleValidate" :label-width="100">
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
import { getAccess, addAccess, getAccessInfo, editAccess, getMenu } from '@/api/manage.model'
import { treeToList } from '@/common/lib/tools'
export default {
  name: 'access',
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
      list: [],
      menu: [],
      editId: null,
      editState: null,

      spin: null,
      saving: null,
      addModel: null,

      formAccess: {
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
      getAccess().then(data => {
        if (data && data.length) this.list = data
      })
    },
    bind () {
      // 还原默认值
      this.spin = true
      this.menu = []
      if (this.editState) {
        Promise.all([getAccessInfo(this.editId), getMenu()]).then(data => {
          this.spin = false
          const [accessData, menuData] = data
          accessData && (this.formAccess = accessData)
          menuData && (this.menu = menuData)
        })
      } else {
        getMenu().then(data => {
          this.spin = null
          if (data && data.length) this.menu = data
        })
      }
    },
    edit (id) {
      if (!id) return
      this.addModel = true
      this.editState = true
      this.editId = id
    },
    add (id) {
      // 默认值
      this.formAccess = Object.assign({}, {
        name: '',
        mid: -1,
        pid: 0,
        type: -1,
        urls: '',
        status: 1
      })
      if (id) this.formAccess.pid = id
      this.addModel = true
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
          this.spin = true
          this.saving = true
          addAccess(this.formAccess).then(data => {
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
      this.$refs.formModal.validate((valid) => {
        if (valid) {
          const params = Object.assign({id: this.editId}, this.formAccess)
          this.spin = true
          this.saving = true
          editAccess(params).then(data => {
            this.spin = false
            this.saving = false
            if (data) {
              this.editState = false
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
.c-access-tree
  text-align center
  margin-bottom 24px
  .c-tree-th, .c-tree-tr
    height 40px
    line-height 40px
  .c-tree-th
    background-color #efefef
  .c-tree-text
    text-align left
.c-access-ivh
  .ivu-form-item
    margin-bottom 15px
</style>
