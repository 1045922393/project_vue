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
      <el-button type="success" plain @click="dialogFormVisible = true">添加用户</el-button>
    </el-row>
    <!--  表格区 -->

    <el-table :data="usersData" border style="width: 100%;margin-top:10px">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱地址"></el-table-column>
      <el-table-column label="用户状态" width="180">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row,scope.column,scope.store)"
          >
            <i class="el-icon-edit"></i>
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row,scope.column,scope.store)"
          >
            <i class="el-icon-delete"></i>
          </el-button>
          <el-button
            size="mini"
            type="warning"
            @click="handleCheck(scope.$index, scope.row,scope.column,scope.store)"
          >
            <i class="el-icon-check"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="users.pageNum"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="users.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNum"
    ></el-pagination>

    <!-- dialog -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <!-- form开始 -->
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密碼" prop="password">
          <el-input type="password" v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="郵箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
         <el-form-item label="電話" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
        <!-- form结束 -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clearForm" >取 消</el-button>
        <el-button type="primary" @click="submitAddForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from '../../js/axios'
import { addUser } from '../../js/users.js'
export default {
  data () {
    return {
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用戶名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密碼', trigger: 'blur' }],
        email: [{ type: 'email', required: true, message: '邮箱格式有误', trigger: 'blur' }],
        mobile: [{ required: true, message: '电话形式有误', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '电话形式有误', trigger: 'blur' }]
      },
      dialogFormVisible: false,
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
    submitAddForm () {
      this.$refs['addForm'].validate(valid => {
        if (valid) {
          addUser(this.addForm)
            .then(res => {
              if (res.data.meta.status === 201) {
                this.$message.success('添加成功')
                this.$refs['addForm'].resetFields()
                this.dialogFormVisible = false
                this.getUsers()
              } else {
                this.$message.error('添加失败,请稍后重试')
              }
            })
            .catch((err) => {
              console.log(err)
              this.$message.error('服务器异常,请稍后重试')
            })
        }
      })
      // this.dialogFormVisible = false
    },
    clearForm () {
      this.$refs['addForm'].resetFields()
      this.dialogFormVisible = false
    },
    handleSizeChange (val) {
      this.users.pagesize = val
      this.getUsers()
    },
    handleCurrentChange (val) {
      this.users.pagenum = val
      this.getUsers()
    },
    getUsers () {
      // 調用axios,獲取所有用戶數據
      axios({
        method: 'get',
        url: '/users',
        params: this.users
      })
        .then(res => {
          // console.log(res)
          // 將獲得的數據賦予給全局變量
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
    // 頁面挂載完成獲取一次並渲染列表
    this.getUsers()
  }
}
</script>

<style>
</style>
