<template>
  <div>
    <v-container>
      <div v-if="closed_date==null">
        <div v-if="user_type==='OTHER'">
          <br><br><br>
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
            <v-col>
              <v-spacer />
              <v-row
                style="color: #664B3B; padding-left: 53px;"
              >
                {{ closingDate }} 마감
              </v-row>
              <v-row>
                <v-col>
                  <v-btn
                    style="background-color: #958176; padding-right: 70px; padding-left: 70px;"
                    @click="applyNow"
                  >
                    신청하기
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
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
        </div>
        <div v-else-if="user_type === 'YAKI'">
          <YakiView
            :party_id="party_id"
            :title="title"
            :closing-date="closingDate"
            :nickname="nickname"
            :category="category"
            :activity-duration="activityDuration"
            :recruit-number="recruitNumber"
            :planned-start-date="plannedStartDate"
            :contact-method="contactMethod"
            :body="body"
            :activity_location="activity_location"
            :yaki_status="yaki_status"
          />
        </div>
      </div>

      <div v-else>
        <br><br>
        <h1> {{ title }} </h1>
        <br><br><br>
        <v-row>
          <v-col cols="2">
            <h3> 팟 정보 </h3>
          </v-col>
          <v-col>{{ nickname }}</v-col>
          <v-spacer />
          <v-col> 마감된 팟이에요! </v-col>
        </v-row>
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
      </div>
    </v-container>
  </div>
</template>

<script>
import informationParty from './informationParty.vue';
import YakiView from './YakiView.vue';
export default {

  components: {
    'informationParty':informationParty,
    'YakiView': YakiView
  },
    props: ['party_id',"title","closing-date","nickname","user_type","category","activity-duration","recruit-number","planned-start-date","contact-method","body","activity_location","closed_date","yaki_status","view_count"],
  
  
    methods: {
      applyNow() {
        this.$axios.post(process.env.VUE_APP_TAKOYAKI_API +"parties/"+ this.party_id+"/apply")
        .then((response) => {
          console.log(response)
          this.$props.user_type='YAKI';
          this.$props.yaki_status='WAITING'
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
            case "ALREADY_APPLIED":
              alert("이미 신청한 팟입니다.")
              break;
            case "TAKO_NOT_ALLOWED":
              alert("타코는 신청할 수 없습니다.")
              break;
          }
        })
    },
}}
</script>

<style scoped>
.imgTako {
  width:25px;
  height:25px;
}
/* .apply-btn {
  paddin-right: -240px;
} */

</style>