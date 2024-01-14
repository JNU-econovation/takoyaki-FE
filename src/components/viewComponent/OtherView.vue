<template>
  <div>
    <v-container>
      <div v-if="closed_date==null">
        <div v-if="user_type==='OTHER'">
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
                  @click="applyNow"
                >
                  신청하기
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
          <informationParty :party_id="party_id" />
</div>
        <div v-else-if="user_type === 'YAKI'">
          <YakiView :party_id="party_id"></YakiView>
        </div>
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
        <informationParty :party_id="party_id" />
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
  props:['party_id'],

  data() {
    return {
      title:'',
      nickname:'',
      closingDate:'',
      user_type:'',
      closed_date:''
    }
  },

  created() {
    this.$axios.get(process.env.VUE_APP_TAKOYAKI_API + 'parties/' + this.party_id + "?login=true")
      .then((response) => {
        /* eslint-disable *//* eslint-disable */console.log(...oo_oo(`426099745_71_28_71_85_4`,...oo_oo(`3618132122_51_8_51_29_4`,response)))
        this.user_type = response.data.data.user_type;
        this.title=response.data.data.title;
        this.nickname = response.data.data.nickname;
        this.closingDate = response.data.data.planned_closing_date;
        this.closed_date = response.data.data.closed_date;



      })
      .catch((error) => {
        /* eslint-disable *//* eslint-disable */console.log(...oo_oo(`426099745_82_28_82_82_4`,...oo_oo(`3618132122_61_8_61_26_4`,error)));

      })
  },

  methods: {
    applyNow() {
      this.$axios.post(process.env.VUE_APP_TAKOYAKI_API +"parties/"+ this.party_id+"/apply")
        .then((response) => {
          /* eslint-disable *//* eslint-disable */console.log(...oo_oo(`426099745_91_30_91_88_4`,...oo_oo(`3618132122_70_10_70_31_4`,response))); 
          this.user_type='YAKI';
        })
        .catch((error) => {
          /* eslint-disable *//* eslint-disable */console.log(...oo_oo(`426099745_95_30_95_85_4`,...oo_oo(`3618132122_74_10_74_28_4`,error)));
        })
    },
   
}}
</script>

<style>

</style>