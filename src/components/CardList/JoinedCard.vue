<template>
  <div class="card-list">
    <div class="card">
      <h3>{{ title }}</h3>
      <v-row>
        <v-col class="text-right">{{ category }}</v-col>
        <v-col cols='auto' class="text-right">{{ area }}</v-col>
      </v-row>
      <v-btn @click="copy" style="width: 250px; position: relative;">연락하기</v-btn>
    </div>
  </div>
</template>
  
  <script>
  export default {
    props: ['party_id'],

    data() {
      return {
        title: '',
        closingDate: '',
        category: '',
        area: '',
        competitionRate: '',
        closed_date: '',
        contact:'',
        contact_method:''
      };
    },
    created() {
      //단일 팟 조회
      this.$axios.get(process.env.VUE_APP_TAKOYAKI_API + "parties/" + this.party_id + "?login=true")
        .then((response) => {
          /* eslint-disable *//* eslint-disable */console.log(...oo_oo(`50331448_40_28_40_84_4`, ...oo_oo(`268278020_39_8_39_29_4`, response)));
          this.title = response.data.data.title;
          this.closingDate = response.data.data.planned_closing_date;
          this.category = response.data.data.category;
          this.area = response.data.data.activity_location;
          this.competitionRate = response.data.data.competition_rate;
          this.closed_date = response.data.data.closed_date;
          this.contact=response.data.data.contact;
          this.contact_method=response.data.data.contact_method;
        })
        .catch((error) => {
          /* eslint-disable *//* eslint-disable */console.log(...oo_oo(`50331448_50_28_50_81_4`, ...oo_oo(`268278020_48_8_48_26_4`, error)));
        })
    },
    methods: {
      copy() {
        this.$copyText(this.contact).then(()=> {
          alert(this.contact_method+' '+this.contact+' 복사완료')
        })
      }
    },

  };
  </script>
  
  <style>

  .card-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
  @import "./CardList.css"

  </style>
  