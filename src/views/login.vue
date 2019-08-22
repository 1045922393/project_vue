<template>
  <div class="login">
    <div class="container">
      <img src="../assets/avatar.jpg" class="avatar" alt />

      <el-form :model="loginForm" :rules="rules" ref="loginForm">
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            prefix-icon="myicon myicon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="请输入密码"
            prefix-icon="myicon myicon-key"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitData" class="login-btn" ref="loginbtn">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '../js/login'
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        /** prefix-icon="myicon myicon-key" 加在input的属性中,实现前置图标 */
        /** Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可。 */
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  mounted () {
    localStorage.setItem('project_vue_itcast', '')
  },
  methods: {
    submitData () {
      // this.$refs.loginbtn._props.disabled = true;
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          // console.log(this.loginForm);
          login(
            this.loginForm,
            res => {
              this.$message({
                message: '登陆成功',
                type: 'success'
              })
              console.log(res)
              localStorage.setItem('project_vue_itcast', res.data.data.token)
              this.$router.push('/home')
            },
            res => {
              this.$message({
                message: '登陆失败,请检查用户名及密码',
                type: 'error'
              })
            },
            () => {
              this.$message({
                message: '服务器异常,请稍后重试',
                type: 'info'
              })
              // this.$refs.loginForm.property.disable = true;
            }
          )
        } else {
          console.log('error submit!!')
          this.$message({
            message: '请填写必要信息',
            type: 'warning'
          })
          return false
        }
      })
      // this.$refs["loginForm"].resetFields();
    }
  }
}
</script>

<style  lang='less' scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      margin-bottom: 20px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
