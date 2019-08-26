<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格开始 -->
    <el-table :data="tableData" height="580" border stripe style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column label="层级">
        <template slot-scope="scope">
          {{scope.row.level|formatLevel}}
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import { getAllrights } from '../../js/rights'
export default {
  data () {
    return {
      tableData: []
    }
  },
  mounted () {
    getAllrights('list').then(res => {
      if (res.data.meta.status === 200) {
        this.tableData = res.data.data
      }
    })
  },
  filters: {
    formatLevel (data) {
      if (data === '0') {
        return '一级'
      } else if (data === '1') {
        return '二级'
      } else {
        return '三级'
      }
    }
  }
}
</script>

<style>
</style>
