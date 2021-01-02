<template>
  <div style="height: 100%" id="root-node-wrapper">
    <a-layout style="min-height: 100%" v-if="!loading" class="layout-wrapper">
      <a-layout-header class="header-wrapper" :style="{ position: 'fixed', zIndex: 99, width: '100%' }">
        <a-icon class="header-icon" type="codepen"/>
        <span class="header-title">浙商资产服务商招募管理系统-运营后台</span>
        <a-menu theme="dark" mode="horizontal" :default-selected-keys="[selectedKey]"
                :style="{ lineHeight: '64px',display:'inline-block',verticalAlign: 'top',height:'64px' }" />
        <div class="header-info">
          <a-dropdown :trigger="['click']" placement="bottomRight" size="large"
                      :getPopupContainer="e=>e.parentElement" >
            <a-menu slot="overlay" >
              <a-menu-item key="1">
                <div @click="handleModifyPhone"><a-icon type="user" />修改登录密码</div>
              </a-menu-item>
              <a-menu-item key="2">
                <router-link to="/login"><a-icon type="user" />退出登录</router-link>
              </a-menu-item>
            </a-menu>
            <a-button type="link" icon="down" style="color:#fff;">Hi，{{username}}</a-button>
          </a-dropdown>
        </div>
      </a-layout-header>
      <router-view></router-view>
    </a-layout>
    <a-spin v-if="loading" class="spin-wrapper" size="large" tip="数据加载中，请稍后..." />
    <ModifyPhoneModal ref="modifyPhone"></ModifyPhoneModal>
    <ModifyPwdModal ref="modifyPwd"></ModifyPwdModal>
    <SetPwdModal ref="setPwd"></SetPwdModal>
  </div>
</template>
<script>
  import { getInfo} from "@/plugin/api/base";
  import ModifyPhoneModal from "./personal/modify-phone"
  import ModifyPwdModal from "./personal/modify-password"
  import SetPwdModal from "./personal/set-password"
  export default {
    data() {
      return {
        loading:true,
        selectedKey:'a',
        info:{},
      };
    },
    components: {
      ModifyPwdModal,
      ModifyPhoneModal,
      SetPwdModal
    },
    methods:{
      handleModifyPhone(){
        this.$refs.modifyPhone.showModal()
      },
      handleModifyPwd(){
        this.$refs.modifyPwd.showModal()
      },
      handleSetPwd(){
        this.$refs.setPwd.showModal()
      }
    },
    created() {
      const { pathname } = window.location;
      if(/center/.test(pathname))this.selectedKey = 'b';
      if(!this.$store.state.isLogin){
        getInfo().then(res=>{
          this.loading = false;
          this.$store.commit('updateInfo', res.data);
          console.log(res.data);
        }).catch(err=>{console.log(err)}).finally(()=>this.loading = false)
      }else{
        this.loading = false;
      }
    },
    mounted() {
      // console.log('默认页面：首次加载！');
      console.log('检查校验：判断及检查相关token信息！');
    },
    computed:{
      username(){
        return this.$store.getters.getInfo.username;
      },
      isSetPassword(){
        return this.$store.getters.getInfo.isSetPassword;
      }
    }
  };
</script>

<style lang="scss">
.root-node-wrapper{

}
.layout-wrapper {
  .header{
    &-wrapper{
      padding: 0 20px;
    }
    &-icon{
      margin-right: 15px;
      font-size: 20px;
      color: #fff;
    }
    &-title{
      color: #fff;
      font-size: 16px;
      margin-right: 15px;
    }
    &-info{
      float: right;
      &-text{
        color: #FFFFFF;
        height: 100%;
        padding: 0 12px;
        line-height: 65px;
        &:hover{
          background-color: $common-base-active;
          cursor:pointer;
        }
      }
    }
  }
}
.spin-wrapper{
  width: 100%;
  padding-top: 10vh!important;
}
</style>
