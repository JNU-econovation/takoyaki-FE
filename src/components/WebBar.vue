<template>
  <div>
    <SocialModal ref="socialModal" />
    <v-app-bar
      color="#FCFCFD"
      flat
      height="90px"
    >
      <v-col class="text-left">
        <v-avatar />
        <router-link to="/">
          <v-btn
            depressed
            color="transparent"
            class="me-2"
          >
            HOME
          </v-btn>
        </router-link>  
        <!--<me-2> 오른쪽 여백을 생성하여 두 번째 버튼과의 간격이 생긴다-->
        <router-link to="/writeform">
          <v-btn
            depressed
            color="transparent"
            class="me-2"
          >
            글쓰기
          </v-btn>
        </router-link>
      </v-col>
      <v-spacer />
      
      <v-col class="text-right">
        <router-link to="/mypage/my-information">
          <v-btn
            depressed
            color="transparent"
            class="me-2"
          >
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </router-link>
        <v-btn
          v-if="isLoggedIn"
          depressed
          color="transparent"
          @click="logout"
        >
          로그아웃
        </v-btn>
        <v-btn
          v-else
          depressed
          color="transparent"
          @click="openLoginModal"
        >
          로그인
        </v-btn>
      </v-col>
    </v-app-bar>
  </div>
</template>

<script>
import SocialModal from '../components/Modal/SocialModal.vue';

export default {
  components: {
    SocialModal
  },
data() {
    return {
      isLoggedIn: false
    }
  },
  methods: {
    openLoginModal() {
      // 모달 열기
      this.$refs.socialModal.openLoginModal();
    },
    logout(){
      this.$axios.post(process.env.VUE_APP_TAKOYAKI_API +'users/logout', {
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

<style scoped>
.v-btn{
  font-size: large;
  color:#777E90;
}

.text-left{
  padding-left: 8%;
}
.text-right{
  padding-right: 8%;
}

</style>