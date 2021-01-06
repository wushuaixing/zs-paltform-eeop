<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view></router-view>
    </div>
  </a-config-provider>
</template>
<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
export default {
  name: 'rootNode',
  data() {
    return {
      locale: zhCN,
    };
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
  min-width: 1200px;
}


</style>

