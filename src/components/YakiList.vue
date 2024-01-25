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
          <img
            style="margin-bottom: -6px;"
            class="imgTako"
            src="/images/takoImg.png"
            alt="타코야끼 이미지"
          >
          <v-list-tile-content>
            <v-list-tile-title>
              {{ acceptedId.nickname }}
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
            <v-btn
              style="border-radius: 50px; background-color: #5CAD5A; color: white; font-weight: bold; margin-left: 10px; height: 30px; " 
              @click="accept(index)"
            >
              수락
            </v-btn>
            <v-btn
              style="border-radius: 50px; background-color: #E8766F; color: white; font-weight: bold; margin-left: 5px; height: 30px;"
              @click="reject(index)"
            >
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
          <img
            style="margin-bottom: -6px;"
            class="imgTako"
            src="/images/takoImg.png"
            alt="타코야끼 이미지"
          >
          <v-list-tile-content>
            <v-list-tile-title>
              {{ acceptedId.nickname }}
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
            switch(error.response.data.code) {
              case "UNAUTHORIZED":
                alert("로그인이 필요합니다.")
                break;
              case "USER_NOT_FOUND":
                alert("사용자를 찾을 수 없습니다.")
                break;
              case "PARTY_NOT_FOUND":
                alert("삭제되었거나 존재하지 않는 팟입니다.")
                break;
              case "PARTY_CLOSED":
                alert("이미 마감된 팟입니다.")
                break;
              case "NOT_TAKO":
                alert("사용자가 타코가 아닙니다.")
                break;
              case "NOT_YAKI":
                alert("사용자가 야끼가 아닙니다.")
                break;
              case "ALREADY_ACCEPTED_YAKI":
                alert("이미 수락된 야끼입니다.")
                break;
            }
          })
      },
      reject(index) {
        this.$axios.delete(process.env.VUE_APP_TAKOYAKI_API + 'parties/' + this.party_id + "/applicant/" + this.waiting_list[index].id)
          .then((response) => {
            console.log(response)
            window.location.reload();

          })
          .catch((error) => {
            console.log(error)
            switch(error.response.data.code) {
              case "UNAUTHORIZED":
                alert("로그인이 필요합니다.")
                break;
              case "USER_NOT_FOUND":
                alert("사용자를 찾을 수 없습니다.")
                break;
              case "PARTY_NOT_FOUND":
                alert("삭제되었거나 존재하지 않는 팟입니다.")
                break;
              case "PARTY_CLOSED":
                alert("이미 마감된 팟입니다.")
                break;
              case "NOT_TAKO":
                alert("사용자가 타코가 아닙니다.")
                break;
              case "NOT_YAKI":
                alert("사용자가 야끼가 아닙니다.")
                break;
              case "ALREADY_ACCEPTED_YAKI":
                alert("이미 수락된 야끼는 수락 취소가 불가능합니다.")
                break;
            }
          })
      }

    }
    
  };
  </script>
  

  <style scoped>
  .imgTako{
  width:25px;
  height:25px;
}
  </style>
  