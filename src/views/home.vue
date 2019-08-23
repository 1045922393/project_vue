<template>
  <div class="home">
    <el-container>
      <el-aside class="el-aside" width="200px">
        <div width="200px" class="logo"></div>

        <el-menu
          :router="true"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened="true"
        >
          <!-- 用户管理 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span style="color:rgba(255, 227, 108,.8)">用户管理</span>
            </template>
            <el-menu-item index="/home/users">
              <i class="el-icon-menu"></i>
              <span style="color:rgba(255, 227, 108,.8)">用户列表</span>
            </el-menu-item>
          </el-submenu>

          <!-- 权限管理 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span style="color:rgba(0, 255, 136,.8)">权限管理</span>
            </template>
            <el-menu-item index="roles">
              <i class="el-icon-menu"></i>
              <span style="color:rgba(0, 255, 136,.8)">角色列表</span>
            </el-menu-item>
            <el-menu-item index="rights">
              <i class="el-icon-menu"></i>
              <span style="color:rgba(0, 255, 136,.8)">权限列表</span>
            </el-menu-item>
          </el-submenu>

          <!-- 商品管理 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span style="color:rgba(218, 119, 61,.8)">商品管理</span>
            </template>
            <el-menu-item index="goods">
              <i class="el-icon-menu"></i>
              <span style="color:rgba(218, 119, 61,.8)">商品列表</span>
            </el-menu-item>
            <el-menu-item index="params">
              <i class="el-icon-menu"></i>
              <span style="color:rgba(218, 119, 61,.8)">分数参数</span>
            </el-menu-item>
            <el-menu-item index="categories">
              <i class="el-icon-menu"></i>
              <span style="color:rgba(218, 119, 61,.8)">商品分类</span>
            </el-menu-item>
          </el-submenu>
          <!-- 订单管理 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span style="color:rgba(238, 34, 79,.8)">订单管理</span>
            </template>
            <el-menu-item index="orders">
              <i class="el-icon-menu"></i>
              <span style="color:rgba(238, 34, 79,.8)">商品列表</span>
            </el-menu-item>
          </el-submenu>

          <!-- 数据统计 -->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span style="color:rgba(185, 50, 238,.8)">数据统计</span>
            </template>
            <el-menu-item index="reports">
              <i class="el-icon-menu"></i>
              <span style="color:rgba(185, 50, 238,.8)">商品列表</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container class="el-container">
        <el-header class="el-header">
          <router-link to="/home" class="toggle-btn myicon-menu myicon"></router-link>
          <div>
            <span class="system-title" style="color:rgba(85, 207, 238,.8)">后</span>
            <span class="system-title" style="color:rgba(255, 255, 0,.8)">台</span>
            <span class="system-title" style="color:rgba(238, 34, 79,.8)">管</span>
            <span class="system-title" style="color:rgba(218, 119, 61,.8)">理</span>
            <span class="system-title" style="color:rgba(0, 255, 136,.8)">系</span>
            <span class="system-title" style="color:rgba(196, 117, 216,.8)">统</span>
          </div>
          <a href="javescript:viod(0)" class="welcome" style="color:red">退出</a>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang='less' scoped>
.home {
  height: 100vh; //vh  v-view height
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    height: 60px;
    background: url(../assets/logo.png) rgba(255, 255, 255, 0.5);
    background-size: cover;
  }
  .toggle-btn {
    height: 100%;
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    opacity: 0.5;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292cf;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: white;
  }
}
</style>
