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
  methods: {

  },
  created() {
    //단일 팟 조회
    this.$axios.get(this.$takoyaki_API + "parties/" + this.party_id + "?login=true")
      .then((response) => {
        console.log(response);
        this.title = response.data.data.title;
        this.closingDate = response.data.data.planned_closing_date;
        this.category = response.data.data.category;
        this.area = response.data.data.activity_location;
        this.competitionRate = response.data.data.competition_rate;

      })
      .catch((error) => {
        console.log(error);
      })
  },

};
</script>
  
<style>
@import "./CardList.css"
</style>