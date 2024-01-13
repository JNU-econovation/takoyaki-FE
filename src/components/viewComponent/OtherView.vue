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
            <v-btn
              v-if="user_type==='OTHER'"
              @click="applyNow"
            >
              신청하기
            </v-btn>
            <div v-else-if="user_type==='YAKI'">
              신청 완료
            </div>
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
    'informationParty':informationParty
  },
  props:['party_id'],

  data() {
    return {
      title:'',
      nickname:'',
      closingDate:'',
      user_type:''
    }
  },

  created() {
    this.$axios.get(process.env.VUE_APP_TAKOYAKI_API + 'parties/' + this.party_id + "?login=true")
      .then((response) => {
        /* eslint-disable */console.log(...oo_oo(`3618132122_51_8_51_29_4`,response))
        this.user_type = response.data.data.user_type;
        this.title=response.data.data.title;
        this.nickname = response.data.data.nickname;
        this.closingDate = response.data.data.planned_closing_date;



      })
      .catch((error) => {
        /* eslint-disable */console.log(...oo_oo(`3618132122_61_8_61_26_4`,error));

      })
  },

  methods: {
    applyNow() {
      this.$axios.post(process.env.VUE_APP_TAKOYAKI_API +"parties/"+ this.party_id+"/apply")
        .then((response) => {
          /* eslint-disable */console.log(...oo_oo(`3618132122_70_10_70_31_4`,response)); 
          this.user_type='YAKI';
        })
        .catch((error) => {
          /* eslint-disable */console.log(...oo_oo(`3618132122_74_10_74_28_4`,error));
        })
    },
   
}}
</script>

<style>

</style>