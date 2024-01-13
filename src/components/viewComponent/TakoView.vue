<template>
  <div>
    <v-container>
      <h1> {{ title }} </h1>
      <br>

      <!-- <v-list lines="one">
        <v-list-item
          v-for="n in 6"
          :key="n"
          :title="'Item ' + n"
          subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit">
        </v-list-item>
      </v-list> -->

      <YakiList :party_id="party_id"></YakiList>






      <v-row>
        <v-col cols="2">
          <h3> 팟 정보 </h3>
        </v-col >
        <v-col cols="2">
          <h4> 마감날짜 </h4>
        </v-col>
        <v-col>
          {{ closingDate }}
        </v-col>
      </v-row>

      <informationParty :party_id="party_id"></informationParty>


    </v-container>
  </div>
</template>

<script>
import informationParty from './informationParty.vue';
import YakiList from '../YakiList.vue';
export default {
  props: ['party_id'],

  components: {
    'informationParty': informationParty,
    'YakiList': YakiList
  },

  data() {
    return {
      title: '',
      nickname: '',
      closingDate: '',
      user_type: '',
      
    }
  },
  

  created() {
    this.$axios.get(process.env.VUE_APP_TAKOYAKI_API + 'parties/' + this.party_id + "?login=true")
      .then((response) => {
        console.log(response)
        this.user_type = response.data.data.user_type;
        this.title = response.data.data.title;
        this.nickname = response.data.data.nickname;
        this.closingDate = response.data.data.planned_closing_date;



      })
      .catch((error) => {
        console.log(error);

      })
  },

  methods: {
    
  }
}
</script>

<style></style>