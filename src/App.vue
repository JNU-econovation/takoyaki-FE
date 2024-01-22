<template>
  <v-app id="inspire">
    <WebBar :check-login="checkLogin" />
    <router-view /><!--내가 관심있는 팟 모든팟 뿌려줌-->
    <WebFooter />
  </v-app>
</template>

<script>
import WebBar from './components/WebBar.vue';
import WebFooter from './components/WebFooter.vue';

export default {
  components: {
    'WebBar':WebBar,
    'WebFooter': WebFooter,
    
  },
  data(){
    return{
    checkLogin:Boolean
    }
  },
  created(){
    this.$axios
      .get(
        process.env.VUE_APP_TAKOYAKI_API +
          "users/login-check"
      )
      .then((response) => {
        console.log(response)
        this.checkLogin=response.data.data.login;

      })
      .catch((error) => {
        console.log(error)
      })}}
</script>`

<style scoped>
.me-2 {
  font-size: 15px;
  font-weight: bold;
  color:black;
  height:40;
  visibility:flat;
  width:80px;
}
.text-right {
  right:1000px;
  
}


</style>