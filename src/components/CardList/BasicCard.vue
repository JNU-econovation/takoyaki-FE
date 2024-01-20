<template>
  <div 
    class="BasicCard"
  >
    <div
      v-if="closed_date == null" 
      class="card"
    >
      <!--마감이 안 된 팟-->
      <h3>{{ title }}</h3>

      <p>{{ closingDate }}</p>

      <p>{{ category }}, {{ area }}</p>

      
      <v-hover v-slot="{ hover }">
        <v-btn>
          {{ hover ? view_count : competition_rate }}
        </v-btn>
      </v-hover>
    </div>

    <!--마감 된 팟-->
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
  props: ["party_id","competition_rate"],
  data() {
    return {
      title: "",
      closingDate: "",
      category: "",
      area: "",
      closed_date: "",
      view_count:null,
    };
  },
  created() {
    //단일 팟 조회
    this.$axios
      .get(
        process.env.VUE_APP_TAKOYAKI_API +
          "parties/" +
          this.party_id +
          "?login=true"
      )
      .then((response) => {
        console.log(response)
        this.title = response.data.data.title;
        this.closingDate = response.data.data.planned_closing_date;
        this.category = response.data.data.category;
        this.area = response.data.data.activity_location;
        this.closed_date = response.data.data.closed_date;
        this.view_count=response.data.data.view_count
      })
      .catch((error) => {
        console.log(error)
      });
  }
  }

</script>

<style>
@import "./CardList.css";
</style>
