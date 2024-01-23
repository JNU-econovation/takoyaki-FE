<template>
  <div>
    <v-container>
      <br><br>
      <h1> {{ title }} </h1>
      <br><br><br>

      <v-row>
        <v-col
          cols="2"
          style="margin-right: -90px;"
        >
          <h2> 팟 정보 </h2>
        </v-col>
        <v-col
          cols="2"
          class="partyInformation"
        >
          <h4>마감날짜 </h4>
        </v-col>
        <v-col
          cols="1"
          class="partyInformation closingDate"
        >
          <h4>{{ closingDate }}</h4>
        </v-col>
        <v-col
          class="nicknameImg"
          cols="1"
        >
          <img
            class="imgTako"
            src="/images/takoImg.png"
            alt="타코야끼 이미지"
          >
        </v-col>
        <v-col
          cols="2"
          class="partyInformation nickname"
        >
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


<style scoped>
.partyInformation {
margin-right: -100px;
margin-top: 3.5px;

}
.closingDate{
  margin-top:7px;
  height: 40px;
  color: #664B3B;
  border-radius: 50px; /* Make it circular */
  border: 4px solid 
  #ffedc1; /* Adjust the border color and width as needed */
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.nickname {
  padding-left:-110px;
  margin-left: -70px;
}
.nicknameImg{
  margin-left: 110px; margin-top: 2px;
}
.imgTako{
  width:25px;
  height:25px;
}
</style>