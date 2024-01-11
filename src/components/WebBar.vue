<template>

    <div>
      <SocialModal ref="socialModal" />
      <v-app-bar color="grey-lighten-4" flat height="72">
        <!--<v-avatar> 홈버튼 이미지 넣을경우
        <img src="홈버튼 이미지.jpg" alt="takoyaki Image">
      </v-avatar>-->
      
        <router-link to="/">
          <v-btn class="me-2">home</v-btn>
        </router-link>  
        <!--<me-2> 오른쪽 여백을 생성하여 두 번째 버튼과의 간격이 생긴다-->
        <router-link to="/writeform">
          <v-btn class="me-2">글 쓰기</v-btn>
        </router-link>
      
        <v-spacer></v-spacer>
      
        <v-col class="text-right">
          <router-link to="/mypage">
            <v-btn class="me-2">
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </router-link>
          <v-btn v-if="isLoggedIn" @click="logout">Logout</v-btn>
          <v-btn v-else @click="openLoginModal">Login</v-btn>


        </v-col>
      
      </v-app-bar>
    </div>
</template>

<script>
import SocialModal from '../components/Modal/SocialModal.vue';

export default {
  data() {
    return {
      isLoggedIn: false
    }
  },
  components: {
    SocialModal
  },
  methods: {

    openLoginModal() {
      // 모달 열기
      this.$refs.socialModal.openLoginModal();
    },
    logout(){
      this.$axios.post(this.$takoyaki_API +'users/logout', {
      })
          .then(() => {

            this.isLoggedIn = false;
          })
          .catch((error) => {
            console.log(error);
          })
    }
  }
};
</script>

<style>

</style>