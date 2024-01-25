<template>
  <div>
    <v-container>
      <div v-if="closed_date==null">
        <br><br>
        <h1> {{ title }} </h1>
        <br><br><br>
        <v-row>
          <v-col
            cols="2"
            style="margin-right: -90px;"
          >
            <h3> 팟 정보 </h3>
          </v-col>
          <v-col
            cols="1"
            style="margin-top: 4px;"
          >
            <img
              class="imgTako"
              src="/images/takoImg.png"
              alt="타코야끼 이미지"
            >
          </v-col>
          <v-col
            cols="6"
            style="padding-left:-110px;
                    margin-left: -70px;
                    margin-top: 4px;"
          >
            {{ nickname }}
          </v-col>
          <div v-if="yaki_status === 'WAITING'">
            <v-col>
              <v-spacer />
              <v-row
                style="color: #664B3B; padding-left: 66px;"
              >
                {{ closingDate }} 마감
              </v-row>
              <v-row>
                <v-col>
                  <v-btn
                    class="complete"
                    style="background-color: #cbb1a3; padding-right: 70px; padding-left: 70px; border-radius:15px; height: 35px; font-size: large; font-weight: bold;"
                  >
                    신청 완료
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn
                    style="background-color: #FFF2D1;padding-right: 30px; padding-left: 30px; border-radius:15px; height: 35px; font-size: large; font-weight: bold;"
                    @click="cancelApplication"
                  >
                    신청 취소
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </div>
          <div v-else>
            <v-col>
              <v-row
                style="color: #664B3B; padding-left: 80px;"
              >
                {{ closingDate }} 마감
              </v-row>
              <v-row>
                <v-col>
                  <v-btn
                    class="complete"
                    style="background-color: #cbb1a3; padding-right: 70px; padding-left: 70px; border-radius:15px; height: 35px; font-size: large; font-weight: bold;"
                  >
                    수락되었어요!
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn
                    style="background-color: #FFF2D1;padding-right: 30px; padding-left: 30px; border-radius:15px; height: 35px; font-size: large; font-weight: bold;"
                    @click="leaving"
                  >
                    팟 나가기
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </div>
        </v-row>
      </div>
      <div v-else>
        <br><br>
        <h1> {{ title }} </h1>
        <br><br><br>
        <v-row>
          <v-col cols="2">
            <h3> 팟 정보 </h3>
          </v-col>
          <v-col
            cols="1"
            style="margin-top: 4px; margin-left: -90px;"
          >
            <img
              class="imgTako"
              src="/images/takoImg.png"
              alt="타코야끼 이미지"
            >
          </v-col>
          <v-col
            cols="6"
            style="padding-left:-110px;
                    margin-left: -70px;
                    margin-top: 4px;"
          >
            {{ nickname }}
          </v-col>
          <v-spacer />
          <v-col>
            <v-btn
              style="background-color: #cbb1a3;padding-right: 30px; padding-left: 30px; border-radius:15px; height: 45px; font-size: large; font-weight: bold;"
              @click="cancelApplication"
            >
              마감된 팟이에요 {{ contactMethod }} 통해 연락해보세요!
            </v-btn>
          </v-col>
        </v-row>
      </div>
      <informationParty
        :category="category"
        :activity-duration="activityDuration"
        :recruit-number="recruitNumber"
        :planned-start-date="plannedStartDate"
        :contact-method="contactMethod"
        :body="body"
        :activity_location="activity_location"
        :view_count="view_count"
      />
    </v-container>
  </div>
</template>

<script>
import informationParty from './informationParty.vue';

export default {
  components: {
    'informationParty': informationParty
  },
  props: ['party_id',"title","closing-date","nickname","user_type","category","activity-duration","recruit-number","planned-start-date","contact-method","body","activity_location","yaki_status","view_count","closed_date"],

  methods:{
    cancelApplication() {
      this.$axios.delete(process.env.VUE_APP_TAKOYAKI_API + 'parties/' + this.party_id + "/apply")
        .then((response) => {
          console.log(response)
          this.$router.push({ path: '/' }) //신청취소버튼 클릭시 메인 홈으로 이동
        })
        .catch((error) => {
          console.log(error)
          switch(error.response.data.code) {
            case "UNAUTHORIZED":
              alert("로그인이 필요합니다.")
              break;
            case "USER_NOT_FOUND":
              alert("사용자를 찾을 수 없습니다.")
              break;
            case "PARTY_NOT_FOUND":
              alert("삭제되었거나 존재하지 않는 팟입니다.")
              break;
            case "PARTY_CLOSED":
              alert("이미 마감된 팟입니다.")
              break;
            case "NOT_YAKI":
              alert("사용자가 야끼가 아닙니다.")
              break;
            case "CANCEL_APPLICATION_NOT_ALLOWED":
              alert("신청 취소가 불가능합니다.")
              break;
          }
        })
      },
      leaving() {
        this.$axios.delete(process.env.VUE_APP_TAKOYAKI_API + 'parties/' + this.party_id + "/leaving")
        .then((response) => {
          console.log(response)
          this.$router.push({ path: '/' }) //신청취소버튼 클릭시 메인 홈으로 이동
        })
        .catch((error) => {
          console.log(error)
          switch(error.response.data.code) {
            case "UNAUTHORIZED":
              alert("로그인이 필요합니다.")
              break;
            case "USER_NOT_FOUND":
              alert("사용자를 찾을 수 없습니다.")
              break;
            case "PARTY_NOT_FOUND":
              alert("삭제되었거나 존재하지 않는 팟입니다.")
              break;
            case "PARTY_CLOSED":
              alert("이미 마감된 팟입니다.")
              break;
            case "NOT_YAKI":
              alert("사용자가 야끼가 아닙니다.")
              break;
            case "LEAVE_PARTY_NOT_ALLOWED":
              alert("신청 취소가 불가능합니다.")
              break;
          }
        })
      }
    }
  }

</script>

<style scoped>
/* .complete {
  padding-right: 60px;
  padding-top: 10px;
  padding-left: 20px;
} */
.imgTako {
  width:25px;
  height:25px;
}
</style>