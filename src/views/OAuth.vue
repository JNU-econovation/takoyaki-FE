<template>
  <div />
</template>


<script>
export default {
  data() {
    return {
      isInfoNeeded: true
      };
  },
  created() {
    // 페이지가 생성되면 실행할 함수
    this.oAuthLogin();
  },
  methods: {
    async oAuthLogin() {
      console.log(localStorage)
      const social = localStorage.getItem('social');
      console.log(social)
      if (social === null) {
        alert("잘못된 접근입니다.");
        history.back();
      }
      localStorage.removeItem('social');
      localStorage.removeItem('is_info_needed');
      localStorage.removeItem("error_code");
      await this.$axios.post(process.env.VUE_APP_TAKOYAKI_API + 'users/oauth/login/'+social+window.location.search, {})
        .then((response) => {
          console.log(response)
          if (response.data.success) {
            const isInfoNeeded = response.data.data['is_info_needed'];
            localStorage.setItem('is_info_needed', isInfoNeeded);
          }
        })
        .catch((error) => {
          console.log(error);
          localStorage.setItem("is_info_needed", null);
          localStorage.setItem("error_code", error.response.data.code);
        })
      window.close();
      window.opener.postMessage('closed', '*');
    },
  },
};
</script>



<style scoped>

</style>

