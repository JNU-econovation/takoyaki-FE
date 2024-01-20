<template>
  <!--본문 미마감 타코뷰에서 현재 야끼 현황 보여주는 리스트-->
  <div>
    <div
      v-if="closed_date==null"
      class="yaki-list"
    >
      <v-list
        v-for="(acceptedId) in accepted_list"
        :key="acceptedId"
        two-line
      >
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>
              ✔ {{ acceptedId.nickname }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list
        v-for="(waitingId,index) in waiting_list"
        :key="waitingId"
        two-line
      >
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ waitingId.nickname }}
            </v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn @click="accept(index)">
              수락
            </v-btn>
            <v-btn @click="reject(index)">
              거절
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </div>
    <div
      v-else
      class="yaki-list"
    >
      <v-list
        v-for="(acceptedId) in accepted_list"
        :key="acceptedId"
        two-line
      >
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>
              ✔ {{ acceptedId.nickname }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </div>
  </div>
</template>
  
  <script>
  export default {
    props:['party_id','closed_date','waiting_list','accepted_list'], 

    methods:{
      accept(index) {
        this.$axios.post(process.env.VUE_APP_TAKOYAKI_API + 'parties/' + this.party_id + "/applicant/"+ this.waiting_list[index].id )  
          .then((response) => {
            console.log(response)
            window.location.reload();
          })
          .catch((error) => {
            console.log(error)
          })
      },
      reject(index) {
        this.$axios.delete(process.env.VUE_APP_TAKOYAKI_API + 'parties/' + this.party_id + "/applicant/" + this.waiting_list[index].id)
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {
            console.log(error)
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
  