<template>
  <div>
    <div
      v-if="isModalOpen"
      class="login-modal"
    >   
      <div
        v-if="isSocialModalOpen"
        class="social-modal"
      >
        <div class="status-bar">
          <button
            class="close"
            @click="closeSocialLoginModal"
          >
            ✕
          </button>
        </div>

        <div class="content-box">
          <h2 class="content-title">
            <strong>타코야끼</strong>와 함께 즐거운 팟 구하기 🙌
          </h2>
          <div class="social-buttons">
            <button @click="loginWith('kakao')">
              <img
                src="/images/kakaotalk.png"
                alt="카카오 로그인"
              >
            </button>
            <button @click="loginWith('naver')">
              <img
                src="/images/naver.png"
                alt="네이버 로그인"
              >
            </button>
            <button @click="loginWith('google')">
              <img
                src="/images/google.png"
                alt="구글 로그인"
              >
            </button>
          </div>
        </div>
      </div>



      <div
        v-if="isAdditionalInfoModalOpen"
        class="additional-info-modal"
      >
        <!--닉네임 입력하라는 모달창 -->
        <div class="status-bar">
          <button
            class="close"
            @click="closeAdditionalInfoModal"
          >
            ✕
          </button>
        </div>
        <div class="content-box">
          <h2>닉네임을 입력해주세요!</h2>
          <input
            v-model="nickname"
            type="text"
            placeholder="공백 없이 2-16자 사이로 작성해주세요"
          >
          <button @click="setNickname">
            가입
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//TODO: 바깥 누르면 꺼짐
export default {
  data() {
    return {
      isModalOpen: false,
      isSocialModalOpen: false,
      isAdditionalInfoModalOpen: false,
      loginURL: null,
      nickname: "",
    };
  },
  methods: {
    openLoginModal() {
      this.isModalOpen = true;
      this.openSocialLoginModal();
      this.closeAdditionalInfoModal();
    },
    closeLoginModal() {
      this.isModalOpen = false;
    },
    openSocialLoginModal() {
      this.isSocialModalOpen = true;
    },
    closeSocialLoginModal() {
      this.isSocialModalOpen = false;
    },
    closeAdditionalInfoModal() {
      // 모달 닫기
      this.isAdditionalInfoModalOpen = false;
    },
    openAdditionalInfoModal() {
      // 모달 닫기
      this.isAdditionalInfoModalOpen = true;
    },
    async loginWith(provider) {
      await this.$axios.get(process.env.VUE_APP_TAKOYAKI_API +'users/oauth/login-url/'+provider, {
      })
          .then((response) => {
            this.loginURL = response.data.data['login_url'];
          })
          .catch((error) => {
            console.log(error);
          })
      if (this.loginURL == null) {
        //TODO: 에러 모달창
        return;
      }
      let windowWidth; // 창의 너비
      let windowHeight; // 창의 높이

      if (provider === 'kakao') {
        windowHeight = 600;
        windowWidth = 700;
      }else if (provider === 'naver'){
        windowHeight = 1000;
        windowWidth = 700;
      }else if (provider === 'google'){
        windowHeight = 1000;
        windowWidth = 700;
      }

      const left = (window.screen.width - windowWidth) / 2;
      const top = (window.screen.height - windowHeight) / 2;

      window.open(this.loginURL, 'newWindow', `width=${windowWidth},height=${windowHeight},left=${left},top=${top}`);
      localStorage.setItem('social', provider);
      const closingChecker = (event) => {
        if (event.data === 'closed') {

          console.log("닫힘");
          const isInfoNeeded = localStorage.getItem('is_info_needed');
          console.log(isInfoNeeded);
          if (isInfoNeeded != null) {
            if (isInfoNeeded == 'true') {
              this.closeSocialLoginModal();
              this.openAdditionalInfoModal();
              //입력 완료해야 로그인 완료
            } else {
              console.log("정보 필요 없음");
              this.closeSocialLoginModal();
              this.closeAdditionalInfoModal(); 
                if(this.$route.path==='/'){
                  this.$router.go(this.$router.currentRoute);
                  window.location.reload();}
                else{
                  this.$router.push({ path: '/' })
                  window.location.reload();
                }
              //TODO: 로그인 true값을 App.vue로 보내기
            }
          } else {
            console.log("에러");
            this.closeLoginModal();
            //TODO: 모달창
          }
          window.removeEventListener('message', closingChecker);
        }
      }
      window.addEventListener('message', closingChecker);



    },
    async setNickname() {
      if (this.nickname.length > 16 && this.nickname.length < 2){
        //TODO: 닉네임 길이 확인하세요 모달창
      }
      console.log(this.nickname);
      await this.$axios.post(process.env.VUE_APP_TAKOYAKI_API +'users/oauth/login/additional-info', {
        "nickname": this.nickname
      })
          .then((response) => {
            if (response.data.success){
              this.closeLoginModal();
              if(this.$route.path==='/'){
                  this.$router.go(this.$router.currentRoute);
                  window.location.reload();}
                else{
                  this.$router.push({ path: '/' })
                  window.location.reload();
                }
              //TODO: 로그인 true값 전달
            }else{
              //TODO: 예외 메세지 모달창에 띄우기
            }
          })
          .catch((error) => {
            console.log(error);
          })


    }
  }
};
</script>

<style>

.modal_background{
  position: fixed;
  top:0; left:0; bottom: 0; right: 0;
  background:rgba(0, 0, 0, 0.2);
}
/* 모달 스타일링 예시 */
.social-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  justify-content: center;
  flex-direction: row;
  overflow: hidden;
}
.content-title {
  margin-left: 20px;
}
.social-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.social-buttons button img{
  margin: 20px;
  height: 130px;
}
.status-bar{
  display: flex;
  background-color: transparent;
  font-size: 25px;
}
.close{
  position: absolute;
  margin-left:87%;
}
.content-box {
  padding: 20px;
  flex-wrap: wrap-reverse;
}


.additional-info-modal{
  /* 추가 정보 모달 스타일 */
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
background-color: white;
border-radius: 10px;
box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
z-index: 1000;
display: flex;
flex-direction: column;
align-items: center;
overflow: hidden;
}

.additional-info-modal input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.additional-info-modal button {
  padding: 10px 20px;
  background-color: FFF2D1;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}


/* 모달 열림 상태에 대한 스타일링 */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s;
}

.v-enter, .v-leave-to /* .v-leave-active 위반 */ {
  opacity: 0;
}
</style>