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

      <p>{{ planned_closing_date }}</p>

      <p>{{ category }}, {{ activity_location }}</p>

      
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
  props: ["party_id","competition_rate","title","category","activity_location","planned_closing_date"],
  data() {
    return {
      view_count:null,
    };
  },
  }
</script>

<style>
@import "./CardList.css";
</style>
