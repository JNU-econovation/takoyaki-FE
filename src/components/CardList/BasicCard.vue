<template>
  <div class="BasicCard">
    <div class="card">
      <h3>{{ title }}</h3>

      <p>{{ closingDate }}</p>

      <p> {{ category }}, {{ area }}</p>

      <p>경쟁률: {{ competitionRate }}</p>
      <!--마우스 호버 구현 X-->
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
      //this.props,
      // props: ['propsdata'] //item.party_id받음
    };
  },
  created() {
    //단일 팟 조회
    this.$axios.get(process.env.VUE_APP_TAKOYAKI_API + "parties/" + this.party_id + "?login=true")
      .then((response) => {
        /* eslint-disable */console.log(...oo_oo(`268278020_39_8_39_29_4`,response));
        this.title = response.data.data.title;
        this.closingDate = response.data.data.planned_closing_date;
        this.category = response.data.data.category;
        this.area = response.data.data.activity_location;
        this.competitionRate = response.data.data.competition_rate;

      })
      .catch((error) => {
        /* eslint-disable */console.log(...oo_oo(`268278020_48_8_48_26_4`,error));
      })
  },
  methods: {

  },

};
</script>
  
<style>
@import "./CardList.css"
</style>