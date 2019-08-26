<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary">
      <i class="el-icon-circle-plus-outline el-icon--left"></i>添加角色
    </el-button>
    <el-table :data="rolesList" border style="width: 100%;margin-top:10px" stripe>
      <!-- 隐藏表格区域 -->
      <el-table-column type="expand">
        <template slot-scope="scope">
          <!-- 自定义列模板会自动遍历每一列拿到对应的列数据 -->
          <el-row v-for="val in scope.row.children" :key="val.id">
            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" style="margin-bottom:15px">
              <el-tag
                :closable="true"
                type="success"
                effect="dark"
                @close="closeThird(scope.row,val.id)"
              >{{ val.authName }}</el-tag>
            </el-col>
            <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
              <el-row
                v-for="secondVal in val.children"
                :key="secondVal.id"
                style="margin-bottom:10px"
              >
                <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                  <el-tag
                    :closable="true"
                    type="warning"
                    effect="dark"
                    @close="closeThird(scope.row,secondVal.id)"
                  >{{ secondVal.authName }}</el-tag>
                </el-col>
                <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
                  <el-tag
                    style="margin-right:5px;margin-bottom:5px"
                    :closable="true"
                    type="danger"
                    effect="dark"
                    v-for="thirdVal in secondVal.children"
                    :key="thirdVal.id"
                    @close="closeThird(scope.row,thirdVal.id)"
                  >{{thirdVal.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row v-show="scope.row.children.length===0">
            <div>没有权限</div>
          </el-row>
        </template>
      </el-table-column>

      <!-- 隐藏表格区域 -->
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="auto"></el-table-column>
      <el-table-column prop="roleDesc" label="描述" width="auto"></el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-row :gutter="10" justify="cneter">
            <el-col :span="8" style="text-align:center">
              <el-tooltip content="编辑" placement="left" effect="light">
                <el-button size="medium" type="success" @click="editRole(scope.row)">
                  <i class="el-icon-edit-outline"></i>
                </el-button>
              </el-tooltip>
            </el-col>
            <el-col :span="8" style="text-align:center">
              <el-tooltip content="权限分配" placement="top" effect="dark">
                <el-button size="medium" type="primary" @click="roleAllocated(scope.row)">
                  <i class="el-icon-s-operation"></i>
                </el-button>
              </el-tooltip>
            </el-col>
            <el-col :span="8" style="text-align:center">
              <el-tooltip content="删除" placement="right" effect="light">
                <el-button size="medium" type="danger">
                  <i class="el-icon-delete"></i>
                </el-button>
              </el-tooltip>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑dialog会话框 -->
    <el-dialog title="编辑角色" :visible.sync="editDialogFormVisible">
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editDialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 权限分配dialog会话框 -->
    <el-dialog title="权限分配" :visible.sync="roleAllocatedDialogVisible">
      <el-tree
        :data="rightsList"
        show-checkbox
        node-key="id"
        :default-expanded-keys="[2, 3]"
        :default-checked-keys="[5]"
        :props="defaultProps"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleAllocatedDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="roleAllocatedDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getRolesList, delRightById } from '../../js/roles'
import { getAllrights } from '../../js/rights'
export default {
  data () {
    return {
      // 默认设置
      defaultProps: {
        label: 'authName',
        children: 'children'
      },
      // 权限分配会话显示
      roleAllocatedDialogVisible: false,
      // 编辑会话的显示
      editDialogFormVisible: false,
      // 角色列表
      rolesList: [],
      // 权限属性列表
      rightsList: []
    }
  },
  methods: {
    // 权限分配
    roleAllocated (row) {
      this.roleAllocatedDialogVisible = true
      console.log(row)
    },
    // 编辑角色
    editRole (row) {
      this.editDialogFormVisible = true
      console.log(row)
    },
    closeThird (row, rid) {
      this.$confirm('此操作将取消用户该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delRightById(row.id, rid)
            .then(res => {
              if (res.data.meta.status === 200) {
                row.children = res.data.data
                this.$message.success(res.data.meta.msg)
              }
            })
            .catch(err => {
              console.log(err)
              this.$message.error('服务器错误')
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除权限'
          })
        })
    }
  },
  mounted () {
    getRolesList()
      .then(res => {
        if (res.data.meta.status === 200) {
          this.rolesList = res.data.data
        } else {
          this.$message.error(res.data.meta.msg)
        }
      })
      .catch(err => {
        console.log(err)
      })
    getAllrights('tree')
      .then(res => {
        if (res.data.meta.status === 200) {
          this.rightsList = res.data.data
          console.log(this.rightsList)
        } else {
          this.$message.error(res.data.meta.msg)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style>
</style>
