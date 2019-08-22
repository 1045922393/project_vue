<template>
  <div>
    <el-container>
      <el-aside :span="12">
        <el-col>
          <el-menu
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :unique-opened="true"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-message"></i>
                <span>导航一</span>
              </template>
              <el-menu-item index="1-1">
                <i class="el-icon-menu"></i>
                <span>选项一1</span>
              </el-menu-item>
              <el-menu-item index="1-2">
                <i class="el-icon-menu"></i>
                <span>选项一2</span>
              </el-menu-item>
              <el-menu-item index="1-3">
                <i class="el-icon-menu"></i>
                <span>选项一3</span>
              </el-menu-item>
              <el-menu-item index="1-4">
                <i class="el-icon-menu"></i>
                <span>选项一4</span>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-view"></i>
                <span>导航二</span>
              </template>
              <el-menu-item index="2-1">
                <i class="el-icon-menu"></i>
                <span>选项二1</span>
              </el-menu-item>
              <el-menu-item index="2-2">
                <i class="el-icon-menu"></i>
                <span>选项二2</span>
              </el-menu-item>
              <el-menu-item index="2-3">
                <i class="el-icon-menu"></i>
                <span>选项二3</span>
              </el-menu-item>
              <el-menu-item index="2-4">
                <i class="el-icon-menu"></i>
                <span>选项二4</span>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-picture"></i>
                <span>导航三</span>
              </template>
              <el-menu-item index="3-1">
                <i class="el-icon-menu"></i>
                <span>选项三1</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
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

<style  lang='less' scoped>
</style>
