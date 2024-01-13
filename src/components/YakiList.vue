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
    props:['party_id'],

    data() {
      return{
      waiting_list:[],
      accepted_list:[],
      closed_date:''
      }
    },

    created() {
      this.$axios.get(process.env.VUE_APP_TAKOYAKI_API + 'parties/' + this.party_id + "?login=true")
        .then((response) => {
          /* eslint-disable *//* eslint-disable */console.log(...oo_oo(`2756238643_73_30_73_88_4`,...oo_oo(`4162966104_47_10_47_31_4`,response)))
          this.waiting_list=response.data.data.waiting_list;
          this.accepted_list=response.data.data.accepted_list;
          this.closed_date =response.data.data.closed_date;
        })
        .catch((error) => {
          /* eslint-disable *//* eslint-disable */console.log(...oo_oo(`2756238643_79_30_79_85_4`,...oo_oo(`4162966104_52_10_52_28_4`,error)));
        })
    },
    methods:{
      accept(index) {
        this.$axios.post(process.env.VUE_APP_TAKOYAKI_API + 'parties/' + this.party_id + "/applicant/"+ this.waiting_list[index].id )  
          .then((response) => {
            /* eslint-disable *//* eslint-disable */console.log(...oo_oo(`2756238643_86_32_86_90_4`,...oo_oo(`4162966104_59_12_59_33_4`,response)))
          })
          .catch((error) => {
            /* eslint-disable *//* eslint-disable */console.log(...oo_oo(`2756238643_89_32_89_87_4`,...oo_oo(`4162966104_62_12_62_30_4`,error)));
          })
      },
      reject(index) {
        this.$axios.delete(process.env.VUE_APP_TAKOYAKI_API + 'parties/' + this.party_id + "/applicant/" + this.waiting_list[index].id)
          .then((response) => {
            /* eslint-disable *//* eslint-disable */console.log(...oo_oo(`2756238643_95_32_95_90_4`,...oo_oo(`4162966104_68_12_68_33_4`,response)))
          })
          .catch((error) => {
            /* eslint-disable *//* eslint-disable */console.log(...oo_oo(`2756238643_98_32_98_87_4`,...oo_oo(`4162966104_71_12_71_30_4`,error)));
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
  