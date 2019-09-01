<template>
    <div>
        <h1>
            我是子组件
        </h1>
        <slot name="slotName" :user="userData"></slot>
        <slot></slot>
        <slot></slot>
    </div>
</template>

<script>
export default {
  data () {
    return {
      userData: ['我是子组件的数据1', '我是子组件的数据2', '我是子组件的数据3']
    }
  }
}
</script>

<style>

</style>
