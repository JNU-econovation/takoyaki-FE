<template>
  <div>
    <v-container>
      <div v-if="closed_date==null">
        <h1> {{ title }} </h1>
        <br><br>
        <v-row>
          <v-col cols="2">
            <h3> 팟 정보 </h3>
          </v-col>
          <v-col>{{ nickname }}</v-col>
          <div v-if="yaki_status === 'WAITING'">
            <v-col>
              <v-row>
                {{ closingDate }} 마감
              </v-row>
              <v-row>
                <div class="complete">
                  신청 완료
                </div> 
                <v-btn @click="cancelApplication">
                  신청 취소
                </v-btn>
              </v-row>
            </v-col>
          </div>
          <div v-else>
            <v-col>
              <v-row>
                {{ closingDate }} 마감
              </v-row>
              <v-row>
                <div class="complete">
                  수락되었어요!
                </div> 
                <v-btn @click="leaving">
                  팟 나가기
                </v-btn>
              </v-row>
            </v-col>
          </div>
        </v-row>
      </div>
      <div v-else>
        <h1> {{ title }} </h1>
        <br><br>
        <v-row>
          <v-col cols="2">
            <h3> 팟 정보 </h3>
          </v-col>
          <v-col>{{ nickname }}</v-col>
          <v-spacer />
          <v-col> 마감된 팟이에요! </v-col>
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
  props: ['party_id',"title","closing-date","nickname","user_type","category","activity-duration","recruit-number","planned-start-date","contact-method","body","activity_location","yaki_status"],

  methods:{
    cancelApplication() {
      this.$axios.delete(process.env.VUE_APP_TAKOYAKI_API + 'parties/' + this.party_id + "/apply")
        .then((response) => {
          console.log(response)
          this.$router.push({ path: '/' }) //신청취소버튼 클릭시 메인 홈으로 이동
        })
        .catch((error) => {
          console.log(error)
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
        })
      }
    }
  }

</script>

<style scoped>
.complete {
  padding-right: 60px;
  padding-top: 10px;
  padding-left: 20px;
}
</style>