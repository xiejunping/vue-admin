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
        <list-table :columns="columns" :data="roleData"></list-table>
      </Row>
    </div>
  </div>
</template>

<script>
import ListTable from '@/components/list-table'
import AddModal from '@/components/add-modal'
export default {
  name: 'role',
  components: { ListTable, AddModal },
  methods: {
    add () {}
  },
  data () {
    return {
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
          key: 'group',
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
      roleData: [
        {
          id: 1, group: '用户组', name: '角色更名', status: 0, creat_date: '2018-12-14 10:49:36'
        },
        {
          id: 3, group: '用户组', name: '超级管理员', status: 1, creat_date: '2018-12-15 17:27:36'
        }
      ] // 角色数据
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/common/styles/mixin.styl"

</style>
