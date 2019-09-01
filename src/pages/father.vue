<template>
  <div>
    <h1>这是父组件</h1>
    <el-son>
      <p>我是插在第一个插槽的数据.携带着---{{sendData}}---</p>
      <!-- 没有命名的插槽内容指挥在没有命名的插槽渲染 -->
      <!-- 命令的插槽就只在对应name属性插槽渲染 -->
      <template v-slot:slotName="scope">
        <p  v-for="(val,index) in scope.user" :key="index">{{val}}</p>
      </template>
    </el-son>
  </div>
</template>

<script>
import son from './son.vue'
export default {
  data () {
    return {
      sendData: '我是从父组件传给子组件的内容'
    }
  },
  components: {
    'el-son': son
  }
}
</script>

<style>
</style>
