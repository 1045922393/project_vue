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
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#5acf42"
            inactive-color="#ff10cb"
            @change="changeStatus(scope.row.id,scope.row.mg_state)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="editUser(scope.row)">
            <i class="el-icon-edit"></i>
          </el-button>
          <el-button size="mini" type="danger" @click="delUser(scope.row.id)">
            <i class="el-icon-delete"></i>
          </el-button>
          <el-button size="mini" type="warning" @click="editRole(scope.row)">
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
      :page-sizes="[2, 4, 6, 8]"
      :page-size="users.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNum"
    ></el-pagination>

    <!-- dialog -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <!-- 添加用户表单 -->
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
        <el-button @click="clearForm">取 消</el-button>
        <el-button type="primary" @click="submitAddForm">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑dialog -->
    <el-dialog title="编辑" :visible.sync="dialogEditUserFormVisible">
      <el-form :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="用户id:" :label-width="'100px'">
          <span>{{editForm.id}}</span>
        </el-form-item>
        <el-form-item label="用户名:" :label-width="'100px'">
          <span>{{editForm.username}}</span>
        </el-form-item>
        <el-form-item label="邮箱:" :label-width="'100px'" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号:" :label-width="'100px'" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditUserFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEditUser">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分配角色 -->
    <el-dialog title="角色分配" :visible.sync="dialogRolesFormVisible">
      <el-form :model="rolesForm">
        <el-form-item label="用户名" :label-width="'100px'">
          <span>{{rolesForm.username}}</span>
        </el-form-item>
        <el-form-item label="角色" :label-width="'100px'">
          <el-select v-model="rolesForm.rid" clearable placeholder="请选择">
            <el-option
              v-for="item in rolesList"
              :key="item.value"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRolesFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from '../../js/axios'
import {
  addUser,
  getUser,
  submintEditUser,
  delUserById,
  changeStatus,
  roleChange
} from '../../js/users.js'
import { getRolesList } from '../../js/roles.js'
// getUser是根据id获得单个用户数据
export default {
  data () {
    return {
      // 分配角色提交对象
      rolesForm: {
        username: '',
        rid: '',
        role_name: '',
        id: 0
      },
      // 角色列表
      rolesList: [],
      // 分配角色
      dialogRolesFormVisible: false,
      // 编辑用户信息
      dialogEditUserFormVisible: false,
      editForm: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      },
      // 添加用户的信息
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: '',
        rid: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用戶名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密碼', trigger: 'blur' }],
        email: [
          {
            type: 'email',
            required: true,
            message: '邮箱格式有误',
            trigger: 'blur'
          }
        ],
        mobile: [
          { required: true, message: '电话形式有误', trigger: 'blur' },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '电话形式有误',
            trigger: 'blur'
          }
        ]
      },
      dialogFormVisible: false,
      totalNum: 0,
      users: {
        query: '',
        pagenum: 1,
        pagesize: 4
      },
      usersData: [],
      usersDataLength: 0
    }
  },
  methods: {
    // 确认角色分配
    confirmRole () {
      if (this.rolesForm.rid) {
        // console.log(this.rolesForm)
        roleChange(this.rolesForm)
          .then(res => {
            if (res.data.meta.status === 200) {
              this.dialogRolesFormVisible = false
              this.$message.success(res.data.meta.msg)
              this.getUsers()
            }
          })
          .catch(err => { console.log(err); this.$message.error('服务器错误') })
      } else {
        this.$message.error('请分配角色')
      }
    },
    // 角色分配
    editRole (row) {
      this.rolesForm.id = row.id
      this.rolesForm.role_name = row.role_name
      this.rolesForm.username = row.username
      this.dialogRolesFormVisible = true
      this.rolesForm.rid = row.role_id
      // getUser(row.id).then(res => {
      //   if (res.data.meta.status === 200) {
      //     console.log(res)
      //     this.rolesForm.rid = res.data.data.rid
      //   } else {
      //     this.$message.error('服务器异常,请稍后重试')
      //   }
      // })
    },
    // 状态修改
    changeStatus (id, type) {
      changeStatus({ id, type })
        .then(res => {
          if (res.data.meta.status === 200) {
            this.$message.success(res.data.meta.msg)
          } else {
            this.$message.error(res.data.meta.msg)
          }
        })
        .catch(err => {
          console.log(err)
          this.$message.error('服务器异常')
        })
    },
    // 确认删除
    delUser (id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '删除确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 确认删除,发起axios
          delUserById(id)
            .then(res => {
              if (res.data.meta.status === 200) {
                // this.getUsers()
                if (this.usersDataLength === 1 && this.users.pagenum !== 1) {
                  this.users.pagenum--
                }
                this.getUsers()
                this.$message.success(res.data.meta.msg)
              } else {
                this.$message.error(res.data.meta.msg)
              }
            })
            .catch(err => {
              console.log(err)
              this.$message.error('服务器异常')
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 确定提交修改后的用户信息
    submitEditUser () {
      this.$refs['editForm'].validate(valid => {
        if (valid) {
          submintEditUser(this.editForm)
            .then(res => {
              if (res.data.meta.status === 200) {
                this.$message.success(res.data.meta.msg)
                this.getUsers()
                this.dialogEditUserFormVisible = false
              } else {
                this.$message.error(res.data.meta.msg)
              }
            })
            .catch(err => {
              console.log(err)
              this.$message.error('服务器异常,请稍后重试')
            })
        } else {
          this.$message.warning('请按要求填写信息')
        }
      })
    },
    // 打开编辑用户信息
    editUser (row) {
      this.dialogEditUserFormVisible = true
      getUser(row.id).then(res => {
        if (res.data.meta.status === 200) {
          this.editForm.id = res.data.data.id
          this.editForm.username = res.data.data.username
          this.editForm.mobile = res.data.data.mobile
          this.editForm.email = res.data.data.email
          this.editForm.rid = res.data.data.rid
        } else {
          this.$message.error('服务器异常,请稍后重试')
        }
      })
    },
    // 确定提交用户信息
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
            .catch(err => {
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
          this.usersDataLength = this.usersData.length
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  // 页面挂载完成后再执行
  mounted () {
    // 頁面挂載完成獲取一次並渲染列表
    this.getUsers()
    getRolesList().then(res => {
      if (res.data.meta.status === 200) {
        this.rolesList = res.data.data
      }
    })
  }
}
</script>

<style>
</style>
