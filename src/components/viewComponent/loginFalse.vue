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

      <informationParty :party_id="party_id" />
    </v-container>
  </div>
</template>

<script>
import informationParty from './informationParty.vue';

export default {

  components: {
    'informationParty': informationParty
  },
  props: ['party_id'],

  data() {
    return {
      title: '',
      nickname: '',
      closingDate: '',
    }
  },

  created() {
    this.$axios.get(process.env.VUE_APP_TAKOYAKI_API + 'parties/' + this.party_id + "?login=true")
      .then((response) => {
        /* eslint-disable */console.log(...oo_oo(`1784080432_44_8_44_29_4`,response))
        this.user_type = response.data.data.user_type;
        this.title = response.data.data.title;
        this.nickname = response.data.data.nickname;
        this.closingDate = response.data.data.planned_closing_date;



      })
      .catch((error) => {
        /* eslint-disable */console.log(...oo_oo(`1784080432_54_8_54_26_4`,error));

      })
  }
}
</script>


<style></style>