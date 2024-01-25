<template>
  <div>
    <SocialModal ref="socialModal" />
    <v-app-bar
      color="#FCFCFD"
      flat
      height="60px"
    >
      <v-col
        class="text-left"
      >
        <v-avatar />
        <router-link to="/">
          <v-btn
            depressed
            color="transparent"
            class="me-2"
          >
            <img
              src="/images/BannerLogo.png"
              style="width:120px"
            >
          </v-btn>
        </router-link>  
        <!--<me-2> 오른쪽 여백을 생성하여 두 번째 버튼과의 간격이 생긴다-->
      </v-col>
      <v-spacer />
      

      <div v-if="checkLogin">
        <v-row class="text-right">
          <v-col>
            <router-link to="/mypage/my-information">
              <v-btn
                depressed
                color="transparent"
                style="margin-right: -40px; font-weight: bold;font-size: 18px; color:#664B3B;"
              >
                <i class="fa-regular fa-user" />
              </v-btn>
            </router-link>
          </v-col>
          
          <v-col>
            <router-link to="/writeform">
              <v-btn
                depressed
                color="transparent"
                style="margin-right: -25px; font-weight: bold;font-size: 18px;color:#664B3B;"
              >
                글쓰기
              </v-btn>
            </router-link>
          </v-col>

          <v-col>
            <v-btn
              depressed
              color="transparent"
              style="font-weight: bold; color:#664B3B; font-size: 18px;"
              @click="logout"
            >
              로그아웃
            </v-btn>
          </v-col>
        </v-row>
      </div>

      <div v-else>
        <v-btn
          depressed
          color="transparent"
          style="margin-right: 170.863px; font-weight: bold; color:#664B3B; font-size: 18px;"
          @click="openLoginModal"
        >
          로그인
        </v-btn>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import SocialModal from '../components/Modal/SocialModal.vue';

export default {
  components: {
    SocialModal
  },
  props:['check-login'],
  data() {
    return {
      isLoggedIn: false
    }
  },
  created(){

  },
  methods: {
    openLoginModal() {
      // 모달 열기
      this.$refs.socialModal.openLoginModal();
    },
    logout(){
      this.$axios.post(process.env.VUE_APP_TAKOYAKI_API +'users/logout', {
      })
          .then((response) => {
            console.log(response);
            if(this.$route.path==='/'){
              this.$router.go(this.$router.currentRoute);
              window.location.reload();
          }
            else{
              this.$router.push({ path: '/' })
              window.location.reload();
            }
          })
          .catch((error) => {
            console.log(error);
            switch(error.response.data.code) {
              case "UNAUTHORIZED":
                alert("로그인이 필요합니다.");
            }
          })
    }
  }
};

</script>

<style scoped>


.text-left{
  padding-left: 8%;
}
.text-right{
  padding-right: 170.863px;
  margin-left: -20%;
}

</style>