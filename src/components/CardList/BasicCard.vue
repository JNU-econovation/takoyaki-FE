<template>
  <div class="BasicCard">
    <div
      v-if="closed_date==null"
      class="card"
    >
      <h3>{{ title }}</h3>

      <p>{{ closingDate }}</p>

      <p> {{ category }}, {{ area }}</p>

      <p>경쟁률: {{ competitionRate }}</p>
      <!--마우스 호버 구현 X-->
    </div>
    <div
      v-else
      class="card"
    >
      <h3>{{ title }} 마감</h3>
    </div>
  </div>
</template>
  
<script>

export default {
  props:['party_id'],

  data() {
    return {
      title: '',
      closingDate: '',
      category: '',
      area: '',
      competitionRate: '',
      closed_date: '',
      //this.props,
      // props: ['propsdata'] //item.party_id받음
    };
  },
  created() {
    //단일 팟 조회
    this.$axios.get(process.env.VUE_APP_TAKOYAKI_API + "parties/" + this.party_id + "?login=true")
      .then((response) => {
        /* eslint-disable *//* eslint-disable */console.log(...oo_oo(`50331448_40_28_40_84_4`,...oo_oo(`268278020_39_8_39_29_4`,response)));
        this.title = response.data.data.title;
        this.closingDate = response.data.data.planned_closing_date;
        this.category = response.data.data.category;
        this.area = response.data.data.activity_location;
        this.competitionRate = response.data.data.competition_rate;
        this.closed_date = response.data.data.closed_date;

      })
      .catch((error) => {
        /* eslint-disable *//* eslint-disable */console.log(...oo_oo(`50331448_50_28_50_81_4`,...oo_oo(`268278020_48_8_48_26_4`,error)));
      })
  },
  methods: {

  },

};
</script>
  
<style>
@import "./CardList.css"
</style>