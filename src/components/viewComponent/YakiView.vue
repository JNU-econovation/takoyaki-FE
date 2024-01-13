<template>
  <div>
    <v-container>
      <h1> {{ title }} </h1>
      <br><br>
      <v-row>
        <v-col cols="2">
          <h3> 팟 정보 </h3>
        </v-col>
        <v-col>{{ nickname }}</v-col>
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
      </v-row>

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
    }
  },

  created() {
    this.$axios.get(process.env.VUE_APP_TAKOYAKI_API + 'parties/' + this.party_id + "?login=true")
      .then((response) => {
        /* eslint-disable */console.log(...oo_oo(`4036828524_49_8_49_29_4`,response))
        this.user_type = response.data.data.user_type;
        this.title = response.data.data.title;
        this.nickname = response.data.data.nickname;
        this.closingDate = response.data.data.planned_closing_date;
      })
      .catch((error) => {
        /* eslint-disable */console.log(...oo_oo(`4036828524_56_8_56_26_4`,error));
      })
  },

  methods:{
    cancelApplication() {
      this.$axios.delete(process.env.VUE_APP_TAKOYAKI_API + 'parties/' + this.party_id + "/apply")
        .then((response) => {
          /* eslint-disable */console.log(...oo_oo(`4036828524_64_10_64_31_4`,response))
          this.$router.push({ path: '/' }) //신청취소버튼 클릭시 메인 홈으로 이동
        })
        .catch((error) => {
          /* eslint-disable */console.log(...oo_oo(`4036828524_68_10_68_28_4`,error));
        })
      },
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