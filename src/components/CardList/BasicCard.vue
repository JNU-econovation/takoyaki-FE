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
      <v-container class="button">
        <v-btn style=" border-color: #fff2d1; background-color: white; color: #664B3B;">
          {{ planned_closing_date }}
        </v-btn>
          
        <v-container
          style="padding-top: 10px; padding-left: 0px;"
          class="SortedCard"
        >
          <v-btn style="background-color: #fff2d1; color: #664B3B;">
            {{ category }}
          </v-btn>
          <v-btn style="background-color: #fff2d1; color: #664B3B;">
            {{ activity_location }}
          </v-btn>
        </v-container>

         
        <v-hover v-slot="{ hover }">
          <v-btn>
            {{ hover ? hi : occupation_rate }}
          </v-btn>
        </v-hover>
      </v-container>
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
  props: ["party_id","competition_rate","title","category","activity_location","planned_closing_date","occupation_rate","closed_date"],
  
  }
</script>

<style scoped>
@import "./CardList.css";
</style>