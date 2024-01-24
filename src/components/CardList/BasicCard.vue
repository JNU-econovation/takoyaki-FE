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
*{
  font-family: 'Pretendard';
  font-weight: 800;
}

h3{
  padding-top: 20px;
  padding-left:20px;
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

  position: absolute;
  
}

</style>