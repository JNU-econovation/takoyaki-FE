<template>
  <div>
    <v-container>
      <h1> {{ title }} </h1>
      <br><br>

      <v-row>
        <v-col cols="2">
          <h3> 팟 정보 </h3>
        </v-col>
        <v-col cols="2">
          <h5> 마감날짜 </h5>
        </v-col>
        <v-col cols="2">
          {{ closingDate }}
        </v-col>
        <v-col cols="2">
          {{ nickname }}
        </v-col>
      </v-row>
      <informationParty
        :category="category"
        :activity-duration="activityDuration"
        :recruit-number="recruitNumber"
        :planned-start-date="plannedStartDate"
        :contact-method="contactMethod"
        :body="body"
        :activity_location="activity_location"
        :view_count="view_count"
      />
    </v-container>
  </div>
</template>

<script>
import informationParty from './informationParty.vue';

export default {
  components: {
    'informationParty': informationParty
  },
  props: ["title","closing-date","nickname","category","activity-duration","recruit-number","planned-start-date","contact-method","body","activity_location","view_count"],

}
</script>


<style></style>