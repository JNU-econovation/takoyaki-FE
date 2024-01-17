<template>
  <div></div>
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
      const social = localStorage.getItem('social');
      localStorage.removeItem('social');
      localStorage.removeItem('is_info_needed');
      await this.$axios.post(this.$takoyaki_API + 'users/oauth/login/'+social+window.location.search, {})
        .then((response) => {
          console.log(response)
          if (response.data.success) {
            const isInfoNeeded = response.data.data['is_info_needed'];
            localStorage.setItem('is_info_needed', isInfoNeeded);
          }
        })
        .catch((error) => {
          console.log(error);
        })
      window.close();
      window.opener.postMessage('closed', '*');
    },
  },
};
</script>



<style scoped>

</style>

