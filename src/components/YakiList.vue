<template> <!--본문 미마감 타코뷰에서 현재 야끼 현황 보여주는 리스트-->
    <div class="yaki-list">
      <v-list two-line
      v-for="(acceptedId) in accepted_list"
      :key="acceptedId">
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title >
              ✔ {{ acceptedId.nickname }}
            </v-list-tile-title>
          </v-list-tile-content>
          </v-list-tile>
      </v-list>
      <v-list two-line
        v-for="(waitingId,index) in waiting_list"
        :key="waitingId">

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title >
                {{ waitingId.nickname }}
              </v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn @click="accept(index)"> 수락 </v-btn>
              <v-btn @click="reject(index)"> 거절 </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
    </div>
  </template>
  
  <script>
  export default {
    props:['party_id'],

    data() {
      return{
      waiting_list:[],
      accepted_list:[],
      }
    },

    created() {
      this.$axios.get(process.env.VUE_APP_TAKOYAKI_API + 'parties/' + this.party_id + "?login=true")
        .then((response) => {
          console.log(response)
          this.waiting_list=response.data.data.waiting_list;
          this.accepted_list=response.data.data.accepted_list;
        })
        .catch((error) => {
          console.log(error);
        })
    },
    methods:{
      accept(index) {
        this.$axios.post(process.env.VUE_APP_TAKOYAKI_API + 'parties/' + this.party_id + "/applicant/"+ this.waiting_list[index].id )  
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {
            console.log(error);
          })
      },
      reject(index) {
        this.$axios.delete(process.env.VUE_APP_TAKOYAKI_API + 'parties/' + this.party_id + "/applicant/" + this.waiting_list[index].id)
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {
            console.log(error);
          })
      }

    }
    
  };
  </script>
  

  <style>
  .yaki {

  }
  .yaki button {
    
  }
  </style>
  