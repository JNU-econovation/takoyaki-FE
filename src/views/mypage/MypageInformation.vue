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
            <br>
            <div v-if="checkChanged">
              <v-card>
                <v-card-title>
                  {{ nickname }}
                  <v-spacer />
                  <v-btn
                    style="border-radius: 50px; background-color: #FFF2D1; font-weight: bold;"
                    @click="changed"
                  >
                    수정
                  </v-btn>
                </v-card-title>
              </v-card>
            </div>
            <div v-else>
              <v-text-field
                v-model="newNickname"
                placeholder="2~16자리/공백불가인 새로운닉네임을 입력해주세요"
              />
              <v-btn
                style="margin-right: 10px; border-radius: 50px; background-color: #FFF2D1; font-weight: bold;"
                @click="changeNickname" 
              >
                수정
              </v-btn>
              <v-btn
                style="margin-right: 10px; border-radius: 50px; background-color: #d2d0d0; font-weight: bold;"
                @click="x"
              >
                취소
              </v-btn>
            </div>
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
            checkChanged:true,
            newNickname:''
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
            switch(error.response.data.code) {
              case "UNAUTHORIZED":
                alert("로그인이 필요합니다.");
                break;
              case "USER_NOT_FOUND":
                alert("사용자를 찾을 수 없습니다.")
                break;
            }
            history.back();
        });
    },
    methods:{
      changed(){
        this.checkChanged=false;
      },

      changeNickname(){
          this.$axios.patch(process.env.VUE_APP_TAKOYAKI_API + 'users/nickname',
          {
            "nickname":this.newNickname
          })
            .then((response) => {
            console.log(response);
            this.checkChanged=true;
            window.location.reload();
        })
            .catch((error) => {
            console.log(error);
            switch(error.response.data.code) {
              case "UNAUTHORIZED":
                alert("로그인이 필요합니다.");
                break;
              case "HTTP_MSG_NOT_READABLE":
                console.log("request body 확인 필요");
                alert("오류가 발생하였습니다.");
                break;
              case 'VALIDATION_FAILED':
                alert("2~16자리의 숫자, 영어, 한글만 허용됩니다.");
                break;
              case "DUPLICATE_NICKNAME":
                alert("중복된 닉네임입니다. 다른 닉네임을 입력해주세요!");
                break;
              case "NICKNAME_CHANGE_TOO_EARLY":
                alert("닉네임은 하루에 한 번만 바꿀 수 있습니다.");
                break;                
            }
        });
      },
      x(){
        this.checkChanged=true;
      }
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