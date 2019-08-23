<template>
  <div class="users">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索区 -->
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input
          type="text"
          v-model="users.query"
          placeholder="请输入搜索内容"
          clearable
          prefix-icon="el-icon-search"
          @input.native="getUsers"
          @clear="getUsers"
        >
          <el-button slot="append" icon="el-icon-search" @click.native="getUsers"></el-button>
        </el-input>
      </el-col>
      <el-button type="success" plain>添加用户</el-button>
    </el-row>
    <!--  表格区 -->

      <el-table :data="usersData" border style="width: 100%;margin-top:10px">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
        <el-table-column prop="username" label="姓名" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱地址"></el-table-column>
          <el-table-column label="用户状态" width="180">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
         </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row,scope.column,scope.store)">
              <i class="el-icon-edit"></i>
            </el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row,scope.column,scope.store)">
              <i class="el-icon-delete"></i>
            </el-button>
            <el-button size="mini" type="warning" @click="handleCheck(scope.$index, scope.row,scope.column,scope.store)">
              <i class="el-icon-check"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
<el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="users.pageNum"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="users.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNum">
    </el-pagination>
  </div>
</template>

<script>
import axios from '../../js/axios'
export default {
  data () {
    return {
      totalNum: 0,
      users: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      usersData: []
    }
  },
  methods: {

    handleSizeChange (val) {
      this.users.pagesize = val
      this.getUsers()
    },
    handleCurrentChange (val) {
      this.users.pagenum = val
      this.getUsers()
    },
    getUsers () {
      axios({
        method: 'get',
        url: '/users',
        params: this.users
      })
        .then(res => {
          // console.log(res)
          this.totalNum = res.data.data.total
          this.usersData = res.data.data.users
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleEdit (index, row, column, store) {
      console.log(row)
    },
    handleDelete (index, row, column, store) {
      console.log(row)
    },
    handleCheck (index, row, column, store) {
      console.log(row)
    }
  },
  // 页面挂载完成后再执行
  mounted () {
    this.getUsers()
  }
}
</script>

<style>
</style>
