<template>
  <div>
    <SocialModal ref="socialModal" />
    <v-app-bar
      color="#FCFCFD"
      flat
      height="90px"
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
            HOME
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
                style="margin-right: -40px;"
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
                style="margin-right: -25px;"
              >
                글쓰기
              </v-btn>
            </router-link>
          </v-col>

          <v-col>
            <v-btn
              depressed
              color="transparent"
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
          style="margin-right: 170.863px;"
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
  padding-right: 170.863px;
  margin-left: -20%;
}

</style>