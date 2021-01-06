<template>
  <div>
    <Breadcrumb :source="navData" icon="environment" />
    <div style="padding: 16px">
      <span>这是，已入库页面</span>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/bread-crumb';
export default {
  name: 'BeStorage',
  components:{
    Breadcrumb,
  },
  data() {
    return {
      navData:[
        {id:1,title:'服务商管理',path:'/provider/review'},
        {id:2,title:'已入库',path:'/provider/storage'},
      ]
    };
  },
}
</script>

<style scoped>

</style>
