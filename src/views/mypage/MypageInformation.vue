<template>
  <div>
    <v-container>
      <v-row>
        <MyPage /> 
        <v-col>
          <v-sheet
            min-height="70vh"
            rounded="lg"
            width="700px"
            class="MyPageBG"
          >
            <h1>나의 정보</h1>
            <br><br>
            <h4>회원 정보 수정</h4>
            <br>닉네임
            <br><v-card>
              <v-card-title>
                {{ nickname }}
                <v-spacer />
                <v-btn>수정</v-btn>
              </v-card-title>
            </v-card>
            <br>
            <br>
            <p>연결된 계정</p>
            <br>
            <v-row style="margin-left: 15px;">
              <img 
                class="social-img"
                src="/images/kakaotalk.png"
                alt="카카오 로그인"
              >
              <img 
                style="color: gray;"
                class="social-img"
                src="/images/disableNaver.png"
                alt="네이버 로그인"
              >
              <img 
                class="social-img"
                src="/images/disableGoogle.png"
                alt="구글 로그인"
              >
            </v-row>
            <p>
              <v-container>
                <!-- 첫 번째 행 -->
                <v-row>
                  <v-col>
                    <br><br>
                    이메일
                    <v-card>
                      <v-card-title>{{ email }}</v-card-title>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </p>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container> 
  </div>
</template>


<script>
import MyPage from './MyPage.vue'; 
export default {
    components: {
        'MyPage':MyPage 
      },
    data() {
        return {
            mypage: ['나의 정보', '내가 연팟', '내가 참여한 팟'],
            routerMypage: ['my-information', 'written-party', 'participated-party'],
            nickname: '',
            email: '',
            social: '',
        };
    },
    created() {
        this.$axios.get(process.env.VUE_APP_TAKOYAKI_API + 'users/info')
            .then((response) => {
            console.log(response);
            this.nickname = response.data.data.nickname;
            this.email = response.data.data.email;
            this.social = response.data.data.social;
        })
            .catch((error) => {
            console.log(error);
        });
    }
}
</script>

<style scoped>
.social-img {
  width: 70px; height: 70px; margin-right: 10px;
}
.listItem {
  width: 150px;
}

.elevation-12 {
  width: 170px;

}

.mypage-card {
  padding-top: 50px;
}

.MyPageBG {
  padding-left: 150px;
  padding-top: 50px;
}</style>