<template>
  <div class="card-list">
    <div class="card">
      <h3>{{ title }}</h3>
      <v-row>
        <v-col class="text-right">
          {{ category }}
        </v-col>
        <v-col
          cols="auto"
          class="text-right"
        >
          {{ area }}
        </v-col>
      </v-row>
      <v-btn
        style="width: 250px; position: relative"
        @click="copy"
      >
        연락하기
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: ["party_id"],

  data() {
    return {
      title: "",
      closingDate: "",
      category: "",
      area: "",
      competitionRate: "",
      closed_date: "",
      contact: "",
      contact_method: "",
    };
  },
  created() {
    //단일 팟 조회
    this.$axios
      .get(
        process.env.VUE_APP_TAKOYAKI_API +
          "parties/" +
          this.party_id +
          "?login=true"
      )
      .then((response) => {
        console.log(response)
        this.title = response.data.data.title;
        this.closingDate = response.data.data.planned_closing_date;
        this.category = response.data.data.category;
        this.area = response.data.data.activity_location;
        this.competitionRate = response.data.data.competition_rate;
        this.closed_date = response.data.data.closed_date;
        this.contact = response.data.data.contact;
        this.contact_method = response.data.data.contact_method;
      })
      .catch((error) => {
        console.log(error)        
        alert("존재하지 않거나 삭제된 팟입니다.")
        history.back()
      });
  },
  methods: {
    copy() {
      this.$copyText(this.contact).then(() => {
        alert(this.contact_method + " " + this.contact + " 복사완료");
      });
    },
  },
};
</script>

<style scoped>
.card-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
*{
  font-family: 'Pretendard';
  font-weight: 800;
}
.card-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10%;
  }
  
.party-list{
  padding-right: 50px;
  padding-left: 50px;
}
  
.card {


  position: relative;
  z-index: 1;
  background-color: white; /* 아래쪽 색상 */
  color: #664B3B;
  height: 250px;
  width: 260px;
  padding: 15px;
  border-radius: 15%; /* 모든 모서리가 둥글게 */
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.3); /* 상단을 제외한 반투명 그림자 */
}

.card::before {
  content: "";
  z-index:-1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60%; /* 전체 높이의 절반 */
  background-color: #fff2d1; /* 위쪽 색상 */
  border-radius: 15% 15% 30% 30%; /* 위쪽 모서리만 둥글게 */
}

.v-btn{
  border-radius: 18px;
 

}
.button{
  padding-top:100px;
  padding-left:0px;
  position: absolute;
  
}

</style>
