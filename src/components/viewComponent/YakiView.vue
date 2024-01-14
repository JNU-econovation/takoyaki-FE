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
      <informationParty :party_id="party_id" />
    </v-container>

  </div>
</template>

<script>
import informationParty from './informationParty.vue';

export default {

  components: {
    'informationParty': informationParty
  },
  props: ['party_id'],

  data() {
    return {
      title: '',
      nickname: '',
      closingDate: '',
      closed_date:'',
      yaki_status:'',
    }
  },

  created() {
    this.$axios.get(process.env.VUE_APP_TAKOYAKI_API + 'parties/' + this.party_id + "?login=true")
      .then((response) => {
        /* eslint-disable *//* eslint-disable */console.log(...oo_oo(`4008950287_66_28_66_85_4`,...oo_oo(`4036828524_49_8_49_29_4`,response)))
        this.user_type = response.data.data.user_type;
        this.title = response.data.data.title;
        this.nickname = response.data.data.nickname;
        this.closingDate = response.data.data.planned_closing_date;
        this.closed_date = response.data.data.closed_date;
        this.yaki_status=response.data.data.yaki_status;
      })
      .catch((error) => {
        /* eslint-disable *//* eslint-disable */console.log(...oo_oo(`4008950287_74_28_74_82_4`,...oo_oo(`4036828524_56_8_56_26_4`,error)));
      })
  },

  methods:{
    cancelApplication() {
      this.$axios.delete(process.env.VUE_APP_TAKOYAKI_API + 'parties/' + this.party_id + "/apply")
        .then((response) => {
          /* eslint-disable *//* eslint-disable */console.log(...oo_oo(`4008950287_82_30_82_88_4`,...oo_oo(`4036828524_64_10_64_31_4`,response)))
          this.$router.push({ path: '/' }) //신청취소버튼 클릭시 메인 홈으로 이동
        })
        .catch((error) => {
          /* eslint-disable *//* eslint-disable */console.log(...oo_oo(`4008950287_86_30_86_85_4`,...oo_oo(`4036828524_68_10_68_28_4`,error)));
        })
      },
      leaving() {
        this.$axios.delete(process.env.VUE_APP_TAKOYAKI_API + 'parties/' + this.party_id + "/leaving")
        .then((response) => {
          /* eslint-disable *//* eslint-disable */console.log(...oo_oo(`4008950287_82_30_82_88_4`, ...oo_oo(`4036828524_64_10_64_31_4`, response)))
          this.$router.push({ path: '/' }) //신청취소버튼 클릭시 메인 홈으로 이동
        })
        .catch((error) => {
          /* eslint-disable *//* eslint-disable */console.log(...oo_oo(`4008950287_86_30_86_85_4`, ...oo_oo(`4036828524_68_10_68_28_4`, error)));
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