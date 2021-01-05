<template>
  <a-layout>
    <a-layout-sider :width="width" :style="siderStyle">
      <Menu @change="toggleCollapsed"/>
    </a-layout-sider>
    <a-layout :style="layoutStyle">
      <a-layout-content :style="{ margin: 0, height: '100%' }" class="user-auth-wrapper">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import Menu from '../common/menu';
export default {
  data() {
    return {
      width:200,
      siderStyle:{
        position: 'fixed',
        left: 0,
        top:'64px',
        bottom:0,
        // overflow:'hidden auto',
        background: '#fff',
        zIndex:99,
      }
    };
  },
  methods:{
    toggleCollapsed(status){
      this.width = status ? 80 : 200;
    }
  },
  components: {
    Menu
  },
  computed:{
    layoutStyle:function () {
      return {
        padding:'64px 0 0',
        marginLeft:`${this.width}px`
      }
    }
  }
};
</script>
<style lang="scss">
	.user-auth-wrapper{
		.frame-wrapper{
			padding: 16px;
			&-content{
				background-color: #ffffff;
			}
			.frame-query{
				padding: 20px 20px 0 20px;
			}
			.frame-hr{
				width: 100%;
				height: 16px;
				background-color: #f2f3f5;
			}
			.frame-content{
				&-tab{
					padding: 4px 20px;
				}
				&-table{
					padding: 4px 20px 20px;
				}
			}
		}
		.query-item-prefix{
			height: 100%;
			width: 80px;
			text-align:left;
			border-right: 1px solid #ddd;
		}
		.custom-prefix-5 input{
			padding-left: 100px!important;
		}
	}

</style>
